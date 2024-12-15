// Function to change theme
function changeTheme(theme) {
    // Remove any previous theme classes
    document.body.classList.remove('light-theme', 'dark-theme', 'blue-theme', 'red-theme', 'green-theme', 'purple-theme', 'yellow-theme', 'orange-theme', 'pink-theme', 'brown-theme', 'teal-theme', 'cyan-theme', 'slate-theme', 'mint-theme');
    
    // Add the selected theme
    document.body.classList.add(`${theme}-theme`);
    
    // Save the theme to localStorage
    localStorage.setItem('theme', theme);
}

// Apply the saved theme on page load
document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to 'light' theme
    changeTheme(savedTheme);
});

// Add Todo functionality
let input = document.getElementById("todo-input");
let submit = document.querySelector(".add-btn");
let todoListDiv = document.querySelector(".todo-list");
let clearAllBtn = document.querySelector(".clear-btn");

submit.onclick = function () {
    const todoText = input.value.trim();
    if (todoText) {
        addTodoItem(todoText);
        input.value = "";
    }
};

function addTodoItem(title) {
    const todo = { id: Date.now(), title, completed: false };
    const div = document.createElement("div");
    div.className = 'todo-item';
    div.dataset.id = todo.id;
    div.innerHTML = `
        <div class="todo-text">
            <input type="checkbox" class="todo-checkbox" id="todo-checkbox-${todo.id}" onclick="toggleTodoStatus(${todo.id})">
            <label for="todo-checkbox-${todo.id}" class="todo-title">${title}</label>
        </div>
        <div class="btn-container">
            <button class="edit-btn" onclick="editTodoItem(${todo.id})">Edit</button>
            <button class="delete-btn" onclick="deleteTodoItem(${todo.id})">Delete</button>
        </div>
    `;
    todoListDiv.appendChild(div);
}

// Toggle todo status
function toggleTodoStatus(id) {
    const todoElement = document.querySelector(`[data-id="${id}"]`);
    const checkbox = document.getElementById(`todo-checkbox-${id}`);
    if (checkbox.checked) {
        todoElement.classList.add('completed');
    } else {
        todoElement.classList.remove('completed');
    }
}

// Edit Todo Item
function editTodoItem(id) {
    const todoElement = document.querySelector(`[data-id="${id}"]`);
    const label = todoElement.querySelector(".todo-title");
    input.value = label.textContent;
    submit.onclick = function () {
        label.textContent = input.value.trim();
        input.value = "";
        submit.onclick = addTodoItem; // Reset to add new todo
    };
}

// Delete Todo Item
function deleteTodoItem(id) {
    const todoElement = document.querySelector(`[data-id="${id}"]`);
    todoListDiv.removeChild(todoElement);
}

// Clear All Todos
clearAllBtn.addEventListener("click", function () {
    todoListDiv.innerHTML = "";
});
