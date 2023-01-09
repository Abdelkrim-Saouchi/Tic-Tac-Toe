/* eslint-disable no-use-before-define */
/* eslint-disable no-lonely-if */
const gameBoard = [];

const Player = (choice, status) => {
  let canPlay = status;
  const setPlay = (setValue) => {
    canPlay = setValue;
  };
  return { choice, setPlay, canPlay };
};

const playerOne = Player('X', true);
const playerTwo = Player('O', false);

const getDom = () => {
  const choiceDivs = Array.from(document.querySelectorAll('.choice'));
  const gameGridCells = Array.from(
    document.querySelectorAll('.game-grid-cell')
  );
  return { choiceDivs, gameGridCells };
};

const gameDom = getDom();

const renderDom = () => {
  gameDom.gameGridCells.forEach((gameGridCell) => {
    gameGridCell.textContent = gameBoard[gameGridCell.dataset.index];
  });
};

const endGameRow = (index1, index2, index3) => {
  document.querySelector(`[data-index="${index1}"]`).style.backgroundColor =
    'green';
  document.querySelector(`[data-index="${index2}"]`).style.backgroundColor =
    'green';
  document.querySelector(`[data-index="${index3}"]`).style.backgroundColor =
    'green';
  gameDom.gameGridCells.forEach((gameGridCell) => {
    gameGridCell.removeEventListener('click', AddMarkEventHandler);
  });
};

const declareResult = (playerMark) => {
  if (
    gameBoard[0] === playerMark &&
    gameBoard[1] === playerMark &&
    gameBoard[2] === playerMark
  ) {
    console.log(`${playerMark} wins`);
    endGameRow(0, 1, 2);
  } else if (
    gameBoard[3] === playerMark &&
    gameBoard[4] === playerMark &&
    gameBoard[5] === playerMark
  ) {
    console.log(`${playerMark} wins`);
    endGameRow(3, 4, 5);
  } else if (
    gameBoard[6] === playerMark &&
    gameBoard[7] === playerMark &&
    gameBoard[8] === playerMark
  ) {
    console.log(`${playerMark} wins`);
    endGameRow(6, 7, 8);
  } else if (
    gameBoard[0] === playerMark &&
    gameBoard[3] === playerMark &&
    gameBoard[6] === playerMark
  ) {
    console.log(`${playerMark} wins`);
    endGameRow(0, 3, 6);
  } else if (
    gameBoard[1] === playerMark &&
    gameBoard[4] === playerMark &&
    gameBoard[7] === playerMark
  ) {
    console.log(`${playerMark} wins`);
    endGameRow(1, 4, 7);
  } else if (
    gameBoard[2] === playerMark &&
    gameBoard[5] === playerMark &&
    gameBoard[8] === playerMark
  ) {
    console.log(`${playerMark} wins`);
    endGameRow(2, 5, 8);
  } else if (
    gameBoard[0] === playerMark &&
    gameBoard[4] === playerMark &&
    gameBoard[8] === playerMark
  ) {
    console.log(`${playerMark} wins`);
    endGameRow(0, 4, 8);
  } else if (
    gameBoard[2] === playerMark &&
    gameBoard[4] === playerMark &&
    gameBoard[6] === playerMark
  ) {
    console.log(`${playerMark} wins`);
    endGameRow(2, 4, 6);
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

gameDom.choiceDivs.forEach((choiceDiv) => {
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
    } else {
      gameBoard[target.dataset.index] = playerTwo.choice;
      playerTwo.canPlay = false;
      playerOne.canPlay = true;
      renderDom();
    }
  }
};

function AddMarkEventHandler(e) {
  addMark(e.target);
  declareResult(e.target.textContent);
}

gameDom.gameGridCells.forEach((gameGridCell) => {
  gameGridCell.addEventListener('click', AddMarkEventHandler);
});

renderDom();
