const app = require('../../app'),
    expect = require("chai").expect,
    config = require('../config'),
    agent = require('supertest').agent,
    http = require('http'),
    request = agent(http.createServer(app.callback()));

class httpClient {
    constructor(localPath) {
        let path = config.host + localPath;
        this.host = path;
        this.request = request;
        this.httpGet = function*(apiName, query) {
            query = query || {};
            let res = yield request.get(`${path}${apiName}`).query(query);
            expect(res.status).to.be.equal(200);
            return res.body;
        };
        this.httpPost = function*(apiName, body) {
            body = body || {};
            let res = yield request.post(`${path}${apiName}`).send(body);
            expect(res.status).to.be.equal(200);
            return res.body;
        };
    }
}

module.exports = httpClient;
