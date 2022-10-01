import { createItem } from './todoItem';
import Icon from '../img/circle.png';
import { isThisWeek, format, isTomorrow, isToday, 
    getDay, addDays, isThisYear, isPast } from 'date-fns';
import { currentProject, updateStorage, ht } from './projects';
import { todoNamer } from '../index';

const taskName = document.getElementById('task-name');
const description = document.getElementById('desc-area');
const date = document.getElementById('due-date-input');

let edit = {
    editing: true,
    taskName: '',
    taskDesc: '',
    taskDate: '',
    infoSec: ''
}

let currentEdit;

const clearInputs = () => {
    taskName.value = '';
    description.value = '';
    date.value = '';
}

const makeTodoItem = () => {
    let dateValue = "";

    if (date.value != "") {
        const formatDate = format(new Date(date.value), 'MM/dd/yyyy');
        const datez = new Date(formatDate);
        const dateFinal = addDays(datez, 1);
        dateValue = dateFinal;
    } 

    const radioButtons = document.querySelectorAll('input[name="priority"]');
    let prioritySelected;
    for (const radio of radioButtons) {
        if (radio.checked) {
            prioritySelected = radio.value;
            break;
        }
    }

    const item = createItem(taskName.value, description.value, dateValue, prioritySelected);
    currentProject.addTodo(item);
    updateStorage();
    makeCard(item);

    taskName.value = "";
    description.value = "";
    date.value = "";
    const background = document.querySelector('.background');
    background.style.display = 'none';
}

const loadTodo = (item, contentDiv) => {
    const todoDiv = ht.get(contentDiv);
    const divCard = document.createElement('div');
    divCard.id = item.itemId;
    divCard.className = 'div-card';

    const closeImage = new Image();
    closeImage.src = Icon;
    closeImage.className = 'icon';
    closeImage.addEventListener('click', function (){
        removeCard(divCard, item);
    })

    const taskName = document.createElement('h3');
    taskName.className = 'task-name-h3';
    taskName.textContent = item.title;

    const topBar = document.createElement('div');
    topBar.className = 'todo-top-bar';

    const infoSection = document.createElement('div');
    infoSection.className = 'info-section';

    infoSection.addEventListener('click', () => {
        showEditTodo(item);
        edit.taskName = taskName;
        edit.taskDesc = taskDesc;
        edit.taskDate = taskDate;
        edit.infoSec = infoSection;
    })

    if (item.priority == 'high') {
        infoSection.style.borderLeft = '2px solid red';
    } else if (item.priority == 'medium') {
        infoSection.style.borderLeft = '2px solid orange';
    } else if (item.priority == 'low') {
        infoSection.style.borderLeft = '2px solid green';
    }

    const taskDesc = document.createElement('p');
    taskDesc.className = 'task-desc-p';
    taskDesc.textContent = item.description;

    const taskDate = document.createElement('p');
    taskDate.className = 'task-date-p';

    if (item.dueDate) {
        const formatDate = format(new Date(item.dueDate), 'MM/dd/yyyy');
        const datez = new Date(formatDate);
        taskDate.textContent = dateMaker(datez);
    } else {
        taskDate.textContent = item.dueDate;
    }

    topBar.appendChild(closeImage);
    infoSection.appendChild(taskName);
    divCard.appendChild(topBar);
    infoSection.appendChild(taskDesc);
    infoSection.appendChild(taskDate);
    divCard.appendChild(infoSection);
    todoDiv.appendChild(divCard);
}

