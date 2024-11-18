// Function to determine the greeting based on the time of day
function getGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
        return "Good Morning";
    } else if (currentHour < 18) {
        return "Good Afternoon";
    } else {
        return "Good Evening";
    }
}

// Update the greeting
const greetingElement = document.getElementById('greeting');
const userName = "Lakkireddy Varshitha"; // Your name
greetingElement.textContent = `${getGreeting()}, ${userName}!`;

// To-Do List Functionality
const taskInput = document.getElementById('task-input');
const timeInput = document.getElementById('time-input');
const dateInput = document.getElementById('date-input');
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => renderTask(task));
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach((taskItem) => {
        const taskContent = taskItem.querySelector('.task-content').textContent;
        const taskTime = taskItem.querySelector('.task-time').textContent;
        const taskDate = taskItem.querySelector('.task-date').textContent;
        tasks.push({ taskContent, taskTime, taskDate });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render a task
function renderTask({ taskContent, taskTime, taskDate }) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    const taskContentSpan = document.createElement('span');
    taskContentSpan.textContent = taskContent;
    taskContentSpan.classList.add('task-content');

    const taskTimeSpan = document.createElement('span');
    taskTimeSpan.textContent = taskTime;
    taskTimeSpan.classList.add('task-time');

    const taskDateSpan = document.createElement('span');
    taskDateSpan.textContent = taskDate;
    taskDateSpan.classList.add('task-date');

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
        saveTasks(); // Save updated tasks
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        saveTasks(); // Save updated tasks
    });

    const calendarButton = document.createElement('button');
    calendarButton.textContent = 'Add to Google Calendar';
    calendarButton.addEventListener('click', () => {
        const calendarLink = generateGoogleCalendarLink(taskContent, taskTime, taskDate);
        window.open(calendarLink, '_blank');
    });

    taskItem.appendChild(taskContentSpan);
    taskItem.appendChild(taskTimeSpan);
    taskItem.appendChild(taskDateSpan);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);
    taskItem.appendChild(calendarButton);

    taskList.appendChild(taskItem);
}

// Generate Google Calendar link
function generateGoogleCalendarLink(task, time, date) {
    const baseUrl = 'https://calendar.google.com/calendar/r/eventedit';
    const startDateTime = `${date}T${time}:00`;
    const endDateTime = `${date}T${parseInt(time.split(':')[0]) + 1}:${time.split(':')[1]}:00`;

    return `${baseUrl}?text=${encodeURIComponent(task)}&dates=${startDateTime}/${endDateTime}`;
}

// Add task button listener
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const taskTime = timeInput.value;
    const taskDate = dateInput.value;

    if (!taskText || !taskTime || !taskDate) {
        alert('Please fill all fields!');
        return;
    }

    const newTask = { taskContent: taskText, taskTime: `⏰ ${taskTime}`, taskDate: `📅 ${taskDate}` };
    renderTask(newTask);
    saveTasks(); // Save updated tasks

    // Clear inputs
    taskInput.value = '';
    timeInput.value = '';
    dateInput.value = '';
});

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);
