const gameController = (playerOne, playerTwo) => {
  const gameBoard = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ];

  let currentPlayer = playerOne;
  let canPlay = true;
  let isDraw = false;
  let gameMode = 'human';
  let gameWinner = null;

  // const printBoard = (board) => {
  //   console.log(`
  //     ${board[0][0]}, ${board[0][1]}, ${board[0][2]}
  //     ${board[1][0]}, ${board[1][1]}, ${board[1][2]}
  //     ${board[2][0]}, ${board[2][1]}, ${board[2][2]}
  //   `);
  // };

  const switchPlayerTurn = (player) =>
    player === playerOne ? playerTwo : playerOne;

  const checkAvailability = (board, rowIndex, columnIndex) =>
    board[rowIndex][columnIndex] === ' ';

  const playRandom = (board) => {
    const availableIndexes = board
      .map((subArray, roIndex) =>
        subArray.map((ele, colIndex) => {
          if (ele === ' ') return [roIndex, colIndex];
        })
      )
      .map((row) => row.filter((ele) => ele !== undefined));

    const simpleAvailableIndexes = [];
    for (let i = 0; i < availableIndexes.length; i++) {
      for (let j = 0; j < availableIndexes[i].length; j++) {
        simpleAvailableIndexes.push(availableIndexes[i][j]);
      }
    }
    const randomPick = Math.floor(
      Math.random() * (simpleAvailableIndexes.length - 0) + 0
    );

    if (simpleAvailableIndexes[randomPick]) {
      const [rowIndex, columnIndex] = simpleAvailableIndexes[randomPick];
      return [rowIndex, columnIndex];
    } else {
      return [null, null]; // handle undefined error when board is full
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
      return true;
    } else {
      return false;
    }
  };

  const checkWinner = (board, player) => {
    if (isThereWinner(board, player)) {
      // console.log(`Winner is ${player}`);
      canPlay = false;
      gameWinner = player;
    }
  };

  const checkDraw = (board, player) => {
    if (!isThereWinner(board, player) && !isNotFull(board)) {
      // console.log('Draw');
      canPlay = false;
      isDraw = true;
    }
  };

  const playAgainstHuman = (board, row, col, player) => {
    if (canPlay) {
      if (checkAvailability(board, row, col)) {
        board[row][col] = player;
      }
    }
  };

  const playAgainstComputer = (board, row, col, player) => {
    board[row][col] = player;
  };

  const playRound = (row, col) => {
    if (getChoice() === 'human') {
      playAgainstHuman(gameBoard, row, col, currentPlayer);
      checkWinner(gameBoard, currentPlayer);
      checkDraw(gameBoard, currentPlayer);
      currentPlayer = switchPlayerTurn(currentPlayer);
    } else {
      // if play is against computer
      if (checkAvailability(gameBoard, row, col)) {
        playAgainstHuman(gameBoard, row, col, currentPlayer);
        checkWinner(gameBoard, currentPlayer);
        checkDraw(gameBoard, currentPlayer);

        const [rowIndex, colIndex] = playRandom(gameBoard);
        // handle undefined error when gameBoard is full
        if (rowIndex !== null || colIndex !== null) {
          playAgainstComputer(gameBoard, rowIndex, colIndex, playerTwo);
          checkWinner(gameBoard, playerTwo);
          checkDraw(gameBoard, playerTwo);
        }
      }
    }
  };

  const clearBoard = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = ' ';
      }
    }
  };

  const getChoice = () => {
    const radios = document.querySelectorAll('input[type="radio"]');
    let checkedValue;
    // eslint-disable-next-line no-restricted-syntax
    for (const radio of radios) {
      if (radio.checked === true) {
        checkedValue = radio.value;
        break;
      }
    }
    return checkedValue;
  };
  const getCanPlay = () => canPlay;
  const setCanPlay = (value) => {
    canPlay = value;
  };
  const setCurrentPlayer = (value) => {
    currentPlayer = value;
  };
  const getIsDraw = () => isDraw;
  const setIsDraw = (value) => {
    isDraw = value;
  };
  const getGameMode = () => gameMode;
  const setGameMode = (value) => {
    gameMode = value;
  };
  const getGameWinner = () => gameWinner;

  return {
    playRound,
    gameBoard,
    clearBoard,
    getCanPlay,
    setCanPlay,
    setCurrentPlayer,
    getIsDraw,
    setIsDraw,
    getGameMode,
    setGameMode,
    getGameWinner,
  };
};

