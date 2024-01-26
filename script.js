const DISPLAY = document.querySelector('.display');
const MAX_NUMBER_LENGTH = 15;
let firstNumber = undefined;
let secondNumber = undefined;
let operator = '';
let isDisplayingResult = false;
let isEvaluating = false

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
            if (y === 0) {
                window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')
                return NaN; 
            }

            return divide(x, y);
            break;
        }
    }
    return x;
}

function preciseRound(number, precision = 0) {
    return Math.round(number * 10 ** precision) / 10 ** precision;
}

function verifyDisplayContent(content) {
    if (String(content).length <= MAX_NUMBER_LENGTH) {
        return true;
    }
    return false;
}

function display(content) {
    if (verifyDisplayContent(content)) {
        DISPLAY.textContent = content;
        return;
    }

    if (typeof(content) !== 'number') {
        DISPLAY.textContent = 'Overflow!';
        isDisplayingResult = true;
        return;
    }

    if (!Number.isInteger(content)) {
        DISPLAY.textContent = preciseRound(content, MAX_NUMBER_LENGTH - 1 
        - String(preciseRound(content)).length); 
    } else {
        DISPLAY.textContent = content.toExponential(MAX_NUMBER_LENGTH - 7);
    }
}

function appendToDisplay(content) {
    if (verifyDisplayContent(DISPLAY.textContent + content)) {
        DISPLAY.textContent += content;
    }
}

function updateDisplay(event, content) {
    if (event) {
        content = event.target.textContent;
    }
    if (content) {
        if (isDisplayingResult) {
            display('');
            isDisplayingResult = false;
        }

        if (isEvaluating) {
            clear();
        }

        if(Number(DISPLAY.textContent) === 0
        && !DISPLAY.textContent.includes('.')
        && content !== '.') {

            if(content === '00') display('0');
            else display(content);

        } else {
            appendToDisplay(content);
        }
    }
}

function clear() {
    DISPLAY.textContent = '0';
    firstNumber = undefined;
    secondNumber = undefined;
    operator = '';
    isDisplayingResult = false;
    isEvaluating = false;
}

function clearEntry() {
    if(!isDisplayingResult) {
        display(0);
    }
}

function setNumberFromDisplay() {
    if (firstNumber === undefined) {
        firstNumber = Number(DISPLAY.textContent);
    } else {
        secondNumber = Number(DISPLAY.textContent);
    }
}

function calculate(op) {
    if (!isDisplayingResult) {
        firstNumber = operate(operator, firstNumber, secondNumber);
    }

    display(firstNumber);
    operator = op;
    isDisplayingResult = true;
    isEvaluating = false;
}

function evaluate() {
    if (!isDisplayingResult) {
        setNumberFromDisplay();
    }
    if (secondNumber === undefined) {
        secondNumber = firstNumber;
    }

    firstNumber = operate(operator, firstNumber, secondNumber);
    display(firstNumber);
    isDisplayingResult = true;
    isEvaluating = true;
}

function negate() {
    display(-Number(DISPLAY.textContent));
    if (isDisplayingResult) {
        firstNumber = -firstNumber;
    }
}

function initializeButtons() {
    const digitBtns = document.querySelectorAll('.btn.digit');
    digitBtns.forEach((digitBtn) => {
        digitBtn.addEventListener('click', updateDisplay);
    });
    
    const dotBtn = document.querySelector('#dot');
    dotBtn.addEventListener('click', (event) => {
        if (!DISPLAY.textContent.includes('.')) {
            updateDisplay(event);
        }
    })

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