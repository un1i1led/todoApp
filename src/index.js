import {makeTodoItem} from '../src/modules/UI';
import {createProject} from '../src/modules/projects';

const addBtn = document.querySelector('#add-todo-btn');
const cancel = document.querySelector('#cancel-btn');
const form = document.getElementById('form-pop');
const makeTodoBtn = document.getElementById('add-form-btn');
const todosInbox = document.querySelector('.todos-inbox');


addBtn.addEventListener('click', () => {
    form.style.display = "block";
})

cancel.addEventListener('click', () => {
    form.style.display = "none";
})

makeTodoBtn.addEventListener('click', function () {
    if (document.querySelector('#task-name').value == ""){
        return;
    } else {
        makeTodoItem();
    }
})

document.querySelector('.projects').addEventListener('click', function () {
    const name = window.prompt("Enter name of project: ");
    createProject(name);
})

document.querySelector('#inbox-p').addEventListener('click', function() {
    const todoSection = document.querySelector('.todoSection');
    const currentDiv = todoSection.firstElementChild;
    currentDiv.remove();
    todoSection.insertBefore(todosInbox, todoSection.firstChild);
})



