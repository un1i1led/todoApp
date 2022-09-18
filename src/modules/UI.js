import { createItem } from './todoItem';
import Icon from '../img/circle.png';
import { isThisWeek, format, differenceInDays, isTomorrow, isToday, 
    getDay, addDays, isThisYear } from 'date-fns';
import { da } from 'date-fns/locale';

const makeTodoItem = () => {
    const taskName = document.getElementById('task-name');
    const description = document.getElementById('desc-area');
    const date = document.getElementById('due-date-input');

    const formatDate = format(new Date(date.value), 'MM/dd/yyyy');
    const datez = new Date(formatDate);
    const dateFinal = addDays(datez, 1);
    
    const dateValue = dateMaker(dateFinal, format(new Date(dateFinal), 'MM/dd/yyyy'));

    const radioButtons = document.querySelectorAll('input[name="priority"]');
    let prioritySelected;
    for (const radio of radioButtons) {
        if (radio.checked) {
            prioritySelected = radio.value;
            break;
        }
    }

    const item = createItem(taskName.value, description.value, dateValue, prioritySelected);
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

const dateMaker = (date, formatted) => {
    const currentDate = new Date();
    const difference = differenceInDays(date, currentDate);
    
    if (isToday(date)){
        return 'Due: Today';
    } else if (isTomorrow(date)){
        return 'Due: Tomorrow';
    } else {
        return dayOfWeek(date, format);
    }
}

const dayOfWeek = (date, formatted) => {
    if (isThisWeek(date)) {
        switch (getDay(date)) {
            case 0:
                return 'Due: Sunday';
            case 1:
                return 'Due: Monday';
            case 2:
                return 'Due: Tuesday';
            case 3:
                return 'Due: Wednesday';
            case 4:
                return 'Due: Thursday';
            case 5:
                return 'Due: Friday';
            case 6:
                return 'Due: Saturday';
            default:
                console.log('something')
        }
    } else {
        if (isThisYear(date)){
            const newFormat = format(new Date(date), 'MMM dd');
            return `${newFormat}`;
        } else {
            const newFormat = format(new Date(date), 'MMM dd yyyy');
            return `${newFormat}`;
        }
    }
}

export {
    makeTodoItem
}

