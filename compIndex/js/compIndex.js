(function(){
	/*--------------------------------封装document.querySelector()函数------------------------*/
	function $Selector(select){
		return document.querySelectorAll(select);
	}

	/*----------------------------------有关图片向上滚动的js--------------------------------------*/
	var imgsList=$Selector('.imgsList')[0];
	var imgsListCopy=$Selector('.imgsList_copy')[0];
	var imgsListHeight=imgsList.offsetHeight;//得到一个图片ul的高
	var imgBox=$Selector('.imgBox')[0];
	var scrollBox=$Selector('.scrollBox')[0];
	scrollBox.scrollTop=0;
	
	var timer=setInterval(upScroll,100);

	//为了实现无缝滚动，需要将imgsList里面的内容复制一份到imgsListCopy
	imgsListCopy.innerHTML=imgsList.innerHTML;

	//实现图片向上滚动的函数
	function upScroll(){
		if(scrollBox.scrollTop>imgsListHeight){
			scrollBox.scrollTop=0;
		}else{
			scrollBox.scrollTop+=2;
		}
	}

	//为滚动图盒子加onmouseover事件，使得当鼠标悬浮时，停止图片向上滚动
	imgBox.onmouseover=function(){
		if(timer){
			clearInterval(timer);
			timer=null;
		}
	};

	imgBox.onmouseout=function(){
		timer=setInterval(upScroll,100);
	};

	/*-----------------------------教育培训部分的js----------------------------------*/
	//取得相关的元素
	var thumbDom={
		iconsBox:$Selector('.iconsBox')[0],  //有关课程的那个图片盒子
		prevBtn:$Selector('.prevBtn')[0],   //有关课程的那个图片盒子的prevBtn
		nextBtn:$Selector('.nextBtn')[0],    //有关课程的那个图片盒子的nextBtn

		qqImg:$Selector('.qqImg i')[0],    //有关显示"在线客服"那个元素
		differInfo:$Selector('.part02-title li'),  //获得新闻、公告、招聘的li

		topStuBox:$Selector('.topStuMove')[0],
		topStuPrevBtn:$Selector('.prevArrow')[0],
		topStuNextBtn:$Selector('.nextArrow')[0]
	};

	//获得必要的数据
	var imgWidth01=$Selector('.iconsBox li')[0].offsetWidth;//获得图片的宽度(因为图片是等宽的，所以获得第一幅图片的宽度就好)
	var imgWidth02=$Selector('.topStuMove li')[0].offsetWidth+10;//此处加10是因为图片给了margin但是offsetWidth不能获取到元素包含margin在内的宽度(在css中给 该元素了左右margin各5px)
	//入口层
	function main(){
		EventHanlder();//调用事件绑定函数
	}

	//控制层
	function EventHanlder(){
		//实现图片左右可以展示
		thumbDom.prevBtn.onclick=function(){
			animate(imgWidth01,thumbDom.iconsBox,6,imgWidth01);
		};
		thumbDom.nextBtn.onclick=function(){
			animate(-imgWidth01,thumbDom.iconsBox,6,imgWidth01);
		};
		//实现"在线客服"那句话的显示和隐藏
		thumbDom.qqImg.onmouseover=function(){
			$Selector('.qqImg span')[0].style.visibility='visible';
		};
		thumbDom.qqImg.onmouseout=function(){
			$Selector('.qqImg span')[0].style.visibility='hidden';
		};
		//为新闻、公告、招聘添加onclick事件
		for(var i=0;i<thumbDom.differInfo.length;i++){
			thumbDom.differInfo[i].onclick=function(){
				//清除原来的高亮项
				for(var j=0;j<thumbDom.differInfo.length;j++){
					if(thumbDom.differInfo[j].className=='part02-curSelect'){
						thumbDom.differInfo[j].className='';
						break;
					}
				}
				//将当前项高亮显示
				this.className='part02-curSelect';
			}
		}

		//有关优秀学员左右展示图片
		thumbDom.topStuPrevBtn.onclick=function(){
			animate(imgWidth02,thumbDom.topStuBox,7,imgWidth02);
		};
		thumbDom.topStuNextBtn.onclick=function(){
			animate(-imgWidth02,thumbDom.topStuBox,7,imgWidth02);
		};
	}

	//动画---当点击左右键时实现图片展示
	//offset:每次要移动的偏移量
	//curObj:当前需要被移动的对象
	//n:用来保证无限移动
	//imgWidth:当前要移动图片每幅图的宽度
	function animate(offset,curObj,n,imgWidth){
		var curLeft=curObj.offsetLeft;//取得当前要移动的对象的left值
		var totalMove=curLeft+offset;

		curObj.style.left=totalMove+'px';
		if(totalMove>-imgWidth){
			curObj.style.left=-n*imgWidth+'px';
		}
		if(totalMove<-n*imgWidth){
			curObj.style.left=-imgWidth+'px';
		}
	}
	//调用主函数
	main();

})();