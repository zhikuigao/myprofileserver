/**
 * @controller - 附件管理
 */

let  router = require('../../libs/Router.js')();
let  busboyParser = require('co-busboy');
let  commonError = require('../../libs/error.js');
let  config = require('../../config.js');
let  uuid = require('node-uuid');
let  Attachment = require('../../models/sys/attachment.js');
let  fs = require('fs');
let  path = require('path');
let  dateFormat = require('dateformat');
let urlencode = require('urlencode');


// 如果没有指定文件上传路径，则把文件存放在系统根目录下的 uploads 文件夹
let  uploadPath = config.uploadPath || path.join(__dirname, '../../../uploads');
!fs.existsSync(uploadPath) && fs.mkdirSync(uploadPath);
let  tmpDir = path.join(uploadPath, 'tmp');
!fs.existsSync(tmpDir) && fs.mkdirSync(tmpDir);

/**
 * @action upload  - 文件上传
 * @author 陈志国
 * @method post
 * @param {string} module - 文件所述模块, 例如：module=sys
 * @param {file[]} files - 上传的文件，多个
 * @return {string} - 以逗号分割的附件ID, 例如：1,2,3
 */
router.post('upload', function* (ctx, req, res){
    if (!this.request.is('multipart/*')) throw new commonError.ContentTypeNotCorrect();

    let  textParam = {}, streams = [], parts = busboyParser(this), user = ctx.state.user, files = [], part, ids=[];
    while(part = yield parts){
        if (part.length) {
            // arrays are busboy fields 
            textParam[part[0]] = part[1];
        } else {
            // otherwise, it's a stream
            // 先将文件存储为 临时文件
            let  filetmpPath = path.join(tmpDir, uuid.v1());
            files.push({
                tmpPath: filetmpPath,
                mimeType: part.mimeType,
                size: part._readableState.length,
                originalName: part.filename
            });

            part.pipe(fs.createWriteStream(filetmpPath));
        }
    }

    if(!textParam.module){
        // 删除临时文件，并抛出错误
        files.forEach((f)=>{
            fs.unlinkSync(f.tmpPath);
        });
        throw new commonError.FileNoFindError('File upload must specify module',516004);
    }
    for(let  i = 0; i < files.length; i++){
        let  file = files[i], now = new Date(), currMonth = now.toISOString().substr(0, 7);
        let  entity = new Attachment({
            moduleName: textParam.module,
            originalName: file.originalName,
            serverName: uuid.v1(),
            length: file.size,
            mimeType: file.mimeType,
            uploaderId: user.id,
            uploaderName: user.name,
            uploadTime: now
        });

        let dbEntity = yield entity.save();
        ids.push(entity._id);   // 将id返回给前端

        let modulePath = path.join(uploadPath, textParam.module);
        let moduleMonthPath = path.join(modulePath, currMonth);
        let newFilePath = path.join(moduleMonthPath, entity.serverName);

        // 判断上述两个目录是否存在
        !fs.existsSync(modulePath) && fs.mkdirSync(modulePath);
        !fs.existsSync(moduleMonthPath) && fs.mkdirSync(moduleMonthPath);

        // 将文件移动到正式目录
        fs.renameSync(file.tmpPath, newFilePath);
    }

    this.body = ctx.successResponse(ids.join(','));
});

/**
 * @action download - 文件下载
 * @author 陈志国
 * @method get
 * @param {int} id - 要下载的附件 id
 * @return {stream} - 返回的文件流
 */
router.get('download', function* (ctx, req, next){
    let  query = ctx.query,
        id = query.id;

    // 验证参数必须为数字
    if(!/^\d+$/.test(id)) throw new commonError.ParameterError();
    
    let  dbAttachment = yield Attachment.findOne({_id: parseInt(id)});
    if(!dbAttachment) throw new commonError.FileNoFindError();
    let  month = dbAttachment.uploadTime.toISOString().substr(0, 7);
    let  filePath = path.join(uploadPath, dbAttachment.moduleName, month, dbAttachment.serverName);
    ctx.res.setHeader('Content-disposition', 'attachment; filename=' + urlencode(dbAttachment.originalName));
    ctx.res.setHeader('Content-type', dbAttachment.mimeType);
    ctx.body = fs.createReadStream(filePath);
});

module.exports = router.actions;
