var taskContainer = document.querySelector('.form__div--tasks');
var plusBtn = document.querySelector('.form__btn--plus');
var taskInput = document.querySelector('.form__input--task');
var taskList = document.querySelector('.form__div--tasks')

plusBtn.addEventListener('click', displayTask);
taskList.addEventListener('click', deleteAsideTask);

function displayTask() {
  var task = `
    <div class="task-container">
      <img class="delete-btn" src="Images/delete.svg" alt="delete">
      <p class="task-text">${taskInput.value}</p>
    </div>
  `
  taskContainer.insertAdjacentHTML('beforeend', task);
}

function deleteAsideTask(event) {
  if (event.target.matches('.delete-btn')) {
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
  }
}