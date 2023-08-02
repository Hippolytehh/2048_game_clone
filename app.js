function rotateMatrix(grid, deg) {
    const n = grid.length;
    const rotatedGrid = Array.from({ length: n }, () => Array(n).fill(0));
    if (deg == -90) {
        for (let row = 0; row < n; row++) {
            for (let col = 0; col < n; col++) {
            rotatedGrid[n - col - 1][row] = grid[row][col];
            };
        };
    } else if (deg == 90) {
        for (let row = 0; row < n; row++) {
            for (let col = 0; col < n; col++) {
              rotatedGrid[col][n - row - 1] = grid[row][col];
            };
        };
    };
    return rotatedGrid;
};

function addNumber(number=0) {
    let cible; 
    const rows = document.querySelectorAll(".cell");
    let availableCells = []
    rows.forEach(function(item) {
        if (!item.innerText) {
            availableCells.push(item)
        }
    })
    if (availableCells.length > 0) {
        const randomNumber = Math.floor(Math.random() * (availableCells.length)).toString()
        cible = availableCells[randomNumber];
        if (number == 0) {
            cible.innerText = (Math.floor(Math.random() * 2) + 1 ) * 2;
        } else if (number == 2) {
            cible.innerText = 2;
        } else if (number == 4) {
            cible.innerText = 4;
        }
    };
    return cible;
};

function updateStyle() {
    const rows = document.querySelectorAll(".cell");
    rows.forEach(function(item) {
        switch (item.innerText) {
            case "2":
                item.style.background = "var(--n2)";
                item.style.color = "var(--dark-font-color)";
                item.style.fontSize = "4em";
                break
                case "4":
                item.style.background = "var(--n4)";
                item.style.color = "var(--dark-font-color)";
                item.style.fontSize = "4em";
                break;
            case "8":
                item.style.background = "var(--n8)";
                item.style.color = "var(--light-font-color)";
                item.style.fontSize = "4em";
                break;
            case "16":
                item.style.background = "var(--n8)";
                item.style.color = "var(--light-font-color)";
                item.style.fontSize = "4em";
                break;
            case "32":
                item.style.background = "var(--n16)";
                item.style.color = "var(--light-font-color)";
                item.style.fontSize = "4em";
                break
            case "64":
                item.style.background = "var(--n32)";
                item.style.color = "var(--light-font-color)";
                item.style.fontSize = "4em";
                break
            case "128":
                item.style.background = "var(--n64)";
                item.style.color = "var(--light-font-color)";
                item.style.fontSize = "3em";
                break
            case "256":
                item.style.background = "var(--n256)";
                item.style.color = "var(--light-font-color)";
                item.style.fontSize = "3em";
                break
            case "512":
                item.style.background = "var(--n512)";
                item.style.color = "var(--light-font-color)";
                item.style.fontSize = "3em";
                break
            case "1024":
                item.style.background = "var(--n1024)";
                item.style.color = "var(--light-font-color)";
                item.style.fontSize = "3em";
                break
            case "2048":
                item.style.background = "var(--n2048)";
                item.style.color = "var(--light-font-color)";
                item.style.fontSize = "3em";
                break
            case "4096":
                item.style.background = "var(--n4096)";
                item.style.color = "var(--light-font-color)";
                item.style.fontSize = "3em";
                break
            default:
                item.style.background = "";
                item.style.color = "";
                break;
        }
    });
};

function resetGrid() {
    const rows = document.querySelectorAll(".cell");
    rows.forEach(function(item) {
        item.innerText = "";
    });
    const firstNumber = addNumber((Math.floor(Math.random() * 2) + 1 ) * 2);
    const secondNumber = addNumber((Math.floor(Math.random() * 2) + 1 ) * 2);
    updateStyle()
    firstNumber.classList.add('grow-animation');
    secondNumber.classList.add('grow-animation');
    firstNumber.addEventListener('animationend', () => {
        firstNumber.classList.remove('grow-animation');
      });
    secondNumber.addEventListener('animationend', () => {
        secondNumber.classList.remove('grow-animation');
      });
};

document.onkeydown = (e) => {
    e = e || window.event;
    if (e.keyCode === 38) {
        updateGrid("U");
    } else if (e.keyCode === 40) {
        updateGrid("D");
    } else if (e.keyCode === 37) {
        updateGrid("L");
    } else if (e.keyCode === 39) {
        updateGrid("R");
    };
};

function updateGrid(direction) {
    const rows = document.querySelectorAll(".cell");
    let grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    let n = 0
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            grid[i][j] = rows[n].innerText === "" ? 0 : parseInt(rows[n].innerText);
            n++;
        };
    };

    if (direction == "U" || direction == "D") {
        grid = rotateMatrix(grid, -90);
    };

    if (direction == "L" || direction == "U") {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                k = j + 1;
                while (true) {
                    if (grid[i][k] != 0 && grid[i][k] != grid[i][j]) {
                        break;
                    } else if (grid[i][k] == grid[i][j]) {
                        grid[i][j] *= 2;
                        grid[i][k] *= 0;
                        break;
                    };
                    k += 1;
                };
            };
            for (let j = 3; j >= 0; j--) {
                for (k = j - 1; k >= 0; k--) {
                    if (grid[i][k] == 0 && grid[i][j+1]) {
                        grid[i][k] = grid[i][j];
                        grid[i][j] = grid[i][j+1];
                        break;
                    } else if (grid[i][k] == 0 && !grid[i][j+1]) {
                        grid[i][k] = grid[i][j];
                        grid[i][j] = 0;
                        break;
                    } else {
                        break;
                    }
                };
            };
        };
    } else if (direction == "R" || direction == "D") {
        for (let i = 0; i < 4; i++) {
            for (let j = 3; j >= 0; j--) {
                k = j - 1;
                while (true) {
                    if (grid[i][k] != 0 && grid[i][k] != grid[i][j]) {
                        break;
                    } else if (grid[i][k] == grid[i][j]) {
                        grid[i][j] *= 2;
                        grid[i][k] *= 0;
                        break;
                    };
                    k = k - 1;
                };
            };
            for (let j = 0; j < 4; j++) {
                for (let k = j + 1; k < 4; k++) {
                    if (grid[i][k] == 0 && grid[i][j-1]) {
                        grid[i][k] = grid[i][j];
                        grid[i][j] = grid[i][j-1];
                    } else if (grid[i][k] == 0 && !grid[i][j-1]) {
                        grid[i][k] = grid[i][j];
                        grid[i][j] = 0;
                    } else {
                        break;
                    }
                };
            };
        };
    };

    if (direction == "U" || direction == "D") {
        grid = rotateMatrix(grid, 90);
    };

    n = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] != 0) {
                rows[n].innerText = grid[i][j];
            } else {
                rows[n].innerText = "";
            };
            n++;
        };
    };
    let availableCells = []
    console.log(rows)
    rows.forEach(function(item) {
        if (!item.innerText) {
            availableCells.push(item)
        };
    });
    const number = addNumber();
    updateStyle();
    number.classList.add('grow-animation');
    number.addEventListener('animationend', () => {
        number.classList.remove('grow-animation');
    });
}