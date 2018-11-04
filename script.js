// define UI Vars
const form        = document.querySelector('#task-form');
const taskList    = document.querySelector('#task-list');
const addTaskBtn  = document.querySelector('#add-task');
const clearBtn    = document.querySelector('#clear-btn');
const filter      = document.querySelector('#filter');
const taskInput   = document.querySelector('#new-task-input');
let tasksArray    = [];

loadEventListeners();
outputAllTasks(tasksArray);

function loadEventListeners() {
  form.addEventListener('submit', addTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', getFiltredTasks)
}

function addTask(e){
  if(taskInput.value === '') {
    alert('You have to fill the New Task field...')
  }else {
    tasksArray.unshift(taskInput.value);
  }
  outputAllTasks(tasksArray)
  taskInput.value = '';
  e.preventDefault();
}

function clearTasks () {
  tasksArray = [];
  outputAllTasks(tasksArray)
}

function getFiltredTasks() {
  let filtredTasksArray = tasksArray.filter(task => {
    return task.indexOf(filter.value)!=-1;
  })
  outputAllTasks(filtredTasksArray)
}

function outputAllTasks(arr) {
  if(!arr.length) {
    taskList.innerText = 'No tasks'
  }else {
    taskList.innerHTML = '';
    arr.forEach(task => {
      let newLi = document.createElement('li');
      newLi.className = 'list-item';
      newLi.innerHTML = `${task}<span class="del-btn">X</span>`;
      taskList.appendChild(newLi)
    });
    setDeleteTaskBtn()
  }
}

function setDeleteTaskBtn() {
  let delTaskBtns = document.querySelectorAll('span.del-btn');
  delTaskBtns.forEach(btn => {
    btn.addEventListener('click', delThisTask)
  })
}

function delThisTask(e) {
  let currentTask = e.target.parentElement;
  let taskString = currentTask.innerText;
  taskString = [...taskString];
  taskString.pop();
  taskString = taskString.join('');
  tasksArray.splice(tasksArray.indexOf(taskString), 1);
  filter.value = '';
  outputAllTasks(tasksArray)
}