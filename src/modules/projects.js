import { loadTodo } from './UI';

class HashTable {
    constructor() {
        this.table = new Array(127);
        this.size = 0;
    }

    _hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.table.length;
    }

    set(key, value) {
        const index = this._hash(key);
        if (this.table[index]) {
            for (let i = 0; i < this.table[index].length; i++) {
                if (this.table[index][i][0] === key) {
                    this.table[index][i][1] = value;
                    return;
                }
            }
            this.table[index].push([key, value]);
        } else {
            this.table[index] = [];
            this.table[index].push([key, value]);
        }
        this.size++;
    }

    get(key) {
        const target = this._hash(key);
        if (this.table[target]){
            for (let i = 0; i < this.table.length; i++) {
                if (this.table[target][i][0] === key) {
                    return this.table[target][i][1];
                }
            }
        }
        return undefined;
    }

    remove(key) {
        const index = this._hash(key);

        if (this.table[index] && this.table[index].length) {
            for (let i = 0; i < this.table.length; i++) {
              if (this.table[index][i][0] === key) {
                this.table[index].splice(i, 1);
                this.size--;
                return true;
              }
            }
          } else {
            return false;
        }
    }
}

const ht = new HashTable();
const projects = new Array(0);

const Project = (title) => {
    let projectArray = new Array();

    const addTodo = todo => {
        projectArray.push(todo);
    }

    const editItem = (todo, newTodo) => {
        for (let i = 0; i < projectArray.length; i++) {
            if (projectArray[i].itemId == todo.itemId) {
                projectArray.splice(i, 1, newTodo);
            }
        }
    }

    const removeTodo = todo => {
        for (let i = 0; i < projectArray.length; i++) {
            if (projectArray[i].itemId == todo.itemId) {
                projectArray.splice(i, 1);
            }
        }
    }

    const printArray = () => {
        console.log(projectArray);
    }

    return {
        title,
        projectArray,
        addTodo,
        removeTodo,
        editItem,
        printArray
    }
}

let currentProject;

const updateStorage = () => {
    localStorage.setItem('projects', JSON.stringify(projects));
}

const loadProjects = () => {
    let lcProject = localStorage.getItem('projects')
    let parsed = JSON.parse(lcProject);
    if (parsed != null) {
        for (let i = 0; i < parsed.length; i++) {
            const rebuiltProject = Project(parsed[i].title);
            for (let z = 0; z < parsed[i].projectArray.length; z++) {
                rebuiltProject.projectArray.push(parsed[i].projectArray[z]);
            }
            createJSONProject(rebuiltProject);
            for (let x = 0; x < parsed[i].projectArray.length; x++) {
                loadTodo(parsed[i].projectArray[x], parsed[i].title);
            }
            projects.push(rebuiltProject);
        }
    }
}

const createJSONProject = (project) => {
    makeProjectSideBar(project);
}

const createProject = (name) => {
    let project = Project(name);
    projects.push(project);
    updateStorage();
    console.log(projects);

    makeProjectSideBar(project);
}

const makeProjectSideBar = (project) => {
    const sdbarGroup3 = document.querySelector('.sdbar-gp-3');

    const sdDiv = document.createElement('div');
    sdDiv.className = 'project-div';

    const projectName = document.createElement('p');
    projectName.textContent = project.title;
    projectName.className = 'project-name';

    const removeProjectDiv = document.createElement('div');
    const removeP = document.createElement('p');
    removeP.textContent = 'X';
    removeP.className = 'removeProjectP';
    removeProjectDiv.appendChild(removeP);

    sdDiv.appendChild(projectName);
    sdDiv.appendChild(removeProjectDiv);
    sdbarGroup3.appendChild(sdDiv);

    makeProjectDiv(project.title);

    const pageName = document.querySelector('#page-name-h2');

    projectName.addEventListener('click', () => {
        const todoSection = document.querySelector('.todoSection');
        const currentDiv = todoSection.firstElementChild;
        currentProject = project;
        pageName.textContent = currentProject.title;
        currentDiv.remove();
        todoSection.insertBefore(ht.get(project.title), todoSection.firstChild);
    })

    removeP.addEventListener('click', () => {
        removeProject(project);
        sdbarGroup3.removeChild(sdDiv);
        pageName.textContent = 'Add or open a project';
    })
}

const makeProjectDiv = (name) => {
    const contentDiv = document.createElement('div');
    contentDiv.className = `todos-${name}`;
    ht.set(name, contentDiv);
}

const removeProject = (Project) => {
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].title == Project.title) {
            projects.splice(i, 1);
        }
    }
    updateStorage();
}

export {
    createProject,
    projects,
    currentProject,
    updateStorage,
    loadProjects,
    ht
}