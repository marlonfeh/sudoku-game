//This game utilizes parts of the algorithm of davelms which can be checked out here: https://github.com/davelms/medium-articles/blob/master/sudoku-solver/sudoku.js

/* --------------------Variables-------------------- */

const square_coordinates = [
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
];

let game = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let solvedBoardTemplate = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let IDs = [[], []];

/* --------------------Functions-------------------- */

function get_row(board, row) {
  // Given a board, we can return a single row
  return board[row];
}

function get_column(board, column) {
  // Given a board, we iterate the rows to return a column
  var col = [];
  for (let row = 0; row < 9; row++) {
    col.push(board[row][column]);
  }
  return col;
}

function get_square(board, square) {
  let cells = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (square == square_coordinates[r][c]) {
        cells.push(board[r][c]);
      }
    }
  }
  return cells;
}

function complete_cell(board, r, c) {
  let used = [
    ...get_row(board, r),
    ...get_column(board, c),
    ...get_square(board, square_coordinates[r][c]),
  ];
  let possibilities = [];
  for (let p = 1; p <= 9; p++) {
    if (!used.includes(p)) {
      possibilities.push(p);
    }
  }
  if (possibilities.length == 1) {
    // If there is only one valid possibility, fill it in
    board[r][c] = possibilities[0];
    return true;
  } else {
    board[r][c] = possibilities;
    return false;
  }
}

function appears_once_only(board, possibilities, segment, r, c) {
  let updated = false;
  for (let i = 0; i < possibilities.length; i++) {
    let possibility = possibilities[i];
    let counter = 0;
    segment.forEach((cell) => {
      if (Array.isArray(cell)) {
        if (cell.includes(possibility)) {
          counter++;
        }
      } else {
        if (cell == possibility) {
          counter++;
        }
      }
    });
    if (counter == 1) {
      board[r][c] = possibility;
      updated = true;
      break;
    }
  }
  return updated;
}

function compare(expected, actual) {
  let array1 = expected.slice();
  let array2 = actual.slice();
  return (
    array1.length === array2.length &&
    array1.sort().every(function (value, index) {
      return value === array2.sort()[index];
    })
  );
}

function is_solved(board) {
  let expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let valid = true;
  // Check all rows
  for (let r = 0; r < 9 && valid == true; r++) {
    if (!compare(expected, get_row(board, r))) {
      valid = false;
    }
  }
  // Check all columns
  for (let c = 0; c < 9 && valid == true; c++) {
    if (!compare(expected, get_column(board, c))) {
      valid = false;
    }
  }
  // Check all quadrants
  for (let q = 1; q < 9 && valid == true; q++) {
    if (!compare(expected, get_square(board, q))) {
      valid = false;
    }
  }
  return valid;
}

function backtrack_based(orig_board) {
  // Create a temporary board for our recursion.
  let board = JSON.parse(JSON.stringify(orig_board));

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      // Process each incomplete cell
      if (board[r][c] == 0) {
        complete_cell(board, r, c);
        if (is_solved(board)) return board;
        let cell = board[r][c];
        // If we just created a list of possibilities, iterate them and recurse
        if (Array.isArray(cell)) {
          for (let i = 0; i < cell.length; i++) {
            // Create a temporary board for each recursion.
            let board_2 = JSON.parse(JSON.stringify(board));
            // Choose a value
            board_2[r][c] = cell[i];
            // Recurse again using new board
            let completed_board;
            if ((completed_board = backtrack_based(board_2))) {
              return completed_board;
            }
          }
          return false; // dead end
        }
      }
    }
  }

  return false;
}

// Constraint based pass.
// Apply the rules of Sudoku and mark up the cells we are
// 100% can only be a single value.
function one_value_cell_constraint(board) {
  // Set to false at the start of the loop
  let updated = false;

  // Convert every gap into an array of possibilities
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] == 0) {
        updated = complete_cell(board, r, c) || updated;
      }
    }
  }

  // Look out for any possibility that appears as a possibility
  // once-only in the row, column, or quadrant.
  // If it does, fill it in!
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (Array.isArray(board[r][c])) {
        let possibilities = board[r][c];
        updated =
          appears_once_only(board, possibilities, get_row(board, r), r, c) ||
          appears_once_only(board, possibilities, get_column(board, c), r, c) ||
          appears_once_only(
            board,
            possibilities,
            get_square(board, square_coordinates[r][c]),
            r,
            c
          ) ||
          updated;
      }
    }
  }

  // Reinitialize gaps back to zero before ending
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (Array.isArray(board[r][c])) {
        board[r][c] = 0;
      }
    }
  }

  return updated;
}

function solve(board) {
  let updated = true,
    solved = false;

  /* 
      Easy-Hard are solved via iterations where we look at the current
      board and fill in any 100% guaranteed cells. We keep using the
      same board, and fill in the gaps until solved.
      
      Always do this first.  We can make the board simpler, even if we
      are unable to crack it entirely this way.
      Tests show doing this FIRST is quicker for Hard-Evil sudoko as it
      removes the number of blank cells ahead of the brute force.
  */
  while (updated && !solved) {
    updated = one_value_cell_constraint(board);
    solved = is_solved(board);
  }

  // Hard-Evil need brute force to finish off.
  if (!solved) {
    board = backtrack_based(board);
    solved = is_solved(board);
  }

  return board;
}

