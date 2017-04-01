const config = require('./config');

/**
 * 初始化
 */
let init = function() {

    before(function() {
        require('./bin/db.js');
    })

    describe(`Unit Testing \n database connecting ${config.localDb.host}/${config.localDb.name} \n`, function() {
        //测试api
        describe('controllers', function() {
            testControllers();
        });
        //describe('libs', function() {
        //    testLib();
        //});
    });
}

/**
 * 接口测试
 */
let testControllers = function() {
    //describe('pubilc - 公共', function() {
    //    require('./controllers/public/attachment.test.js');
    //});
    describe('process - 流程', function() {
        require('./controllers/process/process.test.js');
    });
    describe('polymer - 聚合信息',function(){
        require('./controllers/process/polymer.test.js');
    });
}

let testLib = function() {
    describe('tools - 工具', function() {
        require('./libs/tools.test.js');
    });
}

init();
