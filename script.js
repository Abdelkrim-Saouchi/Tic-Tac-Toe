/* eslint-disable no-plusplus */
const gameController = (playerOne, playerTwo) => {
  const gameBoard = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ];

  let currentPlayer = playerOne;
  let canPlay = true;

  const printBoard = (board) => {
    console.log(`
      ${board[0][0]}, ${board[0][1]}, ${board[0][2]}
      ${board[1][0]}, ${board[1][1]}, ${board[1][2]}
      ${board[2][0]}, ${board[2][1]}, ${board[2][2]}
    `);
  };

  const switchPlayerTurn = (player) =>
    player === playerOne ? playerTwo : playerOne;

  const checkAvailability = (board, rowIndex, columnIndex) =>
    board[rowIndex][columnIndex] === ' ';

  const play = (board, player) => {
    const rowIndex = Math.floor(Math.random() * (3 - 0) + 0);
    const columnIndex = Math.floor(Math.random() * (3 - 0) + 0);

    if (checkAvailability(board, rowIndex, columnIndex)) {
      board[rowIndex][columnIndex] = player;
    } else {
      play(board, player);
    }
  };

  const isThereWinner = (board, player) => {
    for (let i = 0; i < board.length; i++) {
      if (
        board[i][0] === player &&
        board[i][1] === player &&
        board[i][2] === player
      ) {
        return true;
      }
      if (
        board[0][i] === player &&
        board[1][i] === player &&
        board[2][i] === player
      ) {
        return true;
      }
    }
    if (
      (board[0][0] === player &&
        board[1][1] === player &&
        board[2][2] === player) ||
      (board[0][2] === player &&
        board[1][1] === player &&
        board[2][0] === player)
    ) {
      return true;
    }
    return false;
  };

  const isNotFull = (board) => {
    let counter = 1;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === ' ') {
          counter += 1;
        }
      }
    }
    if (counter > 1) {
      // console.log(`counter is : ${counter}`);
      return true;
    } else {
      // console.log(`else counter is ${counter}`);
      return false;
    }
  };

  const playRound = (row, col) => {
    // printBoard(gameBoard);

    if (canPlay) {
      // console.log(`player ${currentPlayer} turn!`);
      // currentPlayer = switchPlayerTurn(currentPlayer);
      if (checkAvailability(gameBoard, row, col)) {
        gameBoard[row][col] = currentPlayer;
        if (isThereWinner(gameBoard, currentPlayer)) {
          console.log(`Winner is ${currentPlayer}`);
          canPlay = false;
        }
        if (!isThereWinner(gameBoard, currentPlayer) && !isNotFull(gameBoard)) {
          console.log('Draw');
          canPlay = false;
        }
        console.log(canPlay);
        if (canPlay) {
          currentPlayer = switchPlayerTurn(currentPlayer);
          console.log(`player ${currentPlayer} turn!`);
        }
      }
    }
    // return [canPlay, currentPlayer];
  };

  const clearBoard = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = ' ';
      }
    }
  };

  const getCanPlay = () => canPlay;
  const setCanPlay = (value) => {
    canPlay = value;
  };
  const getCurrentPlayer = () => currentPlayer;
  const setCurrentPlayer = (value) => {
    currentPlayer = value;
  };

  return {
    playRound,
    gameBoard,
    clearBoard,
    getCanPlay,
    getCurrentPlayer,
    setCanPlay,
    setCurrentPlayer,
  };
};

const Player = (mark) => ({ mark });

const playerOne = Player('X');
const playerTwo = Player('O');

const game = gameController(playerOne.mark, playerTwo.mark);
// game.playRound();

const screenController = (gridBoard) => {
  const body = document.querySelector('body');
  const gameTitle = document.querySelector('h1');

  const createGameGrid = (board) => {
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('game-grid-container');
    const gameGrid = document.createElement('div');
    gameGrid.classList.add('game-grid');

    gridContainer.appendChild(gameGrid);

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cell = document.createElement('div');
        cell.classList.add('game-grid-cell');
        cell.textContent = ' ';
        cell.dataset.rowIndex = i;
        cell.dataset.columnIndex = j;
        gameGrid.append(cell);
      }
    }

    return gridContainer;
  };

  const createWinnerAndRestartPage = () => {
    const page = document.createElement('div');
    page.classList.add('winning-message');

    const winnerPara = document.createElement('p');
    const restartBtn = document.createElement('button');
    restartBtn.id = 'restart';
    restartBtn.textContent = 'Restart';

    page.append(winnerPara, restartBtn);

    return page;
  };

  const displaywinnerAndRestartPage = (page, display) => {
    page.style.display = display;
  };

  const populateBoard = (board) => {
    const cells = document.querySelectorAll('.game-grid-cell');
    const cellsList = Array.from(cells);
    cellsList.forEach((cell) => {
      cell.textContent = board[cell.dataset.rowIndex][cell.dataset.columnIndex];
    });
  };

  const grid = createGameGrid(gridBoard);
  const winnerPage = createWinnerAndRestartPage();

  body.appendChild(grid);
  body.appendChild(winnerPage);
  populateBoard(gridBoard);

  const gridCells = Array.from(document.querySelectorAll('.game-grid-cell'));

  gridCells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      game.playRound(e.target.dataset.rowIndex, e.target.dataset.columnIndex);
      populateBoard(gridBoard);

      if (!game.getCanPlay()) {
        winnerPage.firstElementChild.textContent = `winner is ${game.getCurrentPlayer()}`;
        displaywinnerAndRestartPage(winnerPage, 'grid');
      }
    });
  });

  const restartBtn = document.querySelector('#restart');
  restartBtn.addEventListener('click', () => {
    displaywinnerAndRestartPage(winnerPage, 'none');
    game.clearBoard(gridBoard);
    populateBoard(gridBoard);
    game.setCanPlay(true);
    game.getCurrentPlayer('X');
  });
};

screenController(game.gameBoard);
