var starBlock = document.getElementById("Starblock");
var metaknight = document.getElementById("Metaknight");
var space3 = document.getElementById("space3");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 600;
var gravity = 1;
var jumpPower = 20;
var character = {
    height: 80,
    width: 80 * 1.69,
    x: -1,
    y: 520,
    dx: 0,
    dy: 0,
    color: "black",
    isMoveLeft: false,
    isMoveRight: false,
    isMoveUp: false,
    isMoveDown: false,
    onJumpKeyPressed: false,
    rightOf: true,
    leftOf: true,
    below: true,
    above: true,
    move: function() {
        if (character.isMoveLeft && character.x > -1 && character.leftOf) {
            //character.dx = 3;
        }
        if (character.dx < 0 && character.leftOf >= 0) {
            //character.x += character.dx;
        }
        //top
        if (character.dy < 0 && character.above) {
            //character.y -= 3;
            //character.y += character.dy;
        }
        //right
        if (character.isMoveRight && character.rightOf) {
            //character.dx = 3;
        }
        if (character.rightOf >= 0) {
            //character.x += character.dx;
        }
        //bottom
        if (character.dy > 0 && /*character.y < 520 &&*/ character.below <
            0) {
            //character.y += 3;
            //character.y += character.dy;
        }
        if (character.dy > 0 && character.below >= 0) {
            character.dy = 0;
            //character.y += character.dy;
            jumpPower = 20;
        }
        if (character.onJumpKeyPressed) {
            character.dy -= jumpPower;
            jumpPower = 0;
        }
        //character.x += character.dx;
        //character.y += character.dy;
        collision();
    },
    draw: function() {
        ctx.drawImage(metaknight, this.x, this.y, this.width, this.height);
    }
};
var blocks = [];

function Block(xpos, ypos, height, width) {
    this.x = xpos;
    this.y = ypos;
    this.height = height;
    this.width = width;
    this.draw = function() {
        ctx.drawImage(starBlock, this.x, this.y, this.width, this.height);
    };
}
var INVERSE_GAME_SPEED = 1;
var counter = 0;
var start;
window.requestAnimationFrame(step);

function step(timestamp) {
    if (counter % INVERSE_GAME_SPEED === 0) {
        runGame();
    }
    counter++;
    window.requestAnimationFrame(step);
}

function runGame() {
    applyPhysics();
    for (var i = 0; i < blocks.length; i++) {
        character.above = isAbove(character, newBlock /*blocks[i]*/ );
        character.below = isBelow(character, newBlock /*blocks[i]*/ );
        character.rightOf = isRightOf(character, newBlock /*blocks[i]*/ );
        character.leftOf = isLeftOf(character, newBlock /*blocks[i]*/ );
    }
    character.move();
    drawEverything();
}

function applyPhysics() {
    character.dy += gravity;
    if (character.dy + character.y > 520) {
        character.dy = 0;
        character.y = 520;
        jumpPower = 20;
    }
}

function drawEverything() {
        renderCanvas();
        character.draw();
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].draw();
        }
    }
    //event listener for keydown - set booleans to true
document.onkeydown = function(e) {
    e = e || window.event;
    switch (e.keyCode) {
        case 65:
            //character.isMoveLeft = true;
            character.dx = -5;
            break;
        case 68:
            //character.isMoveRight = true;
            character.dx = 5;
            break;
        case 32:
            character.onJumpKeyPressed = true;
            break;
    }
};
//event listener for keyup - set booleans to false
document.onkeyup = function(e) {
    e = e || window.event;
    switch (e.keyCode) {
        case 65:
            //character.isMoveLeft = false;
            character.dx = 0;
            break;
        case 68:
            //character.isMoveRight = false;
            character.dx = 0;
            break;
        case 32:
            character.onJumpKeyPressed = false;
            break;
    }
};

function renderCanvas() {
    ctx.drawImage(space3, 0, 0, canvas.width, canvas.height);
}

function isAbove(player, block) {
    if (player.x + player.width <= block.x || player.x >= block.x + block.width ||
        player.y + player.height <= block.y) {
        return -1;
    }
    return player.y > block.y + block.height;
}

function isBelow(player, block) {
    if (character.y >= 520) {
        return 520;
    }
    if (player.x + player.width <= block.x || player.x >= block.x + block.width ||
        player.y >= block.y + block.height || player.y + player.height <
        block.y) {
        return -1;
    }
    return block.y - character.height;
}

function isRightOf(player, block) {
    if (player.y >= block.y + block.height || player.y + player.height <=
        block.y || player.x >= block.x + block.width || player.x + player.width <
        block.x) {
        return -1;
    }
    return block.x - character.width;
}

function isLeftOf(player, block) {
        if (player.y >= block.y + block.height || player.y + player.height <=
            block.y || player.x >= block.x + block.width || player.x + player.width <
            block.x) {
            return -1;
        }
        return block.x - character.width;
        return player.x > block.x + block.width;
    }
    //Scrolling
var newBlock = new Block(390, 390, 300, 300);
blocks.push(newBlock);
//collision
function collision() {
    var corner0 = [character.x, character.y];
    var corner1 = [character.x + character.width, character.y];
    var corner2 = [character.x, character.y + character.height];
    var corner3 = [character.x + character.width, character.y + character.height];
    var pointList = [];
    if (character.dy > 0) {
        pointList.push(cornerCollision(corner2).concat(corner2));
        pointList.push(cornerCollision(corner3).concat(corner3));
    } else if (character.dy < 0) {
        pointList.push(cornerCollision(corner0).concat(corner0));
        pointList.push(cornerCollision(corner1).concat(corner1));
    }
    if (character.dx > 0) {
        pointList.push(cornerCollision(corner1).concat(corner1));
        pointList.push(cornerCollision(corner3).concat(corner3));
    } else if (character.dx < 0) {
        pointList.push(cornerCollision(corner0).concat(corner0));
        pointList.push(cornerCollision(corner2).concat(corner2));
    }
    if (pointList.length === 0) {
        return;
    }
    var collidePoint = shortDist(pointList);
    character.x = collidePoint[0] - (collidePoint[2] - character.x);
    character.y = collidePoint[1] - (collidePoint[3] - character.y);
}

function cornerCollision(corner) {
    var c = 0.5;
    var totalDist = Math.sqrt(Math.pow(character.dx, 2) + Math.pow(
        character.dy, 2));
    var nSteps = totalDist / c;
    var stepX = character.dx / nSteps;
    var stepY = character.dy / nSteps;
    var x;
    var y;
    for (var i = 0; i < nSteps; i++); {
        x = stepX * (i + 1) + (corner[0]);
        y = stepY * (i + 1) + (corner[1]);
        if (checkCollision(x, y)) return [x, y];
    }
    return [corner[0] + character.dx, corner[1] + character.dy];
}

function checkCollision(x, y) {
    return (x >= newBlock.x && x <= newBlock.x + newBlock.width && y >=
        newBlock.y && y <= newBlock.y + newBlock.height);
}

function shortDist(pointList) {
    var shortPoint;
    var shortest = 1000;
    for (var i = 0; i < pointList.length; i++) {
        var a = pointList[i][1] - pointList[i][3];
        var b = pointList[i][0] - pointList[i][2] - pointList[i][0];
        var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        if (c < shortest) {
            shortest = c;
            shortPoint = pointList[i];
        }
    }
    return shortPoint;
}