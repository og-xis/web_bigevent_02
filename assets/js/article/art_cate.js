$(function () {
    // 文章类别列表
    initArtCateList()

    function initArtCateList() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {

                var str = template('tpl-artcate', res)
                $('tbody').html(str)

            }
        })

    }
    // 显示添加分类列表
    var layer = layui.layer
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: '1',
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-add').html()
        });
    })
    var indexAdd = null
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 添加成功后重新渲染页面
                initArtCateList()
                layer.msg('添加成功')
                // 关闭弹出层 layer.close
                layer.close(indexAdd)
            }
        })
    })



    var indexEdit = null
    form = layui.form
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: '1',
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-edit').html()
        });
        var Id = $(this).attr('data-id')
        $.ajax({
            url: '/my/article/cates/' + Id,
            success: function (res) {
                form.val('form-deit', res.data)
            }
        })
    })
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 添加成功后重新渲染页面
                initArtCateList()
                layer.msg('更新成功')
                // 关闭弹出层 layer.close
                layer.close(indexEdit)
            }
        })
    })


    $('tbody').on('click', '.btn-delete', function () {

        var Id = $(this).attr('data-id')

        layer.confirm('确认是否删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                url: '/my/article/deletecate/' + Id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    initArtCateList()
                    layer.msg('删除成功')
                    layer.close(index);
                }
            })
        });
    })



})