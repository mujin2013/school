// 创建ajax核心对象
function getXHR(){
	var xhr;
	if(window.XMLHttpRequest){
		//其他浏览器
		xhr=new XMLHttpRequest();
	}else{
		//IE8以上
		xhr=new ActiveXObject('Micosoft XMLHttp');
	}
	return xhr;
}