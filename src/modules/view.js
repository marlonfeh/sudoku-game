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

function changeDifficulty() {
  const difficultyBtn = document.getElementById('change-difficulty');
  console.log(difficultyBtn.innerHTML);
  let difficulty;
  switch (difficultyBtn.innerHTML) {
    case 'Easy':
      difficulty = 'Medium';
      break;
    case 'Medium':
      difficulty = 'Hard';
      break;
    case 'Hard':
      difficulty = 'Very Hard';
      break;
    case 'Very Hard':
      difficulty = 'Insane';
      break;
    case 'Insane':
      difficulty = 'Inhuman';
      break;
    case 'Inhuman':
      difficulty = 'Easy';
      break;
    default:
      console.log('Something is wrong');
  }
  difficultyBtn.innerHTML = difficulty;
}

function getDifficulty() {
  const difficultyBtn = document.getElementById('change-difficulty');
  console.log(difficultyBtn.innerHTML);

  switch (difficultyBtn.innerHTML) {
    case 'Easy':
      return 19;
    case 'Medium':
      return 28;
    case 'Hard':
      return 37;
    case 'Very Hard':
      return 46;
    case 'Insane':
      return 55;
    case 'Inhuman':
      return 64;
    default:
      console.log('Something is wrong');
  }
}

function toggleTMPBtn() {
  //If inactive -> remove (tmp-btn-inactive, purple) and add (bg-purple, white)
  //Change innerhtml to actived

  const tmpBtn = document.getElementById('tmp-mode');
  console.log(tmpBtn);

  toggleClass(tmpBtn, 'tmp-btn-inactive');
  toggleClass(tmpBtn, 'purple');
  toggleClass(tmpBtn, 'bg-purple');
  toggleClass(tmpBtn, 'white');

  if (tmpBtn.innerHTML === 'TMP Inactive') {
    tmpBtn.innerHTML = 'TMP Active';
  } else {
    tmpBtn.innerHTML = 'TMP Inactive';
  }
}

function isTMP() {
  const tmpBtn = document.getElementById('tmp-mode');
  if (tmpBtn.innerHTML === 'TMP Active') {
    return true;
  } else {
    return false;
  }
}

function toggleHighlightedCell(element) {
  const highlightedCells = document.querySelectorAll('.cell-highlighted');
  const highlightedCellsLength = document.querySelectorAll('.cell-highlighted')
    .length;

  let eCL = element.classList;

  //If cell is given it cannot be highlighted
  if (element.classList.contains('cell-given')) return;

  //Removes highlight
  if (eCL.contains('cell-highlighted')) {
    toggleClass(element, 'cell-highlighted');
    return;
  }

  //Refers to actual div if tmp-grid is active
  if (element.parentNode.classList.contains('cell-highlighted')) {
    toggleClass(element.parentNode, 'cell-highlighted');
    return;
  }

  //If another Div is highlighted remove highlight
  if (highlightedCellsLength > 0) {
    removeClassName(highlightedCells[0], 'cell-highlighted');
  }

  //If tmp-grid is active the actual div gets highlighted
  if (
    eCL.contains('tmp-grid-one') ||
    eCL.contains('tmp-grid-two') ||
    eCL.contains('tmp-grid-three') ||
    eCL.contains('tmp-grid-four')
  ) {
    toggleClass(element.parentNode, 'cell-highlighted');
    return;
  }

  toggleClass(element, 'cell-highlighted');
}

function toggleClass(element, cssClass) {
  element.classList.toggle(cssClass);
}

function addClassName(element, className) {
  element.classList.add(className);
}

function removeClassName(element, className) {
  element.classList.remove(className);
}

function viewNewBoard(board) {
  clearStylesAll();
  setValues(board);
  setStyles(board);
}

function viewSolvedBoard(board) {
  setValues(board);
  clearStylesAll();
  lockField();
}

function lockField() {
  let cellGiven = Array.from(document.querySelectorAll('.cell-given'));
  cellGiven.forEach((e) => {
    removeClassName(e, 'cell-given');
  });

  let cells = Array.from(document.querySelectorAll('.cell'));
  cells.forEach((e) => {
    addClassName(e, 'cell-given');
  });
}

function clearStylesAll() {
  let cellActive = Array.from(document.querySelectorAll('.cell-highlighted'));
  let cellGiven = Array.from(document.querySelectorAll('.cell-given'));
  let cellEmpty = Array.from(document.querySelectorAll('.cell-empty'));
  let cellError = Array.from(document.querySelectorAll('.cell-error'));
  let tmpGridList = Array.from(document.querySelectorAll('.tmp-grid'));

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
  tmpGridList.forEach((e) => {
    removeClassName(e, 'tmp-grid');
  });
}

