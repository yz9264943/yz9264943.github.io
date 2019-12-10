const jwt = require("jsonwebtoken");

const secret = "pengzhangdedabaiyang"

// data 需要加密的字段
exports.createToken = function (data) {
    return jwt.sign(data, secret);
}

// 解密
exports.decodeToken = function (token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, secret, function (err, data) {
            if (err) {
                // console.log(err);
                reject("解密失败")
            } else {
                resolve(data)
            }
        })
    })
}

// exports.decodeTokenware = function(req,res,next){

// }
