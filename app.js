const streakElement = document.getElementById("streak");
const motivation = document.getElementById("motivation");
const todayTasksList = document.getElementById("todayTasks");
const progressFill = document.getElementById("progressFill");
const todayDate = document.getElementById("todayDate");

const quotes = [
  "Small steps every day.",
  "Great things take time!",
  "Show up for yourself today.",
  "Today’s progress counts!",
  "Consistency wins."
];

const routine = ["DSA", "Project Work", "Communication"];

let today = new Date().toISOString().split("T")[0];
todayDate.innerText = today;

// Random Motivation
motivation.innerText = quotes[Math.floor(Math.random() * quotes.length)];

function loadTasks() {
  todayTasksList.innerHTML = "";
  let saved = JSON.parse(localStorage.getItem(today) || "[]");

  routine.forEach((task, i) => {
    let li = document.createElement("li");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = saved.includes(i);

    if (checkbox.checked) li.classList.add("task-done");

    checkbox.addEventListener("change", () => toggleTask(i));
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(task));
    todayTasksList.appendChild(li);
  });

  updateProgress();
  updateStreak();
}

// Save task completion
function toggleTask(i) {
  let saved = JSON.parse(localStorage.getItem(today) || "[]");
  if (saved.includes(i)) saved = saved.filter(x => x !== i);
  else saved.push(i);
  localStorage.setItem(today, JSON.stringify(saved));
  loadTasks();
}

// Progress bar
function updateProgress() {
  let completed = JSON.parse(localStorage.getItem(today) || "[]").length;
  let percent = (completed / routine.length) * 100;
  progressFill.style.width = percent + "%";
}

// Streak count
function updateStreak() {
  let streak = 0;
  let current = new Date();

  while (true) {
    let key = current.toISOString().split("T")[0];
    let saved = JSON.parse(localStorage.getItem(key) || "[]");

    if (saved.length === routine.length) streak++;
    else break;

    current.setDate(current.getDate() - 1);
  }
  streakElement.innerText = streak;
}

// Sidebar
function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const left = sidebar.style.left === "0px" ? "-250px" : "0px";
  sidebar.style.left = left;
  overlay.style.display = left === "0px" ? "block" : "none";
}

// Navigation
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.getElementById("headerTitle").innerText = id.charAt(0).toUpperCase() + id.slice(1);
  toggleMenu();
}

loadTasks();
