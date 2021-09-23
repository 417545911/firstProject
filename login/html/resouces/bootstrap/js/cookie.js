// 封装前端操作cookie的方法

// 1. 设置cookie的方法
function setCookie(name,value,expires){
  // 设置有效时间
  let time = new Date(new Date().getTime() - 8*60*60*1000 + expires*1000);
  document.cookie = `${name}=${value};expires=${time}`;
}

// 2. 删除cookie的方法
function delCookie(name){
  // 调用setCookie方法设置该键名的时间过期
  setCookie(name,'',-1);
}

// 3. 获取指定cookie的值
function getCookie(name){
  let strArr = document.cookie.split(';');
  // console.log(strArr);
  // ["age=17", " name=zhangsan", " like=code"]
  // 遍历strArr数组
  let strVal; // 定义变量接受cookie键名的这个字符串
  strArr.forEach(item=>{
    if(item.indexOf(name) !== -1){
      strVal = item;
    }
  })
  // 判断是否有这个cookie
  if(!strVal){
    return '';
  }
  // 将strVal通过split('=')炸开,去第二项
  // console.log(strVal.split('=')[1]);
  return strVal.split('=')[1];
}