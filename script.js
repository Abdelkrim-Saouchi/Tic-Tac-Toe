const gameController = (playerOne, playerTwo) => {
  const gameBoard = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ];

  const BOARD_CELLS = 9;
  const printBoard = (board) => {
    console.log(`
      ${board[0][0]}, ${board[0][1]}, ${board[0][2]}
      ${board[1][0]}, ${board[1][1]}, ${board[1][2]}
      ${board[2][0]}, ${board[2][1]}, ${board[2][2]}
    `);
  };

  const switchPlayerTurn = (currentPlayer) =>
    currentPlayer === playerOne ? playerTwo : playerOne;

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

  const playRound = () => {
    printBoard(gameBoard);
    console.log('Game start!');

    let player = playerOne;
    console.log(`player ${player} turn!`);
    play(gameBoard, player);

    printBoard(gameBoard);
    for (let i = 0; i < BOARD_CELLS - 1; i++) {
      player = switchPlayerTurn(player);
      console.log(`player ${player} turn!`);
      play(gameBoard, player);
      printBoard(gameBoard);
      if (isThereWinner(gameBoard, player)) {
        console.log(`winner is ${player}`);
        break;
      }
      if (!isThereWinner(gameBoard, player) && i === BOARD_CELLS - 2) {
        console.log('Draw');
      }
    }
  };
  return { playRound };
};

const Player = (mark) => ({ mark });

const playerOne = Player('X');
const playerTwo = Player('O');

const game = gameController(playerOne.mark, playerTwo.mark);
game.playRound();
