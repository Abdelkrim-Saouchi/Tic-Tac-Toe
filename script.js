/* eslint-disable no-lonely-if */
const gameBoard = [];

// let playerOneChoice = 'X';
// let playerTwoChoice = 'O';

const Player = (choice, status) => {
  let canPlay = status;
  const setPlay = (setValue) => {
    canPlay = setValue;
  };
  return { choice, setPlay, canPlay };
};

const playerOne = Player('X', true);
const playerTwo = Player('O', false);

const choiceDivs = Array.from(document.querySelectorAll('.choice'));
const gameGrid = document.querySelector('.game-grid');
const gameGridCells = document.querySelectorAll('.game-grid-cell');

const renderDom = () => {
  gameGridCells.forEach((gameGridCell) => {
    gameGridCell.textContent = gameBoard[gameGridCell.dataset.index];
  });
};

const declareResult = (playerMark) => {
  if (
    (gameBoard[0] === playerMark &&
      gameBoard[1] === playerMark &&
      gameBoard[2]) === playerMark ||
    (gameBoard[3] === playerMark &&
      gameBoard[4] === playerMark &&
      gameBoard[5]) === playerMark ||
    (gameBoard[6] === playerMark &&
      gameBoard[7] === playerMark &&
      gameBoard[8]) === playerMark
  ) {
    console.log('enter 1');
    console.log(`${playerMark} wins`);
  } else if (
    (gameBoard[0] === playerMark &&
      gameBoard[3] === playerMark &&
      gameBoard[6]) === playerMark ||
    (gameBoard[1] === playerMark &&
      gameBoard[4] === playerMark &&
      gameBoard[7]) === playerMark ||
    (gameBoard[2] === playerMark &&
      gameBoard[5] === playerMark &&
      gameBoard[8]) === playerMark
  ) {
    console.log('enter 2');
    console.log(`${playerMark} wins`);
  } else if (
    (gameBoard[0] === playerMark &&
      gameBoard[4] === playerMark &&
      gameBoard[8]) === playerMark ||
    (gameBoard[2] === playerMark &&
      gameBoard[4] === playerMark &&
      gameBoard[6]) === playerMark
  ) {
    console.log('enter 3');
    console.log(`${playerMark} wins`);
  } else {
    console.log('enter 4');
    console.log(gameBoard.length);
    if (!gameBoard.includes(undefined) && gameBoard.length === 9)
      console.log('Tie');
  }
};

choiceDivs.forEach((choiceDiv) => {
  choiceDiv.addEventListener('click', (e) => {
    const { choice } = e.target.dataset;
    if (choice.includes('1')) {
      if (choice === '1-x') {
        playerOne.choice = 'X';
        playerTwo.choice = 'O';
      } else {
        playerOne.choice = 'O';
        playerTwo.choice = 'X';
      }
    } else {
      if (choice === '2-x') {
        playerOne.choice = 'O';
        playerTwo.choice = 'X';
      } else {
        playerOne.choice = 'X';
        playerTwo.choice = 'O';
      }
    }
  });
});

gameGridCells.forEach((gameGridCell) => {
  gameGridCell.addEventListener('click', (e) => {
    if (
      e.target.textContent !== playerOne.choice &&
      e.target.textContent !== playerTwo.choice
    ) {
      if (playerOne.canPlay) {
        gameBoard[e.target.dataset.index] = playerOne.choice;
        playerOne.canPlay = false;
        playerTwo.canPlay = true;
        renderDom();
        declareResult(playerOne.choice);
        // declareResult(playerTwo.choice);
      } else {
        gameBoard[e.target.dataset.index] = playerTwo.choice;
        playerTwo.canPlay = false;
        playerOne.canPlay = true;
        renderDom();
        declareResult(playerTwo.choice);
        // declareResult(playerOne.choice);
      }
    }
  });
});

renderDom();
