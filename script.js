document.body.querySelectorAll(".btn").forEach((e) => {
  e.addEventListener("click", () => {
    document
      .querySelectorAll(".btn")
      .forEach((btn) => btn.classList.remove("active"));
    e.classList.add("active");
  });
});
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".t1").classList.add("active");
});
let populate = () => {
  const sec4 = document.querySelector(".sec4");
  sec4.innerHTML = "";
  todoList.forEach((t, i) => {
    if (t.task) {
      sec4.innerHTML += `
                <div data-index="${i}">
                    <input type="checkbox" id="task${i}" ${
        t.isCompleted ? "checked" : ""
      }/>
                    <label for="task${i}">${t.task}</label>
                    <img class="close" data-index="${i}" src="cross.svg" alt="" width="20" height="20" />
                </div>
            `;
    }
  });
  document.querySelector(
    ".items"
  ).innerHTML = `<span class="items">${todoList.length} items left</span>`;
};
document.querySelector(".sec4").addEventListener("click", (e) => {
  if (e.target.type === "checkbox") {
    let index = parseInt(e.target.id.replace("task", ""));
    todoList[index].isCompleted = e.target.checked;
    localStorage.setItem("Tasks", JSON.stringify(todoList));
  }
  if (e.target.classList.contains("close")) {
    let index = parseInt(e.target.dataset.index);
    todoList.splice(index, 1);
    localStorage.setItem("Tasks", JSON.stringify(todoList));
  }
  populate();
});
document.querySelector(".clear").addEventListener("click", () => {
  todoList = todoList.filter((t) => {
    if (!t.isCompleted) {
      return t;
    }
  });
  localStorage.setItem("Tasks", JSON.stringify(todoList));
  populate();
});

function filterTodos(mode) {
  todoList.forEach((t, i) => {
    const el = document.querySelector(`.sec4 div[data-index="${i}"]`);
    if (mode === "all") el.style.display = "flex";
    if (mode === "active") el.style.display = t.isCompleted ? "none" : "flex";
    if (mode === "completed") el.style.display = t.isCompleted ? "flex" : "none";
  });
}
document.querySelector('.t1').addEventListener('click', () => filterTodos("all"));
document.querySelector('.t2').addEventListener('click', () => filterTodos("active"));
document.querySelector('.t3').addEventListener('click', () => filterTodos("completed"));


let todoText;
let todoList = [];
if (localStorage.getItem("Tasks")) {
  todoList = JSON.parse(localStorage.getItem("Tasks"));
}
populate();

document.querySelector(".add").addEventListener("click", () => {
  todoText = document.querySelector(".input-task").value;
  document.querySelector(".input-task").value = "";
  if (todoText) {
    let todo = {
      task: todoText,
      isCompleted: false,
    };

    todoList.push(todo);
    localStorage.setItem("Tasks", JSON.stringify(todoList));
    populate();
  }
});
