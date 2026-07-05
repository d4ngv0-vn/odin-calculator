const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    return a / b;
}

const operate = (operator, a, b) => {
    let funcMap = [['+', add], ['-', subtract], ['*', multiply], ['/', divide]];
    for (let [op, f] of funcMap) {

        if (op == operator) {
            return f(a, b);
        }
    }
}

const isDigit = (c) => {
    return c >= '0' && c <= '9';
}

const isOperator = (c) => {
    return c == '+' || c == '-' || c == '*' || c == '/';
}

const btnHandler = (str) => {
    // number operator = . CE C
    if (str.length == 1 && isDigit(str)) {
        if (state == 'RESULT') {
            state = 'FIRST';
        }
        
        if (currNum == '0') {
            currNum = '';
        }
        currNum += str;
        
        screen.textContent = currNum;
    } else if (str.length == 1 && isOperator(str)) {
        if (state == 'FIRST') {
            numA = Number(currNum);
            currNum = '0';
            state = 'SECOND';   
            isDot = false;
        } else if (state == 'SECOND') {
            numB = Number(currNum);
            currNum = '0';
            numA = operate(operator, numA, numB);
            screen.textContent = String(numA);
            isDot = false;
        } else if (state == 'RESULT') {
            state = 'SECOND';  
        }
        operator = str;
    } else if (state == 'SECOND' && str.length == 1 && str == '=' && operator != '')  {
        numB = Number(currNum);
        currNum = '0';
        numA = operate(operator, numA, numB);
        operator = '';
        screen.textContent = String(numA);
        state = 'RESULT';
        isDot = false;
    } else if (str.length == 1 && str == '.') {
        if (!isDot) {
            currNum += '.'
            screen.textContent = currNum;
            isDot = true;
        }
    } else if (str == 'CE') {
        resetCal();
    } else if (str == 'C') {
        currNum = '0';
        screen.textContent = currNum;
    } else if (str == 'BS') {
        if (currNum.length >= 1) {
            currNum = currNum.slice(0, currNum.length-1);
            if (currNum.length == 0) {
                currNum = '0';
            }
            screen.textContent = currNum;
        }
    }
    history.textContent = `${ state == 'FIRST' ? '' : numA } ${operator}`;
}

const resetCal = () => {
    currNum = '0';
    history.textContent = '';
    numA = 0;
    numB = 0;
    operator = '';
    state = 'FIRST';
    isDot = false;
    screen.textContent = currNum;
}

const btnInit = () => {
    for (let btn of calBtnContainer.children) {
        btn.addEventListener('click', (event) => {
            btnHandler(event.target.textContent);
        })
    }
    
}

const UIInit = () => {
    screen.textContent = currNum;
}

let isDot = false;
let state = 'FIRST'; // FIRST SECOND 
let numA, numB, operator = '';
let currNum = '0';

const calBtnContainer = document.getElementById('cal-btn-container');
const screen = document.getElementById('number');
const history = document.getElementById('history');
const calculator = document.getElementById('calculator');

const keyboardMap = (k) => {
    if (isDigit(k) || isOperator(k) || k == '=') {
        return k;
    } else if (k == 'Backspace') {
        return 'BS';
    } else if (k == ' ') {
        return 'C';
    } else if (k == 'Enter') {
        return 'CE';
    } else if (k == '.') {
        return '.';
    }
    return '';
}
btnInit();
resetCal();
UIInit();
document.onkeydown = (e) => {
    btnHandler(keyboardMap(e.key));
}
