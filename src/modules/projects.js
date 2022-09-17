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

const createProject = (name) => {
    const sdbarGroup3 = document.querySelector('.sdbar-gp-3');

    const projectDiv = document.createElement('div');
    projectDiv.className = 'project-div';
    
    const projectName = document.createElement('p');
    projectName.textContent = name;
    projectName.className = `project-name ${name}`;

    projectDiv.appendChild(projectName);
    sdbarGroup3.appendChild(projectDiv);

    makeProjectDiv(name);

    projectDiv.addEventListener('click', function() {
        const todoSection = document.querySelector('.todoSection');
        const currentDiv = todoSection.firstElementChild;
        currentDiv.remove();
        todoSection.insertBefore(ht.get(name), todoSection.firstChild);
    })
}

const makeProjectDiv = (name) => {
    const contentDiv = document.createElement('div');
    contentDiv.className = `todos-${name}`;
    ht.set(name, contentDiv);
}

export {
    createProject
}