/**
 * Created by Administrator on 2016/10/8 0008.
 */
const expect = require("chai").expect,
    http = new require('../../bin/http');

const Process = require('../../../models/process/polymer'),
    httpClient = new http('/process/polymer/');

let httpGet = httpClient.httpGet,
    request = httpClient.request;

describe('process', function() {
    before(function*() {

    });

    describe('#create - 创建聚合信息', function() {
        it('工具', function*() {
            let res = yield request.post(httpClient.host + 'create')
                .field('userId', 18)
                .field('juheName', "qqq")
                .field('juheUrl', "www.baidu.com")
                .field('juheTop', "top")
                .field('juheLeft', "left")
                .field('juheWidth', "width")
                .field('juheHeight', "height")
                .field('scroltop', "stop")
                .field('scrolleft', "sleft")
            expect(res.status).to.be.equal(200);
        })
    });

    describe('#read - 获取取用户下的聚合信息', function() {
        it('工具', function*() {
            let res = yield request.get(httpClient.host + 'read').query({userId:18});
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.an('Array');
        })
    });

    describe('#update - 修改聚合信息', function() {
        it('工具', function*() {
            let data = yield Process.findOne({}).exec();
            let res = yield request.post(httpClient.host + 'update')
                .field('juheId', data._id)
                .field('juheName', 'xxxxx')
            expect(res.status).to.be.equal(200);
        })
    });

    describe('#destroy - 删除聚合信息', function() {
        it('工具', function*() {
            let data = yield Process.findOne({}).exec();
            let res = yield request.post(httpClient.host + 'destroy')
                .field('juheId', data._id)
            expect(res.status).to.be.equal(200);
        })
    });

});
