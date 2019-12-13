






// a.  请求头 没有 token  
// b.  前端 发送 的请求头的 token 与 存储 在后台 的token 不一样  
// c.  请求头 有 token    后端 存储 token 已经消失  

// 登录注册   不需要检验 token
// 设置中间件
exports.checkToken = function (req, res, next) {
    // console.log("path ===" + req.path);
    // console.log(req.path !== "/vue/login")
    // console.log(req.path !== "/vue/register")
    next();

}

