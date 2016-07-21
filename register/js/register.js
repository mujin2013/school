/*-------------------------------用户注册信息的验证-----------------------------------*/
(function(){
	// 封装document.querySelectorAll()
	function $Selector(select){
		return document.querySelectorAll(select);
	}

	//取得相关的表单元素
	var FormDom={
		userEmail:$Selector('#userRegi')[0],//用户输入的邮箱
		userName:$Selector('#userName')[0],//用户的昵称
		pwd:$Selector('#pwd')[0],//用户第一次输入的密码
		rePwd:$Selector('#rePwd')[0],//用户再次输入的密码
		veri:$Selector('#veri')[0],//用户输入的验证码
		tel:$Selector('#tel')[0],//用户手机号
		getVeri:$Selector('#veriCode')[0],//短信验证
		isAgree:$Selector('#is-agree')[0]//是否同意条款
	};

	//取得给用户提示的元素
	var HintDom={
		email_hint:$Selector('#email_hint')[0],//输入邮箱的提示
		username_hint:$Selector('#username_hint')[0],//用户昵称提示
		pwd_hint:$Selector('#pwd_hint')[0],//用户第一次输入密码提示
		repwd_hint:$Selector('#repwd_hint')[0],//用户再次输入密码提示
		veri_hint:$Selector('#veri_hint')[0],//用户输入验证码提示
		tel_hint:$Selector('#tel_hint')[0],//用户输入手机号提示
		telveri_hint:$Selector('#telveri_hint')[0]//短信验证码提示
	};
	
	var getVeriTxt=$Selector('#getVeri')[0];//获得“发送短信验证码”那个元素
	//创建register对象，用以完成表单验证
	var register={};
	register.clickNum=0;//保存用户点击同意协议的次数
	register.isShowing=false;//当前是否正在执行显示“协议”动画
	register.isHiding=false;//当前是否正在执行隐藏"协议"动画
	register.data={};//保存用户输入的数据
	register.reg=[/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,/^[\u4E00-\u9FA5\uF900-\uFA2D]{4,6}$/,/(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{6,16}$/,/^(13|15|17|18)[0-9]{9}$/];//保存用于进行表单验证的正则表达式
	register.verTure=[true,true];//用于发送验证码时使用
	register.isTrue=[false,false,false,false,false,false,false,true];//用于提交表单数据时使用

	//为register对象添加相关方法，用于完成表单验证
	//验证邮箱
	register.regEmail=function(){
		var inputEmail=FormDom.userEmail.value;//获得用户输入的邮箱值
		if(inputEmail){
			//当邮箱不为空时,先验证是否是合法的邮箱，然后验证是否已被注册过
			if(register.reg[0].test(inputEmail)){
				//当邮箱合法时,先发送到后台，看是否已被注册过
				var xhr=new getXHR();//创建ajax核心对象
				xhr.open('POST','php/veriEmail.php');//创建请求
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");//因为请求方法是post，故需要设置请求头
				xhr.send("userRegi="+inputEmail);//发送请求
				xhr.onreadystatechange=function(){
					if(xhr.readyState=='4'&&xhr.status=='200'){
						//当响应完毕且请求成功时
						var getDataObj=xhr.responseText;//获得服务器端响应的数据
						if(getDataObj.trim()=='true'){  //trim()主要是为了去除首尾的空格
							HintDom.email_hint.innerHTML='该邮箱已被注册过';
			   			    HintDom.email_hint.className='hint redTxt';
			   			    register.isTrue[0]=false;
						}else{
							HintDom.email_hint.innerHTML='恭喜！可以注册';
			   			    HintDom.email_hint.className='hint greenTxt';
			   			    register.data.userEmail=inputEmail;//将用户输入的邮箱保存
			   			    register.isTrue[0]=true;
						}
					}
				};
			}else{
				//当邮箱不合法时
				HintDom.email_hint.innerHTML='输入的邮箱格式不对';
			    HintDom.email_hint.className='hint redTxt';
			    register.isTrue[0]=false;
			}
		}else{
			//当邮箱为空
			HintDom.email_hint.innerHTML='邮箱不能为空';
			HintDom.email_hint.className='hint redTxt';
			register.isTrue[0]=false;
		}
	};
	

	//验证昵称
	register.regName=function(){
		var inputName=FormDom.userName.value;//获得用户输入的昵称
		if(inputName){
			//当昵称不为空时,判断格式是否正确
			if(register.reg[1].test(inputName)){
				HintDom.username_hint.innerHTML='恭喜！格式正确';
				HintDom.username_hint.className='hint greenTxt';
				register.data.userName=inputName;//将用户输入的邮箱保存
			   	register.isTrue[1]=true;
			}else{
				HintDom.username_hint.innerHTML='格式不正确，应为4-6汉字';
				HintDom.username_hint.className='hint redTxt';
				register.isTrue[1]=false;
			}
		}else{
			//当昵称为空时
			HintDom.username_hint.innerHTML='昵称不能为空';
			HintDom.username_hint.className='hint redTxt';
			register.isTrue[1]=false;
		}	
	};

	//验证首次密码
	register.regPwd=function(){
		var inputPwd=FormDom.pwd.value;//获得用户首次输入的密码
		if(inputPwd){
			//当首次输入密码不为空时，进行格式验证
			if(register.reg[2].test(inputPwd)){
				HintDom.pwd_hint.innerHTML='恭喜！格式正确';
				HintDom.pwd_hint.className='hint greenTxt';
				register.data.pwd=inputPwd;//将用户输入的密码保存
			   	register.isTrue[2]=true;
			}else{
				HintDom.pwd_hint.innerHTML='密码格式不正确,应为6-16位数字、字母的组合';
				HintDom.pwd_hint.className='hint redTxt';
				register.isTrue[2]=false;
			}
		}else{
			//当首次输入密码为空时
			HintDom.pwd_hint.innerHTML='密码不能为空';
			HintDom.pwd_hint.className='hint redTxt';
			register.isTrue[2]=false;
		}
	};

	//验证再次输入密码
	register.regRePwd=function(){
		var inputRePwd=FormDom.rePwd.value;//获得用户再次输入的密码
		if(inputRePwd){
			//当再次输入的密码不为空时,判断是否和第一次输入的密码相同
			if(inputRePwd==register.data.pwd){
				//当两次密码相同时
				HintDom.repwd_hint.innerHTML='恭喜！两次密码输入一致';
				HintDom.repwd_hint.className='hint greenTxt';
				register.data.rePwd=inputRePwd;//将用户输入的密码保存
			   	register.isTrue[3]=true;
			}else{
				//当两次密码不同时
				HintDom.repwd_hint.innerHTML='两次密码输入不一致';
				HintDom.repwd_hint.className='hint redTxt';
				register.isTrue[3]=false;
			}
		}else{
			//当再次输入的密码为空时
			HintDom.repwd_hint.innerHTML='密码不能为空';
			HintDom.repwd_hint.className='hint redTxt';
			register.isTrue[3]=false;
		}
	};

	//验证验证码
	register.regVeri=function(){
		var inputVeri=FormDom.veri.value;//获得用户输入的验证码
		var veriCode='hyyx';//模拟验证码
		if(inputVeri){
			//当验证码不为空时
			inputVeri=inputVeri.toLowerCase();//将用户输入的字母全部转为小写，可以实现验证码验证时不区分大小写
			if(inputVeri==veriCode){
				//当验证码输入正确时
				HintDom.veri_hint.innerHTML='恭喜！验证码输入正确';
				HintDom.veri_hint.className='hint veri-hint greenTxt';
				register.data.veri=inputVeri;//将用户输入的验证码保存
			   	register.isTrue[4]=true;
			}else{
				//当验证码输入错误时
				HintDom.veri_hint.innerHTML='验证码输入错误';
				HintDom.veri_hint.className='hint veri-hint redTxt';
				register.isTrue[4]=false;
			}
		}else{
			//当验证码为空时
			HintDom.veri_hint.innerHTML='验证码不能为空';
			HintDom.veri_hint.className='hint veri-hint redTxt';
			register.isTrue[4]=false;
		}
	};

	//验证手机号
	register.regTel=function(){
		var inputTel=FormDom.tel.value;//获得用户输入的手机号
		if(inputTel){
			//当手机号不为空时,判断格式是否正确
			if(register.reg[3].test(inputTel)){
				HintDom.tel_hint.innerHTML='恭喜！格式正确';
				HintDom.tel_hint.className='hint greenTxt';
				register.data.tel=inputTel;//将用户输入的手机号保存
			   	register.isTrue[5]=true;
			}else{
				HintDom.tel_hint.innerHTML='格式不正确';
				HintDom.tel_hint.className='hint redTxt';
				register.isTrue[5]=false;
			}
		}else{
			//当手机号为空时
			HintDom.tel_hint.innerHTML='手机号不能为空';
			HintDom.tel_hint.className='hint redTxt';
			register.isTrue[5]=false;
		}	
	};

	//向平台发送短信验证码
	register.getMessage=function(){
		//todo向平台发送验证码请求
		register.data.message="1234";//模拟平台发送的验证码
	}

	//发送验证码(此处为了避免用户多次重复触发获得验证码事件，故用了两个标志即：regist.verTrue[0]和regist.verTrue[1])
	register.message=function(){
		var index=0;
		if(register.verTure[0]){
			//register.verTure[0]为真时发送短信验证请求
			register.getMessage();//向平台发送短信验证
			register.verTure[0]=false;
		}
		if(register.verTure[1]){
			//register.verTure[1]为真时，开始倒计时显示还剩多长时间可以重新发送
			register.verTure[1]=false;
			var timer=setInterval(function(){
				var curTime=59-index;
				getVeriTxt.innerHTML=curTime+'秒后重新发送';
				index++;
				if(index>59){
					clearInterval(timer);
					timer=null;
					register.verTure[1]=true;
					register.verTure[0]=true;
					getVeriTxt.innerHTML="获取短信验证码";
				}
			},1000);
		}
	};

	//验证短信验证码
	register.regGetVeri=function(){
		var inputGetVeri=FormDom.getVeri.value;//获得用户输入的短信验证码
		var veriCode=register.data.message;
		if(inputGetVeri){
			//当短信验证码不为空时
			if(inputGetVeri==veriCode){
				//当短信验证码输入正确时
				HintDom.telveri_hint.innerHTML='恭喜！短信验证码输入正确';
				HintDom.telveri_hint.className='hint  greenTxt';
				register.data.getVeri=inputGetVeri;//将用户输入的短信验证码保存
			   	register.isTrue[6]=true;
			}else{
				//当短信验证码输入错误时
				HintDom.telveri_hint.innerHTML='短信验证码输入错误';
				HintDom.telveri_hint.className='hint  redTxt';
				register.isTrue[6]=false;
			}
		}else{
			//当短信验证码为空时
			HintDom.telveri_hint.innerHTML='短信验证码不能为空';
			HintDom.telveri_hint.className='hint redTxt';
			register.isTrue[6]=false;
		}
	};

	//为是否同意协议绑定事件
	register.agree=function(){
		register.clickNum++;
		if(register.clickNum%2==0){
			//不同意协议
			register.isTrue[7]=true;
		}else{
			//同意协议
			register.isTrue[7]=false;
		}
	};

	//显示或隐藏协议
	//val:透明度的初值
	//step:透明度每次的变化量
	//isHide:是否执行隐藏操作
	//register.isAnimated:防止用户多次点击
	function toggle(val,step,isHide){
    	var timer1=setInterval(function(){
    		val+=step;
    		if(isHide){
    			//当执行隐藏操作时
    			$Selector('#service-txt')[0].style.opacity=val;
    			if(val<=0){
    				clearInterval(timer1);
    				timer1=null;
    			}
    		}else{
    			//当执行显示操作时
    			$Selector('#service-txt')[0].style.opacity=val;
    			if(val>=1){
    				clearInterval(timer1);
    				timer1=null;
    			}
    		}
    	},100);
	}
	
	//为相关表单元素绑定事件
	FormDom.userEmail.onblur=register.regEmail;//为邮箱绑定事件
	FormDom.userName.onblur=register.regName;//为昵称绑定事件
	FormDom.pwd.onblur=register.regPwd;//为首次输入密码绑定事件
	FormDom.rePwd.onblur=register.regRePwd;//为再次输入密码绑定事件
	FormDom.veri.onblur=register.regVeri;//为验证码绑定事件
	FormDom.tel.onblur=register.regTel;//为验证手机号绑定事件
	FormDom.getVeri.onblur=register.regGetVeri;//为短信验证绑定事件

	getVeriTxt.onclick=register.message;//为“发送验证码绑定事件”
	FormDom.isAgree.onclick=register.agree;//为“是否同意协议绑定事件”

	FormDom.userEmail.onfocus=function(){
		HintDom.email_hint.innerHTML='请输入邮箱';
	}
	FormDom.userName.onfocus=function(){
		HintDom.username_hint.innerHTML='由4-6个汉字组成';
	}
	FormDom.pwd.onfocus=function(){
		HintDom.pwd_hint.innerHTML='6-16位数字、字母的组合';
	}
	FormDom.rePwd.onfocus=function(){
		HintDom.repwd_hint.innerHTML='请再次输入密码';
	}
	FormDom.veri.onfocus=function(){
		HintDom.veri_hint.innerHTML='请输入右边验证码';
	}
	FormDom.tel.onfocus=function(){
		HintDom.tel_hint.innerHTML='请输入手机号';
	}
	FormDom.getVeri.onfocus=function(){
		HintDom.telveri_hint.innerHTML='请输入手机验证码';
    }

    $Selector('#regist-txt')[0].onclick=function(){
    	//todo向服务器端发送数据
    }

    //显示协议
    $Selector('#showProtocol')[0].onclick=function(){
    	if(register.isShowing){
    		return;
    	}
    	register.isShowing=true;
    	toggle(0,0.07,false);
    	register.hiding=false;
    };
    //隐藏协议
    $Selector('#close')[0].onclick=function(){
    	if(register.hiding){
    		return;
    	}
    	register.hiding=true;
    	toggle(1,-0.07,true);
    	register.isShowing=false;
    };
})();
