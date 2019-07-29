var taskContainer = document.querySelector('.form__div--tasks');
var plusBtn = document.querySelector('.form__btn--plus');
var taskInput = document.querySelector('.form__input--task');
var taskList = document.querySelector('.form__div--tasks');
var cardSection = document.querySelector('.main__section');
var makeTaskListBtn = document.querySelector('.form__btn--task');

taskInput.addEventListener('keyup', handlePlusBtn);
plusBtn.addEventListener('click', displayTask);
taskList.addEventListener('click', deleteAsideTask);
makeTaskListBtn.addEventListener('click', appendCard);

function displayTask() {
  var task = `
    <div class="task-container">
      <img class="delete-btn" src="Images/delete.svg" alt="delete">
      <p class="task-text">${taskInput.value}</p>
    </div>
  `
  taskContainer.insertAdjacentHTML('beforeend', task);
  taskInput.value = '';
  handlePlusBtn();
}

function deleteAsideTask(event) {
  if (event.target.matches('.delete-btn')) {
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
  }
}

function handlePlusBtn() {
    if(taskInput.value !== '') {
    plusBtn.disabled = false;
  } else {
    plusBtn.disabled = true;
  }
}

function appendCard(card) {
  var cardText = `
    <article class="todo-card" data-id=${card.id}>
      <section class="todo-card__top flex">
        <h2 class="todo-card__top--title" contenteditable="true">${card.title}</h2>
      </section>
      <section class="todo-card__middle todo-card__middle--border flex">
      </section>
      <section class="todo-card__bottom flex">
        <div class="todo-card__bottom__icon todo-card__bottom__icon--urgent flex">
          <img class="todo-card__bottom--urgent" src="images/urgent.svg">
          <p>Urgent</p>
        </div>
        <div class="todo-card__bottom__input flex">
          <input class="todo-card__bottom__input--text" type="text" placeholder=" Add task">
          <button class="todo-card__bottom__input--button">+</button>
        </div>
        <div class="todo-card__bottom__icon todo-card__bottom__icon--delete flex">
          <img class="todo-card__bottom--delete" src="images/delete.svg">
          <p>Delete</p>
        </div>
      </section>
    </article>`;
    cardSection.insertAdjacentHTML('afterbegin', cardText);
}