const makeCard = (item) => {
    const todoSection = document.querySelector('.todoSection');
    const todoDiv = todoSection.firstElementChild;

    const divCard = document.createElement('div');
    divCard.id = item.itemId;
    divCard.className = 'div-card';

    const closeImage = new Image();
    closeImage.src = Icon;
    closeImage.className = 'icon';
    closeImage.addEventListener('click', function (){
        removeCard(divCard, item);
    })

    const taskName = document.createElement('h3');
    taskName.className = 'task-name-h3';
    taskName.textContent = item.title;

    const topBar = document.createElement('div');
    topBar.className = 'todo-top-bar';

    const infoSection = document.createElement('div');
    infoSection.className = 'info-section';

    infoSection.addEventListener('click', () => {
        showEditTodo(item);
    })

    if (item.priority == 'high') {
        infoSection.style.borderLeft = '2px solid red';
    } else if (item.priority == 'medium') {
        infoSection.style.borderLeft = '2px solid orange';
    } else if (item.priority == 'low') {
        infoSection.style.borderLeft = '2px solid green';
    }

    const taskDesc = document.createElement('p');
    taskDesc.className = 'task-desc-p';
    taskDesc.textContent = item.description;

    const taskDate = document.createElement('p');
    taskDate.className = '.task-date-p';
    
    if (item.dueDate) {
        const formatDate = format(new Date(item.dueDate), 'MM/dd/yyyy');
        const datez = new Date(formatDate);
        taskDate.textContent = dateMaker(datez);
    } else {
        taskDate.textContent = item.dueDate;
    }

    topBar.appendChild(closeImage);
    infoSection.appendChild(taskName);
    divCard.appendChild(topBar);
    infoSection.appendChild(taskDesc);
    infoSection.appendChild(taskDate);
    divCard.appendChild(infoSection);
    todoDiv.appendChild(divCard);
}

const removeCard = (itemDiv, itemObj) => {
    const todoSection = document.querySelector('.todoSection');
    const todoDiv = todoSection.firstElementChild;
    currentProject.removeTodo(itemObj);
    updateStorage();
    todoDiv.removeChild(itemDiv);
}

const dateMaker = (date) => {
    if (isToday(date)){
        return 'Today';
    } else if (isTomorrow(date)){
        return 'Tomorrow';
    } else {
        return dayOfWeek(date, format);
    }
}

const dayOfWeek = (date) => {
    if (isPast(date)) {
        const newFormat = format(new Date(date), 'MMM dd yyyy');
        return `${newFormat}`;
    }

    if (isThisWeek(date)) {
        switch (getDay(date)) {
            case 0:
                return 'Sunday';
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
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

const showEditTodo = (item) => {
    edit.editing = true;
    taskName.value = item.title;
    description.value = item.description;
    date.value = item.dueDate.slice(0, 10);

    const radioButtons = document.querySelectorAll('input[name="priority"]');
    for (const radio of radioButtons) {
        if (radio.value == item.priority) {
            radio.checked = true;
        }
    }

    currentEdit = item;
    todoNamer();

}

const editTodo = () => {
    let dateValue = "";

    if (date.value != "") {
        const formatDate = format(new Date(date.value), 'MM/dd/yyyy');
        const datez = new Date(formatDate);
        const dateFinal = addDays(datez, 1);
        dateValue = dateFinal;
    } 

    const radioButtons = document.querySelectorAll('input[name="priority"]');
    let prioritySelected;
    for (const radio of radioButtons) {
        if (radio.checked) {
            prioritySelected = radio.value;
            break;
        }
    }

    const newItem = createItem(taskName.value, description.value, dateValue, prioritySelected);
    newItem.itemId = currentEdit.itemId;
    currentProject.editItem(currentEdit, newItem);
    updateStorage();
    edit.taskName.textContent = taskName.value;
    edit.taskDesc.textContent = description.value;
    if (newItem.dueDate) {
        const formatDate = format(new Date(newItem.dueDate), 'MM/dd/yyyy');
        const datez = new Date(formatDate);
        edit.taskDate.textContent = dateMaker(datez);
    } else {
        edit.taskDate.textContent = newItem.dueDate;
    }
}

export {
    makeTodoItem,
    loadTodo,
    edit,
    editTodo,
    currentEdit,
    clearInputs
}

