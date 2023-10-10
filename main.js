const taskButton = document.getElementById('task-button')

const tasksList = document.getElementById('tasks')
const alert = document.querySelector('.alert')

taskButton.addEventListener('click', () => {
    const yourTask = document.getElementById('your-task').value

    if (yourTask === '') {
        const boxAlert = document.createElement('div')
        boxAlert.innerHTML = `
        <p class="alert-text">Please enter your task!!</p>
        `
        alert.appendChild(boxAlert)

    } else {
        alert.innerHTML = ''
        addTask(yourTask)

    }

})

// function bigletter(string) {
//     const toUpper = string.toUpperCase()
//     console.log(toUpper)
// }
// // const vardas = tomas
// bigletter(...vardas)// Save tasks to localStorage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Retrieve tasks from localStorage
function getTasksFromLocalStorage() {
    const tasksJSON = localStorage.getItem('tasks');
    return JSON.parse(tasksJSON) || []; // Return an empty array if no data is found
}

// Use these functions to save and retrieve your tasks
let tasks = getTasksFromLocalStorage();

// Add a task
function addTask(yourTask) {
    tasks.push(yourTask);
    saveTasksToLocalStorage(tasks);
}



function addTask(yourTask) {
    const newTask = document.createElement('div');
    newTask.innerHTML = `
            <input class="text" name="name" value="${yourTask.toUpperCase()}">
            <button type="button" class="task-box__button"><i class="fas fa-trash"></i></button>
        `;



    const trashButton = newTask.querySelector('.task-box__button');

    // Add a click event listener to the trash icon button to remove the task
    trashButton.addEventListener('click', () => {
            // Remove the parent container of the trash icon button, which is the task itself
            newTask.remove()
        })
        //  add new task to taskList
    tasksList.appendChild(newTask)
    document.getElementById('your-task').value = ''


}
