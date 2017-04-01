const expect = require("chai").expect,
    http = new require('../../bin/http');

const Attachment = require('../../../models/sys/attachment'),
    httpClient = new http('/public/attachment/');

let httpGet = httpClient.httpGet,
    request = httpClient.request;

describe('models', function() {

    describe('#download - 下载资源', function() {
        it('工具', function*() {
            let attachment = yield Attachment.findOne({});
            let res = yield request.get(httpClient.host + 'download').query({ id: attachment._id });
            expect(res.status).to.be.oneOf([200, 404]);//404图片资源不存在
        })
    });

});
