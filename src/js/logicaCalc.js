const result = document.querySelector('.result');
const buttons = document.querySelectorAll('.buttons button');

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!isNaN(key)) {
        addDigit(key);
    } else if (key === ',' || key === '.') {
        addDigit(',');
    } else if (['+', '-', '*', '/'].includes(key)) {
        setOperator(key === '*' ? 'x' : (key === '/' ? '÷' : key));
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Escape') {
        clearCalculator();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === '+') {
        setPercentage();
    }
});

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;

function updateResult(originClear = false) {
    result.innerHTML = originClear ? 0 : currentNumber.replace(".", ",");
}

function addDigit(digit) {
    if (digit === "," && (currentNumber.includes(",") || !currentNumber))
        return;

    if (restart) {
        currentNumber = digit;
        restart = false;
    } else if (currentNumber === "0" && digit !== ",") {
        currentNumber = digit;
    } else {
        currentNumber += digit;
    }

    updateResult();
}

function setOperator(newOperador) {
    if (currentNumber) {
        calculate();

        firstOperand = parseFloat(currentNumber.replace(",", "."));
        currentNumber = "";
    }

    operator = newOperador;
}

function calculate() {
    if (operator === null || firstOperand === null) return;
    let secondOperand = parseFloat(currentNumber.replace(",", "."));
    let resultValue;

    switch (operator) {
        case "+":
            resultValue = firstOperand + secondOperand;
            break;
        case "-":
            resultValue = firstOperand - secondOperand;
            break;
        case "x":
            resultValue = firstOperand * secondOperand;
            break;
        case "÷":
            resultValue = firstOperand / secondOperand;
            break;
        default:
            return;
    }
    if (resultValue.toString().split(".")[1]?.length > 5) {
        currentNumber = parseFloat(resultValue.toFixed(5)).toString();
    } else {
        currentNumber = resultValue.toString();
    }

    operator = null;
    firstOperand = null;
    restart = true;
    percentageValue = null;
    updateResult();
}

function clearCalculator() {
    currentNumber = "";
    firstOperand = null;
    operator = null;
    updateResult(true);
}

function setPercentage() {
    let result = parseFloat(currentNumber) / 100;

    if (["+", "-"].includes(operator)) {
        result = result * (firstOperand || 1);
    }

    if (result.toString().split(".")[1]?.length > 5) {
        result = result.toFixed(5).toString();
    }

    currentNumber = result.toString();
    updateResult();
}

function setRaiz() {
    let result = Math.sqrt(parseFloat(currentNumber));
    currentNumber = result.toString();
    updateResult();
}

function setPotence() {
    let result = Math.pow(parseFloat(currentNumber), 2);
    currentNumber = result.toString();
    updateResult();
}

function backspace() {
    if (currentNumber.length > 0) {
        currentNumber = currentNumber.slice(0, -1);
        if (currentNumber === "") {
            currentNumber = "0";
        }
        updateResult();
    }
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonText = button.innerHTML;
        if (/^[0-9,.]+$/.test(buttonText)) {
            addDigit(buttonText);
        } else if (["+", "-", "x", "÷"].includes(buttonText)) {
            setOperator(buttonText);
        } else if (buttonText === "=") {
            calculate();
        } else if (buttonText === "C" || buttonText === "CE") {
            clearCalculator();
        } else if (buttonText === "+/-") {
            currentNumber = (
                parseFloat(currentNumber || firstOperand) * -1
            ).toString();
            updateResult();
        } else if (buttonText === "%") {
            setPercentage();
        } else if (button.querySelector('.bi-backspace')) {
            backspace();
        } else if (buttonText === "√") {
            setRaiz();
        } else if (buttonText === "x²") {
            setPotence();
        }
    });
});