function generateBoard() {
  //Reset game
  for (let k = 0; k < 9; k++) {
    for (let n = 0; n < 9; n++) {
      game[k][n] = 0;
      solvedBoardTemplate[k][n] = 0;
    }
  }
  IDs = [[], []];

  let board = game;
  let difficulty = 3;

  //Set random elements for new board
  board = setRandomElements(board);
  solvedBoardTemplate = board;

  //Solve new board
  board = solve(board);

  //Delete specific amount of numbers
  board = removeNumbersFromBoard(board, difficulty);

  game = board;

  return game;
}

function setRandomElements(board) {
  let numbersOne = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  //Get Random Values for Row 1
  for (let i = 0; i < 9; i++) {
    board[0][i] = getRandomNumberArr(numbersOne);
    numbersOne = deleteElementFromArrByValue(numbersOne, board[0][i]);
  }

  //Get Random Values for Row 2
  board = row2(board);

  //Get Random values for the diagonal
  board = diagonal(board);

  return board;
}

function row2(board) {
  for (let i = 0; i < 9; i++) {
    board[1][i] = 0;
  }

  for (let i = 0; i < 9; i++) {
    let used = [
      ...get_row(board, 1),
      ...get_column(board, i),
      ...get_square(board, square_coordinates[1][i]),
    ];

    let possibilities = [];
    for (let p = 1; p <= 9; p++) {
      if (!used.includes(p)) {
        possibilities.push(p);
      }
    }

    if (possibilities.length > 0) {
      board[1][i] = getRandomNumberArr(possibilities);
    } else {
      row2(board);
    }
  }
  return board;
}

function diagonal(board) {
  for (let i = 2; i < 9; i++) {
    board[i][i] = 0;
  }

  for (let i = 2; i < 9; i++) {
    let used = [
      ...get_row(board, i),
      ...get_column(board, i),
      ...get_square(board, square_coordinates[i][i]),
    ];

    let possibilities = [];
    for (let p = 1; p <= 9; p++) {
      if (!used.includes(p)) {
        possibilities.push(p);
      }
    }

    if (possibilities.length > 0) {
      board[i][i] = getRandomNumberArr(possibilities);
    } else {
      diagonal(board);
    }
  }
  return board;
}

function printBoard(board) {
  for (let k = 0; k < 9; k++) {
    console.log(board[k]);
  }
}

function removeNumbersFromBoard(board, difficulty) {
  let i = 0;
  while (i < difficulty) {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let r = getRandomNumberArr(arr);
    let c = getRandomNumberArr(arr);
    //console.log(board[r][c]);
    if (board[r][c] !== 0) {
      board[r][c] = 0;
    }
    i = countZerosOverall(board);
  }

  return board;
}

function countZerosOverall(board) {
  let zeros = 0;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        zeros += 1;
      }
    }
  }
  return zeros;
}

function getSolvedBoard() {
  let solvedBoard = solve(solvedBoardTemplate);
  return solvedBoard;
}

function getRandomNumber(range) {
  return Math.floor(Math.random() * range);
}

function getRandomNumberArr(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function deleteElementFromArrByValue(arr, num) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === num) {
      arr.splice(i, 1);
    }
  }
  return arr;
}

function deleteElementFromArrByIndex(arr, index) {
  arr.splice(index, 1);
  return arr;
}

function insertNewNumber(modelID, num) {
  num = Number(num);
  let r = modelID[0];
  let c = modelID[1];
  game[r][c] = num;
}

function saveID(modelID) {
  IDs[0].push(modelID[0]);
  IDs[1].push(modelID[1]);
  console.log(IDs);
}

function deleteID(modelID) {
  for (let k = 0; k < IDs.length; k++) {
    if (IDs[0][k] === modelID[0] && IDs[1][k] === modelID[1]) {
      IDs[0] = deleteElementFromArrByIndex(IDs[0], k);
      IDs[1] = deleteElementFromArrByIndex(IDs[1], k);
    }
    console.log(IDs);
  }
}

function isValid() {
  let notValid = [[], []];

  console.log(notValid);

  let solvedBoard = getSolvedBoard(solvedBoardTemplate);

  for (let k = 0; k < IDs[0].length; k++) {
    let r = IDs[0][k];
    let c = IDs[1][k];

    if (game[r][c] !== solvedBoard[r][c]) {
      console.log('error');
      notValid[0].push(r);
      notValid[1].push(c);
    }
  }

  console.log(notValid);
  return notValid;
}

/*
"easy":         62
"medium":       53
"hard":         44
"very-hard":    35
"insane":       26
"inhuman":      17
*/

/* --------------------Tests-------------------- */

/* --------------------Export-------------------- */

export {
  generateBoard,
  getSolvedBoard,
  isValid,
  insertNewNumber,
  saveID,
  deleteID,
};
