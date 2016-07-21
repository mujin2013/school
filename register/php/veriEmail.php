<?php
	$receiveUserEmail=$_REQUEST['userRegi'];//获得客户端提交的数据
	$existData='2814241400@qq.com';//模拟从后台取得的数据
	if($receiveUserEmail==$existData){
		echo 'true';
	}else{
		echo 'false';
	}
?>