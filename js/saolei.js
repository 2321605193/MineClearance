//点击开始游戏    动态生成一百个 小格
//左点鼠标  显示数字表示 以当前小格为中心周围8个小格的雷数    扩散 （当前周围没有雷）
//点击到雷  结束
// 右点   没有数字 没有标记进行标记。 有标记取消标记
//已出现数字，无效果。

var start = document.getElementById("btn");
var box = document.getElementById("boxs");
var flagBox = document.getElementById("flagBox");
var alertBox = document.getElementById("alertBox");
var alertImg = document.getElementById("alertImg");
var closeBtn = document.getElementById("closeBtn");
var score = document.getElementById('score');
var mineNum;
var mineOver;
var mineMap = [];
var m = 1;
binEvent();

function binEvent() {
	start.onclick = function() {
		box.style.display = "block";
		flagBox.style.display = "block";
		init();
	}
	box.oncontextmenu = function() { //消除浏览器在box部分的功能
		return false;
	}
	box.onmousedown = function(e) {
		var event = e.target; //获取当前点的 小格
		if(e.which == 1) { // 左键
			leftClick(event);
		} else if(e.which == 3) { //右键
			rightClick(event);
		}
	}
	closeBtn.onclick = function() {
		alertBox.style.display = "none";
		box.style.display = "none";
		flagBox.style.display = "none";
		box.innerHTML = '';
		m++;
	}
}

//生成一百个小格和随机生成10个雷
function init() {

	mineOver = 10;
	mineNum = 10;
	score.innerHTML=mineOver;
	while(m) {
		for(var i = 0; i < 10; i++) {
			for(var j = 0; j < 10; j++) {
				var con = document.createElement('div');
				con.classList.add('block');
				con.setAttribute("id", i + "-" + j);
				box.appendChild(con);
				mineMap.push({
					mine: 0
				});
			}
		}
		block = document.getElementsByClassName('block');
		while(mineNum) {
			var mineIndex = Math.floor(Math.random() * 100);
			if(mineMap[mineIndex].mine === 0) {
				mineMap[mineIndex].mine = 1;
				block[mineIndex].classList.add('islei');
				mineNum--;
			}
		}
		m--;
	}

}

//左键事件
function leftClick(dom) {
	if(dom.classList.contains('flag')){
		return;
	}
	var isLei = document.getElementsByClassName('islei');
	if(dom && dom.classList.contains('islei')) {
		console.log("gameOver");
		for(var i = 0; i < isLei.length; i++) {
			isLei[i].classList.add('show');
		}
		setTimeout(function() {
			alertBox.style.display = "block";
			alertImg.style.backgroundImage = "url(img/over.jpg)";
		}, 800);
	} else {
		var n = 0;
		var posArr = dom && dom.getAttribute('id').split('-');
		var posX = dom && +posArr[0];
		var posY = dom && +posArr[1];
		dom && dom.classList.add("num");
		for(var i = posX - 1; i <= posX + 1; i++) {
			for(var j = posY - 1; j <= posY + 1; j++) {
				var aroundArr = document.getElementById(i + '-' + j);
				if(aroundArr && aroundArr.classList.contains('islei')) {
					n++;
				}
			}
		}
		dom && (dom.innerHTML = n);
		if(n == 0) {
			for(var i = posX - 1; i <= posX + 1; i++) {
				for(var j = posY - 1; j <= posY + 1; j++) {
					var nearArr = document.getElementById(i + '-' + j);
					if(nearArr && nearArr.length != 0) {
						if(!nearArr.classList.contains('check')) {
							nearArr.classList.add('check');
							leftClick(nearArr);
						}
					}

				}
			}
		}
	}
	
}
function rightClick(dom){
	if(dom.classList.contains('num')){
		return;
	}
	dom.classList.toggle('flag');
	if(dom.classList.contains('islei')&&dom.classList.contains('flag')){
		mineOver--;
	}
	if(dom.classList.contains('islei')&&!dom.classList.contains('flag')){
		mineOver++;
	}
	score.innerHTML=mineOver;
	if(mineOver==0){
		alertBox.style.display = 'block';
		alertImg.style.backgroundImage = 'url(img/success.png)';
	}
}
