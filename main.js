// Elements
let input = document.getElementById("todo-input");
let submit = document.querySelector(".add-btn");
let todoListDiv = document.querySelector(".todo-list");
let clearAllBtn = document.getElementById("clear-all-btn");
let filterBtns = document.querySelectorAll(".filter-btn");
let themeSelect = document.getElementById("theme-select");

let todosArray = [];

// Load initial data from localStorage
loadTodosFromLocalStorage();
filterTodos("all"); // Show all todos initially

// Add new task when the "Add" button is clicked
submit.addEventListener("click", function () {
    addNewTask();
});

// Add new task when the "Enter" key is pressed
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addNewTask();
    }
});

// Function to add new task
function addNewTask() {
    const title = input.value.trim();
    
    if (!title) {
        alert("Please enter a task.");
        return;
    }

    const todo = { id: Date.now(), title, completed: false };
    todosArray.push(todo);
    syncTodosWithLocalStorage();
    renderTodos(todosArray);

    input.value = ""; // Clear input
}

// Filters
filterBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        filterTodos(btn.id); // Filter by the selected category
    });
});

function filterTodos(filter) {
    let filtered;
    if (filter === "pending") filtered = todosArray.filter(todo => !todo.completed);
    else if (filter === "completed") filtered = todosArray.filter(todo => todo.completed);
    else filtered = todosArray; // "all"
    renderTodos(filtered);
}

// Theme selection
themeSelect.addEventListener("change", function () {
    const theme = themeSelect.value;
    document.body.className = theme; // Apply the selected theme class to the body
});

// Render tasks
function renderTodos(todos) {
    todoListDiv.innerHTML = ""; // Clear the todo list div before rendering
    todos.forEach(todo => addTodoItemToHTML(todo));
}

function addTodoItemToHTML(todo) {
    const div = document.createElement("div");
    div.className = todo.completed ? "todo-item todo-item-done" : "todo-item";
    div.dataset.id = todo.id;

    div.innerHTML = `
        <div>
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? "checked" : ""}>
            <span>${todo.title}</span>
        </div>
        <button class="delete-btn">Delete</button>
    `;

    div.querySelector(".todo-checkbox").addEventListener("change", function () {
        todo.completed = !todo.completed;
        syncTodosWithLocalStorage();
        filterTodos(document.querySelector(".filter-btn.active")?.id || "all");
    });

    div.querySelector(".delete-btn").addEventListener("click", function () {
        todosArray = todosArray.filter(t => t.id !== todo.id);
        syncTodosWithLocalStorage();
        renderTodos(todosArray);
    });

    todoListDiv.appendChild(div);
}

// Sync Todos with Local Storage
function syncTodosWithLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todosArray));
}

// Load Todos from Local Storage
function loadTodosFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem("todos"));
    if (data) {
        todosArray = data;
        renderTodos(todosArray);
    }
}

// Clear All Tasks
clearAllBtn.addEventListener("click", function() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        todosArray = [];
        syncTodosWithLocalStorage();
        renderTodos(todosArray);
    }
});
