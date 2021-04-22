const vertical = document.querySelector('.vertical');
const horozontal = document.querySelector('.horozontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');
const targetRect = target.getBoundingClientRect();
const targetHalfWidth = targetRect.width / 2;
const targetHalfHeight = targetRect.height / 2;
console.log(targetRect);

window.addEventListener('mousemove', (event) => {
  const x = event.clientX;
  const y = event.clientY;


  // vertical.style.left = `${x}px`;
  // horozontal.style.top = `${y}px`;
  vertical.style.transform = `translateX(${x}px)`;
  horozontal.style.transform = `translateY(${y}px)`;

  // target.style.left = `${x}px`;
  // target.style.top = `${y}px`;
  target.style.transform = `translate(${x - targetHalfWidth}px, ${y - targetHalfHeight}px)`;

  // tag.style.left = `${x}px`;
  // tag.style.top = `${y}px`;
  tag.style.transform = `translate(${x + 25}px, ${y + 15}px)`;
  tag.textContent = `${x}px, ${y}px`;
})


/*

1. top, left 속성에서 transform로 변경하면서 위치가 안맞음
  -> 기본 css에 top, left가 50%로 설정되어있었기 때문에 그것을 지워줌

2. 1번을 수정해도 마우스 포인트 좌표와 미묘하게 다름
  -> 바디에 기본 마진이 들어가있어서 마진과 패딩의 값이 마우스 좌표에 더해져서 출려되기 때문에 마진과 패딩을 없앤다.

3. target을 left, top속성을 transform(translate)로 변경하면서 기본에 있던 transform속성이 사라져서
   좌표가 어긋남
  ->target의 rect객체를 받아와서 해당 객체의 width와 height의 반값을 저장한 뒤, transform을 줄때
    마우스 좌표에서 해당 값만큼 빼서 화면에 렌더해준다.

*/