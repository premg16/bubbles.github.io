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

function Circle(x, y, rad, dx, dy, color) {

    this.x = x;
    this.y = y;
    this.rad = rad;
    this.dx = dx;
    this.dy = dy;
    this.minRad = rad;
    this.color = color;

    this.draw = function () {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
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
        if (mouse.x - this.x < 40 && mouse.x - this.x > -40 &&
            mouse.y - this.y < 40 && mouse.y - this.y > -40
        ) {
            if (this.rad < maxRad) {
                this.rad += 5;
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
    for (i = 0; i < 1500; i++) {

        let x = Math.random() * window.innerWidth;
        let dx = (Math.random() - 0.5) * 5;
        let y = Math.random() * window.innerHeight;
        let dy = (Math.random() - 0.5) * 5;
        let rad = 0;
        let r = Math.floor(Math.random() * 180);
        let g = Math.floor(Math.random());
        let b = Math.floor(Math.random() * 180);
        let color = "rgb( "+ r + ","+ g + ","+ b + ")";
        circleArray.push(new Circle(x, y, rad, dx, dy, color))

    }
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