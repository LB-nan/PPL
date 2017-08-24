window.onload = function(){
	var oC = document.getElementById("c1");
	var oGC = oC.getContext("2d");
	var btn1= document.getElementById("btn1");
	var i = 0;
	var oImg = new Image();
	oImg.src = 'person.png';
	oImg.onload = function(){
		setInterval(function(){
			//画外圆
			oGC.clearRect(0,0,oC.width,oC.height);
			oGC.beginPath();
			oGC.arc(300,200,200,-90*Math.PI/180,180*Math.PI/180,false);
			oGC.stroke();
			//画中圆
			oGC.beginPath();
			oGC.arc(250,200,150,180*Math.PI/180,360*Math.PI/180,false);
			oGC.stroke();
			//画小圆
			oGC.beginPath();
			oGC.arc(400,200,20,0*Math.PI/180,360*Math.PI/180,false);
			oGC.stroke();
			for (var i = 0; i < ball.length; i++) {
				oGC.beginPath();
				oGC.moveTo(ball[i].x,ball[i].y);
				oGC.arc(ball[i].x,ball[i].y,20,0*Math.PI/180,360*Math.PI/180,false);
				oGC.fill();
			}
			//下面是一个独立的区块，不会被影响
			oGC.save();
			oGC.translate(290,240);
			oGC.rotate(iRotate);
			oGC.translate(-40,-40);
			oGC.drawImage(oImg,0,0);
			oGC.restore();
			
			for (var i = 0; i < bullet.length; i++) {
				oGC.save();
				oGC.fillStyle = 'red';
				oGC.beginPath();
				oGC.moveTo(bullet[i].x,bullet[i].y);
				oGC.arc(bullet[i].x,bullet[i].y,20,0*Math.PI/180,360*Math.PI/180,false);
				oGC.fill();
				oGC.restore();
			}
		},1000/60);
		//动态的改变每个圆的坐标
		setInterval(function(){
			for (var i = 0; i < ball.length; i++) {
				ball[i].num++;
				if(ball[i].num == 270){
					ball[i].r =150;
					ball[i].startX = 250;
					ball[i].startY = 50;
				}
				if(ball[i].num == 270 +180){
					alert("游戏结束");
					history.go(-0);
				}
				ball[i].x = Math.sin(ball[i].num*Math.PI/180) * ball[i].r + ball[i].startX;
				ball[i].y = ball[i].r - Math.cos(ball[i].num*Math.PI/180) * ball[i].r + ball[i].startY;
			}
			for (var i = 0; i < bullet.length; i++) {
				 bullet[i].x = bullet[i].x + bullet[i].sX;
				 bullet[i].y = bullet[i].y + bullet[i].sY;
			}
			
			for (var i = 0; i < bullet.length; i++) {
				for (var j = 0; j < ball.length; j++) {
					if( pz( bullet[i].x , bullet[i].y , ball[j].x , ball[j].y)){
						bullet.splice(i,1);
						ball.splice(j,1);
						break;
					}
				}
			}
		},30)
		var ball = [];
			//动态添加圆球，每半秒添加一个圆
			btn1.onclick = function(){
				setInterval(function(){
					ball.push(
						{
							x : 300,
							y : 0,
							r : 200,
							num : 0,
							startX : 300,
							startY : 0
						}
					);
				},500);
			}
			
		var iRotate = 0;
		oC.onmousemove = function(ev){
			var ev = ev || window.event;
			var x = ev.clientX - oC.offsetLeft;
			var y = ev.clientY - oC.offsetTop;
			var a = x - 300;
			var b = y - 200;
			var c = Math.sqrt(a*a + b*b);
			if(a > 0 && b > 0){
				iRotate = Math.asin(b/c) + 90*Math.PI/180;
			}else if(a > 0 ){
				iRotate = Math.asin(a/c);
			}
			if(a < 0 && b > 0){
				iRotate = -(Math.asin(b/c) + 90*Math.PI/180);
			}else if(a < 0 ){
				iRotate = Math.asin(a/c);
			}
		};
		
		var bullet = [];
		oC.onmousedown = function(){
			var ev = ev || window.event;
			var x = ev.clientX - oC.offsetLeft;
			var y = ev.clientY - oC.offsetTop;
			var a = x - 300;
			var b = y - 200;
			var c = Math.sqrt(a*a + b*b);
			var speed = 5;
			var sX = speed * a/c;
			var sY = speed * b/c;
			bullet.push({
				x : 290,
				y : 240,
				sX : sX,
				sY : sY
			})
		};
	};
	function pz(x1,y1,x2,y2){
		var a = x1 -x2;
		var b = y1 -y2;
		var c = Math.sqrt(a*a + b*b);
		if( c < 40){
			return true;
		}else{
			return false;
		}
	}
};
