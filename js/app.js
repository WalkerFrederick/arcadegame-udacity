
//init the games level at 1
let level = 1;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.yOrigin = y;
    this.xOrigin = x;
    this.y = y;
    this.x = x;
}

Enemy.prototype.update = function(dt) {
    switch(level) {
        //checks for level 2
        case 2:
            for (let j = 0; j < allEnemies.length; j++) {
                allEnemies[j].speed = 150;
            }
            break;
        //checks for level 3
        case 3:
            for (let k = 0; k < allEnemies.length; k++) {
                allEnemies[k].speed = 200;
            }
            break;
        //defaults to level 1
        default:
            for (let i = 0; i < allEnemies.length; i++) {
                allEnemies[i].speed = 100;
            }
    }

    //keeps game running at a constant speed across various devices
    this.x = this.x + (this.speed * dt);

    player.y >= this.y - 40 && player.y <= this.y + 40
    // Check if player collides with enemy
    if ((player.x >= this.x - 40 && player.x <= this.x + 40) && (player.y >= this.y - 40 && player.y <= this.y + 40)) {
        //resets player back to level one on collision
        level = 1;
        player.reset(this);
        $('#levelCount').text(level);

    }
    //position reset
    if (this.x > 499) {
        this.reset();
    }

};

Enemy.prototype.reset = function () {
    this.y = this.yOrigin;
    this.x = this.xOrigin;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class including updater, renderer, and input handling
let Player = function (x, y) {
    this.sprite = 'images/char-cat-girl.png';
    this.y = y;
    this.x = x;
};
Player.prototype.update = function (dt) {
    //changes, handles and displays the level
    if (this.y < -18) {
        this.reset();
        level++;
        if (level > 3) {
            $('.win-message').css("visibility", "visible");
            $('body').css('background-image', 'url(images/donttouchamyconfet.gif)');
            setTimeout(function(){
                $('.win-message').css("visibility", "hidden");
                $('body').css('background-image', 'none');
            } ,1000);
            level = 1;
        }
        $('#levelCount').text(level);
    }

};



Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



Player.prototype.handleInput = function (rcv) {
    switch (rcv) {
        case 'up':
            if (this.y > -50) {this.y = this.y - 85;}
            break;
        case 'down':
            if (this.y < 375) {this.y = this.y + 85;}
            break;
        case 'right':
            if (this.x < 400) {this.x = this.x + 85;}
            break;
        case 'left':
            if (this.x > 0) {this.x = this.x - 85;}
            break;
    }
};



Player.prototype.reset = function () {
    this.y = 400;
    this.x = 200;
};



let player = new Player(200, 400);



let allEnemies = [];



for (let i = 0; i < 3; i++) {
    let getX = -1 * (Math.floor(Math.random() * 300) + 50);
    let getY = (i*90)+45;
    allEnemies.push(new Enemy(getX, getY));
}



document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
