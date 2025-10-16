
//let draggedCard = null;
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
    taskEl.draggable = true;
    taskEl.addEventListener("dragstart", dragStart)
    taskEl.addEventListener("dragend", dragEnd)
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