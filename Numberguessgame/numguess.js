let chances = 4;
let targetNumber = Math.floor(Math.random() * 10 + 1);//+1
const buttons = document.querySelectorAll('.circle-button');
const slider = document.getElementById('slider');
const resultMessage = document.getElementById('result');
const chancesMessage = document.getElementById('chances');
const message = document.getElementById('message');
const refreshButton = document.getElementById('refresh');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const guessedNumber = parseInt(button.textContent);
        slider.value = guessedNumber; // Set slider value to the clicked number
        checkGuess(guessedNumber);
    });
});

slider.addEventListener('input', () => {
    const guessedNumber = parseInt(slider.value);
    highlightButton(guessedNumber, 'guess');
    showMessage('');
});

slider.addEventListener('change', () => {
    const guessedNumber = parseInt(slider.value);
    checkGuess(guessedNumber);
});

refreshButton.addEventListener('click', () => {
    resetGame();
});

function checkGuess(guessedNumber) {
    if (chances > 0) {
        chances--;

        if (guessedNumber === targetNumber) {
            resultMessage.textContent = `Congratulations! You guessed the correct number: ${targetNumber}`;
            resultMessage.style.color = 'green';
            disableGame();
            highlightButton(guessedNumber, 'correct');
            showMessage('');
        } else {
            if (chances === 0) {
                resultMessage.textContent = `Sorry, you're out of chances. The correct number was ${targetNumber}.`;
                resultMessage.style.color = 'red';
                disableGame();
                showMessage('');
            } else {
                resultMessage.textContent = `Try again!`;
                chancesMessage.textContent = `Attempts left: ${chances}`;
                highlightButton(guessedNumber, guessedNumber < targetNumber ? 'lower' : 'higher');
                showMessage(guessedNumber < targetNumber ? 'This number is  small' : 'This number is  Large');
            }
        }
    }
}

function showMessage(text) {
    message.textContent = text;
}

function disableGame() {
    buttons.forEach(button => button.disabled = true);
    slider.disabled = true;
}

function highlightButton(number, className) {
    buttons.forEach(button => button.classList.remove('correct', 'higher', 'lower', 'guess'));
    const button = document.querySelector(`.circle-button:nth-child(${number})`);
    button.classList.add(className);
}

function resetGame() {
    chances = 4;
    targetNumber = Math.floor(Math.random() * 10) + 1;
    buttons.forEach(button => {
        button.classList.remove('correct', 'higher', 'lower', 'guess');
        button.disabled = false;
    });
    slider.value = 5;
    slider.disabled = false;
    resultMessage.textContent = '';
    chancesMessage.textContent = `Attempts left: 4`;
    message.textContent = '';
}