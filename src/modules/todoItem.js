const createItem = (title, description, dueDate, priority) => {
    let itemId = Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

    return {
        title,
        description,
        dueDate,
        priority,
        itemId
    }
}

export {
    createItem
}

