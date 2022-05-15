// Initialization
const cvs = document.getElementById('spaceBackground');
const ctx = cvs.getContext('2d');
const planets = document.getElementById('spacePlanets');
const galaxies = document.getElementById('spaceGalaxies');
//cvs.style.pointerEvents = 'none';
planets.style.position = 'fixed';
planets.style.top = 0;
planets.style.left= 0;
planets.style.width = "100vw"
planets.style.height= "100vh"
galaxies.style.position = 'fixed';
galaxies.style.top = 0;
galaxies.style.left= 0;
galaxies.style.width = "100vw"
galaxies.style.height= "100vh"
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
	const r = Math.random() * 500 + 50;
	const gradient = ctx.createRadialGradient(x, y, 0, x, y, r)
	gradient.addColorStop(0, getRandomColor());
	gradient.addColorStop(1, '#0000');
	ctx.fillStyle = gradient;
	ctx.globalAlpha = 10 / r;
	ctx.beginPath()
	ctx.arc(x, y, r, 0, Math.PI * 2)
	ctx.fill();
}
function drawVoid() {
	const x = Math.random() * cvs.width;
	const y = Math.random() * cvs.height;
	const r = Math.random() * 1500 + 50;
	const gradient = ctx.createRadialGradient(x, y, 0, x, y, r)
	gradient.addColorStop(0, "#000F");
	gradient.addColorStop(1, '#0000');
	ctx.fillStyle = gradient;
	ctx.globalAlpha = 1;
	ctx.beginPath()
	ctx.arc(x, y, r, 0, Math.PI * 2)
	ctx.fill();
}
function drawStar() {
	const x = Math.random() * cvs.width;
	const y = Math.random() * cvs.height;
	const r = 3 * Math.random() * Math.random() * Math.random();
	ctx.fillStyle = "#FFF";
	ctx.globalAlpha = Math.random() * 0.5 + 0.7;
	ctx.beginPath()
	ctx.arc(x, y, r, 0, Math.PI * 2)
	ctx.fill();
	ctx.globalAlpha = 1;
}
function drawGalaxy() {
	const x = Math.floor(Math.random() * (cvs.width - 100));
	const y = Math.floor(Math.random() * (cvs.height - 100));
	const r = 40 * (Math.random() * 2.5) * (Math.random() * 2) * (Math.random() * 1.5);
	const galaxy = document.createElement('img');
	galaxy.src = `galaxies/${Math.floor(Math.random() * 5)}min.png`
	galaxy.style.pointerEvents = 'none';
	galaxy.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
	galaxy.style.width = r + "px";
	galaxy.style.position = 'absolute';
	galaxy.style.left = x + "px";
	galaxy.style.top = y + "px";
	galaxy.style.transform = `rotateZ(${Math.random() * 360}deg)`;

	galaxies.appendChild(galaxy);
}
function drawPlanet() {
	const x = Math.floor(Math.random() * (cvs.width - 100));
	const y = Math.floor(Math.random() * (cvs.height - 100));
	const r = 40 * (Math.random() * 2.5) * (Math.random() * 2) * (Math.random() * 1.5);
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
		planet.style.transform = `translate(${Math.random() * 1600 - 800}px, ${Math.random() * 1600 - 800}px)`;
		planet.style.transform = `rotateZ(${Math.random() * 760 - 360}deg)`;
	}, 1)

	planets.appendChild(planet);
}

function startDraw() {
	ctx.fillStyle = '#000';
	planets.innerHTML = "";
	galaxies.innerHTML = "";
	ctx.fillRect(0, 0, cvs.width, cvs.height);

	var perf = performance.now();
	for (var i = 0; i < (cvs.width * cvs.height) / 20000; i ++) {
		drawSpaceDust();
	}
	for (var i = 0; i < (cvs.width * cvs.height) / 200; i ++) {
		drawStar();
	}
	for (var i = 0; i < 1; i ++) {
		drawVoid();
	}
	for (var i = 0; i < (cvs.width * cvs.height) / 200000; i ++) {
		drawGalaxy();
	}
	for (var i = 0; i < (cvs.width * cvs.height) / 100000; i ++) {
		drawPlanet();
	}
	console.log((performance.now() - perf) / 1000 + " seconds to render.");
}