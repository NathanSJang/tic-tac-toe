/*----- constants -----*/ 
const winningNum = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const player = {
  '1': 'Player 1',
  '-1': 'Player 2',
  'null': null,
};

/*----- app's state (variables) -----*/ 
let currentPlayer;// player1, player2
let gameStatus;// null(playing), win  draw
let board;//ocupied?
let clicked = false;

/*----- cached element references -----*/ 
const boxEl = document.querySelectorAll('.box');
const msgEl = document.getElementById('msg');
const replayBtn = document.getElementById('replay');
const clickBox = document.querySelector('.box');
const xBox = document.querySelectorAll('.box-x');
const yBox = document.querySelector('.box-y')

/*----- event listeners -----*/ 
// clickBox.forEach(function(cell) {
//   cell.addEventListener('click', handleBoxClick);
// })
// boxEl.addEventListener('click', handleBoxClick)

document.getElementById('replay')
  .addEventListener('click', init);

/*----- functions -----*/
init();

boxEl.forEach(function(box) {
  box.addEventListener('click', handleBoxClick);
  clicked = true;
})

function handleBoxClick(e) {
  const box = Array.from(boxEl);
  const index = box.indexOf(e.target);

  borad[index] = currentPlayer;
  if (currentPlayer === player[1]) {
    boxEl[index].setAttribute('class', 'box-x')
    currentPlayer = player[-1];

  } else {
    boxEl[index].setAttribute('class', 'box-y')
    currentPlayer = player[1];

  }
  
  gameStatus = gameStatusWin();

  render();
}

function resetBorad() {
  boxEl.forEach(function(box) {
    box.setAttribute('class', 'box');
  });
}

function gameStatusWin() {
  let winner = null

  winningNum.forEach(function(winNum, index) {
    if (borad[winNum[0]] && borad[winNum[0]] === borad[winNum[1]] 
      && borad[winNum[0]] === borad[winNum[2]]) {
        return winner = borad[winNum[0]];
      }
    });

    if (winner) {
      return winner;
    } else if (borad.includes(null)) {
      return null;
    } else {
      return 'T'
    }
    
}

function render() {
  replayBtn.style.visibility = gameStatus ? 'visible' : 'hidden';
  renderMessage();
  // renderBoxes();

  }

  function renderMessage() {
    if (gameStatus === 'T') {
      msgEl.textContent = 'Tie Try Again'
    } else if (gameStatus) {
      msgEl.innerHTML = `${gameStatus} YOU WIN`
    } else {
      msgEl.innerHTML = `${currentPlayer}'s Turn`;
    }
  }

  function renderBoxes() {
    boxEl.forEach(function(box) {
      if (clicked === true) {
        box.disabled = true;
      }
    })
    }

function init() {
  borad = [null, null, null, null, null, null, null, null, null];
  
  currentPlayer = player[1];
  gameStatus = null;
  

  resetBorad();
  render();
}