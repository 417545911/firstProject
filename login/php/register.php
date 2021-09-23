<?php
//  配置 cors 跨域
header("Access-Control-Allow-Origin:*");
header("Access-Control-Request-Methods:GET, POST, PUT, DELETE, OPTIONS");
header('Access-Control-Allow-Headers:x-requested-with,content-type,test-token,test-sessid');
// 接受数据
$name = $_POST['name'];
$nickname = $_POST['nickname'];
$email = $_POST['email'];
$pwd = md5($_POST['pwd1']);

// 连接数据库
$link = mysqli_connect('localhost','root','root','2111');
$sql = "INSERT INTO `bbs_users`(`username`,`nickname`,`email`,`password`) VALUES('$name','$nickname','$email','$pwd')";

$res = mysqli_query($link,$sql);

if(!$res){
  echo json_encode(['code'=>0,'msg'=>'注册失败']);
}else{
  echo json_encode(['code'=>1,'msg'=>'注册成功']);
}