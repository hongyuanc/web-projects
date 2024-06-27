const ROWS = 3;
const COLS = 3;
const SYMBOLS = ['🍒', '🍋', '🍊', '🍇', '7️⃣', '💎'];

const VALUES = {
    '🍒': 2,
    '🍋': 3,
    '🍊': 4,
    '🍇': 5,
    '7️⃣': 7,
    '💎': 10
};

let balance = 100;

function createReels() {
    const reelsContainer = document.getElementById('reels');
    for (let i = 0; i < COLS; i++) {
        const reel = document.createElement('div');
        reel.className = 'reel';
        const reelContainer = document.createElement('div');
        reelContainer.className = 'reel-container';
        reel.appendChild(reelContainer);
        reelsContainer.appendChild(reel);
    }
}

function spin() {
    return Array.from({ length: COLS }, () =>
        Array.from({ length: ROWS + 15 }, () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])
    );
}

function display(reels) {
    const reelContainers = document.querySelectorAll('.reel-container');
    reelContainers.forEach((container, i) => {
        container.innerHTML = '';
        reels[i].forEach(symbol => {
            const symbolElement = document.createElement('div');
            symbolElement.className = 'symbol';
            symbolElement.textContent = symbol;
            container.appendChild(symbolElement);
        });
    });
}

function animateSpin(reels) {
    return new Promise(resolve => {
        const reelContainers = document.querySelectorAll('.reel-container');
        reelContainers.forEach((container, i) => {
            const delay = i * 0.2;
            container.style.transition = 'none';
            container.style.transform = 'translateY(0)';
            setTimeout(() => {
                container.style.transition = `transform 5s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s`;
                container.style.transform = `translateY(-${container.querySelector('.symbol').offsetHeight * 15}px)`;
            }, 50);
        });
        setTimeout(resolve, 5500);
    });
}

function win(rows, betAmount, lines) {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let same = true;
        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                same = false;
                break;
            }
        }
        if (same) {
            winnings += betAmount * VALUES[symbols[0]];
        }
    }
    return winnings;
}

async function playGame() {
    const depositInput = document.getElementById("depositInput");
    const linesInput = document.getElementById("linesInput");
    const betInput = document.getElementById("betInput");
    const playButton = document.getElementById("playButton");
    const resultDiv = document.getElementById("result");

    balance = parseFloat(depositInput.value);
    const lines = parseInt(linesInput.value);
    const betAmount = parseFloat(betInput.value);

    if (isNaN(balance) || isNaN(lines) || isNaN(betAmount) || balance <= 0 || lines < 1 || lines > 3 || betAmount <= 0 || betAmount * lines > balance) {
        alert("Invalid input. Please check your values and try again.");
        return;
    }

    playButton.disabled = true;
    balance -= betAmount * lines;
    depositInput.value = balance.toFixed(2);

    const reels = spin();
    display(reels);
    await animateSpin(reels);

    const rows = reels.map(reel => reel.slice(-3));
    const winnings = win(rows, betAmount, lines);
    balance += winnings;
    depositInput.value = balance.toFixed(2);

    resultDiv.textContent = winnings > 0 ? `You won $${winnings.toFixed(2)}!` : "Try again!";
    playButton.disabled = false;
}

createReels();
document.getElementById('playButton').addEventListener('click', playGame);