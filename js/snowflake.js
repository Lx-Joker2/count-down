(function(){
window.onload = function () {
	var Canvas = function (w, h) {
		this.width = w;
		this.height = h;
	};
	Canvas.prototype = {
		init: function () {
			var oC = document.createElement("canvas");
			oC.setAttribute('width', this.width);
			oC.setAttribute('height', this.height);
			oC.setAttribute('id', 'canvas');
			oC.style.backgroundColor = '#000';
			document.body.appendChild(oC);
		}
	};
	var curWinWidth = window.innerWidth,
		curWinHeight = window.innerHeight;
	var oCanvas = new Canvas(curWinWidth, curWinHeight);
	oCanvas.init();

	var oC = document.querySelector('#canvas');
	var width = oC.width, height = oC.height, oGc = oC.getContext('2d');

	function random(min, max) {
		return Math.random() * (max - min) + min;
	}
	var Snow = function () {

	};
	Snow.prototype = {
		init: function () {
			this.x = random(0, width);
			this.y = 0;
			this.r = random(1, 5);
			this.vy = random(3, 5);
		},
		draw: function (cxt) {
			cxt.beginPath();
			cxt.fillStyle = 'white';
			cxt.arc(this.x, this.y + this.r, this.r, 0, Math.PI * 2, false);
			cxt.fill();
			cxt.closePath();
			this.update(cxt);
		},
		update: function (cxt) {
			if (this.y < height - this.r)
			{
				this.y += this.vy;
			}
			else
			{
				this.init();
			}
		}
	};

	var snow = [];
	for (var i = 0; i < 500; i++)
	{
		setTimeout(function () {
					   var oSnow = new Snow();
					   oSnow.init();
					   snow.push(oSnow);
				   }, 10 * i);
	}

	(function move() {
		oGc.clearRect(0, 0, width, height);
		for (var i = 0; i < snow.length; i++)
		{
			snow[i].draw(oGc);
		}
		requestAnimationFrame(move);
	})();
};
})();
