/*-------------------------------- Constants --------------------------------*/
const words = [
    { word: "scramble", hint: "To mix up" },
    { word: "chocolate", hint: "A sweet treat" },
    { word: "library", hint: "A place for books" },
    { word: "butterfly", hint: "A colorful insect" },
    { word: "giraffe", hint: "Tall animal with spots" },
    { word: "elephant", hint: "Big animal with a trunk" },
    { word: "mountain", hint: "High landform" },
    { word: "rainbow", hint: "Colors in the sky after rain" },
    { word: "computer", hint: "A device for processing data" },
    { word: "astronaut", hint: "Space traveler" },
    { word: "sandwich", hint: "Food with bread layers" },
    { word: "vacation", hint: "Time off work or school" },
    { word: "chicken", hint: "Farm animal that clucks" },
    { word: "festival", hint: "A celebration or event" },
    { word: "sunflower", hint: "Tall yellow flower" }
];


/*---------------------------- Variables (state) ----------------------------*/
let msgs;
let tie;
let correctWord;
let inputText;
let cakeCount = 0;
let limeCount = 0;
let lastWord = "";
let timeLeft;
let timeId = null;



/*------------------------ Cached Element References ------------------------*/
const startEls = document.querySelector("#startButton");
const displayWord = document.querySelector(".word");
const inputEl = document.querySelector("#userInput");
const displayHint = document.querySelector(".hint");
const refreshBtn = document.querySelector(".refreshWord");
const submitBtn = document.querySelector(".submitWord");
const quitBtn = document.querySelector(".quit");
const tryAgainBtn = document.querySelector(".tryAgain");
const cakeArea = document.querySelector(".correct")
const limeArea = document.querySelector(".wrong")
const displayTime = document.querySelector(".timer")
const msgArea = document.querySelector("#msg")
const msgsArea = document.querySelector("#msgs")




/*-------------------------------- Functions --------------------------------*/
function init() {
    cakeCount;
    limeCount;
    timeLeft;

    cakeArea.innerHTML = cakeCount;
    limeArea.innerHTML = limeCount;

    // clears the inputfield
    inputEl.value = "";
    inputEl.setAttribute("maxlength", correctWord.length);
    msgArea.style.display = "none";
}

function initGame() {
    cakeCount = 0;
    limeCount = 0;
    timeLeft = 30;
    cakeArea.innerHTML = cakeCount;
    limeArea.innerHTML = limeCount;


    selectNewWord();

    displayTime.innerHTML = timeLeft;
    // clears the inputfield
    inputEl.value = "";
    inputEl.setAttribute("maxlength", correctWord.length);
    msgArea.style.display = "none";

}


function selectNewWord() {
    let randomObj;
    do {
        randomObj = words[Math.floor(Math.random() * words.length)];

    } while (randomObj.word === lastWord)
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {  // using the fisher-yates algorithm
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    displayWord.innerText = wordArray.join("");
    displayHint.innerText = randomObj.hint;

    lastWord = randomObj.word;
    correctWord = randomObj.word.toLowerCase();

    timer()
}

function timer() {
    clearInterval(timeId);
    timeId = null;
    timeId = setInterval(() => {
        timeLeft--;
        displayTime.innerHTML = `${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timeId);
           
            winGame();
        }

    }, 1000)

}
function checkWord() {

    inputText = inputEl.value.toLowerCase();

    if (!inputText) {
        cakeArea.innerHTML = cakeCount;
        limeArea.innerHTML = limeCount;

        return "enter a valid word"

    }
    if (correctWord === inputText) {
        cakeCount++;
        cakeArea.innerHTML = cakeCount;
    }
    else {
        limeCount++;
        limeArea.innerHTML = limeCount;

    }

    selectNewWord();
    inputEl.value = "";
    inputEl.setAttribute("maxlength", correctWord.length);
}

function reset() {
    clearInterval(timeId);
    if (!inputEl.value) {

        selectNewWord()

        cakeArea.innerHTML = cakeCount;
        limeArea.innerHTML = limeCount;

    }

    msgArea.style.display = "none";
}

function winGame() {
    clearInterval(timeId);
    if (cakeCount > limeCount) {
        msgArea.style.display = "block";
        msgsArea.innerHTML = "congratulations!!! have some cakes it's delicious"
    } else if (cakeCount === limeCount) {
        
        msgArea.style.display = "block"
        msgsArea.innerHTML = "Yeah!!! good memory! you should try again!."
    } else {
        msgArea.style.display = "block"
        msgsArea.innerHTML = "Oops!!! the lime is a sour."
    }
}

function endGame() {
    clearInterval(timeId);   
    winGame()
}


/*----------------------------- Event Listeners -----------------------------*/
startEls.addEventListener('click', initGame);
submitBtn.addEventListener('click', checkWord);
refreshBtn.addEventListener('click', reset);
tryAgainBtn.addEventListener('click', init)