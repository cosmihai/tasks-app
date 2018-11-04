// define UI Vars
const form        = document.querySelector('#task-form');
const taskList    = document.querySelector('#task-list');
const addTaskBtn  = document.querySelector('#add-task');
const clearBtn    = document.querySelector('#clear-btn');
const filter      = document.querySelector('#filter');
const taskInput   = document.querySelector('#new-task-input');

loadEventListeners();
checkStorage();

function loadEventListeners() {
  form.addEventListener('submit', addTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', getFiltredTasks)
}

function addTask(e){
  if(taskInput.value === '') {
    alert('You have to fill the New Task field...')
  }else {
    // Save task in local storege
    storeTaskInLocalStorege(taskInput.value); 
  }

  taskInput.value = '';
  e.preventDefault();
}

function storeTaskInLocalStorege(task) {
  let tasks;
  if(localStorage.getItem('tasks')=== null) {
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.unshift(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  outputAllTasks(tasks);
}

function checkStorage() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  outputAllTasks(tasks)
}

function clearTasks () {
  localStorage.clear();
  checkStorage();
}

function getFiltredTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let filtredTasksArray = tasks.filter(task => {
    return task.indexOf(filter.value)!=-1;
  })
  outputAllTasks(filtredTasksArray)
}

function outputAllTasks(arr) {
  if(arr === null || !arr.length) {
    taskList.innerText = 'No tasks'
  }else {
    taskList.innerHTML = '';
    arr.forEach(task => {
      let newLi = document.createElement('li');
      newLi.className = 'list-item';
      newLi.innerHTML = `<p>${task}</p><span class="del-btn">X</span>`;
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
  if(confirm('This task will be deleted! Continue?')) {

    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let currentTask = e.target.previousElementSibling.innerText;
    tasks.splice(tasks.indexOf(currentTask), 1)
    localStorage.setItem('tasks', JSON.stringify(tasks));
    filter.value = '';
    checkStorage();
  }
}