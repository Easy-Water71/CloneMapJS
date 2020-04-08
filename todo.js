const todoForm = document.querySelector(".js-todoForm");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".js-todoList");

const TODO_LS = "toDos";
let toDos = [];

function deleteToDos(event) { 
  const btn = event.target;
  const li = btn.parentNode;
  todoList.removeChild(li);
  
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
  }); 

  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function handleSubmit(event) {
  event.preventDefault();
  const todoValue = todoInput.value;
  paintToDos(todoValue);
  todoInput.value = "";
}

function paintToDos(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  span.innerText = text;
  delBtn.innerText = "😣";
  delBtn.addEventListener("click", deleteToDos);
  li.appendChild(delBtn);
  li.appendChild(span);
  todoList.appendChild(li);

  li.id = newId;

  const todoObj = {
    id: newId,
    text
  };

  toDos.push(todoObj);
  saveToDos();
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODO_LS);
  if(loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo){
      paintToDos(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  todoForm.addEventListener("submit", handleSubmit);
}

init();