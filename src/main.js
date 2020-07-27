import tachyons from 'tachyons';
import { log1, toggleHighlightedCell } from './modules/view.js';
import { log2 } from './modules/model.js';

/* --------------------Variables-------------------- */
const newGameBtn = document.getElementById('new-game');
const solveGameBtn = document.getElementById('solve-game');
const game = document.getElementById('game');

/* --------------------Event Listeners-------------------- */

// Listen to all clicks on div.game
newGameBtn.addEventListener('click', (e) => {
  console.log('new game!');
});

solveGameBtn.addEventListener('click', (e) => {
  console.log('solve game!');
  solveGame();
});

game.addEventListener(
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

/* --------------------Tests-------------------- */

log1('3');
log2();

console.log('It works');
