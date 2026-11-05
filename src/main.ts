import './style.css'
import { clearCompleted, getProgress, parseTodos } from './todoFunctions'
import type { Todo, Priority } from './todoFunctions'

let todos: Todo[] = [];

const todoInput = document.getElementById('todo-input') as HTMLInputElement
const todoForm = document.querySelector('.todo-form') as HTMLFormElement
const todoList = document.getElementById('todo-list') as HTMLUListElement
const clearButton = document.getElementById('clear-completed') as HTMLButtonElement
const prioritySelect = document.getElementById('priority-select') as HTMLSelectElement
const progressBar = document.getElementById('progress-bar') as HTMLProgressElement
const progressText = document.getElementById('progress-text') as HTMLParagraphElement
const exportButton = document.getElementById('export-button') as HTMLButtonElement
const importInput = document.getElementById('import-file') as HTMLInputElement
const pdfButton = document.getElementById('pdf-button') as HTMLButtonElement
const colorPicker = document.getElementById('colorPicker') as HTMLInputElement

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

const updateProgress = (): void => {
  const percent = getProgress(todos)
  progressBar.value = percent
  progressText.textContent = `${percent}% done`
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

  updateProgress()
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

exportButton.addEventListener('click', () => {
  const json = JSON.stringify(todos, null, 2)

  // Make a file in the browser's memory, then click a hidden link to download it
  const file = new Blob([json], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(file)
  link.download = 'todos.json'
  link.click()
})

importInput.addEventListener('change', async () => {
  const files = importInput.files
  if (files && files.length > 0) {
    const text = await files[0].text()
    const importedTodos = parseTodos(text)

    if (importedTodos === null) {
      alert('This file does not contain valid todos')
    } else {
      todos = importedTodos
      renderTodos()
    }

    importInput.value = ''
  }
})

pdfButton.addEventListener('click', () => {
  window.print()
})

colorPicker.addEventListener('input', () => {
  document.body.style.backgroundColor = colorPicker.value
})