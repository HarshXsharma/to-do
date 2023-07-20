//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filteroptions = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener( 'DOMContentLoaded', getTodos );
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filteroptions.addEventListener("click", filtertodo);

//functions
// 1. Add Todo
function addTodo(event) {
    event.preventDefault();

    //create a div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li and append to div
    const newTodo = document.createElement("li");
    if (todoInput.value === "") {
        alert("Enter some text");
    } else {
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //add check and delete button
        const checkbtn = document.createElement("button");
        checkbtn.classList.add("check-btn");
        checkbtn.innerHTML = '<i class="fa-solid fa-square-check"></i>';
        todoDiv.appendChild(checkbtn);

        const trashbtn = document.createElement("button");
        trashbtn.classList.add("trash-btn");
        trashbtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        todoDiv.appendChild(trashbtn);

        //append this div to ul tag
        todoList.appendChild(todoDiv);
        saveLocalTodos(todoInput.value);
        todoInput.value = "";
    }
}

// 2. Delete todo
function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    } else if (item.classList[0] === "check-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filtertodo(e) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch (e.target.value) {
            case "All":
                todo.style.display = "flex";
                break;

            case "Completed":
                if (todo.classList.contains("completed")) todo.style.display = "flex";
                else todo.style.display = "none";
                break;

            case "Incomplete":
                if (todo.classList.contains("completed")) todo.style.display = "none";
                else todo.style.display = "flex";
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) todos = [];
    else todos = JSON.parse(localStorage.getItem("todos"));

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) todos = [];
    else todos = JSON.parse(localStorage.getItem("todos"));

    todos.forEach(function (todo) {
        //create a div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //create li and append to div
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        todoInput.value = "";

        //add check and delete button
        const checkbtn = document.createElement("button");
        checkbtn.classList.add("check-btn");
        checkbtn.innerHTML = '<i class="fa-solid fa-square-check"></i>';
        todoDiv.appendChild(checkbtn);

        const trashbtn = document.createElement("button");
        trashbtn.classList.add("trash-btn");
        trashbtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        todoDiv.appendChild(trashbtn);

        //append this div to ul tag
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoindex = todo.children[0].innerText;
    todos.splice( todos.indexOf(todoindex), 1 );
    localStorage.setItem( "todos", JSON.stringify( todos ) );
}

// localStorage.clear();