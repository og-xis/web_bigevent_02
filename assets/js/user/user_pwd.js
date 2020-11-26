$(function(){
    // 自定义验证
    var form=layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        samePwd:function(value){
            if(value==$('[name=oldPwd]').val()){
                return '原密码和新密码不能一致'
            }
        },
        rePwd:function(value){
            if(value!==$('[name=newPwd]').val()){
                return '俩次输入密码不一样'
            }
        }
    })
    // 表单提交
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('修改密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})