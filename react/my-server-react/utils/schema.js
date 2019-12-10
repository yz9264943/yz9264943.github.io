



var mongoose = require("mongoose");
var Schema = mongoose.Schema;


// react 卷皮 轮播图

var banner_schema = new Schema({
    bannerId: Number,
    imgUrl: String,
    name: String,
});

exports.Banner = mongoose.model("juan_banner", banner_schema);

// 验证码
var code_schema = new Schema({
    mobile: Number,
    code: Number,
    time: Date
});

exports.Code = mongoose.model("code", code_schema);


// 获取 商品分类
var goodslist_schema = new Schema({
    id: Number,
    name: String,
    secondCateList: Array,
});

exports.GoodsList = mongoose.model("goodslist", goodslist_schema);


// 加入购物车
var shopcart_schema = new Schema({
    id: String,                 // 商品 id
    mobile: String,             // 手机号
    shopinfo: String,           // 商品名字
    shopnum: Number,            // 数量
    newprice: String,           // 实际价格
    oldprice: String,           // 优惠价格
    purchase: String,           // 购买人数
    imgurl:String,              // 商品图片
    checked:Boolean,            // 是否选中
});

exports.ShopCart = mongoose.model("shopcart", shopcart_schema);

// 获取商品列表
var shoplist_schema = new Schema({
    goods_id: String,                 // 商品 id
    cprice: Number,           // 实际价格
    oprice: Number,           // 优惠价格
    title: String,             // 商品名字
    residue: String,           // 上新
    pic_url:String,              // 商品图片
});

exports.ShopList = mongoose.model("shoplist", shoplist_schema);
