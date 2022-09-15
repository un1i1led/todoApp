let createItem = (title, description, dueDate, priority) => {
    let itemId = Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
    let project = document.querySelector('.active').textContent;

    return {
        title,
        description,
        dueDate,
        priority,
        project,
        itemId
    }
}

export {
    createItem
}

