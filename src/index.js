import { makeTodoItem } from '../src/modules/UI';
import { createProject, loadProjects, projects, loadInbox, currentProject } from '../src/modules/projects';

const addBtn = document.querySelector('#add-todo-btn');
const cancel = document.querySelector('#cancel-btn');
const form = document.querySelector('.background');
const makeTodoBtn = document.getElementById('add-form-btn');
const todosInbox = document.querySelector('.todos-inbox');
const pageName = document.querySelector('#page-name-h2');

loadProjects();

addBtn.addEventListener('click', () => {
    if (pageName.textContent != 'Add or open a project') {
        form.style.display = 'flex';
    } else {
        const name = window.prompt("Enter name of project: ");
        if (name != null) {
        createProject(name);
    }
    }
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

document.querySelector('h2').addEventListener('click', () => {
    console.log(projects);
})

document.querySelector('.projects').addEventListener('click', function () {
    const name = window.prompt("Enter name of project: ");
    if (name != null) {
        createProject(name);
    }
})





