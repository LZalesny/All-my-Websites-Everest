var Keys = {
        up: false,
        down: false,
        left: false,
        right: false
    },
    ctx = canvas.getContext('2d'),
    dx = 0,
    dy = 0,
    ptr;

// create tile
ctx.fillStyle = '#592';
ctx.fillRect(0, 0, 40, 40);
ctx.fillStyle = 'rgba(255,255,255,0.5)';
ctx.fillRect(0, 0, 1, 40);
ctx.fillRect(0, 0, 40, 1);
ctx.fillStyle = 'rgba(0,0,0,0.5)';
ctx.fillRect(0, 39, 40, 1);
ctx.fillRect(39, 0, 1, 40);
ptr = ctx.createPattern(canvas, 'repeat');

// setup canvas
canvas.width = canvas.height = 400;

ctx.fillStyle = ptr;
render();

window.onkeydown = function(e) {
    var kc = e.keyCode;
    e.preventDefault();

    if (kc === 37) Keys.left = true;
    else if (kc === 38) Keys.up = true;
    else if (kc === 39) Keys.right = true;
    else if (kc === 40) Keys.down = true;
};

window.onkeyup = function(e) {
    var kc = e.keyCode;
    e.preventDefault();

    if (kc === 37) Keys.left = false;
    else if (kc === 38) Keys.up = false;
    else if (kc === 39) Keys.right = false;
    else if (kc === 40) Keys.down = false;
};

var isDirty = false;

function update() {
    if (Keys.up) {
        dy+=3;
        isDirty = true;
    }
    else if (Keys.down) {
        dy-=3;
        isDirty = true;
    }

    if (Keys.left) {
        dx+=3;
        isDirty = true;
    }
    else if (Keys.right) {
        dx-=3;
        isDirty = true;
    }

    if (Dirty) render();
    requestAnimationFrame(update);
}
requestAnimationFrame(update);

function render() {
    ctx.setTransform(1,0,0,1,dx,dy);
    ctx.fillRect(-dx, -dy, 400,400);
    Dirty= false;
}
