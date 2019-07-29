var taskContainer = document.querySelector('.form__div--tasks');
var plusBtn = document.querySelector('.form__btn--plus');
var taskInput = document.querySelector('.form__input--task');

plusBtn.addEventListener('click', displayTask);



function displayTask() {
  var task = `
      <img class="delete-btn" src="Images/delete.svg" alt="delete">
      <p class="task-text">${taskInput.value}</p>
    `
  taskContainer.insertAdjacentHTML('beforeend', task);
}