
//let draggedCard = null;
let rightClickedCard = null;

document.addEventListener("DOMContentLoaded", loadTasksLocalStorage);

function addTask(colId) {
    const input = document.getElementById(`${colId}-input`);
    taskText = input.value.trim();

    if (taskText === "") return;

    const taskDate = new Date().toLocaleString();

    const taskEle = createTaskEle(taskText, taskDate);
    document.getElementById(`${colId}-tasks`).appendChild(taskEle);
    input.value = "";
    updateTaskCounts(colId);
    saveTasksLocalStorage(colId, taskText, taskDate);
}

function createTaskEle(text, taskDate) {
    const taskEl = document.createElement("div");
    taskEl.innerHTML = `<span> ${text}</span> </br> <small class="time"> ${taskDate} </small>`
    //taskEl.textContent = text;
    taskEl.classList.add("card");
    taskEl.draggable = true;
    taskEl.addEventListener("dragstart", dragStart)
    taskEl.addEventListener("dragend", dragEnd)
    taskEl.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        rightClickedCard = this;
        showContextMenu(e.pageX, e.pageY);
    })
    return taskEl;
}

function dragStart() {
    setTimeout(() => {
        this.classList.add("dragging");
    }, 0);
    //draggedCard = this;
}

function dragEnd() {
    this.classList.remove("dragging");
    //draggedCard = null;
    ["todo", "doing", "done"].forEach((colId) => {
        updateTaskCounts(colId);
        updateTasksLocalStorage();
    })
}

const columns = document.querySelectorAll(".tasks");
columns.forEach((col) => {
    col.addEventListener("dragover", dragOver);
})

function dragOver(event) {
    event.preventDefault();
    const draggedCard = document.getElementsByClassName("dragging")[0]
    this.appendChild(draggedCard);
}

const contextMenu = document.querySelector(".context-menu");
function showContextMenu(x, y) { 
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.style.display = "block";
}

document.addEventListener("click", () => {
    contextMenu.style.display = "none";
});

function editTask() {
    if (rightClickedCard !== null) {
        const newTask = prompt("Edit your task:", rightClickedCard.textContent);
        if (newTask !== null && newTask.trim() !== "") {
            rightClickedCard.textContent = newTask.trim();
            updateTasksLocalStorage()
        }
    } 
}

function deleteTask() {
    if (rightClickedCard !== null) {
        const colId = rightClickedCard.parentElement.id.replace("-tasks", "");
        rightClickedCard.remove();
        updateTaskCounts(colId);
        updateTasksLocalStorage()
    }
    
}

function updateTaskCounts(colId) {
    const count = document.querySelectorAll(`#${colId}-tasks .card`).length;
    document.getElementById(`${colId}-count`).textContent = count;
}

function saveTasksLocalStorage(colId, taskText, taskDate) {
    const tasks = JSON.parse(localStorage.getItem(colId)) || []
    tasks.push({ text: taskText, date: taskDate })
    localStorage.setItem(colId, JSON.stringify(tasks));
}
function loadTasksLocalStorage() {
    ["todo", "doing", "done"].forEach((colId) => {
        const tasks = JSON.parse(localStorage.getItem(colId) || [])
        tasks.forEach(({ text, date }) => {
            const taskEle = createTaskEle(text, date)
            document.getElementById(`${colId}-tasks`).appendChild(taskEle)
        })
        updateTaskCounts(colId)
    })
}
function updateTasksLocalStorage() {
    ["todo", "doing", "done"].forEach((colId) => {
        const tasks = []
        document.querySelectorAll(`#${colId}-tasks .card`).forEach((card) => {
            const taskText = card.querySelector("span").textContent
            const taskDate = card.querySelector("small").textContent
            tasks.push({ text: taskText, date: taskDate})
        })
        localStorage.setItem(colId, JSON.stringify(tasks))
    })
}
