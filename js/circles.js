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
let theme = ["rgba(255, 109, 0, 1)",
    "rgba(255, 121, 0, 1)",
    "rgba(255, 133, 0, 1)",
    "rgba(255, 145, 0, 1)",
    "rgba(255, 158, 0, 1)",
    "rgba(36, 0, 70, 1)",
    "rgba(60, 9, 108, 1)",
    "rgba(90, 24, 154, 1)",
    "rgba(123, 44, 191, 1)",
    "rgba(157, 78, 221, 1)"]

function init() {
    circleArray = [];
    for (i = 0; i < 1500; i++) {

        let x = Math.random() * window.innerWidth;
        let dx = (Math.random() - 0.5) * 5;
        let y = Math.random() * window.innerHeight;
        let dy = (Math.random() - 0.5) * 5;
        let rad = 0;
        let color = theme[Math.floor(Math.random() * theme.length)];
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