const scoreBoard = JSON.parse(localStorage.getItem('score')) ||{ // default operator in use
    Wins: 0,
    Loses: 0,
    Ties: 0
  };

  updateScoreElement();  

  /*
if (score === null){
  score = {
    Wins: 0,
    Loses: 0,
    Ties: 0
  }
}
*/

/*console.log(localStorage.getItem('score'));*/  // to get a value from localStorage.

let isAutoPlaying = false;

let intervalId = setInterval();// the setInterval() function actually returns a value, that value can be stored and be used for things like stopping the interval using clearInterval();

function autoplay(){
  if (!isAutoPlaying){
  intervalId = setInterval(function() {
    const playerMove = pickComputerMove();
    playGame(playerMove)
  }, 1000);
  isAutoPlaying = true; 
}
  else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }

};

document.querySelector('js-rock-button')
    .addEventListener('click', () => {playGame('rock')});

    document.querySelector('js-rock-button')
    .addEventListener('click', () => {playGame('paper')});

    document.querySelector('js-rock-button')
    .addEventListener('click', () => {playGame('scissor')});


document.body.addEventListener('keydown', (event) => {

  if (event.key === 'r'){
    playGame('rock');
  }
  else if (event.key === 'p'){
    playGame('paper');
  }
  else if (event.key === 's'){
    playGame('scissors');
  }
  console.log('keydown');
  console.log(event.key)
})




function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You Lose.";
    } else if (computerMove === "paper") {
      result = "You Win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You Win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You Lose.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You Lose.";
    } else if (computerMove === "scissors") {
      result = "You Win.";
    }
  }
  if (result === "You Win.") {
    scoreBoard.Wins++;
  } else if (result === "You Lose.") {
    scoreBoard.Loses++;
  } else if (result === "Tie.") {
    scoreBoard.Ties++;
  }

  localStorage.setItem('score', JSON.stringify(scoreBoard)); // JSON objects can be converted into strings and stored in local storage or cookies.

 
  updateScoreElement();

  document.querySelector('.js-result')
      .innerHTML= result;

  document.querySelector('.js-moves')
      .innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon" alt=""
>
<img src="images/${computerMove}-emoji.png" alt="">
Computer`; 

  alert(`You picked ${playerMove}. computer picked ${computerMove}. ${result}
             Wins: ${scoreBoard.Wins}, Loses: ${scoreBoard.Loses}, Ties: ${scoreBoard.Ties}`);
}

function updateScoreElement(){
  document.querySelector('.js-score')
      .innerHTML =  `Wins: ${scoreBoard.Wins}, Loses: ${scoreBoard.Loses}, Ties: ${scoreBoard.Ties}`;
   
}

function pickComputerMove() {
  const randomNumber = Math.random();

  computerMove = "";

  if (randomNumber >= 0 && randomNumber <= 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}