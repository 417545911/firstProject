<?php
//  配置 cors 跨域
header("Access-Control-Allow-Origin:*");
header("Access-Control-Request-Methods:GET, POST, PUT, DELETE, OPTIONS");
header('Access-Control-Allow-Headers:x-requested-with,content-type,test-token,test-sessid');
  // 接受数据
  $name = $_POST['name'];
  $pwd = $_POST['pwd'];
  // $name = 'admin';
  // $pwd = '123456';
  

  // 连接数据库
  $link = mysqli_connect('localhost','root','root','2111');

  $sql = " SELECT * FROM `bbs_users` WHERE `username` = '$name' ";

  // echo $sql;
  // die;
  $res = mysqli_query($link,$sql);

  $row = mysqli_fetch_assoc($res);

  
  // print_r($row);echo '<br>';
  if(!$row){
    // 用户名不存在
    $arr = ['code'=>0,'msg'=>'用户名不存在'];
  }else{
    // 判断密码
    if($row['password'] == md5($pwd)){
      // 登录成功
      // 判断是否勾选记住面
      if($_POST['rember']){
        // 勾选了记住密码，设置用户信息的cookie，有效时间为7天
        // setcookie第四个参数是设置有效路径的
        setcookie('name',`$name`,time()+7*24*3600,'/2111/1000BBS1.com/html/');
      }else{
        setcookie('name',`$name`);
      }
      $arr = ['code'=>1,'msg'=>'登录成功'];
    }else{
      // 密码错误
      $arr = ['code'=>0,'msg'=>'密码错误'];
    }
  }

  echo json_encode($arr);
  // echo json_encode($row);
  // echo json_encode($name)



?>