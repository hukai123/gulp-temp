// import bd from "./bdtongji.js"

window.onload=function(){
	// bd();
	// var p = document.createElement('p');
	// var span = document.createElement('span');
	// p.innerHTML = "你好--";
	// span.innerText = "hello";
	// p.appendChild(span);
	// var app = document.getElementById('app');
	// app.appendChild(p);
	
}

window._hmt = window._hmt || [];

(function () {
	if (document.querySelector('#baidutongji')) {
		return false;
	}
	var hm = document.createElement("script");
	var loc = '';
	if (typeof window != "undefined") {
		loc = window.location.hostname || window.location.protocol
	}
	if (loc.indexOf("iclubh5.gtmc.com.cn") > -1) {
		hm.src = "https://hm.baidu.com/hm.js?3933bb9b0f2d9d67cc146703ea186019"; //正式
	} else {
		hm.src = "https://hm.baidu.com/hm.js?ca4bc663821e7264ea9dfc7d1715f3ca"; //测试
	}
	hm.id = 'baidutongji';
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(hm, s);
})();
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	
	if (r != null) return unescape(r[2]);
	return null; //返回参数值

}