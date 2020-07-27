/* --------------------Variables-------------------- */

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

/* --------------------Tests-------------------- */

const name = 'Marlon';

function log1(logItem) {
  console.log(logItem);
  console.log(name);
}

/* --------------------Export-------------------- */

export { log1, name, toggleHighlightedCell };
