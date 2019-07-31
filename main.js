// Variables
var taskContainer = document.querySelector('.form__div--tasks');
var titleInput = document.querySelector('.form__input--title');
var plusBtn = document.querySelector('.form__btn--plus');
var taskInput = document.querySelector('.form__input--task');
var taskList = document.querySelector('.form__div--tasks');
var cardSection = document.querySelector('.main__section');
var makeTaskListBtn = document.querySelector('.form__btn--task');
var clearAllBtn = document.querySelector('.form__btn--clear');
var listOfToDos = JSON.parse(localStorage.getItem('storedTodos')) || [];

// Event Listeners
window.addEventListener('load', loadPage);
taskInput.addEventListener('keyup', handlePlusBtn);
plusBtn.addEventListener('click', displayTask);
taskList.addEventListener('click', deleteAsideTask);
makeTaskListBtn.addEventListener('click', buildCard);
clearAllBtn.addEventListener('click', clearAll);

// Functions
function loadPage() {
  instantiateToDos();
  appendToDos();
}

function instantiateToDos() {
  listOfToDos = listOfToDos.map(function(card) {
    return new ToDoList(card);
  });
}

function appendToDos() {
  listOfToDos.forEach(function(card) {
    appendCard(card);
  })
}

function displayTask() {
  var task = `<div class="task-container" data-id="${Date.now()}">
      <img class="delete-btn" src="Images/delete.svg" alt="delete">
      <p class="task-text">${taskInput.value}</p>
    </div>`
  taskContainer.insertAdjacentHTML('beforeend', task);
  taskInput.value = '';
  handlePlusBtn();
  disableBtn();
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
  var toDoList = new ToDoList({
    title:titleInput.value,
    tasks:tasksArr
  });
  listOfToDos.push(toDoList);
  appendCard(toDoList);
  toDoList.saveToStorage(listOfToDos);
  clearAll();
  disableBtn();
}

function getTasks() {
  var tasksArr = [];
  var tasksOnDom = document.querySelectorAll('.task-container');
  tasksOnDom.forEach(function(task) {
    tasksArr.push({id: task.dataset.id,
    title: task.innerText,
    complete: false});
  })
  return tasksArr;
}

function appendCard(card) {
  var cardText = `<article class="article__card" data-id=${card.id}>
      <section class="article__section--top flex">
        <h2 class="section__h2" contenteditable="true">${card.title}</h2>
      </section>
      <section class="article__section--mid">
      ${pullTasks(card)}
      </section>
      <section class="article__section--bot">
        <div class="urgent__container">
          <img class="urgent__img" src="images/urgent.svg">
          <p>Urgent</p>
        </div>
        <div class="delete__container">
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
    strings += `<p data-id=${task.id}><img src="Images/checkbox.svg" alt="checkbox">${task.title}</p>`;
  })
  return strings;
}

function clearAll() {
  taskInput.value = '';
  titleInput.value = '';
  taskList.innerText = '';
}

function disableBtn() {
  if(taskList.innerText === '' || titleInput.value === '') {
    makeTaskListBtn.disabled = true;
    clearAllBtn.disabled = true;
  } else {
    makeTaskListBtn.disabled = false;
    clearAllBtn.disabled = false;
  }
}