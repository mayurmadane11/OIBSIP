const enterTaskInput = document.querySelector(".task input"),
filters = document.querySelectorAll(".attributes span"),
clearAll = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task-box");

let editId,
isEditTask = false,
todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active-all").classList.remove("active-all");
        btn.classList.add("active-all");
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let liTags = "";
    if(todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed-task" ? "checked" : "";
            if(filter == todo.status || filter == "all") {
                liTags += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                        
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = liTags || `<span>You don't have any task here</span>`;
    let checkTasks = taskBox.querySelectorAll(".task");
    !checkTasks.length ? clearAll.classList.remove("active-all") : clearAll.classList.add("active-all");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodo("all");

function showMenu(selectedTask) {
    let menuDivButton= selectedTask.parentElement.lastElementChild;
    menuDivButton.classList.add("show")
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed-task";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending-task";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}



clearAll.addEventListener("click", () => {
    isEditTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo()
});

enterTaskInput.addEventListener("keyup", e => {
    let userTasks = enterTaskInput.value.trim();
    if(e.key == "Enter" && userTasks) {
        if(!isEditTask) {
            todos = !todos ? [] : todos;
            let taskInfo = {name: userTasks, status: "pending-task"};
            todos.push(taskInfo);
        } else {
            isEditTask = false;
            todos[editId].name = userTasks;
        }
        enterTaskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active-all").id);
    }
});