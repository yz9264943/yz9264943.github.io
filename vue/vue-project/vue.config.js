

// vue 配置文件    修改必须重启

// 反向代理

// vue / cli 相关配置文件   脚手架     修改后必须重启服务器
module.exports = {
    publicPath: "",     // 设置项目的 工共路径 打包上线

    devServer: {
        host: "0.0.0.0",
        port: 8080,
        open: true,      // 自动打开浏览器
        proxy: {         // 代理    不能和 axios 的基路径共存
            "/vue": {
                target: "http://localhost:9090",
                changeOrigin: true,
            }
        }
    }
}