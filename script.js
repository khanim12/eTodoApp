// Elementleri Secme
const form = document.querySelector("#TodoAddForm"),
  addInput = document.querySelector("#todoName"),
  todoList = document.querySelector(".list-group"),
  clearButton = document.querySelector("#clearButton"),
  firstCardBody = document.querySelectorAll(".card-body")[0],
  secondCardBody = document.querySelectorAll(".card-body")[1],
  filter=document.getElementById("todoSearch")

 let todos = [];

runEvents();
function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
  secondCardBody.addEventListener("click", removeTodoToUi);
  clearButton.addEventListener("click", allTodosEverywhere)
  filter.addEventListener("keyup",filterTodo)
}
function pageLoaded() {
    checkTodosFromStorage()
    todos.forEach(todo => {
        addTodoToUI(todo)
    })
}
function filterTodo(e) {
  const filterValue = e.target.value.toLowerCase().trim();
  const todoListesi = document.querySelectorAll(".list-group-item");
  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
        todo.setAttribute("style","display : block")
      } else {
        todo.setAttribute("style","display:none !important" )
      }
    })
  } else {
    showAlert("warning","Filtreleme ucun en az bir todo olmalidir")
  }
}
function allTodosEverywhere() {
  const todoListesi = document.querySelectorAll(".list-group-item")
  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      todo.remove()
    })
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos))
    showAlert("success","basarili sekilde silindi")
  } else {
    showAlert("warning","Silmek ucun en azi bir todo olmalidir")
    
  }
}
function removeTodoToUi(e) {
    if (e.target.className === "fa fa-remove") {
        const todo = e.target.parentElement.parentElement;
        todo.remove()
      showAlert("success", "Todo silindi...")
      removeTodoToStorage(todo.textContent);
      showAlert("success","Todo silindi")
  }

   
}
function removeTodoToStorage(removeTodo) {
  checkTodosFromStorage();
  todos.forEach(function (todo, index) {
    if (removeTodo === todo) {
      todos.splice(index,1)
    }
  })
  localStorage.setItem("todos",JSON.stringify(todos))
}
function addTodo(e) {
  const inputText = addInput.value.trim();
  if (inputText == null || inputText == "") {
      showAlert("danger","elave edin")
      
  } else {
    addTodoToUI(inputText);
      addTodoToStorage(inputText);
      showAlert("success","elave edildi")
  }
  e.preventDefault();
}
function addTodoToUI(newTodo){
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.textContent = newTodo;
  const a = document.createElement("a");
  a.href = "#";
  a.className = "delete-item";
  const i = document.createElement("i");
  i.className = "fa fa-remove";
  a.appendChild(i);
  li.appendChild(a);
    todoList.appendChild(li);
    addInput.value=''
}
function addTodoToStorage(newTodo){
    checkTodosFromStorage()
    todos.push(newTodo)
    localStorage.setItem("todos",JSON.stringify(todos))
}
function checkTodosFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos=JSON.parse(localStorage.getItem("todos"))
  }
}

function showAlert(type, message) {
    const div = document.createElement('div')
    div.className = `alert alert-${type}`
    div.textContent = message
    firstCardBody.appendChild(div)
    setTimeout(function() {
        div.remove()
    },2500)
}