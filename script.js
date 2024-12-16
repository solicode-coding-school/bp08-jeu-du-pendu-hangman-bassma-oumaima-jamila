const wordDisplay = document.getElementById('word');
const hintText = document.getElementById('hint');
const keys = document.querySelectorAll('.key');
const bodyParts = [
    '.face',
    '.chest',
    '.hand-left',
    '.hand-right',
    '.foot-left',
    '.foot-right'
];

// Word list with hints
const words = [
    { word: "JAVASCRIPT", hint: "A popular programming language" },
    { word: "PYTHON", hint: "A snake-named programming language" },
    { word: "HTML", hint: "Markup language for web pages" },
    { word: "DATABASE", hint: "Organized collection of data" },
    { word: "CSS", hint: "Styles web pages" }
];

let currentWord = "";
let currentHint = "";
let wrongGuesses = 0;
let guessedLetters = [];
function initGame() {
    bodyParts.forEach(part => {
        document.querySelector(part).style.display = 'none';
    });
    wrongGuesses = 0;
    guessedLetters = [];
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex].word;//khtar kalima eaxwaiya
    currentHint = words[randomIndex].hint;//xarh dkalima
    hintText.textContent = `Hint: ${currentHint}`;
    updateWordDisplay();

    keys.forEach(key => {
        key.disabled = false;
        key.classList.remove('disabled');
    });
}
// leard kalima
function updateWordDisplay() {
    const display = currentWord
        .split('')//ida kan ok kayban h
        .map(letter => guessedLetters.includes(letter) ? letter : "_")//ida kan no ok
        .join(' ');
    wordDisplay.textContent = display;
}
// qitae booy
function showBodyPart() {
    if (wrongGuesses <= bodyParts.length) {
        const part = document.querySelector(bodyParts[wrongGuesses - 1]);
        if (part) part.style.display = 'block';
    }
}
// tahaqaq mn fawz
function checkWin() {
    return currentWord.split('').every(letter => guessedLetters.includes(letter));
}
// clave
function handleGuess(letter) {
    if (guessedLetters.includes(letter)) return; //harf dija tkhtar

    guessedLetters.push(letter); //kaytzad harf v

    if (!currentWord.includes(letter)) { //hrf makaynxi
        wrongGuesses++; //zid eadad akhtae
        showBodyPart();  //byn aedae

        if (wrongGuesses === bodyParts.length) {  
            setTimeout(() => {
                alert(`Game Over! The word was: ${currentWord}`);
                initGame();//ieadat taxril loueba
            }, 500);
            return;
        }
    }

    updateWordDisplay();

    if (checkWin()) {
        setTimeout(() => {
            alert('Congratulations! You won!');//ida faz
            initGame();
        }, 500);
    }
}

keys.forEach(key => {
    key.addEventListener('click', (e) => {
        const letter = e.target.textContent;
        e.target.disabled = true; //ida wqae clik waqaf dk harf
        e.target.classList.add('disabled');//byn bli no ok
        handleGuess(letter);
    });
});
initGame();