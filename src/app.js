import { createTask, parseStoredTasks, removeTask, toggleTask } from "./tasks.js";

const storageKey = "taskbox.tasks.v1";
const form = document.querySelector("#task-form");
const titleInput = document.querySelector("#task-title");
const error = document.querySelector("#form-error");
const list = document.querySelector("#task-list");
const count = document.querySelector("#task-count");
const emptyState = document.querySelector("#empty-state");
const template = document.querySelector("#task-template");

let tasks = parseStoredTasks(localStorage.getItem(storageKey));

function save() {
  localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function render() {
  list.replaceChildren();

  for (const task of tasks) {
    const item = template.content.firstElementChild.cloneNode(true);
    const toggle = item.querySelector(".task-toggle");
    const title = item.querySelector(".task-title");
    const deleteButton = item.querySelector(".task-delete");

    item.dataset.taskId = task.id;
    item.classList.toggle("is-complete", task.completed);
    toggle.checked = task.completed;
    toggle.setAttribute(
      "aria-label",
      `Mark ${task.title} as ${task.completed ? "active" : "complete"}`,
    );
    title.textContent = task.title;
    deleteButton.setAttribute("aria-label", `Delete ${task.title}`);

    list.append(item);
  }

  const openCount = tasks.filter((task) => !task.completed).length;
  count.textContent = `${openCount} open`;
  emptyState.hidden = tasks.length > 0;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  error.textContent = "";

  try {
    tasks = [createTask(titleInput.value), ...tasks];
    save();
    render();
    form.reset();
    titleInput.focus();
  } catch (caught) {
    error.textContent = caught.message;
  }
});

list.addEventListener("change", (event) => {
  if (!event.target.matches(".task-toggle")) return;
  tasks = toggleTask(tasks, event.target.closest(".task").dataset.taskId);
  save();
  render();
});

list.addEventListener("click", (event) => {
  if (!event.target.matches(".task-delete")) return;
  tasks = removeTask(tasks, event.target.closest(".task").dataset.taskId);
  save();
  render();
});

render();
