const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Task{
    #description
    #dueDate
    constructor(description, dueDate){
        this.#description=description
        this.#dueDate = dueDate
    }

    get description(){
        return this.#description
    }

    get dueDate(){
        return `${this.#dueDate.day} / ${this.#dueDate.month} / ${this.#dueDate.year}`
    }
}

class Date{
    #day
    #month
    #year
    constructor(day,month,year){
        this.#day = day
        this.#month = month
        this.#year = year
    }

    get day(){
        return this.#day
    }

    get month(){
        return this.#month
    }

    get year(){
        return this.#year
    }
}


///////////////////////////////////////////////////////////////////////////////////


const tasks = [];
start();


//////////////////////////////////////////////////////////////////////////////////


function displayMenu() {
    const menu = `***************************
Welcome to JS TODO-APP
***************************
Select an action:
1) Add a new task
2) List all tasks
3) List completed tasks
4) Mark the task as done
5) Delete a task
6) Sort tasks by the due date
7) Sort tasks by priority
8) Clear all tasks
9) Exit
***************************
`;
console.log(menu)
}

function getUserChoice() {
  return new Promise((resolve) => {
    rl.question('Enter your choice: ', (choice) => {
      resolve(choice);
    });
  });
}

function getUserInput(prompt) {
    return new Promise((resolve) => {
      rl.question(prompt, (input) => {
        resolve(input);
      });
    });
  }

async function start() {
    let choice;
    do {
        displayMenu();
        choice = await getUserChoice();

        switch (choice) {
        case '1':
            await addTask();
            break;
        case '2':
            listTasks();
            break;
        case '3':
            listCompletedTasks();
            break;
        case '4':
            await markTaskAsCompleted();
            break;
        case '5':
            await deleteTask();
            break;
        case '6':
            sortTasksByDueDate();
            break;
        case '7':
            setTaskPriorities();
            break;
        case '8':
            clearAllTasks();
            break;
        case '9':
            break;
        default:
            console.log('Invalid choice, try again.');
            break;
        }

    console.log(); 
} while (choice !== '9');

rl.close();
}

async function addTask() {
  const description = await getUserInput('Enter the task description: ');
  const day = await getUserInput("Enter the day: ");
  const month = await getUserInput("Enter the month: ");
  const year = await getUserInput("Enter the year: ");

  const task = new Task(description, new Date(day,month,year));
  tasks.push(task);

  console.log('\nThe task has been added successfully!!!');
} 

async  function listTasks() {
  if (tasks.length === 0) {
    console.log('There is no taskes');
  } else {
    console.log('The tasks:');
    tasks.forEach((task, index) => {
    console.log(`${index + 1}. The description: ${task.description}, due Date: ${task.dueDate}`);
    });
  }
}

function listCompletedTasks() {
  const completedTasks = tasks.filter((task) => task.completed);

  if (completedTasks.length === 0) {
    console.log('No completed tasks');
  } else {
    console.log('THe completed tasks are:');
    completedTasks.forEach((task, index) => {
    console.log(`${index + 1}. The description: ${task.description}, due Date: ${task.dueDate}`);
    });
  }
}

async  function markTaskAsCompleted() {
  if (tasks.length === 0) {
    console.log('No tasks');
  } else {
    listTasks()
    const selectedTaskIndex = parseInt(await getUserInput('Enter the number of the task to mark as completed: '), 10);
    if (selectedTaskIndex >= 1 && selectedTaskIndex <= tasks.length) {
      tasks[selectedTaskIndex - 1].completed = true;
      console.log('Task marked as completed!');
    } else {
      console.log('Invalid task index.');
    }
  }
}

async function deleteTask() {
  if (tasks.length === 0) {
    console.log('No tasks');
  } else {
    listTasks()
    const selectedTaskIndex = parseInt(await getUserInput('Enter the index of the task to delete: '), 10);
    if (selectedTaskIndex >= 1 && selectedTaskIndex <= tasks.length) {
      tasks.splice(selectedTaskIndex - 1, 1);
      console.log('Task has been deleted successfully!');
    } else {
      console.log('Invalid task index.');
    }
  }
  listTasks();
}

function sortTasksByDueDate() {
  tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  listTasks();
}

async function setTaskPriorities() {
  tasks.forEach((task) => {
    const dueDate = new Date(task.dueDate);
    const timeDifference = dueDate - new Date();
    const priority = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    task.priority = priority;
  });

  console.log('Task priorities set based on due date'+
  '\nthe closer the due date, the greater his priorities, if the user choose 8 will delete all tasks');
  listTasks();
}

function clearAllTasks() {
  tasks.length = 0;
}