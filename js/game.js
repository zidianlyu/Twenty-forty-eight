let board, game, startBtn, scoreMsg, keynum;
const [UP, DOWN, LEFT, RIGHT] = [38, 40, 37, 39];
const WIN_SCORE = "512";
function gameRun(container) {
    this.container = container;
    this.tiles = new Array(16);
}

gameRun.prototype.init = function() {
    for (let i = 0; i < this.tiles.length; i++) {
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
    const zeroTiles = this.tiles.filter(x => x.getAttribute("val") === "0");
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
    }
    if (changed) {
        this.randomTile();
    }
    scoreMsg.innerHTML = this.tiles
        .map(x => ~~x.getAttribute("val"))
        .reduce((a, b) => a + b);
    const checkOver = this.over();
    const checkWin = this.tiles.some(x => x.getAttribute("val") === WIN_SCORE);
    if (checkOver || checkWin) {
        this.clean();
        startBtn.style.display = "block";
        const msg = checkOver ? "Game Over" : "You Win";
        startBtn.innerHTML = `${msg}, Replay?`;
        return;
    }
};

gameRun.prototype.over = function() {
    let res = [];
    let tmp = [];
    for (let i = 0; i < 16; i++) {
        tmp.push(this.tiles[i].getAttribute("val"));
        if (tmp.length === 4) {
            res.push(tmp);
            tmp = [];
        }
    }
    for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < res[0].length; j++) {
            if (
                res[i][j] === "0" ||
                (i > 0 && res[i][j] === res[i - 1][j]) ||
                (j > 0 && res[i][j] === res[i][j - 1])
            ) {
                return false;
            }
        }
    }
    return true;
};

gameRun.prototype.clean = function() {
    this.tiles.forEach(child => this.container.removeChild(child));
    this.tiles = new Array(16);
    game = "";
};

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
    // let handGesture = new Hammer(document.getElementById("board"));
    // handGesture.on("panup", function(e) {
    //     debugger;
    //     game.move(UP);
    // });
    // handGesture.on("pandown", function(e) {
    //     game.move(DOWN);
    // });
    // handGesture.on("panleft", function(e) {
    //     game.move(LEFT);
    // });
    // handGesture.on("panright", function(e) {
    //     game.move(RIGHT);
    // });
};

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
