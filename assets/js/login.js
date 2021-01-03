$(function () {
    $('#link-reg').on('click', function () {
        $('.log-box').hide();
        $('.reg-box').show();
    })
    $('#link-log').on('click', function () {
        $('.reg-box').hide();
        $('.log-box').show();
    })

    // 从layui获取formd对象
    var form = layui.form;
    var layer = layui.layer;
    //    通过 form.verify()函数自定义校验规则
    form.verify({
        // 自定义pwd规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致!'
            }
        }
    })

    // 监听注册表单
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name = username]').val(),
                password: $('#form_reg [name = password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,请登录!')
                $('#link-log').click()
            }
        })
    })
    // 监听登录表单
    $('#from_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token);
                location.href = './index.html'
            }           
        })
    })
})

