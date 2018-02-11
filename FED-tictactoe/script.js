const selectField = document.querySelector('.select');
const selectButtons = document.querySelectorAll('.select > button');
const boxes = document.querySelectorAll('.boxes');

const X = document.querySelector('#X');
const signX = document.querySelector('#signX');
const countX = document.querySelector('#countX');
const O = document.querySelector('#O');
const signO = document.querySelector('#signO');
const countO = document.querySelector('#countO');

const endField = document.querySelector('.end');
const endParagraph = document.querySelector('.gamestate');

let gamerunning = true;
let gridArr = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

let userCount = 0;
let cpuCount = 0;

let userSymbol;
let userCounter;
let cpuSymbol;
let cpuCounter;
let userturn;


// select X or O

function setSymbols(e) {

  if (e.target.innerHTML === 'X') {

    userSymbol = 'X';
    signX.innerHTML = 'user';
    userCounter = countX;

    cpuSymbol = 'O';
    signO.innerHTML = 'cpu';
    cpuCounter = countO;

  } else if (e.target.innerHTML === 'O'){

    userSymbol = 'O';
    signO.innerHTML = 'user';
    userCounter = countO;

    cpuSymbol = 'X';
    signX.innerHTML = 'cpu';
    cpuCounter = countX;

  }

  countX.innerHTML = '[0]';
  countO.innerHTML = '[0]';

  selectButtons.forEach(button => button.setAttribute('disabled', true));

  X.classList.add('inactive');
  O.classList.add('inactive');
}


function randomFirst() {
  const randomNo = Math.random();
  if (randomNo < 0.7) {
    userturn = true;
  } else {
    userturn = false;
  }
}


function cpuFirst() {
  setTimeout(() => {
    if (!userturn) {
      const cpuPos = minimax(gridArr, 0, cpuSymbol);
      move(cpuSymbol, cpuPos);
    }
  }, 205);
}


function setBG() {
  if ((userturn && userSymbol === 'X') || (!userturn && cpuSymbol === 'X')) {
    X.classList.add('active');
    signX.classList.add('activeplayer');
  } else {
    O.classList.add('active');
    signO.classList.add('activeplayer');
  }
}


function changeBG() {
  X.classList.toggle('active');
  signX.classList.toggle('activeplayer');

  O.classList.toggle('active');
  signO.classList.toggle('activeplayer');
}


function removeBG() {
  X.classList.remove('active');
  X.classList.add('inactive');
  signX.classList.remove('activeplayer');

  O.classList.remove('active');
  O.classList.add('inactive');
  signO.classList.remove('activeplayer');
}


function playTheGame(box) {
  const userPos = box.dataset.id;
  move(userSymbol, userPos);
  const gameState = isGameOver(gridArr);
  if (gameState === false) {
    const cpuPos = minimax(gridArr, 0, cpuSymbol);
    setTimeout(() => {
      const cpuPos = minimax(gridArr, 0, cpuSymbol);
      move(cpuSymbol, cpuPos);
    }, (Math.random() * 500 + 500));
  }
}


function move(playerSymbol, pos) {
  if (gridArr[pos] === ' ' && gamerunning) {

    gridArr[pos] = playerSymbol;
    boxes[pos].innerHTML = playerSymbol;
    const gameState = isGameOver(gridArr);

    if (gameState !== false) {
      endGame(gameState);
    } else {
      userturn = !userturn;
      console.log(userturn ? 'user' : 'cpu');
      changeBG();
    }
  }
}


function endGame(gameState) {
  gamerunning = false;
  removeBG();

  if (gameState === null) {
    endParagraph.innerHTML = 'Draw!';
    removeBG();
  } else {
    const displayWinner = (gameState === cpuSymbol ? 'CPU' : 'User');
    if (gameState === cpuSymbol){
      cpuCount++;
      cpuCounter.innerHTML = `[${cpuCount}]`;
    } else {
      userCount++;
      userCounter.innerHTML = `[${userCount}]`;
    }
    endParagraph.innerHTML = `${displayWinner} won!`;
  }
  endField.classList.add('show');

  setTimeout(resetGame, 2500);
}


function reset() {
  boxes.forEach(box => {
    box.innerHTML = '';
  });
  gamerunning = true;
  gridArr = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
}


function resetGame() {
  endField.classList.remove('show');

  reset();
  randomFirst();
  setBG();

  cpuFirst();
}


selectButtons.forEach(button => button.addEventListener('click', (e) => {
  if (e.target.name === 'selectX' || e.target.name === 'selectO') {
    selectField.classList.remove('show');

    setSymbols(e);
    randomFirst();
    setBG();

    cpuFirst();
  }
}));

document.querySelector('.game-field').addEventListener('click', (e) => {
  if (userturn && e.target.innerHTML === '') {
    if (userSymbol !== undefined && cpuSymbol !== undefined) {
      playTheGame(e.target);
    }
  }
});

window.addEventListener('load', () => selectField.classList.add('show'));


/* AI algorithmus */

function isGameOver(grid) {
  // all horizontals
  if (grid[0] !== ' ' &&
  grid[0] === grid[1] &&
  grid[0] === grid[2])
  return grid[0];
  else if (grid[3] !== ' ' &&
  grid[3] === grid[4] &&
  grid[3] === grid[5])
  return grid[3];
  else if (grid[6] !== ' ' &&
  grid[6] === grid[7] &&
  grid[6] === grid[8])
  return grid[6];
  // all verticals
  else if (grid[0] !== ' ' &&
  grid[0] === grid[3] &&
  grid[0] === grid[6])
  return grid[0];
  else if (grid[1] !== ' ' &&
  grid[1] === grid[4] &&
  grid[1] === grid[7])
  return grid[1];
  else if (grid[2] !== ' ' &&
  grid[2] === grid[5] &&
  grid[2] === grid[8])
  return grid[2];
  // both diagonals
  else if (grid[4] !== ' ' && (
    (grid[0] === grid[4] && grid[0] === grid[8]) ||
    (grid[6] === grid[4] && grid[6] === grid[2])))
    return grid[4];
    // game tie
    else if (grid.indexOf(' ') === -1) return null;
    else return false;
  }


  function minimax(newGrid, depth, player) {
    const gameState = isGameOver(newGrid);

    // game still running
    if (gameState === false) {
      const values = [];

      for (let i = 0; i < 9; i++) {
        const gridCopy = Array.from(newGrid);
        if (gridCopy[i] !== ' ') continue;
        gridCopy[i] = player;
        const switchplayer = (player === userSymbol ? cpuSymbol : userSymbol);
        const value = minimax(gridCopy, depth + 1, switchplayer);
        values.push({
          cost: value,
          cell: i
        });
      }

      if (player === cpuSymbol) {
        const max = values.reduce((a,b) => {
          if (a.cost < b.cost) return b;
          else return a;
        });
        if (depth === 0) return max.cell;
        else return max.cost;
      } else {
        const min = values.reduce((a,b) => {
          if (a.cost > b.cost) return b;
          else return a;
        });
        if (depth === 0) return min.cell;
        else return min.cost;
      }
    }
    // game is tie
    else if (gameState === null) return 0;
    // game is won by user
    else if (gameState === userSymbol) return depth - 1000;
    // game is won by cpu
    else if (gameState === cpuSymbol) return 1000 - depth;
  }
