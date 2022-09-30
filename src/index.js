import { makeTodoItem, edit, editTodo, clearInputs } from '../src/modules/UI';
import { createProject, loadProjects, projects } from '../src/modules/projects';

const addBtn = document.querySelector('#add-todo-btn');
const cancel = document.querySelector('#cancel-btn');
const background = document.querySelector('.background');
const pBackground = document.querySelector('.pBackground');
const makeTodoBtn = document.getElementById('add-form-btn');
const addProjectBtn = document.querySelector('#project-add');
const cancelProject = document.querySelector('#project-cancel');
const pageName = document.querySelector('#page-name-h2');
const value = document.getElementById('project-name-input');

loadProjects();

addBtn.addEventListener('click', () => {
    if (pageName.textContent != 'Add or open a project') {
        background.style.display = 'flex';
    } else {
        projectNamer();
    }
})

addProjectBtn.addEventListener('click', () => {
    if (value.value) {
        createProject(value.value);
        value.value = '';
        projectNamer();
    }
})

cancel.addEventListener('click', () => {
    todoNamer();
    clearInputs();
})

cancelProject.addEventListener('click', () => {
    projectNamer();
});

makeTodoBtn.addEventListener('click', function () {
    if (document.querySelector('#task-name').value == ""){
        return;
    } else {
        if (edit.editing == true) {
            editTodo();
            todoNamer();
            edit.editing = false;
            clearInputs();
        } else {
            makeTodoItem();
        }
    }
})

document.querySelector('h2').addEventListener('click', () => {
    console.log(projects);
})

document.querySelector('.projects').addEventListener('click', function () {
    projectNamer();
})

const projectNamer = () => {
    if (pBackground.style.display == 'flex') {
        pBackground.style.display = 'none';
    } else {
        pBackground.style.display = 'flex';
    }
}

const todoNamer = () => {
    if (background.style.display == 'flex') {
        background.style.display = 'none';
    } else {
        background.style.display = 'flex';
    }
}

export {
    todoNamer
}




