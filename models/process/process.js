/**
 * Created by Administrator on 2016/9/19 0019.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
let processSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isParent:{
        type:Boolean,
        default:false
    },
    json: {
        type: String,
        required: true
    }
}, {versionKey: false, timestamps: true});
processSchema.plugin(autoIncrement.plugin, 'pro.process');
module.exports = mongoose.model('pro.process', processSchema);
