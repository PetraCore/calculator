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
        let offset = (content < 0) ? 2 : 1;
        DISPLAY.textContent = preciseRound(content, MAX_NUMBER_LENGTH - offset 
        - String(preciseRound(content)).length); 
    } else {
        let offset = (content < 0) ? 8 : 7;
        DISPLAY.textContent = content.toExponential(MAX_NUMBER_LENGTH - offset);
    }
}

function appendToDisplay(content) {
    if (verifyDisplayContent(DISPLAY.textContent + content)) {
        DISPLAY.textContent += content;
    }
}

function updateDisplay(event, content) {
    if (!content && event) {
        content = event.target.textContent;
    }
    if (content) {
        if (isDisplayingResult) {
            display('0');
            isDisplayingResult = false;
        }

        if (isEvaluating) {
            clear();
        }

        if(Number(DISPLAY.textContent) === 0
        && content !== '.' && !DISPLAY.textContent.includes('.')) {

            if(content === '00') display('0');
            else display(content);

        } else {
            if (content !== '.') {
                appendToDisplay(content);
                return;
            }
            if (!DISPLAY.textContent.includes('.')) {
                appendToDisplay(content);
            }
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
    setNumberFromDisplay();

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

function handleOpBtn(event, op) {
    if (op) {
        switch(op) {
            case '=': {
                evaluate();
                break;
            }
            case '+/-': {
                negate();
                break;
            }
            case '+':
            case '-':
            case '*':
            case '/': {
                calculate(op);
                break;
            }
        }
        return;
    }

    if (!event) return;
    switch (event.target.id) {
        case 'evaluate': {
            evaluate();
            break;
        }
        case 'negate': {
            negate();
            break;
        }
        case 'add': {
            calculate('+');
            break;
        }
        case 'subtract': {
            calculate('-');
            break;
        }
        case 'multiply': {
            calculate('*');
            break;
        }
        case 'divide': {
            calculate('/');
            break;
        }
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

    const opBtns = document.querySelectorAll('.operation');
    opBtns.forEach((opBtn) => {
        opBtn.addEventListener('click', handleOpBtn);
    });
}

function trackKeyboardEvents() {
    window.addEventListener('keydown', (event) => {
        const key = event.key;
        console.log(key);
        switch(key) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '.': {
                updateDisplay(event, key);
                break;
            }
            case ')': {
                updateDisplay(event, '00');
                break;
            }
            case '+': {
                handleOpBtn(undefined, '+');
                break;
            }
            case '-': {
                handleOpBtn(undefined, '-');
                break;
            }
            case '*': {
                handleOpBtn(undefined, '*');
                break;
            }
            case '/': {
                handleOpBtn(undefined, '/');
                break;
            }
            case '=':
            case 'Enter': {
                handleOpBtn(undefined, '=');
                break;
            }
            case '_': {
                handleOpBtn(undefined, '+/-');
                break;
            }
            case 'c': {
                clearEntry();
                break;
            }
            case 'C':
            case 'Escape': {
                clear();
                break;
            }
        }
    });
}

initializeButtons();
trackKeyboardEvents();