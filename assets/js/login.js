
$(function(){
    // 1、点击注册
    $('#link_reg').on('click',function(){
        $('.reg-box').show()
        $('.login-box').hide()
    })
    // 2、点击登录
    $('#link_login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })
})
// 3、自定义验证规则
var form=layui.form
form.verify({
    pwd: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ],
    repwd:function(value){
        var pwd=$('.reg-box input[name=password]').val()
        if(value!==pwd){
            return '俩次输入不一样'
        }
    }
})
// 注册功能
var layer=layui.layer
$('#form_reg').on('submit',function(e){
    // 阻止默认提交
    e.preventDefault()
    // post请求
    $.ajax({
        method:'POST',
        url:"/api/reguser",
        data:{
            // 获取用户名和密码
            username:$('.reg-box input[name=username]').val(),
            password:$('.reg-box input[name=password]').val()
        },
        success:function(res){
            // 判断状态码
            if(res.status!==0){
                return layer.msg(res.message)
            }
            // 提交成功，处理代码
            layer.msg('恭喜您，注册成功')
            // 切换登录表单，重置form表单
            $('#link_login').click()
            $('#form_reg')[0].reset()
        }
    })
})
// 登录功能
$('#form_login').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        method:'POST',
        url:'/api/login',
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0){
                return layer.msg(res.message)
            }
            // 提示信息， 保存token， 跳转页面
            layer.msg('恭喜您，登录成功')
            localStorage.setItem('token',res.token)
            location.href='/index.html'
        }
    })
})