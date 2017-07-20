// 处理删除电影数据的逻辑

$(function() {
    $('.del').click(function(e) {
        // 先拿到当前按钮
        var target = $(e.target);
        // 拿到当前按钮赋值id
        var id = target.data('id');
        // 拿到表格中的这一行，因为删除数据后希望一整行也删除，这样从展现看数据是没了
        var tr = $('.item-id-' + id);

        $.ajax({
                type: 'DELETE',
                url: '/admin/movie_list?id=' + id
            })
            // 删除后希望服务器返回状态
            .done(function(results) {
                // esults 为1说明删除成功
                if (results.success === 1) {
                    // 如果当前这行确实有
                    if (tr.length > 0) {
                        tr.remove();
                    }
                }
            });
    });
});
