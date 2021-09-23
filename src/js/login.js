layui.use(['carousel', 'form'], function () {
    var carousel = layui.carousel,
        form = layui.form;

    //自定义验证规则
    form.verify({
        userName: function (value) {
            if (value.length < 5) {
                return '账号至少得5个字符';
            }
        },
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        vercodes: function (value) {
            //获取验证码
            var ljyVerCode = $(".ljyVerCode").html();
            if (value != ljyVerCode) {
                return '验证码错误（区分大小写）';
            }
        },
        content: function (value) {
            layedit.sync(editIndex);
        }
    });

    //监听提交
    form.on('submit(demo1)', function (data) {
        // layer.alert(JSON.stringify(data.field), {
        // 	title: '最终的提交信息'
        // })
        console.log(data);
        //data.field
        console.log(data.field);
        $.ajax({
            type: "POST",
            url: "http://localhost/2111/1000BBS1.com/php/login.php",
            data: `name=${data.field.userName}&pwd=${data.field.pwd}`,
            dataType: 'json',
            success: function (res) {
                console.log("Data Saved: " + res);
                if (res.code == 1) {
                    alert(res.msg);
                    setCookie('name',data.field.pwd,45);
                    
                    // location.href = './pc.html';
                } else {
                    alert(res.msg);
                }
            }
        });
        return false;
    });


    //设置轮播主体高度
    var ljy_login_height = $(window).height() / 1.3;
    var ljy_car_height = $(".ljy_login_height").css("cssText", "height:" + ljy_login_height + "px!important");


    //Login轮播主体
    carousel.render({
        elem: '#ljylogin', //指向容器选择器
        width: '100%', //设置容器宽度
        height: 'ljy_car_height',
        arrow: 'always', //始终显示箭头
        anim: 'fade', //切换动画方式
        autoplay: true, //是否自动切换false true
        arrow: 'hover', //切换箭头默认显示状态||不显示：none||悬停显示：hover||始终显示：always
        indicator: 'none', //指示器位置||外部：outside||内部：inside||不显示：none
        interval: '5000' //自动切换时间:单位：ms（毫秒）
    });

    //监听轮播--案例暂未使用
    carousel.on('change(ljylogin)', function (obj) {
        var loginCarousel = obj.index;
    });

    //粒子线条
    $(".ljy_login_cont").jParticle({
        background: "rgba(0,0,0,0)", //背景颜色
        color: "#fff", //粒子和连线的颜色
        particlesNumber: 100, //粒子数量
        //disableLinks:true,//禁止粒子间连线
        //disableMouse:true,//禁止粒子间连线(鼠标)
        particle: {
            minSize: 1, //最小粒子
            maxSize: 3, //最大粒子
            speed: 30, //粒子的动画速度
        }
    });

});

document.cookie="22jalfj=hhkahf";

//设置cookie
function setCookie(name, value) {
    // 设置有效时间
    // let time = new Date(new Date().getTime() - 8 * 60 * 60 * 1000 + expires * 1000);
    document.cookie =`${name}=${value}`;
    // document.cookie =name+"="+value+";"+expires+"="+time;

    console.log(111);
    console.log(document.cookie);
    console.log(name);

}




