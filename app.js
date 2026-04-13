function showScreen(id, btn) {

  let screens = document.querySelectorAll(".screen");
  let buttons = document.querySelectorAll(".bottom-nav button");

  screens.forEach(s => {
    s.style.display = "none";
  });

  buttons.forEach(b => b.classList.remove("active"));

  let active = document.getElementById(id);

  if (active) {
    active.style.display = "block";   // show current screen
  }

  if (btn) btn.classList.add("active");

  // update dashboard if needed
  if (id === "home") updateDashboard();
}

// default screen
showScreen("learn");

function showTopic(topic) {
  let text = "";

  if (topic === "arrays") {
    text = "Arrays store multiple values in a single variable using index positions.";
  }

  if (topic === "loops") {
    text = "Loops execute a block of code repeatedly until a condition is met.";
  }

  document.getElementById("content").innerText = text;
}

function addTask() {
  let input = document.getElementById("task");
  let priority = document.getElementById("priority").value;

  let text = input.value;
  if (!text) return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push({
    text: text,
    done: false,
    priority: priority
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  displayTasks();
}

function displayTasks() {
  let list = document.getElementById("list");
  if (!list) return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = "<p>No tasks yet 🚀</p>";
    return;
  }

  tasks.forEach((task, index) => {

    let li = document.createElement("li");
    li.className = "task-card";

    let color = "#ccc";
    if (task.priority === "high") color = "#ff6b6b";
    if (task.priority === "medium") color = "#f7b731";
    if (task.priority === "low") color = "#2ecc71";

    li.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <b>${task.text}</b><br>
          <small style="color:${color}">${task.priority.toUpperCase()}</small>
        </div>

        <div>
          <button onclick="completeTask(${index})">✔</button>
          <button onclick="deleteTask(${index})">❌</button>
        </div>
      </div>
    `;

    if (task.done) {
      li.style.opacity = "0.6";
      li.style.textDecoration = "line-through";
    }

    list.appendChild(li);
  });

  updateProgress(tasks);
}


function reply() {
  let msg = document.getElementById("msg").value;

  if (msg.includes("array")) {
    document.getElementById("response").innerText =
      "Array is a collection of elements.";
  } else {
      "I will help you soon!";
  }
}


let streak = localStorage.getItem("streak") || 0;
let lastDate = localStorage.getItem("lastDate");

function increase() {
  let today = new Date().toDateString();

  if (lastDate === today) {
    alert("Already counted today!");
    return;
  }

  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (lastDate === yesterday.toDateString()) {
    streak++;
  } else {
    streak = 1;
  }

  localStorage.setItem("streak", streak);
  localStorage.setItem("lastDate", today);

  document.getElementById("count").innerText = streak;
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

function completeTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

function toggle(topic) {
  let el = document.getElementById(topic);

  if (el.style.display === "none") {
    el.style.display = "block";

    if (topic === "arrays") {
      el.innerText = "Arrays store multiple values using index.";
    }

    if (topic === "loops") {
      el.innerText = "Loops repeat code execution.";
    }
  } else {
    el.style.display = "none";
  }
}

function signup() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (!user || !pass) {
    alert("Enter details");
    return;
  }

  localStorage.setItem("user", user);
  localStorage.setItem("pass", pass);

  alert("Signup successful!");
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "" || password === "") {
    alert("Please enter email and password");
    return;
  }

  // Save user
  localStorage.setItem("user", username);

  // Show header
  document.getElementById("header").style.display = "flex";

  // Hide login screen
  document.getElementById("auth").style.display = "none";

  // Show main app
  document.getElementById("mainApp").style.display = "block";

  // Go to home
  showScreen("home");
}

function logout() {
  // Remove user
  localStorage.removeItem("user");

  // Hide header
  document.getElementById("header").style.display = "none";

  // Show login screen
  document.getElementById("auth").style.display = "flex";

  // Hide app
  document.getElementById("mainApp").style.display = "none";
}

window.onload = function () {

  const user = localStorage.getItem("user");

  if (user) {
    // User already logged in → show app

    document.getElementById("header").style.display = "flex";
    document.getElementById("auth").style.display = "none";
    document.getElementById("mainApp").style.display = "block";

    showScreen("home");

  } else {
    // Not logged in → show login

    document.getElementById("header").style.display = "none";
    document.getElementById("auth").style.display = "flex";
    document.getElementById("mainApp").style.display = "none";
  }

};

function updateDashboard() {

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let completed = tasks.filter(t => t.done).length;

  let streak = localStorage.getItem("streak") || 0;

  let percent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  // text update
  document.getElementById("homeProgress").innerText =
    `${completed} / ${tasks.length} tasks`;

  document.getElementById("homeStreak").innerText =
    `${streak} days`;

  document.getElementById("circleText").innerText =
    `${percent}%`;

  // 🔥 animate circle
  let circle = document.querySelector(".circle");
  circle.style.background =
    `conic-gradient(#4CAF50 ${percent}%, #eee ${percent}%)`;
}

function updateProgress(tasks) {
  let completed = tasks.filter(t => t.done).length;
  let percent = tasks.length ? (completed / tasks.length) * 100 : 0;

  let fill = document.getElementById("progressFill");
  if (fill) fill.style.width = percent + "%";

  document.getElementById("progress").innerText =
    `${completed} / ${tasks.length} completed`;
}

function toggleTheme() {
  document.body.classList.toggle("dark");

  let isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}