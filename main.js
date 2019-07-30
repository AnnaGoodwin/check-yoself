// Variables
var taskContainer = document.querySelector('.form__div--tasks');
var titleInput = document.querySelector('.form__input--title');
var plusBtn = document.querySelector('.form__btn--plus');
var taskInput = document.querySelector('.form__input--task');
var taskList = document.querySelector('.form__div--tasks');
var cardSection = document.querySelector('.main__section');
var makeTaskListBtn = document.querySelector('.form__btn--task');
var listOfToDos = [];

// Event Listeners
taskInput.addEventListener('keyup', handlePlusBtn);
plusBtn.addEventListener('click', displayTask);
taskList.addEventListener('click', deleteAsideTask);
makeTaskListBtn.addEventListener('click', buildCard);

// Functions
function displayTask() {
  var task = `
    <div class="task-container" data-id="${Date.now()}">
      <img class="delete-btn" src="Images/delete.svg" alt="delete">
      <p class="task-text">${taskInput.value}</p>
    </div>
  `
  taskContainer.insertAdjacentHTML('beforeend', task);
  taskInput.value = '';
  handlePlusBtn();
  disableMakeTaskBtn();
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

function buildCard() {
  var tasksArr = getTasks();
  var todoList = new ToDoList({
    title:titleInput.value,
    tasks:tasksArr
  });
  listOfToDos.push(todoList);
  appendCard(todoList);
  clearAll();
}

function getTasks() {
  var tasksArr = [];
  var tasksOnDom = document.querySelectorAll('.task-container');
  tasksOnDom.forEach(function(el) {
    tasksArr.push({id: el.dataset.id,
    title: el.innerText,
    complete: false})
  })
  return tasksArr;
}

function appendCard(card) {
  var cardText = `
    <article class="article__card" data-id=${card.id}>
      <section class="article__section--top flex">
        <h2 class="section__h2" contenteditable="true">${card.title}</h2>
      </section>
      <section class="article__section--mid flex">
      ${pullTasks(card)}
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
    cardSection.insertAdjacentHTML('afterbegin', cardText);
}

function pullTasks(card) {
  var strings = '';
  card.tasks.forEach(function(task) {
    strings += `<p><img src="" alt="checkbox">${task.title}</p>`;
  })
  return strings;
}

function clearAll() {
  taskInput.value = '';
  titleInput.value = '';
  taskList.innerHTML = '';
}

function disableMakeTaskBtn() {
  if(taskList.innerHTML === '' || titleInput.value === '') {
    makeTaskListBtn.disabled = true;
  } else {
    makeTaskListBtn.disabled = false;
  }
}