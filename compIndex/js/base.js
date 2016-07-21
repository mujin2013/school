(function(){
	//封装document.querySelector()
	function $Selector(select){
		return document.querySelectorAll(select);
	}

	//取得页面相关元素
	var navList=$Selector('.navList li');
	var navList_i=$Selector('.navList i');

	//为元素绑定事件
	for(var i=0;i<navList.length-2;i++){
		navList[i].onclick=showSelect;
	}

	//显示nav当前项高亮
	function showSelect(){
		//清除原来的高亮项
		for(var i=0;i<navList.length-2;i++){
			if(navList[i].className=='curSelect'){
				navList[i].className='';
			}
			if(navList_i[i].className=='upArrow'){
				navList_i[i].className='';
			}
		}
		this.className='curSelect';
		navList_i[this.id].className='upArrow';
	}
})();