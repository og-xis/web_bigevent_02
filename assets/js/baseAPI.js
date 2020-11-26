// 开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net"
// 拦截ajax的请求，处理参数，拼接对应的地址
$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url
    // 对有需要的接口配置头信息
    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }
    params.complete = function (res) {
        console.log(res.responseJSON);
        var obj = res.responseJSON
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})