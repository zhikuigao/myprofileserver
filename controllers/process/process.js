/**
 * @controller - 流程
 */
let router = require('../../libs/Router.js')();
let config = require('../../config.js');
let Process = require('../../models/process/process.js');
let conError = require('../../libs/error.js');
/**
 * @action create - 创建一个process
 * @author  闫义杰
 * @method post
 * @param {Number} userId - userId
 * @param {string} imgUrl - 图标
 * @param {string} proName - 流程名字
 * @param {Boolean} isParent - 是否是父流程
 * @param {String} queryString -  JSON串
 * @return 无
 */
router.post('create', function*(ctx, req) {

    let data = yield Process.findOne({name: req.body.proName,user_id: req.body.userId}).exec();
    if(data) throw new conError.ParameterError(null,null,'流程名字重复');
    yield Process.create({
        user_id: req.body.userId,
        icon: req.body.imgUrl,
        name: req.body.proName,
        isParent:req.body.isParent,
        json: JSON.stringify(req.body.queryString)
    });
    ctx.success();
});

/**
 * @action read - 获取process
 * @author  闫义杰
 * @method get
 * @param {Number} userId - userId
 * @return  {Array}  -  process流程信息
 */
router.get('read', function *(ctx, req) {
    let data = yield Process.find({user_id: req.query.userId}).select('user_id icon json name isParent');
    let ret = data.map((v)=> {     //把数据库的字段转换成前端需要的名字，  比如 ：_id--->processId ,name -->proName
        let da = {};
        da.icon = v._doc.icon;
        da.json = JSON.parse(v._doc.json);
        da.processId = v._doc._id;
        da.proName = v._doc.name;
        da.isParent = v._doc.isParent;
        return da;
    });
    ctx.successResponse(data);
}, {
    query: {
        userId: {isRequired: true}
    }
});

/**
 * @action update - 重命名process
 * @author  闫义杰
 * @method post
 * @param {Number} processId - 流程ID
 * @param {String} [name] - 新名称
 * @param {String} [icon] - 新图标路径
 * @param {String} [json] - 新的json
 * @param {Boolean} [isParent] - 是否是父流程
 * @return 无
 */
router.post('update', function *(ctx, req) {
    let body = req.body;
    let dataArry = 'icon,name,json,isParent'.split(',');
    let data = {};
    dataArry.forEach(item=>{   //dataArry数组里面，前端传的字段包含哪一个就去更新哪一个
          if(body[item]){
             if(item==='json'){
                 data[item] = JSON.stringify(body[item]);
             }else{
                 data[item] = body[item];
             }
          }
    });
    yield Process.update({_id: req.body.processId}, {$set: data}).exec();
    ctx.success();
}, {
    body: {
        processId: {isRequired: true}
    }
});

/**
 * @action destroy - 删除process
 * @author  闫义杰
 * @method post
 * @param {Number} processId - 流程ID
 * @return 无
 */
router.post('destroy', function*(ctx, req) {
    yield Process.remove({_id: req.body.processId});
    ctx.success();
}, {
    body: {
        processId: {isRequired: true}
    }
});
module.exports = router.actions;

