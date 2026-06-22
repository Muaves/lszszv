
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
            toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" style="color: rgb(255, 255, 255); --darkreader-inline-color: var(--darkreader-text-ffffff, #e8e6e3);" width="21" height="21" viewBox="0 0 32 32"><path fill="currentColor" d="M15 2h2v5h-2zm6.688 6.9l3.506-3.506l1.414 1.414l-3.506 3.506zM25 15h5v2h-5zm-3.312 8.1l1.414-1.413l3.506 3.506l-1.414 1.414zM15 25h2v5h-2zm-9.606.192L8.9 21.686l1.414 1.414l-3.505 3.506zM2 15h5v2H2zm3.395-8.192l1.414-1.414L10.315 8.9L8.9 10.314zM16 12a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6"></path></svg>';
        } else {
            document.body.classList.remove(darkClass);
            toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" style="color: rgb(0, 0, 0); --darkreader-inline-color: var(--darkreader-text-000000, #e8e6e3);" width="21" height="21" viewBox="0 0 24 24"><path fill="currentColor" d="M12.741 20.917a9.4 9.4 0 0 1-1.395-.105a9.141 9.141 0 0 1-1.465-17.7a1.18 1.18 0 0 1 1.21.281a1.27 1.27 0 0 1 .325 1.293a8.1 8.1 0 0 0-.353 2.68a8.27 8.27 0 0 0 4.366 6.857a7.6 7.6 0 0 0 3.711.993a1.242 1.242 0 0 1 .994 1.963a9.15 9.15 0 0 1-7.393 3.738M10.261 4.05a.2.2 0 0 0-.065.011a8.137 8.137 0 1 0 9.131 12.526a.22.22 0 0 0 .013-.235a.23.23 0 0 0-.206-.136a8.6 8.6 0 0 1-4.188-1.116a9.27 9.27 0 0 1-4.883-7.7a9.1 9.1 0 0 1 .4-3.008a.29.29 0 0 0-.069-.285a.18.18 0 0 0-.133-.057"></path></svg>';
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
