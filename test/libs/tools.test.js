const tools = require('../../libs/tools'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    expect = require('chai').expect;

describe('#pagination - 分页', function() {
    //分页方法
    const pagination = tools.pagination;
    let pulldownCtx, pullupCtx; //上下拉刷新上下文
    //模型
    let Model;
    let baseResult;
    /**
     *  添加测试数据
     */
    before(function*() {
        /**
         * 清空测试数据
         */
        let name = 'test.paginations';

        //上下拉模拟上下文
        pulldownCtx = { query: { pagination: 'pulldown', take: 5 } };
        pullupCtx = { query: { pagination: 'pullup' } };
        //分页模拟模型
        let paginationSchema = new Schema({ content: String }, { versionKey: false, timestamps: true });
        Model = mongoose.model('test.paginations', paginationSchema);
        //清空原有数据
        yield Model.remove({});

        for (let i = 0; i < 20; i++) {
            yield Model.create({ content: `content ${i}` });
        }
        //结果检测
        baseResult = function(data) {
            expect(data).to.be.an('object');
            expect(data.count).to.be.an('number');
            expect(data.rows).to.be.an('array');
            expect(data.count).to.equal(20);
        };
        let middleData = yield Model.find().sort({ createdAt: -1 }).skip(10).limit(1);
        pulldownCtx.query.time = new Date(middleData[0].createdAt);
        pullupCtx.query.time = new Date(middleData[0].createdAt);
    });

    it('Query分页-下拉', function*() {
        let data = yield pagination(pulldownCtx, Model.find({}), { createdAt: -1 });
        baseResult(data);
        expect(data.rows.length).to.equal(5);
    });

    it('Query分页-上拉', function*() {
        let data = yield pagination(pullupCtx, Model.find({}), { createdAt: -1 });
        baseResult(data);
        // expect(data.rows.length).to.equal(10);
    });

    it('Aggregate分页-下拉', function*() {
        let aggregate = Model.aggregate([{ $project: { content: '$content', createdAt: '$createdAt' } }]);
        let data = yield pagination(pulldownCtx, aggregate, { createdAt: -1 });
        baseResult(data);
        expect(data.rows.length).to.equal(5);
    });

    it('Aggregate分页-上拉', function*() {
        let aggregate = Model.aggregate([{ $project: { content: '$content', createdAt: '$createdAt' } }]);
        let data = yield pagination(pullupCtx, aggregate, { createdAt: -1 });
        baseResult(data);
        // expect(data.rows.length).to.equal(10);
    });

    it('Array分页-下拉', function*() {
        let data = yield pagination(pulldownCtx, yield Model.find({}), { createdAt: -1 });
        baseResult(data);
        expect(data.rows.length).to.equal(5);
    });

    it('Array分页-上拉', function*() {
        let data = yield pagination(pullupCtx, yield Model.find({}), { createdAt: -1 });
        baseResult(data);
        // expect(data.rows.length).to.equal(10);
    });
});

describe('formatByKey - 格式化', function() {
    let fileArray;

    before(function() {
        fileArray = [{ file: 1 }, { file: 2 }, { icon: 4 }, { file: 3 }, { icon: 5 }, { other: 7 }]
    })

    it('格式化', function*() {
        let data = tools.formatByKey(fileArray);
        expect(data).to.be.a('object');
        expect(data.file).to.be.an('array');
        expect(data.file.length).to.equal(3);

        expect(data.icon).to.be.an('array');
        expect(data.icon.length).to.equal(2);

        expect(data.other).to.be.an('number');
    });
});
