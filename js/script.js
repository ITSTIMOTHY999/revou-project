const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const taskTable = document.getElementById('taskTable');
const deleteAllBtn = document.getElementById('deleteAllBtn');

let tasks = [];
let sortAscending = true;

const filterBtn = document.getElementById('filterBtn');

filterBtn.addEventListener('click', () => {
  tasks.sort((a, b) => {
    const taskA = a.task.toLowerCase();
    const taskB = b.task.toLowerCase();
    return sortAscending ? taskA.localeCompare(taskB) : taskB.localeCompare(taskA);
  });

  sortAscending = !sortAscending; // toggle between A→Z and Z→A
  renderTasks();
});

addBtn.addEventListener('click', () => {
  const task = taskInput.value.trim();
  const due = dateInput.value;

  if (task === '') return;

  tasks.push({ task, due, completed: false });
  renderTasks();
  taskInput.value = '';
  dateInput.value = '';
});

deleteAllBtn.addEventListener('click', () => {
  tasks = [];
  renderTasks();
});

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function renderTasks() {
  if (tasks.length === 0) {
    taskTable.innerHTML = `<tr><td colspan="4" style="text-align:center;">No task found</td></tr>`;
    return;
  }

  taskTable.innerHTML = '';
  tasks.forEach((t, i) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="${t.completed ? 'completed' : ''}">${t.task}</td>
      <td>${t.due || '-'}</td>
      <td>${t.completed ? '✅ Done' : '⏳ Pending'}</td>
      <td>
        <button class="action-btn" onclick="toggleComplete(${i})">Toggle</button>
        <button class="action-btn" onclick="deleteTask(${i})">Delete</button>
      </td>
    `;
    taskTable.appendChild(row);
  });
}
