// 1. 获取用户名和密，并（格式）校验
// 获取用户名和密码的元素
let user = document.querySelector('#user');
let pwd = document.querySelector('#pwd');
// 使用开关思想，控制是否达到可以登录的要求(用户名和密码格式正确)
let flag1 = true;
let flag2 = true;
// 正则校验用户和密码
let reg1 = /^[a-zA-Z]\w{3,11}$/;
// 给user元素一个失去焦点事件
user.onblur = function(){
  // 判断不能为空
  if(user.value == ''){
    this.previousElementSibling.innerText = '*请输入用户名';
    this.previousElementSibling.style.display = 'inline';
    flag1 = false;
  }else{
    if(!reg1.test(user.value)){
      // 用户名错误
      this.previousElementSibling.innerText = '*用户名格式错误';
      this.previousElementSibling.style.display = 'inline';
      flag1 = false;
    }else{
      this.previousElementSibling.style.display = 'none';
      flag1 = true;
    }
  }
}
let reg2 = /^\w{6,12}$/;
pwd.onblur = function(){
  // 判断不能为空
  if(this.value == ''){
    this.previousElementSibling.innerText = '*请输入密码';
    this.previousElementSibling.style.display = 'inline';
    flag2 = false;
  }else{
    if(!reg2.test(this.value)){
      // 用户名错误
      this.previousElementSibling.innerText = '*密码格式错误';
      this.previousElementSibling.style.display = 'inline';
      flag2 = false;
    }else{
      this.previousElementSibling.style.display = 'none';
      flag2 = true;
    }
  }
}

// 获取点击的登录的按钮
let btn = document.querySelector('#btn');
// btn一个点击事件
btn.onclick = function(e){
  // 阻止默认提交
  e = e || window.event;
  e.preventDefault();
  // 用户名和密码不能为空
  if(!user.value || !pwd.value){
    alert('用户名和密码格式错误');
    return;
  }
  
  // 判断是否勾选记住密码,并拼接数据
  let rember = document.querySelector('#rember');  
  if(rember.checked){
    var data = {name:user.value,pwd:pwd.value,rember:'on'}
  }else{
    var data = {name:user.value,pwd:pwd.value};
  }

  // 用户名和密码格式都正确才能提交
  if(flag1 && flag2){
    // 2. ajax请求用户名校验，及密码校验
    // 校验用户名
    pAjax({
      url: 'http://localhost/2111/1000BBS1.com/php/login.php',
      method: 'post',
      dataType: 'json',
      data: data
    }).then(res=>{
      // console.log(res);
      // console.log(data)
      if(res.code == 1){
        alert(res.msg);
        setCookie('name',pwd.value,7*24);
        location.href = '../../pc.html';
      }else{
        alert(res.msg);
      }
    })
  }else{
    alert('用户名和密码格式错误');
    return;
  }
}

// 跳转到注册页面
btn.nextElementSibling.onclick = function(){
  location.href = './register.html';
  return false;
}

function setCookie(name,value,expires){
  // 设置有效时间
  let time = new Date(new Date().getTime() - 8*60*60*1000 + expires*1000);
  document.cookie = `${name}=${value};expires=${time}`;
}

