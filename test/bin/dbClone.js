/**
 * 数据库同步
 */

const mongoose = require('mongoose'),
    config = require('../config'),
    co = require('co'),
    tools = require('./tools');

/**
 * mongoose初始化
 */
co(function*() {

    let localUrl = `${config.localDb.host}/${config.localDb.name}`;
    let remoteUrl = config.remoteDb.host;
    let fromdb = config.remoteDb.name;
    let todb = config.localDb.name;
    //数据库同步到本地
    yield tools.dbClone(localUrl, remoteUrl, fromdb, todb);

    console.log('clone over');
}).then((success) => {}, (err) => {
    console.error('err stack ====>', err.stack);
    throw new Error(err);
});
