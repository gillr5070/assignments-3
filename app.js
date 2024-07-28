document.addEventListener('DOMContentLoaded', () => { // Wait until the DOM is fully loaded
    const form = document.getElementById('todo-form'); // Get the form element by its ID
    const input = document.getElementById('todo-input'); // Get the input element by its ID
    const todoList = document.getElementById('todo-list'); // Get the ul element where todo items will be listed
    const dingSound = document.getElementById('ding-sound'); // Get the audio element for the 'ding' sound

    class Todo { // Define a class for todo items
        constructor(task) { // Constructor to initialize a new todo with a task
            this.task = task; // Store the task description
            this.completed = false; // Set the initial state of the task to not completed
        }
    }

    class TodoApp { // Define a class for the todo app
        constructor() { // Constructor to initialize the app
            this.todos = []; // Initialize an empty array to hold todo items
        }

        addTodo(task) { // Method to add a new todo item
            const todo = new Todo(task); // Create a new Todo object
            this.todos.push(todo); // Add the new todo to the todos array
            this.render(); // Re-render the todo list
        }

        toggleComplete(index) { // Method to toggle the completion state of a todo item
            this.todos[index].completed = !this.todos[index].completed; // Toggle the completed state
            this.render(); // Re-render the todo list
            dingSound.play(); // Play the 'ding' sound
        }

        deleteTodo(index) { // Method to delete a todo item
            const li = todoList.children[index]; // Get the corresponding list item element
            li.classList.add('deleting'); // Add the 'deleting' class for fade-out effect
            setTimeout(() => { // Wait for the fade-out effect to complete
                this.todos.splice(index, 1); // Remove the todo item from the array
                this.render(); // Re-render the todo list
            }, 500); // 500ms delay for the fade-out effect
        }

        render() { // Method to render the todo list
            todoList.innerHTML = ''; // Clear the current list
            const incompleteTodos = this.todos.filter(todo => !todo.completed); // Filter incomplete todos
            const completeTodos = this.todos.filter(todo => todo.completed); // Filter completed todos
            const allTodos = [...incompleteTodos, ...completeTodos]; // Combine incomplete and complete todos

            allTodos.forEach((todo, index) => { // Iterate over all todos
                const li = document.createElement('li'); // Create a new list item
                li.className = todo.completed ? 'completed' : ''; // Set the class based on completion state

                const checkbox = document.createElement('input'); // Create a checkbox for marking completion
                checkbox.type = 'checkbox'; // Set the input type to checkbox
                checkbox.checked = todo.completed; // Set the checkbox state based on completion
                checkbox.addEventListener('change', () => this.toggleComplete(index)); // Add change event to toggle completion

                const span = document.createElement('span'); // Create a span element for the task
                span.textContent = todo.task; // Set the text content to the task description

                const deleteButton = document.createElement('button'); // Create a button for deleting the todo
                deleteButton.className = 'delete'; // Set the class name for the delete button
                deleteButton.textContent = 'Delete'; // Set the button text
                deleteButton.addEventListener('click', () => this.deleteTodo(index)); // Add click event to delete the todo

                li.appendChild(checkbox); // Add the checkbox to the list item
                li.appendChild(span); // Add the span to the list item
                li.appendChild(deleteButton); // Add the delete button to the list item
                todoList.appendChild(li); // Add the list item to the todo list
            });
        }
    }

    const app = new TodoApp(); // Create a new instance of the TodoApp class

    form.addEventListener('submit', (e) => { // Add a submit event listener to the form
        e.preventDefault(); // Prevent the default form submission behavior
        const task = input.value.trim(); // Get the trimmed value of the input field
        if (task) { // Check if the task is not empty
            app.addTodo(task); // Add the new task to the app
            input.value = ''; // Clear the input field
        }
    });
});
