// Initialization
const cvs = document.getElementById('spaceBackground');
const ctx = cvs.getContext('2d');
const planets = document.getElementById('spacePlanets')
//cvs.style.pointerEvents = 'none';
planets.style.position = 'fixed';
planets.style.top = 0;
planets.style.left= 0;
planets.style.width = "100vw"
planets.style.height= "100vh"
cvs.style.position = 'fixed';
cvs.style.top = 0;
cvs.style.left= 0;
cvs.style.width = "100vw"
cvs.style.height= "100vh"

// Resize the canvas on window resize
function resizeCanvas() {
	cvs.width = window.innerWidth;
	cvs.height = window.innerHeight;
	startDraw();
}
resizeCanvas()
window.onresize = resizeCanvas;

// Extra functions
function getRandomColor() {
	return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

// Actual drawing stuff
function drawSpaceDust() {
	const x = Math.random() * cvs.width;
	const y = Math.random() * cvs.height;
	const r = Math.random() * 200 + 20;
	const gradient = ctx.createRadialGradient(x, y, 0, x, y, r)
	gradient.addColorStop(0, getRandomColor());
	gradient.addColorStop(1, '#0000');
	ctx.fillStyle = gradient;
	ctx.globalAlpha = Math.random() / 5
	ctx.beginPath()
	ctx.arc(x, y, r, 0, Math.PI * 2)
	ctx.fill();
}

function drawStar() {
	const x = Math.random() * cvs.width;
	const y = Math.random() * cvs.height;
	const r = 4 * Math.random() * Math.random() * Math.random();
	ctx.fillStyle = "#FFF";
	ctx.globalAlpha = 1
	ctx.beginPath()
	ctx.arc(x, y, r, 0, Math.PI * 2)
	ctx.fill();
}
function drawPlanet() {
	const x = Math.floor(Math.random() * cvs.width);
	const y = Math.floor(Math.random() * cvs.height);
	const r = 50 * (Math.random() * 2.5) * (Math.random() * 2) * (Math.random() * 1.2);
	const planet = document.createElement('img');
	planet.src = `planets/${Math.floor(Math.random() * 6)}min.png`
	planet.style.pointerEvents = 'none';
	planet.style.filter = `brightness(${r/150}) hue-rotate(${Math.random() * 360}deg)`;
	planet.style.width = r + "px";
	planet.style.position = 'absolute';
	planet.style.left = x + "px";
	planet.style.top = y + "px";
	planet.style.transition = `all 200s linear`
	planet.style.transform = `rotateZ(${Math.random() * 360}deg)`;
	setTimeout(function() {
		planet.style.transform = `translateX(${Math.random() * 1600 - 800}px)`;
		planet.style.transform = `rotateZ(${Math.random() * 760 - 360}deg)`;
	}, 1)

	planets.appendChild(planet);
}

function startDraw() {
	var perf = performance.now()
	ctx.fillStyle = '#000';
	planets.innerHTML = "";
	ctx.fillRect(0, 0, cvs.width, cvs.height)

	for (var i = 0; i < 1000; i ++) {
		drawStar()
	}
	for (var i = 0; i < 200; i ++) {
		drawSpaceDust()
	}
	for (var i = 0; i < 10; i ++) {
		drawPlanet()
	}

	console.log((performance.now() - perf) / 1000 + " seconds to render.")
}