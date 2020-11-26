$(function () {
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        // layui提供的询问框
        layer.confirm('是否确定退出?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            // 清空本地token
            localStorage.removeItem('token')
            // 跳转页面
            location.href = '/login.html'
            // 关闭询问框
            layer.close(index);
        });

    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {

                return layui.layer.msg(res.message)
            }
            // 请求成功，渲染头像
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    // 渲染名称
    // console.log(user);
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }
}