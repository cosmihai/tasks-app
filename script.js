// define UI Vars
const form        = document.querySelector('#task-form');
const taskList    = document.querySelector('#task-list');
const addTaskBtn  = document.querySelector('#add-task');
const clearBtn    = document.querySelector('#clear-btn');
const delTaskBtn  = document.querySelectorAll('.del-btn');
const filter      = document.querySelector('#filter');
const taskInput   = document.querySelector('#new-task-input');
let tasksArray  = [];

loadEventListeners();
if (!tasksArray.length) {
  taskList.innerHTML = 'No Tasks'
}

function loadEventListeners() {

  form.addEventListener('submit', addTask);
  clearBtn.addEventListener('click', clearTasks);

}

function addTask(e){

  if(taskInput.value === '') {
    alert('You have to fill the New Task field...')
  }else {
    tasksArray.unshift(taskInput.value)
  }

  outputAllTasks(tasksArray)
  taskInput.value = '';
  e.preventDefault();
}

function outputAllTasks(arr) {

  taskList.innerHTML = '';
  arr.forEach(task => {
    let newLi = document.createElement('li');
    newLi.className = 'list-item';
    newLi.innerHTML = `${task}<span class="del-btn">X</span>`;
    taskList.appendChild(newLi)
  });

}

function clearTasks () {

  taskList.innerHTML = 'No tasks'
  tasksArray = []

}
