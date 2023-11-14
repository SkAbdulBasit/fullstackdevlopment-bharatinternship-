// Sample data for users
const users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    // Add more users as needed
];

// Sample data for tasks
const tasks = [
    { id: 1, title: 'Task 1', assignedTo: 1 },
    { id: 2, title: 'Task 2', assignedTo: 2 },
    // Add more tasks as needed
];

document.addEventListener('DOMContentLoaded', () => {
    // Populate user list
    const userList = document.getElementById('userList');
    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = user.name;
        userList.appendChild(listItem);

        // Populate task form's assigned user dropdown
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        document.getElementById('assignedUser').appendChild(option);
    });

    // Populate task list
    const taskList = document.getElementById('taskList');
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${task.title}</strong><br>Assigned to: ${users.find(u => u.id === task.assignedTo).name}`;
        taskList.appendChild(listItem);
    });
});

function createTask() {
    const taskTitle = document.getElementById('taskTitle').value;
    const assignedUserId = document.getElementById('assignedUser').value;

    // Validate input
    if (!taskTitle || !assignedUserId) {
        alert('Please fill in all fields.');
        return;
    }

    // Create a new task
    const newTask = {
        id: tasks.length + 1,
        title: taskTitle,
        assignedTo: parseInt(assignedUserId),
    };

    // Add the new task to the tasks array
    tasks.push(newTask);

    // Update the task list
    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${newTask.title}</strong><br>Assigned to: ${users.find(u => u.id === newTask.assignedTo).name}`;
    taskList.appendChild(listItem);

    // Clear the form
    document.getElementById('taskTitle').value = '';
    document.getElementById('assignedUser').value = '';
}
