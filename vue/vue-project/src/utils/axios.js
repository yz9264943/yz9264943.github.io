

import axios from "axios";

// axios 基路径  不能和 代理基路径 共存  只能有一个
// axios.defaults.baseURL = "http://localhost:9090/";  // 应用的基路径 


// axios  拦截器  interceptors

// 请求 request   拦截器  请求之前 做逻辑 配置  data / headers
axios.interceptors.request.use(function (config) {

    // console.log(config)


    // 请求发送 之前 做的事情 
    return config;
}, function (error) {

    console.log("请求失败")

    // 请求发送 失败 做的事情
    return Promise.reject(error);
})

// 响应 response  拦截器  根据返回的状态码  做对应的逻辑
axios.interceptors.response.use(function (response) {

    // 获取到响应数据 做的事情
    return response;
}, function (error) {
    // 无法响应 失败
    console.log("响应失败")
    return Promise.reject(error);
})

export const http = axios;