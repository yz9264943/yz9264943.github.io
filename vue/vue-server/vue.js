
var express = require("express");
var router = express.Router();


const { Maizuo } = require("./utils/schema");

router.get("/index", (req, res) => {
    res.json({
        msg: "这是 vue 项目 后台接口",
        bode: null,
        code: 200
    })
})


// 注册
router.post("/register", (req, res) => {
    var body = req.body;
    // console.log(body)


    Maizuo.findOne({
        phone: body.phone * 1
    }).then(result => {
        // console.log(result)

        if (!result) {
            Maizuo.insertMany(body).then(result => {
                res.json({
                    msg: "注册成功...",
                    code: 200,
                    result: "",
                })
            })
        } else {
            res.json({
                msg: "该手机号已被注册，请重新输入！！！",
                code: 200,
                result: "注册失败",
            })
        }
    })

})


// 登录
router.post('/login', (req, res) => {
    var body = req.body;
    // console.log(body)

    Maizuo.findOne({
        phone: body.phone
    }).then(result => {
        // console.log(result)

        if (result) {

            if (result.password == body.password) {

                req.session.phone = result.phone;
                req.session.username = result.username
                req.session.token = body.phone + new Date().getTime();
                // console.log(req.session)

                res.json({
                    msg: "登录成功",
                    code: 200,
                    result,
                    token: req.session.token
                })
            } else {
                res.json({
                    msg: "账号或密码错误，请重新输入",
                    code: 200,
                })
            }

        } else {
            res.json({
                msg: "该手机号还未注册！！！",
                code: 200,
            })
        }

    })

})


// 查询所有的信息
router.get('/my', (req, res) => {
    console.log("后台")
    console.log(req.session)
    Maizuo.findOne({
        phone: req.session.phone
    }).then(result => {
        // console.log(result)
        res.json({
            result,
            code: 200
        })
    })

})


// 修改密码
router.post('/setpwd', (req, res) => {
    var body = req.body;
    // console.log(body)

    Maizuo.findOne({
        phone: body.phone
    }).then(result => {
        // console.log(result)
        if (result.password == body.oldpwd) {
            // console.log(body.newpwd)
            Maizuo.updateOne({
                phone: body.phone
            }, {
                $set: {
                    password: body.newpwd
                }
            }).then(result => {
                res.json({
                    code: 200,
                    msg: '修改成功',
                    result: 1,
                })
            })
        } else {
            res.json({
                code: 200,
                msg: '原密码错误',
                result: 0,
            })
        }
    })
})

// 修改昵称
router.post('/setname', (req, res) => {
    var body = req.body;
    // console.log(body)

    Maizuo.findOne({
        phone: body.phone
    }).then(result => {
        // console.log(result)
        Maizuo.updateOne({
            phone: body.phone
        }, {
            $set: {
                username: body.username
            }
        }).then(resule => {
            // console.log(body.username)
            req.session.username = body.username
            res.json({
                code: 200,
                msg: '修改成功',
                username: req.session.username
            })
        })
    })
})


// 修改性别
router.get('/gender', (req, res) => {
    // console.log(req.query)
    var type = !!(req.query.gender * 1);
    // console.log(type)
    // console.log(req.query.phone);
    Maizuo.updateOne({
        phone: req.query.phone * 1
    }, {
        $set: {
            gender: type ? "男" : "女"
        }
    }).then(resule => {
        res.json({
            code: 200,
            msg: '修改成功',
            gender: type ? "男" : "女"
        })
    })
})


// 上传头像
var multer = require("multer");
var storage = multer.diskStorage({                  // 通过插件 操作硬盘
    destination: function (req, file, cb) {
        cb(null, "./public/avatar")           // 头像 存储 路径
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)    // 头像的文件名
    }
})

// 创建一个上传对象
var upload = multer({ storage: storage }).any();

// 修改头像
router.post("/upload", upload, (req, res) => {
    // console.log(1111111111)
    // console.log(req.files);
    var path = req.files[0].path
    Maizuo.updateOne({
        phone: req.session.phone
    }, {
        $set: {
            pic: path
        }
    }).then(result => {
        res.json({
            msg: '头像上传OK...',
            pic: path,
            result
        })
    })
})


// 获取头像
router.post("/getavatar", (req, res) => {
    var body = req.body;
    // console.log(body)

    Maizuo.findOne({
        phone: req.session.phone
    }).then(result => {
        // console.log(result)
        if (result) {
            res.json({
                code: 200,
                msg: "获取头像成功",
                result,
                flag: 1
            })
        } else {
            res.json({
                code: 200,
                msg: "获取头像失败",
                flag: 0
            })
        }
    })

})


// 修改生日
router.post("/setage", (req, res) => {
    var body = req.body;
    // console.log(body)
    Maizuo.findOne({
        phone: body.params.phone
    }).then(result => {
        // console.log(result);
        Maizuo.updateOne({
            phone: body.params.phone
        }, {
            $set: {
                age: body.params.value
            }
        }).then(resule => {
            // console.log(resule)
            // console.log(result.age)
            res.json({
                code: 200,
                msg: '修改成功',
                age: result.age
            })
        })
    })
})

module.exports = router;


