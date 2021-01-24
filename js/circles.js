let canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;


let c = canvas.getContext('2d');


let maxRad = 50;
let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
        console.log(mouse);
    })
window.addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
})

function Circle(x, y, rad, dx, dy) {

    this.x = x;
    this.y = y;
    this.rad = rad;
    this.dx = dx;
    this.dy = dy;
    this.minRad = rad;

    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random());
    let b = Math.floor(Math.random() * 255);
    let alpha = Math.random();

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
        c.fillStyle = "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
        c.fill();
    }
    this.update = function () {

        if (this.x + rad > innerWidth || this.x - rad < 0) {
            this.dx = -this.dx;
        }
        if (this.y + rad > innerHeight || this.y - rad < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50
        ) {
            if (this.rad < maxRad) {
                this.rad += 3;
            }
        } else if (this.rad > this.minRad) {
            this.rad -= 1;
        }

        this.draw();
    }
}

let circleArray = [];

function init() {
    circleArray = [];
    for (i = 0; i < 1000; i++) {

        let x = Math.random() * window.innerWidth;
        let dx = (Math.random() - 0.5);
        let y = Math.random() * window.innerHeight;
        let dy = (Math.random() - 0.5);
        let rad = (Math.random()) * 8 + 1;
        circleArray.push(new Circle(x, y, rad, dx, dy))

    }
    console.log('init is called');
}

function animate() {

    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
init();
animate();