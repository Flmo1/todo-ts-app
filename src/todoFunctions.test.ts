import { describe, it, expect } from 'vitest'
import { clearCompleted } from './todoFunctions'
import type { Todo } from './todoFunctions'

describe('clearCompleted', () => {
  it('removes all completed todos', () => {
    const todos: Todo[] = [
      { id: 1, text: 'Buy milk', completed: true },
      { id: 2, text: 'Do homework', completed: false },
      { id: 3, text: 'Clean room', completed: true }
    ]
    const result = clearCompleted(todos)
    expect(result.length).toBe(1)
    expect(result[0].text).toBe('Do homework')
  })

  it('keeps all todos if none are completed', () => {
    const todos: Todo[] = [
      { id: 1, text: 'Buy milk', completed: false },
      { id: 2, text: 'Do homework', completed: false }
    ]
    const result = clearCompleted(todos)
    expect(result.length).toBe(2)
  })
})