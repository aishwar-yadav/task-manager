                                  # Homework Tracker

As per the task given by Zimmetrics , I have creayed a  simple Single Page Application to track homework tasks with a Node.js backend and vanilla JavaScript frontend.

:What our website does and how it works

1) We can add our homework tasks by simply clicking on add task .
2) We can view all tasks in a list below input box without refreshing page.
3) I have added tasks in a JSON file.

:Requirements or setting up the environment

1. Install dependencies:
   npm install


2. Start the server:
   npm start

3. Open your browser to `http://localhost:3000`

:APIs

1) "GET /api/tasks" - List all tasks
2) "POST /api/tasks" - Add a new task (requires (task) in request body)

:Structure of the overall file

1) "server.js" - Express.js backend with API endpoints
2) "public/index.html" - Here is the main HTML page
3) "public/style.css" - for styling so that the webpage looks good
4) "public/script.js" - JavaScript
5) "tasks.json" - JSON file for task storage (created automatically)