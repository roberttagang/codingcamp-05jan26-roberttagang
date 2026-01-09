// Ambil elemen
const todoInput = document.getElementById("todo-input");
const todoDate = document.getElementById("todo-date");
const todoList = document.getElementById("todo-list");

// Load todos dari localStorage saat halaman dibuka
document.addEventListener("DOMContentLoaded", loadTodos);

// Fungsi tambah todo
function addTodo() {
  const todoText = todoInput.value.trim();
  const todoDue = todoDate.value;

  if (todoText === "") {
    alert("Please enter a todo item!");
    return;
  }

  const todo = {
    text: todoText,
    date: todoDue || "No date"
  };

  // Simpan ke localStorage
  saveTodo(todo);

  // Render ke UI
  renderTodo(todo);

  // Reset input
  todoInput.value = "";
  todoDate.value = "";
}

// Fungsi render todo ke UI
function renderTodo(todo) {
  const li = document.createElement("li");
  li.className = "flex justify-between items-center border-b py-2 bg-white rounded px-2";

  li.innerHTML = `
    <span>${todo.text} - <small>${todo.date}</small></span>
    <button onclick="removeTodo(this)" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
  `;

  todoList.appendChild(li);
}

// Fungsi hapus satu todo
function removeTodo(button) {
  const li = button.parentElement;
  const todoText = li.querySelector("span").innerText;

  // Hapus dari localStorage
  deleteTodo(todoText);

  // Hapus dari UI
  li.remove();
}

// Fungsi hapus semua todo
function removeAllTodo() {
  localStorage.removeItem("todos");
  todoList.innerHTML = "";
}

// Simpan todo ke localStorage
function saveTodo(todo) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Hapus todo dari localStorage
function deleteTodo(todoText) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = todos.filter(t => `${t.text} - ${t.date}` !== todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Load todos dari localStorage
function loadTodos() {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todoList.innerHTML = ""; // reset list
  todos.forEach(todo => renderTodo(todo));
}