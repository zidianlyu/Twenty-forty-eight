function gameRun(container) {
    this.container = container;
    this.tiles = new Array(16);
}

gameRun.prototype.init = function() {
    for (let i = 0, len = this.tiles.length; i < len; i++) {
        let tile = this.newTile(0);
        tile.setAttribute("index", i);
        this.container.appendChild(tile);
        this.tiles[i] = tile;
    }
    this.randomTile();
    this.randomTile();
};

gameRun.prototype.newTile = function(val) {
    let tile = document.createElement("div");
    this.setTileVal(tile, val);
    return tile;
};

gameRun.prototype.setTileVal = function(tile, val) {
    tile.setAttribute("class", `tile tile${val}`);
    tile.setAttribute("val", val);
    tile.innerHTML = val > 0 ? val : "";
};

gameRun.prototype.randomTile = function() {
    let zeroTiles = [];
    for (let i = 0, len = this.tiles.length; i < len; i++) {
        if (this.tiles[i].getAttribute("val") === "0") {
            zeroTiles.push(this.tiles[i]);
        }
    }
    let randomTileIdx = Math.floor(Math.random() * zeroTiles.length);
    let rTile = zeroTiles[randomTileIdx];
    const rVal = Math.random() < 0.5 ? 2 : 4;
    this.setTileVal(rTile, rVal);
};

gameRun.prototype.merge = function(prevTile, currTile) {
    let prevVal = prevTile.getAttribute("val");
    let currVal = currTile.getAttribute("val");
    if (currVal !== "0") {
        if (prevVal === "0") {
            this.setTileVal(prevTile, currVal);
            this.setTileVal(currTile, 0);
        } else if (prevVal === currVal) {
            this.setTileVal(prevTile, prevVal * 2);
            this.setTileVal(currTile, 0);
        }
    }
};

//move by condition
gameRun.prototype.move = function(direction) {
    let j;
    switch (direction) {
        // case 'up':
        case 38:
            for (let i = 4; i < this.tiles.length; i++) {
                j = i;
                while (j >= 4) {
                    this.merge(this.tiles[j - 4], this.tiles[j]);

                    j -= 4;
                }
            }
            //stop each time to wait for the result;
            break;
        // case 'down':
        case 40:
            for (let i = 11; i >= 0; i--) {
                j = i;
                while (j <= 11) {
                    this.merge(this.tiles[j + 4], this.tiles[j]);
                    j += 4;
                }
            }
            break;
        // case 'left':
        case 37:
            for (let i = 1; i < this.tiles.length; i++) {
                j = i;
                while (j % 4 !== 0) {
                    this.merge(this.tiles[j - 1], this.tiles[j]);
                    j -= 1;
                }
            }
            break;
        // case 'right':
        case 39:
            for (let i = 14; i >= 0; i--) {
                j = i;
                while (j % 4 !== 3) {
                    this.merge(this.tiles[j + 1], this.tiles[j]);
                    j += 1;
                }
            }
            break;
    }
    this.randomTile();
};

gameRun.prototype.equal = function(tile1, tile2) {
    return tile1.getAttribute("val") === tile2.getAttribute("val");
};

gameRun.prototype.score = function() {
    let total = 0;
    for (let i = 0; i < this.tiles.length; i++) {
        let add = parseInt(this.tiles[i].getAttribute("val"));
        total = total + add;
    }
    return total;
};
//to determine win
gameRun.prototype.max = function() {
    for (let i = 0, len = this.tiles.length; i < len; i++) {
        if (this.tiles[i].getAttribute("val") === "2048") {
            return true;
        }
    }
};
gameRun.prototype.over = function() {
    for (let i = 0, len = this.tiles.length; i < len; i++) {
        if (this.tiles[i].getAttribute("val") === "0") {
            return false;
        }
        if (i % 4 !== 3) {
            if (this.equal(this.tiles[i], this.tiles[i + 1])) {
                return false;
            }
        }
        if (i < 12) {
            if (this.equal(this.tiles[i], this.tiles[i + 4])) {
                return false;
            }
        }
    }
    return true;
};
gameRun.prototype.clean = function() {
    for (let i = 0, len = this.tiles.length; i < len; i++) {
        //clean up the tiles
        this.container.removeChild(this.tiles[i]);
    }
    this.tiles = new Array(16);
};

//start
let game, startBtn, scoreMsg;
window.onload = function() {
    let container = document.getElementById("board");
    startBtn = document.getElementById("start");
    scoreMsg = document.getElementById("score");
    startBtn.onclick = function() {
        this.style.display = "none";
        game = game || new gameRun(container);
        game.init();
    };
};

//after initialization, each tap
window.onkeydown = function(e) {
    let keynum, keychar;
    //for IE, Chrome
    if (window.event) {
        keynum = e.keyCode;
    } else if (e.which) {
        keynum = e.which;
    }
    keychar = String.fromCharCode(keynum);

    if ([38, 40, 37, 39].indexOf(keynum) > -1) {
        if (game.over()) {
            game.clean();
            scoreMsg.innerHTML = 0;
            startBtn.style.display = "block";
            startBtn.innerHTML = "Game over, Replay?";
            return;
        }

        if (game.max()) {
            game.clean();
            scoreMsg.innerHTML = 0;
            startBtn.style.display = "block";
            startBtn.innerHTML = "You win, Replay?";
            return;
        }

        game.move(keynum);
        scoreMsg.innerHTML = game.score();
    }
};
