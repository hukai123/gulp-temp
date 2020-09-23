window.onload=function(){
	var p = document.createElement('p');
	var span = document.createElement('span');
	p.innerHTML = "你好--";
	span.innerText = "hello";
	p.appendChild(span);
	var app = document.getElementById('app');
	app.appendChild(p);
	
}