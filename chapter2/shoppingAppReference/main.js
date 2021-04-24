const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

let createItem = function (text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');

  const item = document.createElement('div');
  item.setAttribute('class', 'item');

  const name = document.createElement('span');
  name.setAttribute('class', 'item__name');
  name.textContent = text;

  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('class', 'item__delete');
  deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteButton.addEventListener('click', (event) => {
    items.removeChild(itemRow);
  })

  const itemDivider = document.createElement('div');
  itemDivider.setAttribute('class', 'item__divider');

  item.appendChild(name);
  item.appendChild(deleteButton)

  itemRow.appendChild(item);
  itemRow.appendChild(itemDivider);

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