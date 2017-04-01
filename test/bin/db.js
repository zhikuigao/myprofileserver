/*
    初始化-提供整体测试及单独测试(执行且只执行一遍)
 */
const mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment'),
    config = require('../config'),
    mocha = require('mocha'),
    coMocha = require('co-mocha'),
    chai = require("chai"),
    co = require('co'),
    tools = require('./tools');

/**
 * mocha初始化
 */
coMocha(mocha);

/**
 * chai初始化
 */
chai.should();
chai.use(require('chai-things'));

/**
 * 切换数据库链接
 */
co(function*() {
    if ([1, 2].some(i => i == mongoose.connection.readyState)) { //更换app连接
        yield mongoose.connection.close();
    }
    let localUrl = `${config.localDb.host}/${config.localDb.name}`;
    let remoteUrl = config.remoteDb.host;
    let fromdb = config.remoteDb.name;
    let todb = config.localDb.name ;
    //数据库同步到本地
     yield tools.dbClone(localUrl, remoteUrl, fromdb, todb);

    //连接生成的测试数据库
    let dburl = `${localUrl}/${todb}`;
    let connection = mongoose.connect(dburl);
    autoIncrement.initialize(connection);

}).then((success) => {}, (err) => {
    console.error('err stack ====>', err.stack);
    throw new Error(err);
});
