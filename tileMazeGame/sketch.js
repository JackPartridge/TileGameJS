let wantedMoves = [];
let instantChangeDeny = [];
let currentPath = [];

let sizeVar = 25;
let windowSize = 850;
let width = windowSize;
let height = windowSize;

let rows = sizeVar;
let cols = sizeVar;
let s = height / rows;
let grid = new Array(rows);

let clearRectX, clearRectY;      // Position of square button
let undoRectX, undoRectY;
let clearRectHeight = 30;
let clearRectWidth = 90; // Diameter of rect
let rectColor;
let baseColor;
let rectHighlight;
let rectOver = false;
let undoRectOver = false;

function overRect(x, y, width, height) {
    return mouseX >= x && mouseX <= x + width &&
        mouseY >= y && mouseY <= y + height;
}

function mouseReleased() {
    instantChangeDeny = [];
}

function mouseDragged() {
    try {
        if (mousePressed) {
            if (!instantChangeDeny.includes(grid[Math.floor(mouseX / (s))][Math.floor(mouseY / (s))])) {
                instantChangeDeny.push(grid[Math.floor(mouseX / (s))][Math.floor(mouseY / (s))]);
                mousePressed();
            }
        }
    } catch {
        console.log("\nMouse just kinda left tab\n");
    }
}

function mousePressed() {

    if (rectOver) {
        for (let j = 0; j < cols; j++) {
            for (let i = 0; i < rows; i++) {
                grid[i][j].visited = false;
                const index = wantedMoves.indexOf(grid[i][j]);
                if (index > -1) {
                    wantedMoves.splice(index, 1);
                }
                stroke(40, 136, 215);
                fill(215, 119, 40);
                strokeWeight(1);
                stroke(0);
                //noStroke();
                rect(i * s, j * s, s - 1, s - 1);
            }
        }
    } /*else if (undoRectOver) {
        try {
            for (let i = 0; i < 5; i++) {
                wantedMoves.find(wantedMoves.size() - 1).visited = !(wantedMoves.get(wantedMoves.size() - 1).visited);
                wantedMoves.remove(wantedMoves.size() - 1);

            }
        } catch (Exception ignored) {

        }
    }*/

    try {
        if (mousePressed) {
            let mX = Math.floor(mouseX / (s));
            let mY = Math.floor(mouseY / (s));
            let spot = grid[mX][mY];
            instantChangeDeny.push(spot);
            //wantedMoves.push(spot);
            spot.visited = !spot.visited;
        }
    } catch {
        console.log("\nMouse just kinda left tab\n");
    }
}

function generate() {
    stroke(0);

    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if (grid[i][j].visited) {
                fill(40, 136, 215);
            } else {
                fill(215, 119, 40);
            }
            strokeWeight(1);
            rect(i * s + 1 , j * s + 1, s - 1 , s - 1 );

            let x = grid[i][j].i * s;
            let y = grid[i][j].j * s;


            try {
                if (grid[i + 1][j].visited) {
                    grid[i][j].walls[1] = false;
                }
                if (grid[i - 1][j].visited) {
                    grid[i][j].walls[3] = false;
                }
                if (grid[i][j + 1].visited) {
                    grid[i][j].walls[0] = false;
                }
                if (grid[i][j - 1].visited) {
                    grid[i][j].walls[2] = false;
                }
            } catch {

            }
            if (grid[i][j].visited) {
                noStroke();
                //stroke(40, 136, 215);
                fill(40, 136, 215);
                rect(x, y, s, s);
                stroke(0);
            }
        }
    }
}

function update() {

    rectOver = overRect(clearRectX, clearRectY, clearRectWidth, clearRectHeight);
    undoRectOver = overRect(undoRectX, undoRectY, clearRectWidth, clearRectHeight);
}

function setup() {
    let cvs = createCanvas(width + 150, height);
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    cvs.position(x, y);

    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = new Tile(i, j);
        }
    }

    let current = grid[rows - 1][(cols - 1) / 2];

    background(0);

    rectColor = color(0);
    rectHighlight = color(51);
    baseColor = color(102);
    clearRectX = height + 30;
    clearRectY = 30;
    undoRectX = height + 30;
    undoRectY = 110;

    generate();
}

function draw() {
    strokeWeight(1);
    update();
    stroke(0);
    if (rectOver) {
        fill(rectHighlight);
    } else {
        fill(rectColor);
    }
    rect(clearRectX, clearRectY, clearRectWidth, clearRectHeight);
    fill(255);
    text("CLEAR", height + 54, 50);

    if (undoRectOver) {
        fill(rectHighlight);
    } else {
        fill(rectColor);
    }
    rect(undoRectX, undoRectY, clearRectWidth, clearRectHeight);
    fill(255);
    text("UNDO", height + 57, 130);

    generate();
    //noStroke();

    strokeWeight(1);
    //stroke(0);
    //start and end
    stroke(24, 145, 10);
    fill(24, 145, 10);
    rect((rows - 1) * s, ((rows - 1) / 2) * s, s, s + 1);

    stroke(171, 0, 0);
    fill(171, 0, 0);
    rect(0, ((rows - 1) / 2) * s, s, s + 1);
    stroke(0);

    //border
    noFill();
    strokeWeight(2);
    rect(0, 0, windowSize, windowSize);

}