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
// Filter berdasarkan tanggal
function filterByDate(option = "today") {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todoList.innerHTML = "";

  const today = new Date().toISOString().split("T")[0]; // format YYYY-MM-DD

  let filtered = todos;

  if (option === "today") {
    filtered = todos.filter(t => t.date === today);
  } else if (option === "week") {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Minggu
    const endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6)); // Sabtu

    filtered = todos.filter(t => {
      if (t.date === "No date") return false;
      const todoDate = new Date(t.date);
      return todoDate >= startOfWeek && todoDate <= endOfWeek;
    });
  }

  filtered.forEach(todo => renderTodo(todo));
}
// Filter todos berdasarkan status
function filterTodos(status = "all") {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todoList.innerHTML = "";

  let filtered = todos;

  if (status === "completed") {
    filtered = todos.filter(t => t.completed);
  } else if (status === "pending") {
    filtered = todos.filter(t => !t.completed);
  }

  filtered.forEach(todo => renderTodo(todo));
}