'use strict';

// Selecting Elements
const scoresEl = [
  document.querySelector('#score--0'),
  document.querySelector('#score--1'),
];
// const score0El = document.querySelector('#score--1');
// const score1El = document.querySelector('#score--1');

const currentScoreEl = [
  document.getElementById('current--0'),
  document.getElementById('current--1'),
];

// const current0El = document.getElementById('current--0');
// const current1El = document.getElementById('current--1');

const playersEl = [
  document.querySelector('.player--0'),
  document.querySelector('.player--1'),
];

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  playersEl[0].classList.toggle('player--active');
  playersEl[1].classList.toggle('player--active');
}

// Starting Conditions
diceEl.classList.add('hidden');
scoresEl[0].textContent = 0;
scoresEl[1].textContent = 0;

let scores = [0, 0],
  currentScore,
  activePlayer,
  playing;

const init = () => {
  currentScore = 0;
  scores = [0, 0];
  playing = true;
  activePlayer = 0;

  scoresEl[0].textContent = '0';
  scoresEl[1].textContent = '0';
  playersEl[0].classList.remove('player--winner');
  playersEl[1].classList.remove('player--winner');
  currentScoreEl[0].textContent = '0';
  currentScoreEl[1].textContent = '0';
  playersEl[0].classList.add('player--active');
  playersEl[1].classList.remove('player--active');
};

init();

// Rolling dice
btnRoll.addEventListener('click', () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      currentScoreEl[activePlayer].textContent = currentScore;
    } else {
      currentScoreEl[activePlayer].textContent = 0;
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    scoresEl[activePlayer].textContent = scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      return;
    }
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
