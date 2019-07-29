var taskContainer = document.querySelector('.form__div--tasks');
var titleInput = document.querySelector('.form__input--title');
var plusBtn = document.querySelector('.form__btn--plus');
var taskInput = document.querySelector('.form__input--task');
var taskList = document.querySelector('.form__div--tasks');
var cardSection = document.querySelector('.main__section');
var makeTaskListBtn = document.querySelector('.form__btn--task');
var listOfToDos = [];

taskInput.addEventListener('keyup', handlePlusBtn);
plusBtn.addEventListener('click', createTaskObj);
taskList.addEventListener('click', deleteAsideTask);
makeTaskListBtn.addEventListener('click', buildCard);

function displayTask(obj) {
  var task = `
    <div class="task-container" data-id="${obj.id}">
      <img class="delete-btn" src="Images/delete.svg" alt="delete">
      <p class="task-text">${taskInput.value}</p>
    </div>
  `
  taskContainer.insertAdjacentHTML('beforeend', task);
  taskInput.value = '';
  handlePlusBtn();
}

function createTaskObj() {
  var taskObj = {
    id: Date.now(),
    title: taskInput.value,
    complete: false
  }
  displayTask(taskObj)
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

function buildCard(obj) {
  var todoList = new ToDoList({title:titleInput.value});
  console.log(todoList);
  listOfToDos.push(todoList);
  appendCard(todoList);
}

function appendCard(card) {
  var cardText = `
    <article class="article__card" data-id=${card.id}>
      <section class="article__section--top flex">
        <h2 class="section__h2" contenteditable="true">${card.title}</h2>
      </section>
      <section class="article__section--mid flex">
      </section>
      <section class="article__section--bot flex">
        <div class="urgent__container flex">
          <img class="urgent__img" src="images/urgent.svg">
          <p>Urgent</p>
        </div>
        <div class="input__container flex">
          <input class="input__container--text" type="text" placeholder=" Add task">
          <button class="input__container--btn">+</button>
        </div>
        <div class="flex">
          <img class="todo-card__bottom--delete" src="images/delete.svg">
          <p>Delete</p>
        </div>
      </section>
    </article>`;
    console.log(card.title);
    cardSection.insertAdjacentHTML('afterbegin', cardText);
}

function clearAll() {
  taskInput.value = '';

}