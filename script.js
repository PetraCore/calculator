const DISPLAY = document.querySelector('.display');
let firstNumber = 0;
let secondNumber = 0;
let operator = '';

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operator, x, y) {
    switch(operator) {
        case '+': {
            return add(x, y);
            break;
        }
        case '-': {
            return subtract(x, y);
            break;
        }
        case '*': {
            return multiply(x, y);
            break;
        }
        case '/': {
            return divide(x, y);
            break;
        }
    }
}

function updateDisplay(event, content) {
    if (event) {
        content = event.target.textContent;
    }
    if (content) {
        DISPLAY.textContent += content;
    }
}

function clear() {
    DISPLAY.textContent = '';
    firstNumber = 0;
    secondNumber = 0;
    operator = '';
}

function clearEntry() {
    DISPLAY.textContent = '';
}

function initializeButtons() {
    let digitBtns = document.querySelectorAll('.btn.digit');
    digitBtns.forEach((digitBtn) => {
        digitBtn.addEventListener('click', updateDisplay);
    });

    let cBtn = document.querySelector('#c');
    cBtn.addEventListener('click', clear);

    let ceBtn = document.querySelector('#ce');
    ceBtn.addEventListener('click', clearEntry);
}

initializeButtons();