function clearStyle(className) {
  let selector = '.' + className;

  let nodeL = Array.from(document.querySelectorAll(selector));

  nodeL.forEach((e) => {
    removeClassName(e, className);
  });
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
  let errorDivs = Array.from(document.querySelectorAll('.cell-error'));

  if (num === '0') {
    //If errorDivs > 0 than the game finished check has already been set out, therefore a deletion of a number is not possible anymore, only the replacement by another number
    if (errorDivs.length > 0) return;
    element.innerHTML = '';
    addClassName(element, 'cell-empty');
    removeClassName(element, 'cell-error');
  } else {
    element.innerHTML = num;
    removeClassName(element, 'cell-empty');
  }
}

function isCellEmpty(element) {
  return element.classList.contains('cell-empty');
}

function displayNumberTMP(element, num, multipleTMP) {
  //check for cell-empty -> if not add it
  //multipleTMP is either true or false -> if true add number in the next empty slot -> if false add it as single number

  let isEmpty = isCellEmpty(element);
  if (!multipleTMP) {
    if (num === '0') {
      element.innerHTML = '';
      addClassName(element, 'cell-empty');
      removeClassName(element, 'cell-error');
    } else {
      if (isEmpty && getContentLength(element) === 1) {
        createTMPDivs(element, num);
      } else {
        element.innerHTML = num;
      }

      //If cell-empty is missing add it to the div
      if (!isEmpty) addClassName(element, 'cell-empty');
    }
  }
  if (multipleTMP) {
    let tmpItems = element.childNodes;

    if (num === '0') {
      for (let i = tmpItems.length - 1; i > 0; i--) {
        console.log(getContentLength(tmpItems[i]));

        if (getContentLength(tmpItems[i]) === 1) {
          tmpItems[i].innerHTML = '';
          if (i === 1) deleteTMPDivs(element, tmpItems[0].innerHTML);
          break;
        }
      }
    } else {
      //Look for the next possible slot
      for (let i = 0; i < tmpItems.length; i++) {
        if (getContentLength(tmpItems[i]) === 0) {
          tmpItems[i].innerHTML = num;
          break;
        }
      }
      //If cell-empty is missing add it to the div
      if (!isEmpty) addClassName(element, 'cell-empty');
    }
  }
}

function isMultipleTMP(element) {
  return element.classList.contains('tmp-grid');
}

function createTMPDivs(element, num2) {
  let num1 = element.innerHTML;

  addClassName(element, 'tmp-grid');

  element.innerHTML = `<div class="tmp-grid-one cell">${num1}</div>`;
  element.insertAdjacentHTML(
    'beforeend',
    `<div class="tmp-grid-two cell">${num2}</div>`
  );
  element.insertAdjacentHTML(
    'beforeend',
    '<div class="tmp-grid-three cell"></div>'
  );
  element.insertAdjacentHTML(
    'beforeend',
    '<div class="tmp-grid-four cell"></div>'
  );
}

function deleteTMPDivs(element, num1) {
  element.innerHTML = num1;
  removeClassName(element, 'tmp-grid');
  console.log('delete');
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

function displayErrors(errorIDs) {
  clearStyle('cell-error');
  for (let k = 0; k < errorIDs[0].length; k++) {
    let row = IDs[errorIDs[0][k]];
    let column = IDs[errorIDs[1][k]];
    let idRaw = [row, '_', column];
    let id = idRaw.join('');
    document.getElementById(id).classList.add('cell-error');
  }
}

function getErrors() {
  let errorDivs = Array.from(document.querySelectorAll('.cell-error'));
  return errorDivs.length;
}

function getContentLength(element) {
  console.log(element);
  return element.innerHTML.length;
}

/* --------------------Tests-------------------- */

/* --------------------Export-------------------- */

export {
  changeDifficulty,
  getDifficulty,
  toggleTMPBtn,
  isTMP,
  toggleHighlightedCell,
  viewNewBoard,
  viewSolvedBoard,
  displayNumber,
  isActive,
  getActive,
  getModelID,
  countEmptyCells,
  displayErrors,
  getErrors,
  lockField,
  isMultipleTMP,
  displayNumberTMP,
  deleteTMPDivs,
};
