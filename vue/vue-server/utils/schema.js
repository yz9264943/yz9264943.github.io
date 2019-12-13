

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var maizuo_schema = new Schema({
    phone: Number,          // 手机号
    username: String,       // 名字
    password: String,       // 密码
    pwd: String,            // 确认密码
    safepwd:String,         // 安全密码
    gender:String,          // 性别    
    pic:String,             // 修改头像
    age:Date,               // 生日时间
})

exports.Maizuo = mongoose.model("maizuo",maizuo_schema);