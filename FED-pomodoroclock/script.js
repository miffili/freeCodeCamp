const timerDisplay = document.querySelector('.timer-display');
const toggleButton = document.querySelector('.toggle-timer');
const resetButton = document.querySelector('.reset-timer');
const setTimerButtons = document.querySelectorAll('.set-timer');
const notifButton = document.querySelector('.toggle-notification');
const banIcon = document.querySelector('.fa-ban');
const progressDisplay = document.querySelector('.progress');

// audio
const sound = document.querySelector('#doneSound');
sound.volume = 0.05;

// times in seconds
const maxTime = 3300;
const minTime = 300;

const defaultTime = 1500;
let pomodoroTime = 1500;

let countdown;
let timerStatus = false;
let notifStatus = true;


function displayTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const restSeconds = seconds % 60;
  const displayMins = `${minutes < 10 ? '0' : ''}${minutes}`;
  const displaySecs = `${restSeconds < 10 ? '0' : ''}${restSeconds}`;
  const display = `${displayMins}:${displaySecs}`;

  timerDisplay.textContent = display;
}


function runTimer(seconds) {
  clearInterval(countdown);
  updateProgress(pomodoroTime-1);

  // calculate timeleft
  const now = Date.now();
  const timesUp = now + seconds * 1000;

  // start interval
  countdown = setInterval(() => {

    const secondsLeft = Math.round((timesUp - Date.now()) / 1000);

    if (secondsLeft < 1) {
      if (notifStatus) {sound.play();}
      toggleButton.textContent = 'End';
      toggleButton.setAttribute('disabled', true);
      timerStatus = false;
    }

    // if time is up
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    // display timer
    displayTime(secondsLeft);
    updateProgress(secondsLeft-1);

  }, 1000);
}


function togglePomodoro() {
  // stops timer
  if (timerStatus) {
    toggleButton.textContent = 'Start';

    // stop running timer
    clearInterval(countdown);

  // starts timer
  } else if (!timerStatus){

    // update UI
    displayTime(pomodoroTime);
    setTimerButtons.forEach((el) => el.setAttribute('disabled', true));
    toggleButton.textContent = 'Stop';

    // get set time & convert to seconds
    const timerSeconds = pomodoroTime;

    // run Timer
    runTimer(timerSeconds);
  }

  timerStatus = !timerStatus;
}


function resetTimer() {
  timerStatus = false;
  setTimerButtons.forEach((el) => el.removeAttribute('disabled'));
  toggleButton.removeAttribute('disabled');
  toggleButton.textContent = 'Start';
  clearInterval(countdown);
  displayTime(pomodoroTime);
  updateProgress(pomodoroTime);
}


function updateTime(e) {
  const type = e.target.id;

  if (type === 'inc' && pomodoroTime < maxTime) {
    pomodoroTime += 300;
  } else if (type === 'dec' && pomodoroTime > minTime) {
    pomodoroTime -= 300;
  }

  displayTime(pomodoroTime);
}


function updateProgress(timeLeft) {
  const progress = (timeLeft / pomodoroTime) * 100;
  progressDisplay.style.width = `${progress}%`;
}


function toggleNotification() {
  banIcon.classList.toggle('off');
  notifStatus = !notifStatus;
}


toggleButton.addEventListener('click', togglePomodoro);
resetButton.addEventListener('click', resetTimer);
resetButton.addEventListener('dblclick', () => {
  pomodoroTime = defaultTime;
  resetTimer();
});
setTimerButtons.forEach((el) => el.addEventListener('click', updateTime));
notifButton.addEventListener('click', toggleNotification);
