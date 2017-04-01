/**
 * Created by Administrator on 2016/9/28 0028.
 */
const expect = require("chai").expect,
    http = new require('../../bin/http');

const Process = require('../../../models/process/process'),
    httpClient = new http('/process/process/');

let httpGet = httpClient.httpGet,
    request = httpClient.request;

describe('process', function() {
    before(function*() {

    });

    describe('#create - 创建流程', function() {
        it('工具', function*() {
            let res = yield request.post(httpClient.host + 'create')
                .field('userId', 18)
                .field('imgUrl', "D:\\npp\\Notepad++\\notepad++.ic")
                .field('proName', "dvdv212")
                .field('queryString', "D:\\npp\\Notepad++\\notepad++.ico");
            expect(res.status).to.be.equal(200);
        })
    });

    describe('#read - 获取流程', function() {
            it('工具', function*() {
            let res = yield request.get(httpClient.host + 'read').query({userId:18});
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.an('Array');
        })
    });

    describe('#update - 重命名流程', function() {
        it('工具', function*() {
            let data = yield Process.findOne({}).exec();
            let res = yield request.post(httpClient.host + 'update')
                .field('processId', data._id)
                .field('newName', 'xxxxx')
            expect(res.status).to.be.equal(200);
        })
    });

    describe('#destroy - 删除流程', function() {
        it('工具', function*() {
            let data = yield Process.findOne({}).exec();
            let res = yield request.post(httpClient.host + 'destroy')
                .field('processId', data._id)
            expect(res.status).to.be.equal(200);
        })
    });

});
