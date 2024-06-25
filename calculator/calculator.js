
const display = document.getElementById("display");

let appendToDisplay = (input) => {
    if (display.value === "0"){
        display.value = input;
    }else {
        display.value += input;
    }

}

const calculate = (input) => {
    try{
        display.value = eval(display.value);
    }
    catch(error){
        display.value = "ERR"
    }
}

const clearDisplay = (input) => {
    display.value = "0";
}

const negate = (input) => {
    display.value = (parseFloat(display.value) * -1).toString();
}

const percentage = (input) => {
    display.value = (parseFloat(display.value) / 100).toString();
}