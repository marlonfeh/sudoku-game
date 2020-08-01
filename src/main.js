import tachyons from 'tachyons';
import {
  toggleHighlightedCell,
  viewNewBoard,
  viewSolvedBoard,
  isActive,
  displayNumber,
  getActive,
  getModelID,
  countEmptyCells,
} from './modules/view.js';
import {
  generateBoard,
  getSolvedBoard,
  isValid,
  insertNewNumber,
  saveID,
} from './modules/model.js';

/* --------------------Variables-------------------- */

const newGameBtn = document.getElementById('new-game');
const solveGameBtn = document.getElementById('solve-game');
const gameField = document.getElementById('game');
let IDs = [];

/* --------------------Event Listeners-------------------- */

// Listen to all clicks on div.game
newGameBtn.addEventListener('click', (e) => {
  console.log('new game!');
  let puzzle = generateBoard();
  viewNewBoard(puzzle);
});

solveGameBtn.addEventListener('click', (e) => {
  console.log('solve game!');
  let puzzle = getSolvedBoard();
  viewSolvedBoard(puzzle);
});

gameField.addEventListener(
  'click',
  (e) => {
    const element = e.target;
    //let elementClassList = Array.from(element.classList);

    //console.log('element', element);

    toggleHighlightedCell(element);

    //if cell is highlighted proceed
    if (element.classList.contains('cell-highlighted')) {
      console.log('active');
    }

    //Accept keyboard entry (if number)

    //Update board

    //Display entry on board
  },
  false
);

document.addEventListener('keydown', function (e) {
  //Check for active div
  let activeDiv = isActive();
  if (activeDiv !== true) return;

  //Check for number
  if (
    (e.keyCode >= 48 && e.keyCode <= 57) ||
    (e.keyCode >= 96 && e.keyCode <= 105)
  ) {
    //Get relevant Element and model ID
    let element = getActive();
    let modelID = getModelID(element);

    //Get Number into model
    insertNewNumber(modelID, e.key);
    saveID(modelID);

    console.log(modelID);

    //Display Number in view
    displayNumber(element, e.key);

    //check validity if model is completly filled
    let emptyCells = countEmptyCells();

    isValid();

    if (emptyCells === 0) {
      isValid();
    }

    //let valid = isValid(modelID, e.key);
  }
});

/* --------------------Tests-------------------- */

/* --------------------Annotations-------------------- */

//https://medium.com/javascript-in-plain-english/solve-a-sudoku-using-javascript-de456e8c34a5
