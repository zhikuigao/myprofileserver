/**
 * @controller - 宏定义
 */
let router = require('../../libs/Router.js')();
let Macro = require('../../models/process/macro.js');
let conError = require('../../libs/error.js');
let operationFs = require('../../libs/util');
/**
 * @action create - 创建宏
 * @author  闫义杰
 * @method post
 * @param {string} userId - 用户ID
 * @param {string} macroName - 宏名称
 * @param {String} [macroCommand] - 宏命令
 * @return 无
 */
router.post('create', function*(ctx, req) {
    let body = req.body;
    yield Macro.create({
        userId: body.userId,
        macroName: body.macroName,
        macroImg: req.body.macroImg,
        macroCommand: body.macroCommand
    });
    ctx.success();
},{
    body: {
        userId: {isRequired: true},
        macroName: {isRequired: true},
        macroImg: {isRequired: true}
    }
});

/**
 * @action read - 读取宏
 * @author  闫义杰
 * @method get
 * @param {string} userId - 用户ID
 * @return {Array}
 */
router.get('read', function*(ctx, req) {
    let body = req.query;
    let data = yield Macro.find({userId: body.userId}).select('-updatedAt -createdAt').exec();
    data.forEach(item=> {
        if (item._doc._id || item._doc._id == 0) {
            item._doc.macroId = item._doc._id;
            delete item._doc._id;
            delete item._doc.macroFilePath;
            delete item._doc.macroImgPath;
        }
    });
    ctx.successResponse(data);
},{
    query: {
        userId: {isRequired: true}
    }
});

/**
 * @action update - 修改宏
 * @author  闫义杰
 * @method post
 * @param {string} userId - 用户ID
 * @param {String} macroName - 宏名称
 * @param {String} [macroCommand] - 宏命令
 * @param {String} macroId - 宏ID
 * @return 无
 */
router.post('update', function*(ctx, req) {
    let body = req.body;
    let array = 'macroName,macroCommand'.split(',');
    let info = {};

    array.forEach(item=>{
        if(body[item]){
            info[item] = body[item];
        }
    })
    //if (body.macroCommand) {
    //    info.macroCommand = body.macroCommand;
    //}
    //if (req.files.macroFile) {
    //    let data = yield Macro.findOne({userId: body.userId, _id: body.macroId}).exec();
    //    try {
    //        yield* operationFs(data._doc.macroFilePath);
    //    } catch (e) {
    //        throw new Error('删除文件失败' + e);
    //    }
    //    info.macroFileId = req.files.macroFile.id;
    //    info.macroFilePath = req.files.macroFile.serverPath;
    //}
    yield Macro.update({userId: body.userId, _id: body.macroId}, {$set: info}).exec();
    ctx.success();
},{
    body: {
        userId: {isRequired: true},
        macroId: {isRequired: true}
    }
});
/**
 * @action destroy - 删除宏
 * @author  闫义杰
 * @method post
 * @param {string} userId - 用户ID
 * @param {String} macroId - 宏ID
 * @return 无
 */
router.post('destroy', function*(ctx, req) {
    let body = req.body;
    let data = yield Macro.findOne({userId: body.userId, _id: body.macroId}).exec();
    yield Macro.remove({userId: body.userId, _id: body.macroId});
    ctx.success();
},{
    body:{
        userId: {isRequired: true},
        macroId: {isRequired: true}
    }
});
module.exports = router.actions;