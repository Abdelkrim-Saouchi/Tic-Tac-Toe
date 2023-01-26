/* eslint-disable no-plusplus */
const gameController = (playerOne, playerTwo) => {
  const gameBoard = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ];

  let currentPlayer = playerOne;
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

    if (checkAvailability(gameBoard, row, col)) {
      gameBoard[row][col] = currentPlayer;
      if (isThereWinner(gameBoard, currentPlayer)) {
        console.log(`Winner is ${currentPlayer}`);
      }
      if (!isThereWinner(gameBoard, currentPlayer) && !isNotFull(gameBoard)) {
        console.log('Draw');
      }
      currentPlayer = switchPlayerTurn(currentPlayer);
      console.log(`player ${currentPlayer} turn!`);
    }
  };
  return { playRound, gameBoard };
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

  const populateBoard = (board) => {
    const cells = document.querySelectorAll('.game-grid-cell');
    const cellsList = Array.from(cells);
    cellsList.forEach((cell) => {
      cell.textContent = board[cell.dataset.rowIndex][cell.dataset.columnIndex];
    });
  };

  const grid = createGameGrid(gridBoard);
  body.appendChild(grid);
  populateBoard(gridBoard);

  grid.addEventListener('click', (e) => {
    // do not forget lines between click problem
    game.playRound(e.target.dataset.rowIndex, e.target.dataset.columnIndex);
    populateBoard(gridBoard);
  });

  return { body };
};

screenController(game.gameBoard);
