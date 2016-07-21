(function(){
	var stuImg=document.querySelector('#stuImg');
	var compImg=document.querySelector('#compImg');
	stuImg.onmouseover=function(){
		stuImg.src="images/1-over.png";
	}
	stuImg.onmouseout=function(){
		stuImg.src="images/1.png";
	}
	compImg.onmouseover=function(){
		compImg.src="images/2-over.png";
	}
	compImg.onmouseout=function(){
		compImg.src="images/2.png";
	}
})();