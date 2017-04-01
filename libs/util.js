/**
 * Created by Administrator on 2016/11/15.
 */
let fs = require('fs');

//删除文件

let deleteFile = function *(path){
    return new Promise((resolve,reject)=>{
        fs.unlink(path,function(err,data){
            if(err) reject(err);
            resolve(data);
        });
    })
};
module.exports = deleteFile;
