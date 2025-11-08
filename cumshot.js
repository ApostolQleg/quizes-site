const canvas = document.createElement("canvas");
canvas.className = "fx";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class CumParticle {
	constructor(x, y) {
		this.x = Math.random() * 10 - 5 + x;
		this.y = Math.random() * 10 - 5 + y;

		this.direction = 0.1 * Math.PI * Math.random() + Math.PI + 0.4;
		this.radius = 3;
		this.opacity = 1.0;
		this.velocity = Math.random() * 20;
	}

	physicsProcess() {
		this.velocity /= 1.01;
		this.radius += this.velocity / 20;
		this.x += Math.cos(this.direction) * this.velocity;
		this.y += Math.sin(this.direction) * this.velocity;

		if (this.velocity < 0.09) {
			this.opacity /= 1.5;
			if (this.opacity < 0.05) {
				particles = particles.filter((e) => e != this);
			}
		}
	}

	render() {
		ctx.beginPath();
		ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
	}
}

let particles = [];

function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	particles.forEach((p) => p.render());
	requestAnimationFrame(render);
}

render();

setInterval(() => {
	particles.forEach((p) => p.physicsProcess());
}, 1000 / 24);

document.body.addEventListener("click", (e) => {
	for (let i = 0; i <= 1000; i++) particles.push(new CumParticle(e.clientX, e.clientY));
});
