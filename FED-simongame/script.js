// VARIABLES

const balls = document.querySelectorAll('.ball');

const energyBtn = document.querySelector('.energy');
const toggleBtn = document.querySelector('.toggle');
const strictBtn = document.querySelector('.strict');

const display = document.querySelector('.step-display');
const displayCounter = document.querySelector('.counter-display');
const displayTotal = document.querySelector('.total-display');

const gameEnd = document.querySelector('.game-end');

const audios = document.querySelectorAll('.piano');
const buzzer = document.querySelector('.buzzer');
const gameEndSound = document.querySelector('.gameover');

const animation = 'show';

const ballTimeOuts = {};
const userTimeOuts = {};

const autoSequence = [0, 1, 2, 3];
const gameSequence = [];

let on = false;
let gameRunning = false;
let userturn = false;
let strict = false;

let gameCounter;
let userCounter = 0;

const coreTime = 750;
const autoTimer = 50;
const step = 100;

const win = 19;

// AUDIO SETTINGS

audios.forEach(function(audio) {
  audio.playbackRate = 3;
});

buzzer.volume = 0.05;
gameEndSound.volume = 0.05;

// HELPER FUNCTION

function randomize() {
  const num = Math.floor(Math.random() * 4);
  return num;
}


// GAME FUNCTIONS

function initGame() {
  gameCounter = 0;
  gameSequence.splice(0);
  for ( let i = 0; i < 20; i ++) {
    const random = randomize();
    gameSequence.push(random);
  }
  playSeq();
}

function resetGame() {
  clearBallTimeouts();
  clearBallAni();

  userturn = false;
  gameRunning = false;

  displayCounter.innerHTML = '00';
  toggleBtn.innerHTML = 'start';
}

function gameOver() {
  gameEnd.classList.add('visible');
  gameEndSound.play();
  setTimeout( function() {
    gameEnd.classList.remove('visible');
    resetGame();
  }, 2500);
}


// GAMEPLAY FUNCTIONS

function playSeq() {
  blockBalls();

  displayCounter.innerHTML =
    gameCounter < 9 ?
    `0${gameCounter + 1}` :
    `${gameCounter + 1}`;

  for ( let i = 0; i <= gameCounter; i++) {
    ballTimeOuts[`ball${i}`] = setTimeout(function() {
      playBall(gameSequence[i]);
    }, i * (coreTime + 10));
  }

  // release Balls
  // includes userturn = true;
  const releaseTime = (gameCounter + 0.5) * (coreTime + 25);
  setTimeout(releaseBalls, releaseTime);
}

function replaySeq(input) {
  const id = parseInt(input);
  userGlowBall(id);

  if (id !== gameSequence[userCounter]) {
    // wrong
    userturn = false;
    setTimeout(() => {buzzer.play()}, coreTime);
    if ( !strict ) {
      // non-strict
      setTimeout(playSeq, coreTime + 1000);
    } else {
      // strict
      setTimeout(initGame, coreTime + 1000);
    }
  } else {
    // right
    if (userCounter < gameCounter) {
      // In Replay
      userCounter++;
    } else {
      // End of Replay
      if (gameCounter === win) {
        // End of Game
        setTimeout(gameOver, coreTime * 1.5);
      } else {
        // In Game
        gameCounter++;
        setTimeout(playSeq, coreTime + 500);
      }
    }
  }
}


// BALL FUNCTIONS

function playBall(id) {
  soundBall(id);
  glowBall(id);
}

function soundBall(id) {
  const audio = document.querySelector(`audio[data-id="${id}"]`);
  audio.currentTime = 0;
  audio.play();
}

function glowBall(id) {
  const ball = document.querySelector(`button[data-id="${id}"]`);
  ball.classList.add(animation);
  setTimeout(function() {
    ball.classList.remove(animation);
  }, coreTime-10);
}

