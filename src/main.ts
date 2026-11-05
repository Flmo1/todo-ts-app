import './style.css'
import { clearCompleted } from './todoFunctions'
import type { Todo, Priority } from './todoFunctions'

let todos: Todo[] = [];

const todoInput = document.getElementById('todo-input') as HTMLInputElement
const todoForm = document.querySelector('.todo-form') as HTMLFormElement
const todoList = document.getElementById('todo-list') as HTMLUListElement
const clearButton = document.getElementById('clear-completed') as HTMLButtonElement
const prioritySelect = document.getElementById('priority-select') as HTMLSelectElement

const errorMessage = document.getElementById('error-message') as HTMLParagraphElement

const addTodo = (text: string, priority?: Priority): void => {
 const newTodo: Todo = {
  id: Date.now(),
  text: text,
  completed: false,
  priority: priority
 }
 todos.push(newTodo)
 renderTodos();
}

const renderTodos = ():void => {
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li')
    li.className = 'todo-item'

    let buttonText = 'Done'
    if (todo.completed) {
      buttonText = 'Undo'
      li.classList.add('completed')
    }

    let priorityHtml = ''
    if (todo.priority) {
      priorityHtml = `<small class="priority ${todo.priority}">${todo.priority}</small>`
    }

    li.innerHTML = `
    <span>${todo.text}</span>
    ${priorityHtml}
    <button>Remove</button>
    <button class="toggleBtn">${buttonText}</button>
    `
    addRemoveButtonListener(li, todo.id)
    addToggleButtonListener(li, todo.id)
    todoList.appendChild(li)
  })
}

renderTodos();

todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const text = todoInput.value.trim()

  if (text !== '') {
    todoInput.classList.remove('input-error')
    errorMessage.style.display = 'none'

    let priority: Priority | undefined = undefined
    if (prioritySelect.value !== '') {
      priority = prioritySelect.value as Priority
    }

    addTodo(text, priority)
    todoInput.value = ''
    prioritySelect.value = ''
  } else {
    todoInput.classList.add('input-error')
    errorMessage.style.display = 'block'
  }
})

const addRemoveButtonListener = (li: HTMLLIElement, id:number):void => {
 const  removeButton = li.querySelector('button');
 removeButton?.addEventListener('click', () => removeTodo(id))
}

const addToggleButtonListener = (li: HTMLLIElement, id: number): void => {
  const toggleButton = li.querySelector('.toggleBtn')
  toggleButton?.addEventListener('click', () => toggleTodo(id))
}

const removeTodo= (id:number):void => {
   todos = todos.filter(todo => todo.id !== id)
   renderTodos()
}

const toggleTodo = (id: number): void => {
  const todo = todos.find(todo => todo.id === id)
  if (todo) {
    todo.completed = !todo.completed
    renderTodos()
  }
}

clearButton.addEventListener('click', () => {
  todos = clearCompleted(todos)
  renderTodos()
})