const Player = (mark) => ({ mark });

const playerOne = Player('X');
const playerTwo = Player('O');

const game = gameController(playerOne.mark, playerTwo.mark);

const screenController = (gridBoard) => {
  const body = document.querySelector('body');

  const CreateControlPanel = () => {
    const controlPanel = document.createElement('div');
    controlPanel.classList.add('control-panel');

    const msg = document.createElement('p');
    msg.textContent = 'Choose your Opponent: ';

    const gameMode = document.createElement('div');
    gameMode.classList.add('game-mode');

    const human = document.createElement('div');
    human.classList.add('human-mode');

    const computer = document.createElement('div');
    computer.classList.add('computer-mode');

    const humanLabel = document.createElement('label');
    humanLabel.textContent = 'Human';
    humanLabel.htmlFor = 'human';

    const humanRadioBtn = document.createElement('input');
    humanRadioBtn.type = 'radio';
    humanRadioBtn.id = 'human';
    humanRadioBtn.value = 'human';
    humanRadioBtn.name = 'choice';
    humanRadioBtn.checked = true;

    const computerLabel = document.createElement('label');
    computerLabel.textContent = 'Computer';
    computerLabel.htmlFor = 'computer';

    const computerRadioBtn = document.createElement('input');
    computerRadioBtn.type = 'radio';
    computerRadioBtn.id = 'computer';
    computerRadioBtn.value = 'computer';
    computerRadioBtn.name = 'choice';

    human.append(humanRadioBtn, humanLabel);
    computer.append(computerRadioBtn, computerLabel);
    gameMode.append(human, computer);
    controlPanel.append(msg, gameMode);

    return controlPanel;
  };

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

  const displayWinnerAndRestartPage = (page, display) => {
    page.style.display = display;
  };

  const populateBoard = (board) => {
    const cells = document.querySelectorAll('.game-grid-cell');
    const cellsList = Array.from(cells);
    cellsList.forEach((cell) => {
      cell.textContent = board[cell.dataset.rowIndex][cell.dataset.columnIndex];
    });
  };

  const controlPanel = CreateControlPanel();
  const grid = createGameGrid(gridBoard);
  const winnerPage = createWinnerAndRestartPage();

  body.appendChild(controlPanel);
  body.appendChild(grid);
  body.appendChild(winnerPage);
  populateBoard(gridBoard);

  const gameModeRadioBtns = Array.from(
    document.querySelectorAll('input[type="radio"')
  );

  const gridCells = Array.from(document.querySelectorAll('.game-grid-cell'));

  gridCells.forEach((cell) => {
    cell.addEventListener('click', cellEventHandler);
  });

  const restartBtn = document.querySelector('#restart');
  restartBtn.addEventListener('click', () => {
    displayWinnerAndRestartPage(winnerPage, 'none');
    game.clearBoard(gridBoard);
    populateBoard(gridBoard);
    game.setCanPlay(true);
    game.setCurrentPlayer('X'); // prevent same mark when switch between human and computer mode
    gameModeRadioBtns.forEach((radioBtn) => {
      radioBtn.disabled = false;
    });
  });

  function cellEventHandler(e) {
    game.playRound(e.target.dataset.rowIndex, e.target.dataset.columnIndex);
    populateBoard(gridBoard);
    gameModeRadioBtns.forEach((radioBtn) => {
      radioBtn.disabled = true;
    });

    if (!game.getCanPlay()) {
      if (game.getIsDraw()) {
        winnerPage.firstElementChild.textContent = 'Draw';
        setTimeout(() => {
          displayWinnerAndRestartPage(winnerPage, 'grid');
        }, 2000);
      } else {
        winnerPage.firstElementChild.textContent = `winner is ${game.getGameWinner()}`;
        setTimeout(() => {
          displayWinnerAndRestartPage(winnerPage, 'grid');
        }, 2000);
      }
    }
  }
};

screenController(game.gameBoard);
