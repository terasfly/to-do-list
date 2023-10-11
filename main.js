// Constants for important HTML elements
const taskButton = document.getElementById('task-button');
const tasksList = document.getElementById('tasks');
const alert = document.querySelector('.alert');
const yourTaskInput = document.getElementById('your-task');

// Function to display an alert message
function displayAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.innerHTML = `<p class="alert-text">${message}</p>`;
    alert.appendChild(alertBox);
}

// Function to clear the alert
function clearAlert() {
    alert.innerHTML = '';
}

// Function to add a task
function addTask(yourTask) {
    const newTask = document.createElement('div');
    newTask.innerHTML = `
        <input class="text" name="name" value="${yourTask.toUpperCase()}">
        <button type="button" class="task-box__button"><i class="fas fa-trash"></i></button>
    `;

    // Find the trash button within the new task
    const trashButton = newTask.querySelector('.task-box__button');

    // Add a click event listener to the trash button to remove the task
    trashButton.addEventListener('click', () => {
        newTask.remove();
        updateLocalStorage();
    });

    // Append the new task to the task list
    tasksList.appendChild(newTask);

    // Clear the input field
    yourTaskInput.value = '';

    // Update localStorage with the current task list
    updateLocalStorage();
}

// Add a click event listener to the task button
taskButton.addEventListener('click', () => {
    const yourTask = yourTaskInput.value.trim(); // Remove leading/trailing whitespace

    if (yourTask === '') {
        displayAlert('Užrašyk užduoti');
    } else {
        clearAlert();
        addTask(yourTask);
    }
});

// Function to update localStorage with the current task list
function updateLocalStorage() {
    const taskElements = tasksList.querySelectorAll('div');
    const taskArray = [];
    taskElements.forEach((taskElement) => {
        const taskInput = taskElement.querySelector('.text');
        taskArray.push(taskInput.value);
    });
    localStorage.setItem('tasks', JSON.stringify(taskArray));
}

// Function to load saved tasks from localStorage
function loadTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        savedTasks.forEach((task) => {
            addTask(task);
        });
    }
}

// Load saved tasks from localStorage when the page loads
window.addEventListener('load', loadTasksFromLocalStorage);
