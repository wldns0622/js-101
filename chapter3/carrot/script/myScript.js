const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const timerElement = document.querySelector('.game__timer');
const countSpan = document.querySelector('.game__score');
let countTimer;
let count = 10;
let timer = 10;

function initialize() {
  count = 10;
  timer = 10;
  timerElement.textContent = timer;
  countSpan.textContent = count;
  // 1. field의 영역을 지운다.
  field.innerHTML = '';
  // 2. 개미와 당근을 화면에 랜덤한 값으로 표시한다(함수)
  renderImg('/chapter3/carrot/img/carrot.png', 'carrot', 10);
  renderImg('/chapter3/carrot/img/bug.png', 'bug', 10);
  countTimer = setInterval(() => {
    if (--timer) {
      timerElement.textContent = timer;
    } else {
      timerElement.textContent = timer;
      gameResult('YOU LOSE');
    }
  }, 1000);
}

function renderImg(imagePath, className, count) {
  for (let i = 0; i < count; i++) {
    // 1. 태그를 만드는 함수를 호출한다.
    const img = makeImg(imagePath, className);
    // 2. 태그의 위치를 랜덤하게 정해준다.
    const minWidth = 0;
    const minHeigth = 0;
    const maxWidth = fieldRect.width - 60;
    const maxHeight = fieldRect.height - 60;
    img.style.left = `${randomPosition(minWidth, maxWidth)}px`;
    img.style.top = `${randomPosition(minWidth, maxHeight)}px`;
    randomPosition(minHeigth, maxHeight);
    // 3. 이미지에 클릭 이벤트를 준다.
    // 2. 리턴된 태그를 append해준다.
    field.appendChild(img);
  }

}

function makeImg(imagePath, className) {
  //1. 태그를 만든다.
  const img = document.createElement('img');
  //2. 이미지 패스를 지정한다.
  img.setAttribute('src', imagePath);
  //3. 클래스를 할당한다.
  img.setAttribute('class', className);
  //4. 태그를 리턴한다.
  return img;
}

function randomPosition(min, max) {
  return Math.random() * max;
}

function gameResult(text) {
  const popUp = document.querySelector('.pop-up');
  const popUpText = document.querySelector('.pop-up__message');
  popUp.classList.remove('pop-up--hide');
  popUpText.textContent = text;
  clearInterval(countTimer);
}

initialize();

field.addEventListener('click', (event) => {
  const target = event.target;
  const targetClass = event.target.classList[0];
  if (targetClass === 'carrot') {
    target.remove();
    countSpan.textContent = --count;
  }
  else if (targetClass === 'bug' || !timer) {
    gameResult('YOU LOSE...');
  }

  if (!count) {
    gameResult('YOU WIN!')
  }
});

document.querySelector('.pop-up__refresh').addEventListener('click', () => {
  initialize();
  document.querySelector('.pop-up').classList.add('pop-up--hide');
})

