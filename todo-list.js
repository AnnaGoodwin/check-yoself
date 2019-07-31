class ToDoList {
  constructor(obj) {
    this.id = obj.id || Date.now();
    this.title = obj.title;
    this.urgent = obj.urgent || false;
    this.tasks = obj.tasks || [];
  }

  saveToStorage(listOfToDos) {
    localStorage.setItem('storedTodos', JSON.stringify(listOfToDos));
  }

  deleteFromStorage(index, array) {
    array.splice(index, 1);
    this.saveToStorage(array);
  }

  updateToDo() {
  
  }

  updateTask() {

  }

  addTask() {

  }
}

