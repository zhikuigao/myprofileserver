/**
 * @controller - 聚合信息
 */
let router = require('../../libs/Router.js')();
let Polymer = require('../../models/process/polymer.js');
let conError = require('../../libs/error.js');
/**
 * @action create - 创建聚合信息
 * @author  闫义杰
 * @method post
 * @param {string} userId - 用户ID
 * @param {string} juheName - 聚合名称
 * @param {string} juheUrl - 聚合网址
 * @param {String} juheTop -  坐标上
 * @param {String} juheLeft -  坐标左
 * @param {String} juheWidth -  聚合宽
 * @param {String} juheHeight -  聚合高
 * @param {String} [scroltop] -  滚动上
 * @param {String} [scrolleft] -  滚动左
 * @param {String} [scrollHeight] -  滚动的高度
 * @param {String} [scrollWidth] -  滚动的宽度
 * @return 无
 */
router.post('create', function*(ctx, req) {
    let data = yield Polymer.findOne({juheName:req.body.juheName,userId: req.body.userId}).exec();
    if(data){
        throw new conError.ParameterError(null,500,'juheName已经存在');
    }
    yield Polymer.create({
        userId: req.body.userId,
        juheName: req.body.juheName,
        juheUrl: req.body.juheUrl,
        juheTop: req.body.juheTop,
        juheLeft: req.body.juheLeft,
        juheWidth: req.body.juheWidth,
        juheHeight: req.body.juheHeight,
        scroltop: req.body.scroltop,
        scrolleft: req.body.scrolleft,
        scrollHeight:req.body.scrollHeight,
        scrollWidth:req.body.scrollWidth
    });
    ctx.success();
});

/**
 * @action read - 获取取用户下的聚合信息
 * @author  闫义杰
 * @method get
 * @param {string} userId - 用户ID
 * @return {Array} -用户下的聚合信息
 */
router.get('read', function*(ctx, req) {

    let data = yield Polymer.find({userId: req.query.userId}).select('-updatedAt -createdAt').exec();
    data.forEach(item=> {
        if (item._doc._id || item._doc._id == 0) {   // 如果 存在该条数据或者该条数据的_id等于0 ，就不显示_id(这个字段前端拿着没用) 给前端
            item._doc.juheId = item._doc._id;
            delete item._doc._id;
        }
    });
    ctx.body = ctx.successResponse(data);
});
/**
 * @action update - 修改聚合信息
 * @author  闫义杰
 * @method post
 * @param {Number} juheId - 聚合ID
 * @return 无
 */
router.post('update', function*(ctx, req) {
    yield Polymer.update({_id: req.body.juheId}, {$set: {juheName: req.body.juheName}}).exec();
    ctx.success();
});
/**
 * @action destroy - 删除聚合信息
 * @author  闫义杰
 * @method post
 * @param {String} juheName - 聚合名称
 * @return 无
 */
router.post('destroy', function*(ctx, req) {
        let dataArray=[
        Polymer.findOne({juheName:req.body.juheName}).exec(),
        Polymer.find({juheName:req.body.juheName,userId: req.body.userId}).count().exec()
    ];
    let data = yield dataArray;  //执行dataArray数组里面的语句，返回也是一个数组分别对应dataArray的每条结果，类似Promise.all的返回结果
    if(data[1]&&(data[1]>1)){
        throw new conError.ParameterError(null,null,'juheName重复');
    }
    yield Polymer.remove({_id: data[0]._id});
    ctx.success();
});
module.exports = router.actions;
