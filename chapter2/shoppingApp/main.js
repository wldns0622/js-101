const input = document.querySelector('input');
const sendButton = document.querySelector('.shopping__input>button');
const clearButton = document.querySelector('.clear');
const ul = document.querySelector('ul');


//[이벤트 핸들러] 입력
let inputShoppingList = function () {
  if (!input.value) {
    return;
  }

  const li = document.createElement('li');
  const itemName = document.createElement('span');
  const deleteButton = document.createElement('span');

  itemName.textContent = `${input.value}`;
  deleteButton.textContent = 'X';

  li.classList.add('item');

  itemName.addEventListener('click', (event) => {
    event.target.classList.toggle('done');
  })
  deleteButton.addEventListener('click', (event) => {
    li.remove();
  })

  li.append(itemName, deleteButton);
  ul.append(li);

  input.value = '';
}

sendButton.addEventListener('click', inputShoppingList);
input.addEventListener('keydown', (event) => {
  console.log(event);
  if (event.key === 'Enter') {
    inputShoppingList();
  }
})

clearButton.addEventListener('click', () => {
  ul.textContent = '';
})

