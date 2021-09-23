// 给注册点击事件
// 在点击事件中,校验数据的格式
// 检验通过,则请求后端加入数据库
// 用户名可用的开关
let flag = true;



// 获取注册按钮
document.querySelector('#sub').onclick = function(){
  // 获取要检验数据的表单
  let name = document.querySelector('#user');
  let nickname = document.querySelector('#nickname');
  let email = document.querySelector('#email');
  let pwd1 = document.querySelector('#pwd1');
  let pwd2 = document.querySelector('#pwd2');

  // 判断用户名不能为空
  if(name.value == ''){
    name.previousElementSibling.innerText = '*请输入用户名';
    name.previousElementSibling.style.display = 'inline';
    name.previousElementSibling.style.color = 'red';
    return false;
  }
  if(!flag){
    name.previousElementSibling.style.display = 'inline';
    name.previousElementSibling.style.color = 'red';
    name.previousElementSibling.innerText = '用户名不可用';
    return false;
  }

  // 校验邮箱
  let reg2 = /^[a-zA-Z0-9]\w{4,10}@\w{2,5}\.com$/;
  // 判断不能为空
  if(email.value == ''){
    email.previousElementSibling.innerText = '*请输入邮箱';
    email.previousElementSibling.style.display = 'inline';
    return false;
  }else{
    if(!reg2.test(email.value)){
      // 用户名错误
      email.previousElementSibling.innerText = '*邮箱格式错误';
      email.previousElementSibling.style.display = 'inline';
      return false;
    }else{
      email.previousElementSibling.style.display = 'none';      
    }
  }

  // 密码校验
  let reg3 = /^\w{6,12}$/;
  // 判断不能为空
  if(pwd1.value == ''){
    pwd1.previousElementSibling.innerText = '*请输入密码';
    pwd1.previousElementSibling.style.display = 'inline';
    return false;
  }else{
    if(!reg3.test(pwd1.value)){
      // 用户名错误
      pwd1.previousElementSibling.innerText = '*密码格式错误';
      pwd1.previousElementSibling.style.display = 'inline';
      return false;
    }else{
      pwd1.previousElementSibling.style.display = 'none';      
    }
  }

  // 两次密码比对
  if(pwd1.value !== pwd2.value){
    pwd2.previousElementSibling.innerText = '*密码不一致';
    pwd2.previousElementSibling.style.display = 'inline';
    return false;
  }else{
    pwd2.previousElementSibling.style.display = 'none';
  }
  
  // ajax 请求后端，发送数据，存入数据库
  pAjax({
    url: '/php/register.php',
    data: {name:name.value,nickname:nickname.value,email:email.value,pwd1:pwd1.value},
    dataType: 'json',
    method: 'post'
  }).then(res=>{
    // console.log(res);
    // 接受到结果，判断
    if(res.code == 1){
      alert(res.msg);
      location.href = './login.html';
    }else{
      alert(res.msg);
    }
  })
  return false;
}

// 用户名校验
let name = document.querySelector('#user');
name.oninput  = function(){
  // 校验用户是否合格
  let reg1 = /^[a-zA-Z]\w{3,11}$/;
  if(!reg1.test(this.value)){
    // 用户名错误
    this.previousElementSibling.innerText = '*用户名格式错误';
    this.previousElementSibling.style.display = 'inline';
    this.previousElementSibling.style.color = 'red';
    return false;
  }else{
    this.previousElementSibling.style.display = 'none';
    // 发起ajax请求，校验用户名是否可用
    pAjax({
      url: '/php/checkName.php',
      data: {name:this.value},
      dataType: 'json',
      method: 'post'
    }).then(res=>{
      // console.log(res);
      // 接受结果并判断
      if(res.code == 1){
        this.previousElementSibling.style.display = 'inline';
        this.previousElementSibling.style.color = 'green';
        this.previousElementSibling.innerText = res.msg;
        flag = true;
      }else{
        this.previousElementSibling.style.display = 'inline';
        this.previousElementSibling.style.color = 'red';
        this.previousElementSibling.innerText = res.msg;
        flag = false;
      }
    })
  }




}

// 跳转到登录
document.querySelector('#sub').previousElementSibling.onclick = function(){
  location.href = './login.html';
  return false;
}
