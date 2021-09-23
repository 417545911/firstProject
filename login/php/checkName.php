<?php
//  配置 cors 跨域
header("Access-Control-Allow-Origin:*");
header("Access-Control-Request-Methods:GET, POST, PUT, DELETE, OPTIONS");
header('Access-Control-Allow-Headers:x-requested-with,content-type,test-token,test-sessid');
// 接受数据
$name = $_POST['name'];

// 连接数据库
$link = mysqli_connect('localhost','root','root','2111');

$sql = " SELECT * FROM `bbs_users` WHERE `username` = '$name' ";
// echo $sql;
$res = mysqli_query($link,$sql);

$row = mysqli_fetch_assoc($res);

if($row){
  // 用户名已存在
  echo json_encode(['code'=>0,'msg'=>'用户名已存在']);
}else{
  echo json_encode(['code'=>1,'msg'=>'用户名可用']);
}