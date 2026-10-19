
"use strict";

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const taskCount = document.querySelector("#task-count");
const emptyMessage = document.querySelector("#empty-message");
const clearCompletedButton = document.querySelector("#clear-completed");

let tasks = [];

// Restore saved tasks
try {
    tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

    if (!Array.isArray(tasks)) {
        tasks = [];
    }
} catch (error) {
    tasks = [];
}

// Save tasks to localStorage
function saveTasks() {
    try {
        localStorage.setItem("todoTasks", JSON.stringify(tasks));
    } catch (error) {
        alert("Unable to save tasks in this browser.");
    }
}

// Display tasks on the page
function renderTasks() {
    todoList.replaceChildren();

    tasks.forEach(task => {
        const item = document.createElement("li");
        item.classList.add("todo-item");
        item.dataset.id = task.id;

        if (task.completed) {
            item.classList.add("completed");
        }

        const text = document.createElement("span");
        text.classList.add("todo-text");
        text.textContent = task.text;

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.classList.add("complete-button");
        completeButton.dataset.action = "complete";
        completeButton.setAttribute("aria-label", `Toggle ${task.text}`);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.dataset.action = "delete";
        deleteButton.setAttribute("aria-label", `Delete ${task.text}`);

        item.appendChild(text);
        item.appendChild(completeButton);
        item.appendChild(deleteButton);

        todoList.appendChild(item);
    });

    const remaining = tasks.filter(task => !task.completed).length;

    taskCount.textContent = `${remaining} task(s) remaining`;
    emptyMessage.hidden = tasks.length > 0;
}

// Add a new task
form.addEventListener("submit", event => {
    event.preventDefault();

    const text = input.value.trim();

    if (!text) return;

    tasks.push({
        id: `${Date.now()}-${Math.random()}`,
        text: text,
        completed: false
    });

    saveTasks();
    renderTasks();

    input.value = "";
    input.focus();
});

// Event delegation for Complete and Delete buttons
todoList.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");

    if (!button || !todoList.contains(button)) return;

    const item = button.closest(".todo-item");

    if (!item) return;

    const taskId = item.dataset.id;
    const task = tasks.find(task => task.id === taskId);

    if (!task) return;

    if (button.dataset.action === "complete") {
        task.completed = !task.completed;
    } else if (button.dataset.action === "delete") {
        // Remove only the selected task
        item.parentNode.removeChild(item);

        tasks = tasks.filter(task => task.id !== taskId);
    }

    saveTasks();
    renderTasks();
});

// Clear all completed tasks
clearCompletedButton.addEventListener("click", () => {
    const completedItems = todoList.querySelectorAll(".completed");

    completedItems.forEach(item => {
        if (item.parentNode) {
            item.parentNode.removeChild(item);
        }
    });

    tasks = tasks.filter(task => !task.completed);

    saveTasks();
    renderTasks();
});

// Display saved tasks when the page loads
renderTasks();
