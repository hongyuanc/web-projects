document.addEventListener("DOMContentLoaded", (event) => {
    const display = document.getElementById("display");
    let timer = null;
    let startTime = 0;
    let elapsedTime = 0;
    let isRunning = false;

    const start = () => {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            timer = setInterval(update, 10);
            isRunning = true;
        }
    }

    const pause = () => {
        if (isRunning) {
            clearInterval(timer);
            elapsedTime = Date.now() - startTime;
            isRunning = false;
        }
    }

    const clear = () => {
        clearInterval(timer);
        startTime = 0;
        elapsedTime = 0;
        isRunning = false;
        display.textContent = "00:00:00:00";
    }

    const update = () => {
        const currentTime = Date.now();
        elapsedTime = currentTime - startTime;

        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let milli = Math.floor((elapsedTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milli = String(milli).padStart(2, "0");

        display.textContent = `${hours}:${minutes}:${seconds}:${milli}`;
    }

    document.getElementById("start").addEventListener("click", start);
    document.getElementById("pause").addEventListener("click", pause);
    document.getElementById("clear").addEventListener("click", clear);
});
