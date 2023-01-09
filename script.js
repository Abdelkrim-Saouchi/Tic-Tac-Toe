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
// const gameGrid = document.querySelector('.game-grid');
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
    console.log(`${playerMark} wins`);
  } else if (
    (gameBoard[0] === playerMark &&
      gameBoard[4] === playerMark &&
      gameBoard[8]) === playerMark ||
    (gameBoard[2] === playerMark &&
      gameBoard[4] === playerMark &&
      gameBoard[6]) === playerMark
  ) {
    console.log(`${playerMark} wins`);
  } else {
    if (!gameBoard.includes(undefined) && gameBoard.length === 9)
      console.log('Tie');
  }
};

const setPlayerChoice = (target) => {
  const { choice } = target.dataset;
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
};

choiceDivs.forEach((choiceDiv) => {
  choiceDiv.addEventListener('click', (e) => {
    setPlayerChoice(e.target);
  });
});

const addMark = (target) => {
  if (
    target.textContent !== playerOne.choice &&
    target.textContent !== playerTwo.choice
  ) {
    if (playerOne.canPlay) {
      gameBoard[target.dataset.index] = playerOne.choice;
      playerOne.canPlay = false;
      playerTwo.canPlay = true;
      renderDom();
      //   declareResult(playerOne.choice);
    } else {
      gameBoard[target.dataset.index] = playerTwo.choice;
      playerTwo.canPlay = false;
      playerOne.canPlay = true;
      renderDom();
      //   declareResult(playerTwo.choice);
    }
  }
};

gameGridCells.forEach((gameGridCell) => {
  gameGridCell.addEventListener('click', (e) => {
    addMark(e.target);
    declareResult(e.target.textContent);
  });
});

renderDom();
