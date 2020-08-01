/* --------------------Variables-------------------- */

let IDs = {
  0: 'one',
  1: 'two',
  2: 'three',
  3: 'four',
  4: 'five',
  5: 'six',
  6: 'seven',
  7: 'eight',
  8: 'nine',
};

/* --------------------Functions-------------------- */

function toggleHighlightedCell(element) {
  const highlightedCells = document.querySelectorAll('.cell-highlighted')
    .length;

  if (element.classList.contains('cell-highlighted')) {
    toggleClass(element, 'cell-highlighted');
  }

  if (highlightedCells > 0) return;

  if (element.classList.contains('cell-given')) return;

  toggleClass(element, 'cell-highlighted');
}

function toggleClass(element, cssClass) {
  element.classList.toggle(cssClass);
}

function viewNewBoard(board) {
  clearStylesAll();
  setValues(board);
  setStyles(board);
}

function viewSolvedBoard(board) {
  setValues(board);
  clearStylesAll();
}

function clearStylesAll() {
  let cellActive = Array.from(document.querySelectorAll('.cell-highlighted'));
  let cellGiven = Array.from(document.querySelectorAll('.cell-given'));
  let cellEmpty = Array.from(document.querySelectorAll('.cell-empty'));
  let cellError = Array.from(document.querySelectorAll('.cell-error'));

  cellActive.forEach((e) => {
    removeClassName(e, 'cell-highlighted');
  });
  cellGiven.forEach((e) => {
    removeClassName(e, 'cell-given');
  });
  cellEmpty.forEach((e) => {
    removeClassName(e, 'cell-empty');
  });
  cellError.forEach((e) => {
    removeClassName(e, 'cell-error');
  });
}

function addClassName(element, className) {
  element.classList.add(className);
}

function removeClassName(element, className) {
  element.classList.remove(className);
}

function setValues(board) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      //Get ID
      let idRaw = [IDs[r], '_', IDs[c]];
      let id = idRaw.join('');

      if (board[r][c] > 0) {
        document.getElementById(id).innerHTML = board[r][c];
        document.getElementById(id).classList.toggle('cell-given');
      } else {
        document.getElementById(id).innerHTML = '';
      }
    }
  }
}

function setStyles(board) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      //Get ID
      let idRaw = [IDs[r], '_', IDs[c]];
      let id = idRaw.join('');

      if (board[r][c] === 0) {
        document.getElementById(id).classList.toggle('cell-empty');
      }
    }
  }
}

function isActive() {
  let activeDivs = Array.from(document.querySelectorAll('.cell-highlighted'));
  if (activeDivs.length > 0) {
    return true;
  } else {
    return false;
  }
}

function getActive() {
  let activeDiv = Array.from(document.querySelectorAll('.cell-highlighted'));
  if (activeDiv.length === 1) {
    let element = activeDiv[0];
    return element;
  }
}

function displayNumber(element, num) {
  if (num === '0') {
    element.innerHTML = '';
    addClassName(element, 'cell-empty');
  } else {
    element.innerHTML = num;
    removeClassName(element, 'cell-empty');
  }
}

function getModelID(element) {
  let viewID = element.id;
  console.log(viewID);
  let viewIDs = viewID.split('_');
  console.log(viewIDs);
  let row = getKeyByValue(IDs, viewIDs[0]);
  let column = getKeyByValue(IDs, viewIDs[1]);
  return [row, column];
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

function countEmptyCells() {
  let emptyDivs = Array.from(document.querySelectorAll('.cell-empty'));
  return emptyDivs.length;
}

/* --------------------Tests-------------------- */

/* --------------------Export-------------------- */

export {
  toggleHighlightedCell,
  viewNewBoard,
  viewSolvedBoard,
  displayNumber,
  isActive,
  getActive,
  getModelID,
  countEmptyCells,
};
