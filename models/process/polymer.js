/**
 * Created by Administrator on 2016/10/8 0008.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
let polymerSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    juheName: {
        type: String,
        required: true
    },
    juheUrl: {
        type: String,
        required: true
    },
    juheTop: {
        type: String,
        required: true
    },
    juheLeft: {
        type: String,
        required: true
    },
    juheWidth: {
        type: String,
        required: true
    },
    juheHeight: {
        type: String,
        required: true
    },
    scroltop: {
        type: String
    },
    scrolleft: {
        type: String
    },
    scrollHeight:{
        type:String
    },
    scrollWidth:{
        type:String
    }
}, {versionKey: false, timestamps: true});
polymerSchema.plugin(autoIncrement.plugin, 'pro.polymer');
module.exports = mongoose.model('pro.polymer', polymerSchema);
