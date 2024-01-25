const DISPLAY = document.querySelector('.display');
let firstNumber = undefined;
let secondNumber = undefined;
let operator = '';
let isDisplayingResult = false;

function add(x, y = 0) {
    return x + y;
}

function subtract(x, y = 0) {
    return x - y;
}

function multiply(x, y = 1) {
    return x * y;
}

function divide(x, y = 1) {
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
    return x;
}

function updateDisplay(event, content) {
    if (event) {
        content = event.target.textContent;
    }
    if (content) {
        if (isDisplayingResult) {
            DISPLAY.textContent = '';
            isDisplayingResult = false;
        }

        if(Number(DISPLAY.textContent) === 0) {
            DISPLAY.textContent = content;
        } else {
            DISPLAY.textContent += content;
        }
    }
}

function clear() {
    DISPLAY.textContent = '0';
    firstNumber = undefined;
    secondNumber = undefined;
    operator = '+';
}

function clearEntry() {
    if(!isDisplayingResult) {
        DISPLAY.textContent = '0';
    }
}

function setNumberFromDisplay() {
    if (!firstNumber) {
        firstNumber = Number(DISPLAY.textContent);
    } else {
        secondNumber = Number(DISPLAY.textContent);
    }
}

function calculate(op) {
    if (!isDisplayingResult) {
        firstNumber = operate(operator, firstNumber, secondNumber);
    }

    DISPLAY.textContent = firstNumber;
    operator = op;
    isDisplayingResult = true;
}

function evaluate() {
    if (!isDisplayingResult) {
        setNumberFromDisplay();
    }

    firstNumber = operate(operator, firstNumber, secondNumber);
    DISPLAY.textContent = firstNumber;
    isDisplayingResult = true;
}

function negate() {
    DISPLAY.textContent = -Number(DISPLAY.textContent);
    if (isDisplayingResult) {
        firstNumber = -firstNumber;
    }
}

function initializeButtons() {
    const digitBtns = document.querySelectorAll('.btn.digit');
    digitBtns.forEach((digitBtn) => {
        digitBtn.addEventListener('click', updateDisplay);
    });

    const cBtn = document.querySelector('#c');
    cBtn.addEventListener('click', clear);

    const ceBtn = document.querySelector('#ce');
    ceBtn.addEventListener('click', clearEntry);

    const addBtn = document.querySelector('#add');
    addBtn.addEventListener('click', () => {
        setNumberFromDisplay();
        calculate('+');
    });

    const subtractBtn = document.querySelector('#subtract');
    subtractBtn.addEventListener('click', () => {
        setNumberFromDisplay();
        calculate('-');
    });

    const multiplyBtn = document.querySelector('#multiply');
    multiplyBtn.addEventListener('click', () => {
        setNumberFromDisplay();
        calculate('*');
    });

    const divideBtn = document.querySelector('#divide');
    divideBtn.addEventListener('click', () => {
        setNumberFromDisplay();
        calculate('/');
    });

    const evaluateBtn = document.querySelector('#evaluate');
    evaluateBtn.addEventListener('click', evaluate);

    const negateBtn = document.querySelector('#negate');
    negateBtn.addEventListener('click', negate);
}

initializeButtons();