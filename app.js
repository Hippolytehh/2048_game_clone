function addNumber(number=0) {
    const rows = document.querySelectorAll(".cell");
    let compteur = 0; 
    while (true) {
        if (compteur < 20) {
            let i = (Math.floor(Math.random() * 4) + 1).toString(); 
            let j = (Math.floor(Math.random() * 4) + 1).toString(); 
            let targetCell = document.getElementById(`i${i}j${j}`);
            if (!targetCell.innerHTML && number == 0) {
                targetCell.innerHTML = (Math.floor(Math.random() * 2) + 1 ) * 2;
                break;
            } else if (!targetCell.innerHTML && number == 2) {
                targetCell.innerHTML = 2;
                break;
            } else if (!targetCell.innerHTML && number == 4) {
                targetCell.innerHTML = 4;
                break;
            } else {
                compteur += 1
            };
        } else {
            // false -> game over
            window.alert("GAME OVER")
            resetGrid()
            return false;
        };
    };
    return true;
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
        item.innerHTML = "";
    });
    addNumber(2);
    addNumber(4);
    updateStyle();
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
    let grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    let n = 0;
    const rows = document.querySelectorAll(".cell");
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            grid[i][j] = rows[n].innerHTML === "" ? 0 : parseInt(rows[n].innerHTML);
            n++;
        };
    };

    if (direction == "L") {
        for (let i = 0; i < 4; i++) {
            for (let j = 3; j >= 0; j--) {
                for (k = j - 1; k >= 0; k--) {
                    if (grid[i][k] != 0 && grid[i][k] != grid[i][j]) {
                        break;
                    } else if (grid[i][k] == grid[i][j]) {
                        grid[i][j] *= 2;
                        grid[i][k] = 0;
                    };
                };
            };
            for (let j = 3; j >= 0; j--) {
                for (k = j - 1; k >= 0; k--) {
                    if (grid[i][k] == 0 && grid[i][j+1]) {
                        grid[i][k] = grid[i][j];
                        grid[i][j] = grid[i][j+1];
                    } else if (grid[i][k] == 0 && !grid[i][j+1]) {
                        grid[i][k] = grid[i][j];
                        grid[i][j] = 0;
                    };
                };
            };
        };
    } else if (direction == "R") {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                for (let k = j + 1; k < 4; k++) {
                    if (grid[i][k] != 0 && grid[i][k] != grid[i][j]) {
                        break;
                    } else if (grid[i][k] == grid[i][j]) {
                        grid[i][j] *= 2;
                        grid[i][k] = 0;
                    };
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
                    };
                };
            };
        };
    } else if (direction == "D") {
        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < 4; i++) {
                for (let k = i + 1; k < 4; k++) {
                    if (grid[k][j] != 0 && grid[k][j] != grid[i][j]) {
                        break;
                    } else if (grid[k][j] == grid[i][j]) {
                        grid[i][j] *= 2;
                        grid[k][j] = 0;
                    };
                };
            };
            for (let i = 0; i < 4; i++) {
                for (let k = i + 1; k < 4; k++) {
                    if (grid[k][j] == 0 && grid[i-1]) {
                        grid[k][j] = grid[i][j];
                        grid[i][j] = grid[i-1][j];
                    }   else if (grid[k][j] == 0 && !grid[i-1]) {
                        grid[k][j] = grid[i][j];
                        grid[i][j] = 0;
                    }
                };
            };
        };
    } else if (direction == "U") {
        for (let j = 0; j < 4; j++) {
            for (let i = 3; i >= 0; i--) {
                for (let k = i - 1; k >= 0; k--) {
                    if (grid[k][j] != 0 && grid[k][j] != grid[i][j]) {
                        break;
                    } else if (grid[k][j] == grid[i][j]) {
                        grid[i][j] = 0;
                        grid[k][j] *= 2;
                    };
                };
            };
            for (let i = 3; i >= 0; i--) {
                for (let k = i - 1; k >= 0; k--) {
                    if (grid[k][j] == 0 && grid[i+1]) {
                        grid[k][j] = grid[i][j];
                        grid[i][j] = grid[i+1][j];
                    } else if (grid[k][j] == 0 && !grid[i+1]) {
                        grid[k][j] = grid[i][j];
                        grid[i][j] = 0;
                    };
                };
            };
        };
    };

    n = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] != 0) {
                rows[n].innerHTML = grid[i][j];
            } else {
                rows[n].innerHTML = "";
            }
            n++;
        }
    }
    addNumber();
    updateStyle();
}