/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-lonely-if */
const gameBoardObj = (() => {
  const gameBoard = [];

  return { gameBoard };
})();

const Player = (choice, status) => {
  let canPlay = status;
  const setPlay = (setValue) => {
    canPlay = setValue;
  };
  return { choice, setPlay, canPlay };
};

const DisplayController = (() => {
  // get game DOM
  const getDom = () => {
    const choiceDivs = Array.from(document.querySelectorAll('.choice'));
    const gameGridCells = Array.from(
      document.querySelectorAll('.game-grid-cell')
    );
    const winningMsg = document.querySelector('.winning-message');
    const restartBtn = document.querySelector('#restart');
    const oneX = document.querySelector('[data-choice="1-x"]');
    const oneO = document.querySelector('[data-choice="1-o"]');
    const twoX = document.querySelector('[data-choice="2-x"]');
    const twoO = document.querySelector('[data-choice="2-o"]');
    return {
      choiceDivs,
      gameGridCells,
      winningMsg,
      restartBtn,
      oneX,
      oneO,
      twoX,
      twoO,
    };
  };

  const gameDom = getDom();
  // Render DOM
  const renderDom = () => {
    gameDom.gameGridCells.forEach((gameGridCell) => {
      gameGridCell.textContent =
        gameBoardObj.gameBoard[gameGridCell.dataset.index];
    });
  };

  // set player Choice
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
  // set background of player choice div
  const setChoiceBg = (target) => {
    if (target === gameDom.oneX) {
      gameDom.oneX.style.backgroundColor = 'grey';
      gameDom.oneO.style.backgroundColor = 'white';
      gameDom.twoX.style.backgroundColor = 'white';
      gameDom.twoO.style.backgroundColor = 'grey';
    } else if (target === gameDom.oneO) {
      gameDom.oneO.style.backgroundColor = 'grey';
      gameDom.oneX.style.backgroundColor = 'white';
      gameDom.twoX.style.backgroundColor = 'grey';
      gameDom.twoO.style.backgroundColor = 'white';
    } else if (target === gameDom.twoX) {
      gameDom.twoX.style.backgroundColor = 'grey';
      gameDom.twoO.style.backgroundColor = 'white';
      gameDom.oneX.style.backgroundColor = 'white';
      gameDom.oneO.style.backgroundColor = 'grey';
    } else if (target === gameDom.twoO) {
      gameDom.twoO.style.backgroundColor = 'grey';
      gameDom.twoX.style.backgroundColor = 'white';
      gameDom.oneX.style.backgroundColor = 'grey';
      gameDom.oneO.style.backgroundColor = 'white';
    }
  };

  // add X or O to game
  const addMark = (target) => {
    if (
      target.textContent !== playerOne.choice &&
      target.textContent !== playerTwo.choice
    ) {
      if (playerOne.canPlay) {
        gameBoardObj.gameBoard[target.dataset.index] = playerOne.choice;
        playerOne.canPlay = false;
        playerTwo.canPlay = true;
        renderDom();
      } else {
        gameBoardObj.gameBoard[target.dataset.index] = playerTwo.choice;
        playerTwo.canPlay = false;
        playerOne.canPlay = true;
        renderDom();
      }
    }
  };
  // wrap event functions to add/remove them from clicked target
  function AddMarkEventHandler(e) {
    addMark(e.target);
    declareResult(e.target.textContent);
  }

  // end game by change background of cells to green and remove eventlistener from grid cells
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

  // display winning div to declare winner
  const displayWinnerMsg = (winner) => {
    if (winner === undefined) {
      gameDom.winningMsg.firstElementChild.textContent = 'Tie!';
    } else {
      if (winner === playerOne.choice) {
        winner = 'Player One';
      } else {
        winner = 'Player Two';
      }
      gameDom.winningMsg.firstElementChild.textContent = `${winner} wins`;
    }
    setTimeout(() => {
      gameDom.winningMsg.style.display = 'grid';
    }, 1000);
  };

  // function to declare winner on one round
  const declareResult = (playerMark) => {
    if (
      gameBoardObj.gameBoard[0] === playerMark &&
      gameBoardObj.gameBoard[1] === playerMark &&
      gameBoardObj.gameBoard[2] === playerMark
    ) {
      endGameRow(0, 1, 2);
      displayWinnerMsg(playerMark);
    } else if (
      gameBoardObj.gameBoard[3] === playerMark &&
      gameBoardObj.gameBoard[4] === playerMark &&
      gameBoardObj.gameBoard[5] === playerMark
    ) {
      endGameRow(3, 4, 5);
      displayWinnerMsg(playerMark);
    } else if (
      gameBoardObj.gameBoard[6] === playerMark &&
      gameBoardObj.gameBoard[7] === playerMark &&
      gameBoardObj.gameBoard[8] === playerMark
    ) {
      endGameRow(6, 7, 8);
      displayWinnerMsg(playerMark);
    } else if (
      gameBoardObj.gameBoard[0] === playerMark &&
      gameBoardObj.gameBoard[3] === playerMark &&
      gameBoardObj.gameBoard[6] === playerMark
    ) {
      endGameRow(0, 3, 6);
      displayWinnerMsg(playerMark);
    } else if (
      gameBoardObj.gameBoard[1] === playerMark &&
      gameBoardObj.gameBoard[4] === playerMark &&
      gameBoardObj.gameBoard[7] === playerMark
    ) {
      endGameRow(1, 4, 7);
      displayWinnerMsg(playerMark);
    } else if (
      gameBoardObj.gameBoard[2] === playerMark &&
      gameBoardObj.gameBoard[5] === playerMark &&
      gameBoardObj.gameBoard[8] === playerMark
    ) {
      endGameRow(2, 5, 8);
      displayWinnerMsg(playerMark);
    } else if (
      gameBoardObj.gameBoard[0] === playerMark &&
      gameBoardObj.gameBoard[4] === playerMark &&
      gameBoardObj.gameBoard[8] === playerMark
    ) {
      endGameRow(0, 4, 8);
      displayWinnerMsg(playerMark);
    } else if (
      gameBoardObj.gameBoard[2] === playerMark &&
      gameBoardObj.gameBoard[4] === playerMark &&
      gameBoardObj.gameBoard[6] === playerMark
    ) {
      endGameRow(2, 4, 6);
      displayWinnerMsg(playerMark);
    } else if (
      !gameBoardObj.gameBoard.includes(undefined) &&
      gameBoardObj.gameBoard.length === 9
    ) {
      displayWinnerMsg();
    }
  };

  // restart game function
  const restartGame = () => {
    gameDom.restartBtn.addEventListener('click', () => {
      gameDom.winningMsg.style.display = 'none';
      gameBoardObj.gameBoard.length = 0;
      gameDom.gameGridCells.forEach((gameGridCell) => {
        gameGridCell.textContent = '';
        gameGridCell.style.backgroundColor = 'yellow';
        gameGridCell.addEventListener('click', AddMarkEventHandler);
        playerOne.canPlay = true;
        playerTwo.canPlay = false;
      });
    });
  };

  // so can player choose X or O
  gameDom.choiceDivs.forEach((choiceDiv) => {
    choiceDiv.addEventListener('click', (e) => {
      setPlayerChoice(e.target);
      setChoiceBg(e.target);
    });
  });

  // to add X or O  to game grid
  gameDom.gameGridCells.forEach((gameGridCell) => {
    gameGridCell.addEventListener('click', AddMarkEventHandler);
  });

  return { renderDom, restartGame };
})();

// create players
const playerOne = Player('X', true);
const playerTwo = Player('O', false);

// run game
DisplayController.restartGame();
DisplayController.renderDom();
