let canvas, ctx, w, h;
let circSize = window.screen.width;
let circles = [], circleRadius = circSize/80, hue = 0, gradient;
let mouse = {
	x: undefined,
	y: undefined
}

function init() {
	canvas = document.querySelector("#canvas");
	ctx = canvas.getContext("2d");

	resizeReset();
	for (let i = 0; i < h / circleRadius; i++) {
		for (let j = 0; j < w / circleRadius; j++) {
			circles.push(new Circle(i, j));
		}
	}
	animationLoop();
}

function resizeReset() {
	w = canvas.width = window.innerWidth;
	h = canvas.height = window.innerHeight;
}

function mousemove(e) {
	mouse.x = e.x;
	mouse.y = e.y;
}

function mouseout() {
	mouse.x = undefined;
	mouse.y = undefined;
}

function animationLoop() {
	ctx.clearRect(0, 0, w, h);
	ctx.globalCompositeOperation = "xor";

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, w, h);

	drawScene();
	requestAnimationFrame(animationLoop);
}

function drawScene() {
	circles.map((circle) => {
		circle.update();
		circle.draw();
	})
}

class Circle {
	constructor(i, j) {
		this.ratio = 0.7;
		this.x = circleRadius + (circleRadius * 2 * j);
		this.y = circleRadius + (circleRadius * 2 * i);
		this.radius = circleRadius * this.ratio;
		this.targetRadius = this.radius;
		this.f = 0.05;
	}
	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = "rgba(0, 0, 0, 1)";
		ctx.fill();
		ctx.closePath();
	}
	update() {
		let dx = mouse.x - this.x;
		let dy = mouse.y - this.y;
		let distance = Math.sqrt(dx * dx + dy * dy);
		if (distance < circleRadius * 5) {
			let d = distance / (circleRadius * 5);
			this.targetRadius = circleRadius * (this.ratio * d);
		} else {
			this.targetRadius = circleRadius * this.ratio;
		}

		if (this.radius != this.targetRadius) {
			this.radius += (this.targetRadius - this.radius) * this.f;
		}

		if (Math.abs(this.radius - this.targetRadius) < 0.1) {
			this.radius = this.targetRadius;
		}
	}
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);
