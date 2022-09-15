import {makeTodoItem} from '../src/modules/UI';

const addBtn = document.querySelector('#add-todo-btn');
const cancel = document.querySelector('#cancel-btn');
const form = document.getElementById('form-pop');
const makeTodoBtn = document.getElementById('add-form-btn');

addBtn.addEventListener('click', () => {
    form.style.display = "block";
})

cancel.addEventListener('click', () => {
    form.style.display = "none";
})

makeTodoBtn.addEventListener('click', function () {
    makeTodoItem();
})

