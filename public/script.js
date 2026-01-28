// this is the javascript file which is connected to html
class HomeworkTracker {

    constructor() {

        // getting access to the elements by id
        // picking up the html elments so I can use them in js
        this.taskInput = document.getElementById('taskInput');
        this.addButton = document.getElementById('addButton');
        this.tasksList = document.getElementById('tasksList');
        this.emptyState = document.getElementById('emptyState');
        
        this.init();
    }
    
    init() {
        
        // adding eventListener for the button
        this.addButton.addEventListener('click', () => this.addTask());

        // for removing the added tasks on refreshing  but the data still remained in database
        taskElement.onclick = function() {
        this.remove(); 
         };

        // Added this so that the users don't have to click 'Add' every time—they . They can just hit Enter
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });
        
        this.loadTasks();
    }
    
    async loadTasks() {
        try {
            const response = await fetch('/api/tasks');
            const tasks = await response.json();
            this.renderTasks(tasks);
        } catch (error) {
            console.error('Error loading tasks:', error);
            this.showError('Failed to load tasks');
        }
    }
    

    // for adding a new task
    async addTask() {
        const taskText = this.taskInput.value.trim();
        
        if (!taskText) {
            this.taskInput.focus();
            return;
        }
        
        this.setLoading(true);
        
        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: taskText }),
            });
            
            if (!response.ok) {
                throw new Error('Failed to add task');
            }
            
            const newTask = await response.json();
            this.taskInput.value = ''; // Empty the box for the next task so user can enter other task
            this.addTaskToDOM(newTask);
            this.updateEmptyState();
            
        } catch (error) {
            console.error('Error adding task:', error);
            this.showError('Failed to add task');
        } finally {
            this.setLoading(false);
        }
    }
    
    renderTasks(tasks) {
        this.tasksList.innerHTML = '';
        
        tasks.forEach(task => {
            this.addTaskToDOM(task);
        });
        
        this.updateEmptyState();
    }
    
    addTaskToDOM(task) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span class="task-text">${this.escapeHtml(task.task)}</span>
            <span class="task-date">${this.formatDate(task.createdAt)}</span>
        `;
        
        this.tasksList.appendChild(li);
    }
    
    updateEmptyState() {
        const hasTasks = this.tasksList.children.length > 0;
        this.emptyState.style.display = hasTasks ? 'none' : 'block';
    }
    
    setLoading(loading) {
        this.addButton.disabled = loading;
        this.addButton.textContent = loading ? 'Adding...' : 'Add Task';
        document.body.classList.toggle('loading', loading);
    }
    
    showError(message) {
        // error handling - 
        alert(message);
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }
}

// Initializing 
document.addEventListener('DOMContentLoaded', () => {
    new HomeworkTracker();
});



// code ended