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
console.log(listOfToDos);

// Event Listeners
window.addEventListener('load', loadPage);
taskInput.addEventListener('keyup', handlePlusBtn);
plusBtn.addEventListener('click', displayTask);
taskList.addEventListener('click', deleteAsideTask);
makeTaskListBtn.addEventListener('click', buildCard);
clearAllBtn.addEventListener('click', clearAll);
cardSection.addEventListener('click', deleteToDoCard);
cardSection.addEventListener('click', buttonHandler);

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
  if (taskInput.value !== '') {
    plusBtn.disabled = false;
  } else {
    plusBtn.disabled = true;
  }
}

function buildCard() {
  var tasksArr = getTasks();
  var toDoList = new ToDoList({
    title:titleInput.value.toUpperCase(),
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
      <header class="article__section--top">
        <h2 class="section__h2 flex" contenteditable="true">${card.title}</h2>
      </header>
      <ul class="article__section--mid flex">
      ${pullTasks(card)}
      </ul>
      <footer class="article__section--bot">
        <div class="urgent__container">
          <img class="urgent__img" src="Images/urgent.svg">
          <p>URGENT</p>
        </div>
        <div class="delete__container">
          <img class="todo-card__bottom--delete" src="Images/delete.svg">
          <p>DELETE</p>
        </div>
      </footer>
    </article>`;
    cardSection.insertAdjacentHTML('afterbegin', cardText);
}

function pullTasks(card) {
  var strings = '';
  card.tasks.forEach(function(task) {
    strings += `<li class="flex" data-id=${task.id} id="task__text"><img class="check-img" src="Images/checkbox.svg" alt="checkbox"> ${task.title}</li>`;
  })
  return strings;
}

function clearAll() {
  taskInput.value = '';
  titleInput.value = '';
  taskList.innerText = '';
}

function disableBtn() {
  if (taskList.innerText === '' || titleInput.value === '') {
    makeTaskListBtn.disabled = true;
    clearAllBtn.disabled = true;
  } else {
    makeTaskListBtn.disabled = false;
    clearAllBtn.disabled = false;
  }
}

function handleIndex(id) {
  for(var i = 0; i < listOfToDos.length; i++)  {
    if(id == listOfToDos[i].id) {
      return i;
    }
  }
}

function findTargetIndex(event) {
  var identification = event.target.closest('article').dataset.id;
  var objIndex = handleIndex(identification);
  return objIndex;
}

function deleteToDoCard(event) {
  if (event.target.classList.contains('todo-card__bottom--delete')) {
    event.target.parentNode.parentNode.parentNode.remove();
    removeFromStorage(event);
  }
}

function removeFromStorage(card) {
  console.log('here')
  var targetIndex = findTargetIndex(event);
  console.log(targetIndex);
  listOfToDos = listOfToDos[targetIndex].deleteFromStorage(targetIndex, listOfToDos);
}

function toggleChecked(event) {
  event.target.src.includes('Images/checkbox.svg') ? event.target.src = 'Images/checkbox-active.svg' : event.target.src = 'Images/checkbox.svg';
}

function buttonHandler(event) {
  if ((event.target.src.includes('Images/checkbox.svg')) || (event.target.src.includes('Images/checkbox-active.svg'))) {
    toggleChecked(event);
  }
}

function get