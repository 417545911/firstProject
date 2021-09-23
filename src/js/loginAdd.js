//已有账号，立即登录
$('a.font-setlogin').on('click',function(){
    $(".layui-input").val()='';
    $(this).parent().css('display','none').prev().css('display','block');
    return false;
})

//立即注册
$('a.font-setregister').on('click',function(){
    // $(".layui-input").val()='';
    $(this).parent().css('display','none').next().css('display','block')
    return false;

})