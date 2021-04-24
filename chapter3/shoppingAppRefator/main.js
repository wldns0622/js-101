const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

let id = 0; // UUID
let createItem = function (text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.setAttribute('data-id', id);
  itemRow.innerHTML = `
    <div class="item">
      <span class="item__name">${text}</span>
      <button class="item__delete">
        <i class="fas fa-trash-alt" data-id=${id}></i>
      </button>
    </div>
    <div class="item__divider"></div>
  `;

  id++;

  return itemRow;
}

/* 
  주석은 함수를 작성할 때 작성하는것이 좋으며,
  하나하나 작성하는 것보다는 why? 왜 이 함수를 작성했는지에 대한 이유를 작성하면 좋다.
*/
let onAdd = function () {
  const text = input.value;
  if (!text) {
    input.focus();
    return;
  }
  const item = createItem(text);
  items.appendChild(item);
  item.scrollIntoView({ block: 'center', behavior: 'smooth' });
  input.value = '';
  input.focus();
}

addBtn.addEventListener('click', () => {
  onAdd();
});

input.addEventListener('keypress', (event) => {
  console.log('key');
  if (event.key === 'Enter') {
    onAdd();
  }
})

items.addEventListener('click', event => {
  const id = event.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
})