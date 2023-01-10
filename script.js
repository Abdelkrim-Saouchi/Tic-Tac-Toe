/* eslint-disable no-param-reassign */
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

const displayWinnerMsg = (winner) => {
  const winningMsg = document.querySelector('.winning-message');
  if (winner === undefined) {
    winningMsg.firstElementChild.textContent = 'Tie!';
  } else {
    if (winner === playerOne.choice) {
      winner = 'Player One';
    } else {
      winner = 'Player Two';
    }
    winningMsg.firstElementChild.textContent = `${winner} wins`;
  }
  setTimeout(() => {
    winningMsg.style.display = 'grid';
  }, 1000);
};

const restartGame = () => {
  const restartBtn = document.querySelector('#restart');
  const winningMsg = document.querySelector('.winning-message');
  restartBtn.addEventListener('click', () => {
    winningMsg.style.display = 'none';
    gameBoard.length = 0;
    gameDom.gameGridCells.forEach((gameGridCell) => {
      gameGridCell.textContent = '';
      gameGridCell.style.backgroundColor = 'yellow';
      gameGridCell.addEventListener('click', AddMarkEventHandler);
      playerOne.canPlay = true;
      playerTwo.canPlay = false;
    });
  });
};

const declareResult = (playerMark) => {
  if (
    gameBoard[0] === playerMark &&
    gameBoard[1] === playerMark &&
    gameBoard[2] === playerMark
  ) {
    endGameRow(0, 1, 2);
    displayWinnerMsg(playerMark);
  } else if (
    gameBoard[3] === playerMark &&
    gameBoard[4] === playerMark &&
    gameBoard[5] === playerMark
  ) {
    endGameRow(3, 4, 5);
    displayWinnerMsg(playerMark);
  } else if (
    gameBoard[6] === playerMark &&
    gameBoard[7] === playerMark &&
    gameBoard[8] === playerMark
  ) {
    endGameRow(6, 7, 8);
    displayWinnerMsg(playerMark);
  } else if (
    gameBoard[0] === playerMark &&
    gameBoard[3] === playerMark &&
    gameBoard[6] === playerMark
  ) {
    endGameRow(0, 3, 6);
    displayWinnerMsg(playerMark);
  } else if (
    gameBoard[1] === playerMark &&
    gameBoard[4] === playerMark &&
    gameBoard[7] === playerMark
  ) {
    endGameRow(1, 4, 7);
    displayWinnerMsg(playerMark);
  } else if (
    gameBoard[2] === playerMark &&
    gameBoard[5] === playerMark &&
    gameBoard[8] === playerMark
  ) {
    endGameRow(2, 5, 8);
    displayWinnerMsg(playerMark);
  } else if (
    gameBoard[0] === playerMark &&
    gameBoard[4] === playerMark &&
    gameBoard[8] === playerMark
  ) {
    endGameRow(0, 4, 8);
    displayWinnerMsg(playerMark);
  } else if (
    gameBoard[2] === playerMark &&
    gameBoard[4] === playerMark &&
    gameBoard[6] === playerMark
  ) {
    endGameRow(2, 4, 6);
    displayWinnerMsg(playerMark);
  } else if (!gameBoard.includes(undefined) && gameBoard.length === 9) {
    displayWinnerMsg();
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
    // target.style.backgroundColor = 'grey';
  } else {
    if (choice === '2-x') {
      playerOne.choice = 'O';
      playerTwo.choice = 'X';
    } else {
      playerOne.choice = 'X';
      playerTwo.choice = 'O';
    }
    // target.style.backgroundColor = 'grey';
  }
};

const setChoiceBg = (target) => {
  const oneX = document.querySelector('[data-choice="1-x"]');
  const oneO = document.querySelector('[data-choice="1-o"]');
  const twoX = document.querySelector('[data-choice="2-x"]');
  const twoO = document.querySelector('[data-choice="2-o"]');

  if (target === oneX) {
    oneX.style.backgroundColor = 'grey';
    oneO.style.backgroundColor = 'white';
    twoX.style.backgroundColor = 'white';
    twoO.style.backgroundColor = 'grey';
  } else if (target === oneO) {
    oneO.style.backgroundColor = 'grey';
    oneX.style.backgroundColor = 'white';
    twoX.style.backgroundColor = 'grey';
    twoO.style.backgroundColor = 'white';
  } else if (target === twoX) {
    twoX.style.backgroundColor = 'grey';
    twoO.style.backgroundColor = 'white';
    oneX.style.backgroundColor = 'white';
    oneO.style.backgroundColor = 'grey';
  } else if (target === twoO) {
    twoO.style.backgroundColor = 'grey';
    twoX.style.backgroundColor = 'white';
    oneX.style.backgroundColor = 'grey';
    oneO.style.backgroundColor = 'white';
  }
};

gameDom.choiceDivs.forEach((choiceDiv) => {
  choiceDiv.addEventListener('click', (e) => {
    setPlayerChoice(e.target);
    setChoiceBg(e.target);
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

restartGame();
renderDom();
