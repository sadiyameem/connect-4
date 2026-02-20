function newGame(button) {
    button.style.display = 'none';
    const game = document.getElementById("gameContainer");

    const columns = [];

    const slotArray = [];

    let nextColor = "red";

    for (let i = 0; i < 7; i++) {
        const column = document.createElement("div");
        column.className = "column";
        game.appendChild(column);
        columns.push(column);
    }

    class Slot {
        constructor(element, column, row) {
            this.column = column;
            this.row = row;
            this.element = element;
            this.state = "";
        }

        clicked() {
            const el = this.element;
            if (!el.classList.contains("clickable")) return;
            el.style.backgroundColor = nextColor;
            this.state = nextColor;

            el.classList.remove("clickable");

            if (slotArray[this.column][this.row - 1]) {
                slotArray[this.column] [this.row - 1].element.classList.add(
                    "clickable",
                    nextColor
                );
            }
            // check for game over
            if (isDraw(slotArray) == true) gameOver(nextColor);

            if (isWinner(this.column, this.row, nextColor, slotArray) == true)
                gameOver(nextColor);

            // change next color
            let oldColor = nextColor;
            nextColor == "red" ? (nextColor = "yellow") : (nextColor = "red");
            document.querySelectorAll(".clickable").forEach((el) => {
                el.classList.remove(oldColor);
                el.classList.add(nextColor);
            });
        }
    }
    // create slots and push to columns
    columns.forEach((el, col) => {
        let slotColumn = [];
        for (i = 0; i < 6; i++) {
            const div = document.createElement("div");
            div.classList.add("slot");
            el.appendChild(div);
            const slot = new Slot(div, col, i);
            slotColumn.push(slot);
            div.onclick = function () {
                slot.clicked();
            };
            div.style.top = i * 70 + 2 + "px";
        }
        slotArray.push(slotColumn);
    });
    slotArray.forEach((col) => {
        col[5].element.classList.add("clickable", nextColor);
    });
    console.log(slotsArray);
}

// check if game is draw
function isDraw(slotArray) {
    let isDraw = true;
    slotArray.forEach((col) => {
        col.forEach((slot) => {
            if (slot.state == "") isDraw = false;
        });
    });
    return isDraw;
}

// test the lines to see if someone has won
function testLines(lines, color, slotsArray) {
    let connectedSlots = 1; // 4 = win
    lines.forEach((line) => {
        for (i = 0; i < line.length; i++) {
            const slotLocation = line[i];
            column = slotLocation[0];
            row = slotLocation[1];

            // don't allow for searching off screen
            if (column >= 0 && column <= 6 && row >= 0 && row <= 5) {
                // make sure it is defined
                if (typeof slotsArray[column][row].state !== "undefined") {
                    if (slotsArray[column][row].state == color) {
                    connectedSlots += 1;
                    console.log(connectedSlots);
                    }
                } else break;
            }
        }
    });
    if (connectedSlots >= 4) return true;
    return false;
}