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

  deleteFromStorage() {
    
  }

  updateToDo() {
  
  }

  updateTask() {

  }

  addTask() {

  }
}

