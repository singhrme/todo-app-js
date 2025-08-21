const AddTaskBtn = document.getElementById("add-task-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((task) => renderTask(task));

AddTaskBtn.addEventListener("click", (e) => {
  const item = todoInput.value.trim();
  if (!item) return;

  const newTask = {
    id: Date.now(),
    text: item,
    completed: false,
  };
  tasks.push(newTask);
  saveTasks();
  todoInput.value = "";

  // console.log(task);
});

function renderTask(task) {
  const listItem = document.createElement("li");
  listItem.setAttribute("data-id", task.id);
  if (task.completed) listItem.classList.add("completed");
  listItem.innerHTML = `<span>${task.text}</span> <button>Delete</button>`;
  listItem.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") return;
    task.completed = !task.completed;
    listItem.classList.toggle("completed");
    saveTasks();
  });

  todoList.appendChild(listItem);

  listItem.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.tagName !== "BUTTON") return;
    tasks = tasks.filter((l) => l.id !== task.id);
    listItem.remove();
    saveTasks();
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
