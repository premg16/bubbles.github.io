let canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;


let c = canvas.getContext('2d');

function Circle(x, y, r, dx, dy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    let col1 = Math.floor(Math.random()*255);
	let col2 = Math.floor(Math.random()*255);
	let col3 = Math.floor(Math.random()*255);
	let opac = Math.random()
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = "rgba(" +  col1 + "," + col2 + "," + col3 + "," + opac +")";
        c.fill();
    }
    this.update = function () {

        if (this.x + r > innerWidth || this.x - r < 0) {
            this.dx = -this.dx;
        }
        if (this.y + r > innerHeight || this.y - r < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

let circleArray = [];
for (i = 0; i < 100; i++) {
    let x = Math.random() * window.innerWidth;
    let dx = (Math.random() - 0.5);
    let y = Math.random() * window.innerHeight;
    let dy = (Math.random() - 0.5);
    let r = (Math.random()) * 50;
    circleArray.push(new Circle(x, y, r, dx, dy))
}

function animate() {

    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}
animate();