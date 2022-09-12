const addBtn = document.querySelector('#add-todo-btn');
const cancel = document.querySelector('#cancel-btn');
const form = document.getElementById('form-pop');
addBtn.addEventListener('click', () => {
    form.style.display = "block";
})

cancel.addEventListener('click', () => {
    form.style.display = "none";
})

