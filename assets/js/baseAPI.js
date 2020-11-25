// 开发环境服务器地址
var baseURL="http://ajax.frontend.itheima.net"
// 拦截ajax的请求，处理参数，拼接对应的地址
$.ajaxPrefilter(function(params){
    params.url=baseURL+params.url
})