
/* Számologep Core-ja */

var currentValue = 0;
var storedValue = null;
var operator = null;
var waitingForNewNumber = false;

function updateDisplay(value, isError = false) {
    var display = document.getElementById('display');

    display.classList.remove(
        'error',
        'animate__animated',
        'animate__shakeX'
    );

    display.innerText = value;
    display.scrollLeft = display.scrollWidth;

    if (isError) {
        display.classList.add(
            'error',
            'animate__animated',
            'animate__shakeX'
        );
    }
}

function addNum(n) {
    var display = document.getElementById('display');

    if (waitingForNewNumber) {
        updateDisplay(n);
        waitingForNewNumber = false;
    } else {
        updateDisplay(display.innerText === '0' ? n : display.innerText + n);
    }
}

function calculate(a, b, op) {
    if (op === '+') return a + b;
    if (op === '-') return a - b;
    if (op === '×') return a * b;
    if (op === '÷') return b === 0 ? Infinity : a / b;
    return b;
}

function handleOperator(nextOp) {
    var inputValue = parseFloat(document.getElementById('display').innerText);

    if (storedValue === null) {
        storedValue = inputValue;
    } else if (operator) {
        var result = calculate(storedValue, inputValue, operator);

        if (isNaN(result)) {
            updateDisplay('Error', true);
            resetCalc();
            return;
        }

        if (!isFinite(result)) {
            updateDisplay('∞', true);
            resetCalc();
            return;
        }

        storedValue = result;
        updateDisplay(result);
    }

    operator = nextOp;
    waitingForNewNumber = true;
}

function equals() {
    if (operator === null) return;

    var inputValue = parseFloat(document.getElementById('display').innerText);
    var result = calculate(storedValue, inputValue, operator);

    if (isNaN(result)) {
        updateDisplay('Error', true);
    } else if (!isFinite(result)) {
        updateDisplay('∞', true);
    } else {
        updateDisplay(result);
    }

    resetCalc();
}

function clearAll() {
    updateDisplay('0');
    resetCalc();
}

function resetCalc() {
    storedValue = null;
    operator = null;
    waitingForNewNumber = true;
}



document.addEventListener('click', function (e) {
    var btn = e.target.closest('.expand-btn');
    if (!btn) return;

    var targetId = btn.getAttribute('data-target');
    var more = document.getElementById(targetId);
    var card = btn.closest('.blog-card');
    var expanded = btn.getAttribute('aria-expanded') === 'true';

    btn.setAttribute('aria-expanded', String(!expanded));
    if (more) more.setAttribute('aria-hidden', String(expanded));
    if (card) card.classList.toggle('expanded', !expanded);

    var label = btn.querySelector('span:first-child');
    if (label) {
        label.textContent = expanded ? 'Show installation' : 'Show less';
    }
});



(function () {
    var toggle = document.getElementById('theme-toggle');
    var darkClass = 'theme-dark';

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add(darkClass);
            toggle.textContent = '☀️';
        } else {
            document.body.classList.remove(darkClass);
            toggle.textContent = '🌙';
        }
    }

    var saved = localStorage.getItem('theme');
    if (!saved) {
        saved = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    }

    applyTheme(saved);

    toggle.addEventListener('click', function () {
        var next = document.body.classList.contains(darkClass)
            ? 'light'
            : 'dark';
        applyTheme(next);
        localStorage.setItem('theme', next);
    });
})();


function shakeDisplay() {
    const display = document.getElementById('display');
    display.classList.remove('shake');
    void display.offsetWidth;
    display.classList.add('shake');
}

function handleResult(result) {
    const display = document.getElementById('display');

    display.classList.remove('error');

    if (isNaN(result)) {
        display.textContent = 'Error';
        display.classList.add('error', 'animate__animated', 'animate__shakeX');
    } else if (!isFinite(result)) {
        display.textContent = '∞';
        display.classList.add('animate__animated', 'animate__shakeX');
    } else {
        display.textContent = result;
    }
}
