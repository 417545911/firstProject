document.onkeydown = function (e) {
    // var e = window.event||arguments[0];
    e = e || window.event
    if (e.keyCode == 123) {
        //F12
        // alert('别想copy');
        // return false;
    } else if ((e.ctrlKey) && (e.shiftKey) && (e.keyCode == 73)) {
        //ctrl+shift+i
        alert('别想copy');
        return false;
    } else if ((e.ctrlKey) && (e.keyCode == 85)) {
        //ctrl+u
        alert('别想copy');
        return false;
    } else if ((e.ctrlKey) && (e.keyCode == 83)) {
        //ctrl+s
        alert('别想copy');
        return false;
    }
}

document.oncontextmenu = function () {
    //右键
    console.log(1);

    alert('别想copy');
    return false;
}


//验证码
$(function(){
	ljyVerCode();//初始化生成随机数
});


//生成随机数
function ljyVerCode(len){
    len = len || 4;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';//默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    var maxPos = $chars.length;
    var ljyCode = '';
    for (i = 0; i < len; i++) {
        ljyCode += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    $(".ljyVerCode").html(ljyCode);
}