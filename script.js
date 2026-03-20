// Task Manager App

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

// Add task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = { text: taskText, completed: false };
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    addTaskToDOM(taskText, false);
    taskInput.value = '';
}

// Add task to DOM
function addTaskToDOM(text, completed) {
    const li = document.createElement('li');
    li.className = completed ? 'completed' : '';
    li.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">Delete</button>
    `;

    li.querySelector('span').addEventListener('click', () => toggleTask(li, text));
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(li, text));

    taskList.appendChild(li);
}

// Toggle task completion
function toggleTask(li, text) {
    li.classList.toggle('completed');
    updateTaskInStorage(text, li.classList.contains('completed'));
}

// Delete task
function deleteTask(li, text) {
    li.remove();
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task in storage
function updateTaskInStorage(text, completed) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => task.text === text ? { ...task, completed } : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => e.key === 'Enter' && addTask());

// Initialize
loadTasks();