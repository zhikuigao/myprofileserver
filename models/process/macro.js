/**
 * Created by Administrator on 2016/11/14.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
let MacroSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    macroName:{
        type:String,
        required:true
    },
    macroImg:{
        type:String
    },
    macroCommand:{
        type:String
    }
}, {versionKey: false, timestamps: true});
MacroSchema.plugin(autoIncrement.plugin, 'pro.macro');
module.exports = mongoose.model('pro.macro', MacroSchema);