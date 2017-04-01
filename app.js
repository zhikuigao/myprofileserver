const join = require('path').join;
const error = require('./middlewares/error.js');
const koa = require('koa');
const app = module.exports = koa();
const parse = require('co-body');
const fs = require('fs');
const path = require('path');
const logger = require('koa-logger')
let conn = require('./libs/db.js');
const auth = require('./middlewares/auth.js');
const  mongoose_cus_msg = require('./libs/mongoose-customer-error-msg');
const createZnode = require('./libs/znode');


let upload  = require('./middlewares/upload');

let  busboyParser = require('co-busboy');
let  commonError = require('./libs/error.js');
let  uuid = require('node-uuid');
let  Attachment = require('./models/sys/attachment.js');
let  dateFormat = require('dateformat');
let config = require('./config.js');

app.context.success = function(){
    var res = this.res;
    res.setHeader('Content-Type', 'text/plain; charset=utf8');
    res.statusCode = 200;
    let response = {};
    response.code = 0;
    response.error = null;
    response.result= {};
    this.body = response;
};

app.context.successResponse = function(data) {
    var res = this.res;
    res.setHeader('Content-Type', 'text/plain; charset=utf8');
    res.statusCode = 200;
    let response = {};
    response.code = 0;
    response.error = null;
    response.result= data;
    this.body = response;
};
app.context.errorResponse = function(code, error, msg) {
    let ret = {code: code, error: error};
    // msg 用来调试
    msg && (ret.msg = msg);
    this.body = ret;
};

app.controllers = {};
let basepath = path.join(__dirname, './controllers');
fs.readdirSync(basepath).forEach(function(modulename) {
    // 循环 controllers 下所有的目录
    var moduleDirPath = path.join(basepath, modulename);
    fs.readdirSync(moduleDirPath).forEach(function(ctrlname){
        if(path.extname(ctrlname) != '.js') return;
        var modulepath = modulename + '/' + path.basename(ctrlname, '.js');
        app.controllers[modulepath] = require(path.join(basepath, modulepath + '.js'));
    });
});

// 错误处理
app.use(error());
app.use(logger());
app.use(upload);

// body-parser
app.use(function *(next){
    // 只处理 request content-type: application/x-www-form-urlencoded, application/json 类型的数据


    if ('POST' != this.method || !this.is('json', 'urlencoded')) return yield next;
    
    // 将解析出来的数据，放到 this.request.body 中
    let body = yield parse(this, { limit: '100kb' });

    // // 假定所有的_id 都是 integer 类型，避免 content-type = urlencoded, 把 _id 解析为字符
    // for(var k in body){
    //     (k == '_id') && (body[k] = parseInt(body[k]));
    // }

    this.request.body = body;
    
    yield next;
});

// 验证权限，且路由， 生产环境中使用
app.use(auth);
if (!module.parent) {
    let server =  app.listen(config.port);
    server.on('listening', ()=>{
        console.log(`listening on port: ${config.port}......`);
        // 连接到zookeeper 服务器，并注册节点
        let zkClient = createZnode(config.zkNodeName, config.port);
        zkClient.connect();
    });
}

module.exports = app;