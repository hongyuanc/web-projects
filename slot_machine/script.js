const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

const deposit = () => {
    while (true){
        const depositAmount = prompt("Enter a deposit amount: ");
        const deposit = parseFloat(depositAmount);
        if (isNaN(deposit) || deposit <= 0){
            console.log("Invalid number.");
        } else {
            return deposit;
        }
    }
}

const numLines = () => {
    while (true){
        const lines = prompt("How many lines to bet (1-3): ");
        const numLines = parseInt(lines);
        if (isNaN(numLines) || numLines <= 0 || numLines > 3){
            console.log("Invalid number.");
        } else {
            return numLines;
        }
    }
}

const bet = (balance) => {
    while (true){
        const bet = parseFloat(prompt("Place bet: "));
        if (isNaN(bet)){
            console.log("Invalid number.");
        } else if (bet > balance || bet > balance/lines) {
            console.log("Bet is larger than deposit.");
        } else {
            return bet;
        }
    }
}

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS)){
        for (let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++){
        reels.push([]);
        const symbolsRemain = [...symbols];
        for (let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * symbolsRemain.length);
            const selectedSymbol = symbolsRemain[randomIndex];
            reels[i].push(selectedSymbol);
            symbolsRemain.splice(randomIndex, 1);
        }
    }

    return reels;
}

const transpose = (reels) => {
    const row = [];
    for (let i = 0; i < ROWS; i++){
        row.push([]);
        for (let j = 0; j < COLS; j++){
            row[i].push(reels[j][i]);
        }
    }
    return row;
}

const display = (rows) => {
    const reelsDiv = document.getElementById("reels");
    reelsDiv.innerHTML = "";
    for (const row of rows){
        let rowString = "";
        for (const [i, symbol] of row.entries()){
            rowString += symbol;
            if (i != row.length - 1){
                rowString += " | ";
            }
        }
        const rowDiv = document.createElement("div");
        rowDiv.textContent = rowString;
        reelsDiv.appendChild(rowDiv);
    }
}

const win = (rows, betAmount, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++){
        const symbols = rows[row];
        let same = true;
        for (const symbol of symbols){
            if (symbol != symbols[0]){
                same = false;
                break;
            }
        }
        if (same){
            winnings += betAmount * VALUES[symbols[0]];
        }
    }
    return winnings;
}

const playGame = () => {
    let balance = deposit();
    const lines = numLines();
    const betAmount = bet(balance);
    const reels = spin();
    const rows = transpose(reels);
    display(rows);
    const winnings = win(rows, betAmount, lines);
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = `You won $${winnings}`;
}

document.getElementById("playButton").addEventListener("click", playGame);
