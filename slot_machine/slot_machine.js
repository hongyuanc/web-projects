
const prompt = require("prompt-sync")();

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

const bet = () => {

    while (true){
        const bet = parseFloat(prompt("Place bet: "));

        if (isNaN(bet)){
            console.log("Invalid number.");
        } else {
            return bet;
        }
    }
}

const depositAmount = deposit();
const lines = numLines();
const betAmount = bet();




