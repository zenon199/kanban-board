
function addTask(colId) {
    const input = document.getElementById(`${colId}-input`);
    taskText = input.value.trim();

    if (taskText === "") return;

    const taskEle = createTaskEle(taskText);
    document.getElementById(`${colId}-tasks`).appendChild(taskEle);
    input.value = "";
    
}

function createTaskEle(text) {
    const taskEl = document.createElement("div");
    taskEl.textContent = text;
    taskEl.classList.add("card");
    return taskEl;
}