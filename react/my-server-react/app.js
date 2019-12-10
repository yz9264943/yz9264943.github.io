
// 服务器 创建 
const express = require("express");
const app = express();

const server = require("http").createServer(app);

const port = 9090;
const hostname = "0.0.0.0";

// 导入数据库 
const connection = require("./utils/connect")

// 跨域 
const cors = require("cors");        // 模块下载
app.use(cors());                     // 通过 cors 解决跨域的问题

// 后台通过 req.body 获取 前端 post 数据   （如果不写 就是  undefined ）
app.use(express.json()); //  得到 post请求的提交的 formData 数据 
app.use(express.urlencoded({ extended: false })); // req.body 


// 设置 session 中间件     必须在路由中间件 的前面
var session = require("express-session");
app.use(session({
    name: "my-server",
    saveUninitialized: true,
    secret: "test",
    cookie: { maxAge: 1000 * 60 * 60 },     // session 保存的时间
    resave: false
}))


// 使用 token 中间件
var { checkToken } = require("./utils");
// app.use(checkToken)

// 接口
app.get("/index", (req, res) => {
    res.send("后台 服务器 地址... ")
})

app.get("/demo", (req, res) => {
    res.json({
        msg: "测试接口是否成功",
        code: 200,
        result: "Are yo ok",
        query: req.query,
        headers: req.headers
    })
})

// app.use(checkToken)


const ReactRouter = require("./react");
app.use("/react",ReactRouter);


server.listen(port, hostname, () => {
    console.log(`my server is listening on http://${hostname}:${port}`);
})