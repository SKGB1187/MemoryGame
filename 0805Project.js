//Array of Images for cards
const chickens = [
  "sparrow.jpeg",
  "sparrow.jpeg",
  "taco.jpeg",
  "taco.jpeg",
  "cumin.jpeg",
  "cumin.jpeg",
  "babayaga.jpeg",
  "babayaga.jpeg",
  "peach.jpeg",
  "peach.jpeg",
  "crest.jpeg",
  "crest.jpeg",
  "perch.jpeg",
  "perch.jpeg",
  "keke.jpeg",
  "keke.jpeg",
];
//Shuffle Array
function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
//Start Game
const form = document.getElementById("events");
let cardCounter = 0;

form.addEventListener("submit", function(e){
  e.preventDefault();

  shuffle(chickens);

  generateCards();

setInterval(updateTimer, 1000);
})

//Generate Cards
function generateCards(){
  for(let chick of chickens){
    const urlOccurrences = crypto.randomUUID();
    const divFront = document.createElement("div");
    divFront.classList.add("front");

    const imgF = document.createElement("img");
    imgF.src = "https://clipart-library.com/2023/cute-bucket-fried-chicken-cartoon-icon-illustration_138676-2713.jpg";

    divFront.appendChild(imgF);

    const divBack = document.createElement("div");
    divBack.classList.add("back");

    const imgB = document.createElement("img");
    imgB.src = chick;
    divBack.appendChild(imgB);

    const divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.appendChild(divFront);
    divCard.appendChild(divBack);

    divCard.setAttribute("data-card-id", chick)

    divCard.addEventListener("click", function(a){
      let e = a.target.closest(".card");
      flipCard.bind(e)();});

    const divMain = document.createElement("div")
    divMain.classList.add("mainContainer");
    divMain.appendChild(divCard);

    const divGame = document.getElementById("gameContainer");
    divGame.appendChild(divMain);
  }
}

//Timer Function
let startTime = Date.now();
function updateTimer() {

  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;

  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);

  document.getElementById('timer').textContent = `Elapsed time:
  ${minutes} minutes : ${seconds} seconds`;
}

let cards = document.getElementsByClassName("card");

let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let tries = 0;


function flipCard() {
  if (lockBoard) {
    return;
  }

  if (this === firstCard) {
    return;
  }
    
  this.classList.add("flipcard");
  
  if (!firstCard) {
    firstCard = this;
    return;
  }
  console.log(firstCard);
  secondCard = this;
  console.log(secondCard);
  tries++;

  lockBoard = true;

  checkForMatch();

  document.getElementById("currentScore").textContent = `Matches: ${score}`;
  document.getElementById("matchAttempts").textContent = `Match Attempts: ${tries}`;
}

function checkForMatch() {
  const firstCardId = firstCard.getAttribute("data-card-id");
  const secondCardId = secondCard.getAttribute("data-card-id");

  if (firstCardId === secondCardId) {
    score++;
    document.getElementById("currentScore").textContent = `Matches: ${score}`;
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipcard");
    secondCard.classList.remove("flipcard");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  tries = 0;
  score = 0;
  startTime = Date.now();
  document.querySelector(".score").textContent = score;
}