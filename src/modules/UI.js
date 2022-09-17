import {createItem} from './todoItem';
import Icon from '../img/circle.png';

const makeTodoItem = () => {
    const taskName = document.getElementById('task-name');
    const description = document.getElementById('desc-area');
    const date = document.getElementById('due-date-input');

    const radioButtons = document.querySelectorAll('input[name="priority"]');
    let prioritySelected;
    for (const radio of radioButtons) {
        if (radio.checked) {
            prioritySelected = radio.value;
            break;
        }
    }

    const item = createItem(taskName.value, description.value, date.value, prioritySelected);
    makeCard(item);

    taskName.value = "";
    description.value = "";
    date.value = "";
    
}

const makeCard = (item) => {
    const todoSection = document.querySelector('.todoSection');
    const todoDiv = todoSection.firstElementChild;

    const divCard = document.createElement('div');
    divCard.className = 'div-card';

    const closeImage = new Image();
    closeImage.src = Icon;
    closeImage.className = 'icon';
    closeImage.addEventListener('click', function (){
        removeCard(divCard);
    })

    const taskName = document.createElement('h3');
    taskName.className = '.task-name-h3';
    taskName.textContent = item.title;

    const topBar = document.createElement('div');
    topBar.className = 'todo-top-bar';

    const taskDesc = document.createElement('p');
    taskDesc.className = 'task-desc-p';
    taskDesc.textContent = item.description;

    const taskDate = document.createElement('p');
    taskDate.className = '.task-date-p';
    taskDate.textContent = item.dueDate;

    topBar.appendChild(closeImage);
    topBar.appendChild(taskName);
    divCard.appendChild(topBar);
    divCard.appendChild(taskDesc);
    divCard.appendChild(taskDate);
    todoDiv.appendChild(divCard);
}

const removeCard = (item) => {
    const todoSection = document.querySelector('.todoSection');
    const todoDiv = todoSection.firstElementChild;
    todoDiv.removeChild(item);
}

export {
    makeTodoItem
}

