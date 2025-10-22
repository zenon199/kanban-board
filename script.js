
//let draggedCard = null;
let rightClickedCard = null;

function addTask(colId) {
    const input = document.getElementById(`${colId}-input`);
    taskText = input.value.trim();

    if (taskText === "") return;

    const taskDate = new Date().toLocaleString();

    const taskEle = createTaskEle(taskText, taskDate);
    document.getElementById(`${colId}-tasks`).appendChild(taskEle);
    input.value = "";
    updateTaskCounts(colId);
    console.log(colId)
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
        }
    } 
}

function deleteTask() {
    if (rightClickedCard !== null) {
        const colId = rightClickedCard.parentElement.id.replace("-tasks", "");
        rightClickedCard.remove();
        updateTaskCounts(colId);
    }
    
}

function updateTaskCounts(colId) {
    const count = document.querySelectorAll(`#${colId}-tasks .card`).length;
    document.getElementById(`${colId}-count`).textContent = count;
}
