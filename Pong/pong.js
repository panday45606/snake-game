$(document).ready(function() {
	//Setting up game
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var gameOver = true;

	//Setting up constants
	const PI = Math.PI;
	const HEIGHT = canvas.height;
	const WIDTH = canvas.width;
	const upKey = 38, downKey = 40;

	//User inputs
	var keyPressed = null;

	//Setting up game objects
	var player = {
		x: null,
		y: null,
		width: 20,
		height: 100,
		update: function(){
			if(keyPressed == upKey) this.y -= 10;
			if(keyPressed == downKey) this.y += 10;
		},
		draw: function(){
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}

	var ai = {
		x: null,
		y: null,
		width: 20,
		height: 100,
		update: function(){
			let target = ball.y - (this.height - ball.size) / 2;
			this.y += (target - this.y) * 0.1;
		},
		draw: function(){
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}

	}

	var ball = {
		x: null,
		y: null,
		size: 20,
		speedx: null,
		speedy: null,
		speed: 10,
		update: function(){
			
			this.x += this.speedx;
			this.y += this.speedy;

			if(this.y + this.size >= HEIGHT || this.y <= 0){
				this.speedy *= -1;

			}

			function checkCollision(a,b){
		return (a.x < b.x + b.width && a.y < b.y + b.height && b.x < a.x + a.size && b.y < a.y + a.size);
	}

	let other;
		
		if(ball.speedx < 0){
			other = player;
		} else {
			other = ai;
		}

		let collided = checkCollision(ball, other);

		if(collided){
			let n = (this.y + this.size - other.y) / (other.height + this.size);
			let phi = 0.25 * PI * (2 * n-1)
			this.speedx = this.speed * Math.cos(phi);
			this.speedy = this.speed * Math.sin(phi);
			if(other == ai) this.speedx *= -1;
		}

		if(this.x + this.size < 0 || this.x > WIDTH){
			gameOver = true;
			$("button").fadeIn();
			if(this.x + this.size < 0) {
				$("h1"). html("You Lose!");
			} else {
				$("h1"). html("You Win!");
			}
		}
		
		},
		draw: function(){
			ctx.fillRect(this.x, this.y, this.size, this.size);
		}
	}

	//Setting up game functions

	function main(){
		init();

		var loop = function(){
			update();
			draw();
			window.requestAnimationFrame(loop, canvas);
		}
		window.requestAnimationFrame(loop, canvas);
	}
	
	function init(){

		gameOver = false;

		$("h1").html("Pong")

		player.x = 20;
		player.y = (HEIGHT - player.height)/2;

		ai.x = (WIDTH - ai.width - 20);
		ai.y = (HEIGHT - player.height)/2;

		ball.x = (WIDTH - ball.size)/2;
		ball.y = (HEIGHT - ball.size)/2;

		ball.speedx = ball.speed;

		if(Math.round(Math.random()))
			ball.speedx *= -1;
		ball.speedy = 0;
	}
	
	function update(){
		if(!gameOver)
			ball.update();
		ai.update();
		player.update();
	}
	
	function draw(){
		ctx.fillRect(0,0, WIDTH, HEIGHT); //Fill the background black

		ctx.save(); //Save current settings of drawing

		//Drawing game objects white
		ctx.fillStyle = "white";
		ball.draw();
		ai.draw();
		player.draw();

		//Drawing some white strips for styles
		let w = 4;
		let x = (WIDTH - w) / 2;
		let y = 0;
		let step = HEIGHT / 15;
		while (y < HEIGHT) {
			ctx.fillRect(x,y + step * 0.25, w, step * 0.5)
			y += step;
		}
		ctx.restore();
	}
	$(document).on("keydown", function(){
		keyPressed = null;
	});
	$(document).on("keydown", function(e){
		keyPressed = e.which;
	});

	$("button").on("click", function(){
		$(this).hide();
		init();
	})

	main();
});