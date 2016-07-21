/*用jquery实现学生登录页的各种效果*/
(function(){
	/*------------------------给导航栏添加的效果--------------------------------------*/
	$('.navList li:not(.navList li:eq(8),.navList li:eq(9))').each(function(i){
		$($('.navList li')[i]).click(function(){
			$(this).parent().children().removeClass('curSelect');//清除原来被选中项的高亮状态
			$(this).parent().children().children('i').removeClass('upArrow');//清除原来被选中项的小三角
			$(this).addClass('curSelect');//给当前项加高亮状态
			$(this).children('i').addClass('upArrow');//给当前项加“小三角”
		});
	});

	/*--------------------给主轮播图添加效果，实现主伦播图的伦播---------------------*/
	// 获得与主轮播图相关的元素的相关值
	var LunboDom={
		$imgBox:$('.imgsList'),//得到"所有图片"的容器
		$imgWidth:$('.lunbo_img').width(),//得到轮播图里面一幅图的宽度
	};

	var timer;
	var index=0;//记录当前显示图片的下标

	//为"上一个图片"按钮、“下一个图片”按钮绑定事件
	 $('.prev').click(function(){   //为"上一个图片"按钮绑定事件
	 	index--;
	 	if(index<0){
	 		index=3;
	 	}
	 	imgAnimate(LunboDom.$imgWidth);
	 	shwoLight();//高亮显示当前图片对应的小圆圈
	 	
	 });
	$('.next').click(function(){   //为"下一个图片"按钮绑定事件
		index++;
	 	if(index>3){
	 		index=0;
	 	}
	 	imgAnimate(-LunboDom.$imgWidth);
	 	shwoLight();//高亮显示当前图片对应的小圆圈
	 });

	 //当鼠标悬停在"图片"盒子上时，停止图片轮播
	 $('.imgBox').mouseover(function(){
	 	clearInterval(timer);
	 });
	 //当鼠标离开在"图片"盒子上时，开始图片轮播
	  $('.imgBox').mouseout(function(){
	 	 autoPlay();
	 });

	  //为主轮播图下面的四个小圆圈绑定事件
	  $($('.circle i')).each(function(i){
	  	$($('.circle i')[i]).click(function(){
	  		var curIndex=parseInt($(this).attr('id'))+1;
	  		if(curIndex==index+1){
	  			return;
	  		}
	  		LunboDom.$imgBox.css('left',-curIndex*LunboDom.$imgWidth);
	  		index=curIndex-1;
	  		shwoLight();
	  	});
	  });

	  //高亮显示当前正在展示图片的小圆圈
	 function shwoLight(){
	 	$('.circle').children().removeClass('curShowImg');//清除原来小圆圈的高亮状态
	 	$($('.circle i')[index]).addClass('curShowImg');//高亮当前图片对应的小圆圈
	 }

	 //实现图片的自动播放
	 function autoPlay(){
	 	timer=setInterval(function(){
	 		imgAnimate(-LunboDom.$imgWidth);
	 		index++;
	 		if(index>3){
	 			index=0;
	 		}
	 		shwoLight();//高亮显示当前图片对应的小圆圈
	 	},3000);
	 }

	//实现主图片轮播的函数
	 function imgAnimate(offset){
	 	var curLeft=LunboDom.$imgBox.offset().left;//得到当前“图片”盒子的left值
	 	var newLeft=curLeft+offset;//得到新的left值
	 	//当图片到最后一张辅助图时，修改到真正的第一张图上
	 	if(newLeft<-4*LunboDom.$imgWidth){
	 		LunboDom.$imgBox.css('left',0);
	 		curLeft=LunboDom.$imgBox.offset().left;//得到当前“图片”盒子的left值
	 		newLeft=curLeft+offset;//得到新的left值
	 	}
	 	//当图片到最开始那张辅助图时，修改到真正的第四张图上
	 	if(newLeft>-LunboDom.$imgWidth){
	 		LunboDom.$imgBox.css('left',-5*LunboDom.$imgWidth);
	 		curLeft=LunboDom.$imgBox.offset().left;//得到当前“图片”盒子的left值
	 		newLeft=curLeft+offset;//得到新的left值
	 	}
	 	LunboDom.$imgBox.animate({
	 		left:newLeft+'px'
	 	},500);
	 }

	 //函数调用
	 autoPlay();//当页面一加载时自动轮播主轮播图

	 /*----------------------------给“联系客服”添加效果-------------------------------*/
	$('.qqImg i').mouseover(function(){
		$('.qqImg span').css('visibility','visible');
	});
	$('.qqImg i').mouseout(function(){
		$('.qqImg span').css('visibility','hidden');
	});


	/*----------------------给“教育培训”的课程介绍和“优秀毕业生”添加效果-----------------*/
	var CourseDom={
		$iconsBox:$('.iconsBox'),//得到"教育培训"图片盒子
		iconWidth:$('.iconsBox li:eq(0)').width() //得到每幅图片的宽度
	};

	var topStuDom={
		$topStuBox:$('.topStuMove'),
		imgWidth:$('.topStuMove li:eq(0)').outerWidth()+10
	};

	var timer1;

	//为“教育培训”的"上、下"一幅图片添加单击事件
	$('.prevBtn').click(function(){
		var $curObj=$('.iconsBox');
		console.log($curObj);
		iconsAnimate($curObj,CourseDom.iconWidth,8,CourseDom.iconWidth);

	});
	$('.nextBtn').click(function(){
		var $curObj=$('.iconsBox');
		iconsAnimate($curObj,-CourseDom.iconWidth,8,CourseDom.iconWidth);
	});

	//为“教育培训”添加鼠标悬浮事件
	$('.thumbIcon').mouseover(function(){
		clearInterval(timer1);
	});
	//为“教育培训”添加鼠标移出事件
	$('.thumbIcon').mouseout(function(){
		 iconsAutoPlay();
	});
	

	//为“优秀学员”的"上、下"一幅图片添加单击事件
	$('.prevArrow').click(function(){
		var $curObj=$('.topStuMove');
		iconsAnimate($curObj,topStuDom.imgWidth,5,topStuDom.imgWidth);

	});
	$('.nextArrow').click(function(){
		var $curObj=$('.topStuMove');
		iconsAnimate($curObj,-topStuDom.imgWidth,5,topStuDom.imgWidth);
	});

	//为“优秀学员”添加鼠标悬浮事件
	$('.topStuImgsBox').mouseover(function(){
		clearInterval(timer1);
	});
	//为“优秀学员”添加鼠标移出事件
	$('.topStuImgsBox').mouseout(function(){
		 iconsAutoPlay();
	});
	

	//实现"教育培训"和"优秀毕业生"图片的"前后"切换
	function iconsAnimate($curObj,offset,n,imgWidth){
		var curLeft=$curObj.position().left;
		var newLeft=curLeft+offset;
		if(newLeft<-n*imgWidth){
			$curObj.css('left',0);
			curLeft=$curObj.position().left;
			newLeft=curLeft+offset;
		}
		if(newLeft>-imgWidth){
			$curObj.css('left',-(n+1)*imgWidth);
			curLeft=$curObj.position().left;
			newLeft=curLeft+offset;
		}
		$curObj.animate({
			left:newLeft+'px'
		},1000);
	}

	function iconsAutoPlay(){
		timer1=setInterval(function(){
			iconsAnimate($('.iconsBox'),-CourseDom.iconWidth,8,CourseDom.iconWidth);
			iconsAnimate($('.topStuMove'),-topStuDom.imgWidth,5,topStuDom.imgWidth);
		},2000);
	}

	iconsAutoPlay();
})();