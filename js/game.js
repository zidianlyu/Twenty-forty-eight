let board, game, startBtn, scoreMsg, keynum;
const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;
const WIN_SCORE = "2048";
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
    this.randomTile();
};

gameRun.prototype.newTile = function(val) {
    let tile = document.createElement("div");
    this.setTileVal(tile, val);
    return tile;
};

gameRun.prototype.setTileVal = function(tile, val) {
    if (tile) {
        tile.setAttribute("class", `tile tile${val}`);
        tile.setAttribute("val", val);
        tile.innerHTML = val > 0 ? val : "";
    }
};

gameRun.prototype.randomTile = function() {
    let zeroTiles = [];
    for (let i = 0; i < this.tiles.length; i++) {
        if (this.tiles[i].getAttribute("val") === "0") {
            zeroTiles.push(this.tiles[i]);
        }
    }
    const rIdx = Math.floor(Math.random() * zeroTiles.length);
    const rVal = Math.random() < 0.5 ? 2 : 4;
    this.setTileVal(zeroTiles[rIdx], rVal);
};

gameRun.prototype.merge = function(arr, key) {
    let newArr = [];
    arr = arr.filter(x => x !== 0);
    while (arr.length > 0) {
        if ([UP, LEFT].includes(key)) {
            if (arr.length > 1 && arr[1] === arr[0]) {
                newArr.push(arr[0] * 2);
                arr.shift();
                arr.shift();
                continue;
            }
            newArr.push(arr.shift());
        } else if ([DOWN, RIGHT].includes(key)) {
            if (arr.length > 1 && arr[arr.length - 1] === arr[arr.length - 2]) {
                newArr.unshift(arr[arr.length - 1] * 2);
                arr.pop();
                arr.pop();
                continue;
            }
            newArr.unshift(arr.pop());
        }
    }
    while (newArr.length < 4) {
        if ([UP, LEFT].includes(key)) {
            newArr.push(0);
        } else if ([DOWN, RIGHT].includes(key)) {
            newArr.unshift(0);
        }
    }
    return newArr;
};

gameRun.prototype.move = function(key) {
    let changed = false;
    if ([UP, DOWN].includes(key)) {
        for (let col = 0; col < 4; col++) {
            let colNum = [];
            for (let row = 0; row < 4; row++) {
                let idx = col + row * 4;
                colNum.push(~~this.tiles[idx].getAttribute("val"));
            }
            let newColNum = this.merge(colNum, key);
            if (JSON.stringify(colNum) !== JSON.stringify(newColNum)) {
                changed = true;
            }
            for (let row = 0; row < 4; row++) {
                let idx = col + row * 4;
                this.setTileVal(this.tiles[idx], newColNum.shift());
            }
        }
        if (changed) {
            this.randomTile();
        }
    } else if ([LEFT, RIGHT].includes(key)) {
        for (let row = 0; row < 4; row++) {
            let rowNum = [];
            for (let col = 0; col < 4; col++) {
                let idx = row * 4 + col;
                rowNum.push(~~this.tiles[idx].getAttribute("val"));
            }
            let newRowNum = this.merge(rowNum, key);
            if (JSON.stringify(rowNum) !== JSON.stringify(newRowNum)) {
                changed = true;
            }
            for (let col = 0; col < 4; col++) {
                let idx = row * 4 + col;
                this.setTileVal(this.tiles[idx], newRowNum.shift());
            }
        }
        if (changed) {
            this.randomTile();
        }
    }
    scoreMsg.innerHTML = this.score();
    if (this.over()) {
        this.clean();
        startBtn.style.display = "block";
        startBtn.innerHTML = "Game over, Replay?";
        return;
    }
    if (this.win()) {
        this.clean();
        startBtn.style.display = "block";
        startBtn.innerHTML = "You win, Replay?";
        return;
    }
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
gameRun.prototype.win = function() {
    for (let i = 0, len = this.tiles.length; i < len; i++) {
        if (this.tiles[i].getAttribute("val") === WIN_SCORE) {
            return true;
        }
    }
};

gameRun.prototype.over = function() {
    for (let i = 0; i < this.tiles.length; i++) {
        // exist empty
        if (this.tiles[i].getAttribute("val") === "0") {
            return false;
        }
        // col
        if (i % 4 !== 3) {
            if (this.equal(this.tiles[i], this.tiles[i + 1])) {
                return false;
            }
        }
        // row
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
        this.container.removeChild(this.tiles[i]);
    }
    game = "";
    this.tiles = new Array(16);
};

//start
window.onload = function() {
    board = document.getElementById("board");
    startBtn = document.getElementById("start");
    scoreMsg = document.getElementById("score");
    startBtn.onclick = function() {
        this.style.display = "none";
        scoreMsg.innerHTML = 0;
        game = game || new gameRun(board);
        game.init();
    };
};

//after initialization, each tap
window.onkeydown = function(e) {
    //for IE, Chrome
    if (window.event) {
        keynum = e.keyCode;
    } else if (e.which) {
        keynum = e.which;
    }

    if ([UP, DOWN, LEFT, RIGHT].includes(keynum)) {
        if (!game) {
            return;
        }
        game.move(keynum);
    }
};
