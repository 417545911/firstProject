// 封装ajax请求函数
// obj { url,method,data,dataType,fn}
function ajax(obj){
  // 判断是否有传递url
  if(!obj.url){
    throw Error('请求地址不能为空');
  }
  // 准备一个默认的参数对象
  let info = {
    method:'get',
    data:{},
    dataType:'string',
    fn:function(){}
  }
  // 将传入的对象参数替换掉默认参数对象中的值
  for (const attr in obj) {
    info[attr] = obj[attr];
  }
  // 拼接参数 
  //  拼接为键值对的字符串
  let strVal = ''
  for (const key in info.data) {
    strVal += `${key}=${info.data[key]}&`;
  }
  // console.log(strVal); // name=leon&age=18&
  strVal = strVal.slice(0,-1);// 截取字符串中除了最后一个支字符

  // 1. 创建ajax对象
  const xhr = new XMLHttpRequest();
  // 判断是否是get请求
  // 2. 配置请求方式和地址
  // 3. 发送请求
  if(info.method.toUpperCase() === 'GET'){
    xhr.open('get',`${info.url}?${strVal}`);
    xhr.send();
  }else{
    xhr.open('post',info.url);
    // post请求配置请求头
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send(strVal)
  }
  // 接受响应
  xhr.onreadystatechange = function(){
    // 当http状态码为200 ajax状态码4
    if(xhr.status == 200 && xhr.readyState == 4){
      // 判断是否需要JSON转换
      if(info.dataType == 'json'){
        var res = JSON.parse(xhr.responseText);
      }else{
        var res = xhr.responseText;
      }
      // 接受到参数后的回调函数
      info.fn(res);
    }
  }
}

// 封装一个promise的ajax请求
function pAjax(obj){
  return new Promise((resolve)=>{
    window.resolve = resolve;
    ajax({
      url: obj.url,
      method: obj.method || 'get',
      data: obj.data || {},
      dataType: obj.dataType || 'string',
      fn: obj.fn || function(res){
        resolve(res);
      }
    })
  })
}