const vertical = document.querySelector('.vertical');
const horozontal = document.querySelector('.horozontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

window.addEventListener('mousemove', (event) => {
  const x = event.clientX;
  const y = event.clientY;

  vertical.style.left = `${x}px`;
  horozontal.style.top = `${y}px`;
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
  tag.style.left = `${x}px`;
  tag.style.top = `${y}px`;
  tag.textContent = `${x}px, ${y}px`;
})