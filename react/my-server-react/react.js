


var express = require("express");
var router = express.Router();

var { Banner, Code, GoodsList, ShopCart, ShopList } = require("./utils/schema")
// var { createToken } = require("./utils/token")

var msg = require("./config/msg")

router.get("/index", (req, res) => {
    res.json({
        code: 200,
        msg: '这是一个测试接口。。。'
    })
});

// 获取 卷皮 电影的banner ;
router.get("/juanbanner", (req, res) => {
    Banner.find({}, {}).then(result => {
        res.json({
            msg: "获取banner的数据成功",
            code: 200,
            result
        })
    })
})

// 验证码 配置
function getCode() {
    return Math.floor(Math.random() * 9000) + 1000;
}

router.post("/sendCode", (req, res) => {
    var mobile = req.body.mobile;
    var code = getCode();
    // console.log(code)
    if (mobile == "") {
        res.json({
            msg: '手机号不能为空,请重新输入',
            code: 200,
        })
    }

    //将验证码发送到手机号的短信中
    msg.send(mobile, code)

        // // 发送验证码
        // sendCode(code,mobile)
        .then(data => {
            if (data.code == 0) {
                // success
                // 插入数据库 
                Code.insertMany({
                    mobile,
                    code,
                    time: new Date()
                }).then(result => {
                    res.json({
                        code: 200,
                        param: code,
                        msg: "验证码发送成功",
                        type: 1
                    })
                })
            } else {
                // fail
                res.json({
                    code: 200,
                    msg: "验证码发送失败",
                    type: 0
                })
            }
        })
        .catch(err => {
            res.json({
                code: 200,
                msg: "服务器错误",
                type: 0
            })
        })
})

// 校验  验证码
router.post("/checkCode", (req, res) => {
    const { code, mobile } = req.body
    // console.log(code)

    Code.findOne({
        code
    }).then(result => {
        // console.log(result)
        if (result) {
            var time = new Date()

            if (time - result.time < 60 * 1000) {
                // var token = createToken(result.mobile)
                // console.log(result.mobile)
                res.json({
                    code: 200,
                    msg: "验证码正确",
                    type: 1,
                    // token
                    username: result.mobile
                })
            } else {
                res.json({
                    code: 200,
                    msg: "验证码已过期",
                    type: 0
                })
            }
        } else {
            res.json({
                code: 200,
                msg: "验证码不存在",
                type: 0
            })
        }
    })

})



// 获取分类 数据
router.get("/goodslist", (req, res) => {

    GoodsList.find({}).then(result => {
        // console.log(result)
        res.json({
            code: 200,
            msg: "获取分类成功",
            result
        })
    })
})

// 商品列表 1
router.get("/shoplist", (req, res) => {
    ShopList.find({}).sort({ _id: 1 }).then(result => {
        // console.log(result)
        res.json({
            code: 200,
            msg: "获取商品列表成功",
            result
        })
    })
})

// 商品列表 2
router.get("/shoplist_preice", (req, res) => {
    // console.log(req.query)

    ShopList.find({}).sort({ cprice: req.query.flag }).then(result => {
        // console.log(result)
        res.json({
            code: 200,
            msg: "获取商品列表成功",
            result
        })
    })
})

// 商品列表 3 
router.get("/shoplist_num", (req, res) => {
    ShopList.find({}).sort({ goods_id: req.query.flag }).then(result => {
        // console.log(result)
        res.json({
            code: 200,
            msg: "获取商品列表成功",
            result
        })
    })
})


// 搜索
router.get("/goods_search", (req, res) => {
    var title = req.query.keyword
    // console.log(title)
    ShopList.find({ title: new RegExp(title) }).then(result => {
        // console.log(result)
        res.json({
            code: 200,
            msg: "获取分类成功",
            result
        })
    })
})

// 搜索 2
router.get("/goods_search_preice", (req, res) => {
    var title = req.query.keyword
    // console.log(title)
    ShopList.find({ title: new RegExp(title) }).sort({ cprice: req.query.flag }).then(result => {
        // console.log(result)
        res.json({
            code: 200,
            msg: "获取分类成功",
            result
        })
    })
})

// 搜索 3
router.get("/goods_search_num", (req, res) => {
    var title = req.query.keyword
    // console.log(title)
    ShopList.find({ title: new RegExp(title) }).sort({ goods_id: req.query.flag }).then(result => {
        // console.log(result)
        res.json({
            code: 200,
            msg: "获取分类成功",
            result
        })
    })
})


// 加入购物车
router.post("/shopcart", (req, res) => {
    var body = req.body
    // console.log(body)
    // console.log(body.id)

    ShopCart.find({
        id: body.id,
        mobile: body.mobile
    }).then(result => {
        // console.log(111)
        // console.log(res)
        if (result.length > 0) {
            // console.log(222)
            // console.log(res)
            ShopCart.updateMany({
                id: body.id,
                mobile: body.mobile,
            }, {
                $inc:
                {
                    shopnum: body.shopnum
                }
            }).then(success => {
                // console.log(success)
                res.json({
                    code: 200,
                    msg: "加入购物车成功",
                    flag: 1,
                })
            })

        } else {
            ShopCart.insertMany(body).then(success => {
                // console.log(success)
                res.json({
                    code: 200,
                    msg: "加入购物车成功",
                    flag: 1,
                })
            })
        }
    })

})


// 获取购物车
router.post("/getcart", (req, res) => {
    var body = req.body

    ShopCart.find({
        mobile: body.mobile
    }).then(result => {
        // console.log(123123)
        // console.log(result)
        res.json({
            code: 200,
            msg: "获取购物车列表成功",
            result,
        })
    })

})


// 根据 商品 ID 修改 全选 反选
router.post("/chengecheck", (req, res) => {
    var body = req.body;
    // console.log(body)
    var { checked, mobile, id } = body
    var obj = { mobile }
    if (id !== "-1") {
        obj.id = id
    }
    // console.log(obj)

    ShopCart.updateMany(obj, {
        $set: {
            checked,
        }
    }).then(result => {
        // console.log(result)
        res.json({
            code: 200,
            msg: "获取购物车列表成功",
        })
    })

})

// 根据 商品 ID 删除 选中 商品
router.post("/delcheck", (req, res) => {
    var mobile = req.body.mobile;
    ShopCart.deleteMany({
        mobile,
        checked: true
    }).then(result => {
        res.json({
            code: 200,
            msg: "购物车删除选中成功",
        })
    })

})

module.exports = router;
