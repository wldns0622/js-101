'use strict'
const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION = 10;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameButton = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameCounter = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const backgroundMusic = new Audio('./sound/bg.mp3');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const gameWinSound = new Audio('./sound/game_win.mp3');
const alertSound = new Audio('./sound/alert.wav');
let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFieldClick);

popUpRefresh.addEventListener('click', () => {
  showPlayButton();
  initTimerAndCounter();
  hidePopUp();
  startGame();
  startGameTimer();
  startedStatusChange();
})

function showPlayButton() {
  gameButton.style.visibility = 'visible';
}

function initTimerAndCounter() {
  gameTimer.textContent = GAME_DURATION;
  gameCounter.textContent = CARROT_COUNT;
}

function hidePopUp() {
  popUp.classList.add('hide');
}

function startedStatusChange() {
  started = true;
}

gameButton.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
})

function stopGame() {
  stopGameTimer();
  hideStartButton();
  // popUp.classList.remove('hide');
  // gameButton.style.visibility = 'hidden';
  showPopUpWithText('REPLAY?');
  playSound(alertSound);
  stopSound(backgroundMusic);
}

function startGame() {
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(backgroundMusic);
}


function showStopButton() {
  const icon = gameButton.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function hideStartButton() {
  gameButton.style.visibility = 'hidden';
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameCounter.style.visibility = 'visible';
}

function startGameTimer() {
  timer = setInterval(() => {
    if (gameTimer.textContent === '1') {
      gameTimer.textContent = Number(gameTimer.textContent) - 1;
      clearInterval(timer);
      showPopUpWithText('REGAME?');
      hideStartButton();
      return;
    }
    gameTimer.textContent = Number(gameTimer.textContent) - 1;
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function showPopUpWithText(text) {
  popUpText.textContent = text;
  popUp.classList.remove('hide');
}

function initGame() {
  field.innerHTML = '';
  gameCounter.textContent = CARROT_COUNT;
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
}

function onFieldClick(event) {
  if (!started) { return; }
  const target = event.target;
  if (target.matches('.carrot')) {
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  }
  else if (target.matches('.bug')) {
    finishGame(false);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameCounter.innerHTML = CARROT_COUNT - score;
}

function finishGame(win) {
  started = false;
  stopGameTimer();
  hideStartButton();
  showPopUpWithText(win ? 'YOU WON!!' : 'YOU LOST...');
  if (win) {
    playSound(gameWinSound)
    stopSound(backgroundMusic);
  }
  else {
    playSound(alertSound);
    stopSound(backgroundMusic);
  }
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.append(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
