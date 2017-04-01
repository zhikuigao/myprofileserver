/**
 * Created by Administrator on 2016/9/19 0019.
 */
let  mongoose = require('mongoose');
let msg =  mongoose.Error.messages;

msg.general = {};
msg.general.default = '`{VALUE}`验证失败';
msg.general.required ='字段`{PATH}`必填.';

msg.Number = {};
msg.Number.min = '字段`{PATH}`({VALUE})小于要求的最小值({MIN}).';
msg.Number.max = '字段`{PATH}`({VALUE})大于要求的最大值({MAX}).';

msg.Date = {};
msg.Date.min = '字段`{PATH}`({VALUE})在要求的最小时间之前({MIN}).';
msg.Date.max = '字段`{PATH}`({VALUE})在要要求的最大时间之后({MAX}).';

msg.String = {};
msg.String.enum = '`{VALUE}`不是一个有合法的枚举值 `{PATH}`.';
msg.String.match = '字段`{PATH}`是无效的({VALUE}).';
msg.String.minlength = '字段`{PATH}`(`{VALUE}`)的长度小于要求的最小长度({MINLENGTH}).';
msg.String.maxlength = '字段`{PATH}` (`{VALUE}`)的长度大于要求的最大长度({MAXLENGTH}).';
module.exports = msg;