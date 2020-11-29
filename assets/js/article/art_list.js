$(function () {
    // 时间过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr)
        // console.log(dt);
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var h = padZero(dt.getHours())
        var f = padZero(dt.getMinutes())
        var s = padZero(dt.getSeconds())
        return y + "-" + m + "-" + d + " " + h + ":" + f + ":" + s
    }
    // 时间补零
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    var q = {
        pagenum: 1, //页码值
        pagesize: 2, //  页面显示几条
        cate_id: '', //  文章分类的id
        state: '' //文章的状态
    }
    initTable()

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                // console.log(res);
                var str = template('tpl-table', res)
                $('tbody').html(str)
                renderPage(res.total)
            }
        })
    }
    var form=layui.form
    initCate()
    function initCate(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                var str=template('tpl-cate',res)
                $('[name=cate_id]').html(str)
                form.render()
            }
        })
    }
    $('#form-search').on('submit',function(e){
        e.preventDefault()
        var state=$('[name=state]').val()
        var cate_id=$('[name=cate_id]').val()
        q.cate_id=cate_id
        q.state=state
        initTable()
    })
    laypage=layui.laypage
    function renderPage(total){  
        
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize, // 每页显示几条
            curr:q.pagenum,
            layout: ['count','limit','prev', 'page', 'next','skip'],
            limits:[2,3,5,10],
            jump: function(obj, first){
                q.pagenum=obj.curr
                q.pagesize=obj.limit
                if(!first){
                    initTable() 
                }
            }
        });
    }
    // 删除
    layer=layui.layer
    $('tbody').on('click','.btn-delete',function(){
        var Id=$(this).attr('data-id')
        layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:'GET',
                url:'/my/article/delete/'+Id,
                success:function(res){
                    console.log(res);
                    if(res.status!==0){
                        return layer.msg(res.message)
                    }
                    layer.msg('删除成功')
                    //  页面汇总删除按钮个数等于1，页码大于1
                    if($('.btn-delete').length == 1 &&  q.pagenum>1) q.pagenum--
                    //   删除成功后，重新渲染页面中的数据
                    initTable()
                }
            })
            
            layer.close(index);
          });
    })
})