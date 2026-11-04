import './style.css'
import { clearCompleted } from './todoFunctions'
import type { Todo } from './todoFunctions'

let todos: Todo[] = [];

const todoInput = document.getElementById('todo-input') as HTMLInputElement
const todoForm = document.querySelector('.todo-form') as HTMLFormElement
const todoList = document.getElementById('todo-list') as HTMLUListElement
const clearButton = document.getElementById('clear-completed') as HTMLButtonElement

const errorMessage = document.getElementById('error-message') as HTMLParagraphElement

const addTodo = (text:string):void => {
 const newTodo: Todo = {
  id: Date.now(), //
  text: text,
  completed: false
 }
 todos.push(newTodo)
 console.log(`Todo added: ${todos}`)

 renderTodos();

}

const renderTodos = ():void => {
  //clears the current list - test later
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li')
    li.className = 'todo-item'

    let buttonText = 'Done'
    if (todo.completed) {
      buttonText = 'Undo'
      li.classList.add('completed')
    }

    li.innerHTML = `
    <span>${todo.text}</span>
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

  if (text !=='') {
      addTodo(text)
      todoInput.value = '' //clears the input field after add:

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