function userGlowBall(id) {
  soundBall(id);
  if(balls[id].classList.value.includes('show')) {
    clearTimeout(userTimeOuts[`ball${id}`]);
    balls[id].classList.remove('show');
  }
  setTimeout(function() {
    balls[id].classList.add('show');
    userTimeOuts[`ball${id}`] = setTimeout(function() {
      balls[id].classList.remove('show');
    }, 1.2*coreTime);
  }, 10);
}

// HELPER BALL FUNCTIONS

// reset Timeouts of balls

function clearBallTimeouts() {
  for (let i = 0; i <= gameCounter; i++) {
    clearTimeout(ballTimeOuts[`ball${i}`]);
  }
}

// reset animation of balls

function clearBallAni() {
  balls.forEach(function(ball) {
    ball.classList.remove(animation);
  });
}

// block balls for user

function blockBalls() {
  userturn = false;
  balls.forEach(function(ball) {
    ball.setAttribute('disabled', 'true');
  });
}

// release balls for user

function releaseBalls() {
  userturn = true;
  userCounter = 0;
  balls.forEach(function(ball) {
    ball.removeAttribute('disabled');
  });
}

// BALL ANIMATIONS FOR ON/OFF BUTTON

function autoBalls(type, autoTimer, step) {
  balls.forEach(function(ball) {
    ball.classList.remove(animation);
  });
  audios.forEach(function(audio) {
    audio.pause();
  });

  if (type === 'on') {
    for ( let i = 0 ; i < autoSequence.length; i++) {
      setTimeout(function() {
        glowBall(i);
      }, autoTimer);
      autoTimer += step;
    }
  } else if ( type === 'off'){
    for ( let i = autoSequence.length ; i > 0; i--) {
      setTimeout(function() {
        glowBall(i-1);
      }, autoTimer);
      autoTimer += step;
    }
  }
}


//  BALL "BUTTONS"

balls.forEach((ball) => ball.addEventListener('click', function() {
  if (on && !gameRunning) {
    userGlowBall(ball.dataset.id);
  } else if (gameRunning && userturn) {
    replaySeq(ball.dataset.id);
  }
}));

// ON/OFF BUTTON

energyBtn.addEventListener('click', function() {
  energyBtn.setAttribute('disabled', 'true');

  if (energyBtn.innerHTML === 'ON'){
    // ON
    autoBalls('on', autoTimer, step);
    on = true;

    energyBtn.innerHTML = 'OFF';
    displayTotal.innerHTML =
    win < 9 ?
    `0${win + 1}` :
    `${win + 1}`;
    display.classList.toggle('no-display');
    setTimeout(function() {
      toggleBtn.removeAttribute('disabled');
      strictBtn.removeAttribute('disabled');
    }, (autoTimer + step * autoSequence.length + coreTime/2));

  } else {
    // OFF
    resetGame();
    setTimeout( function() {
      autoBalls('off', autoTimer, step);
    }, 50);

    on = false;
    strict = false;

    energyBtn.innerHTML = 'ON';
    toggleBtn.setAttribute('disabled', 'true');
    strictBtn.setAttribute('disabled', 'true');
    strictBtn.classList.remove('strict-active');
    displayTotal.innerHTML = '00';
    display.classList.toggle('no-display');
  }
  setTimeout(function() {
    energyBtn.removeAttribute('disabled');
  }, (autoTimer + step * autoSequence.length + coreTime/2));
});

// START BUTTON

toggleBtn.addEventListener('click', function() {
  clearBallTimeouts();
  gameRunning = true;
  const status = toggleBtn.innerHTML.toLowerCase();
  toggleBtn.innerHTML = gameRunning ? 'reset' : 'start';
  toggleBtn.setAttribute('disabled', 'true');
  setTimeout(function() {
    toggleBtn.removeAttribute('disabled');
    initGame();
  }, 500);
});

// STRICT BUTTON

strictBtn.addEventListener('click', function() {
  strict = !strict;
  strictBtn.classList.toggle('strict-active');
});
