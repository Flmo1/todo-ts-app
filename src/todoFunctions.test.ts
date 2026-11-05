import { describe, it, expect } from 'vitest'
import { clearCompleted, getProgress } from './todoFunctions'
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

describe('getProgress', () => {
  it('returns 0 when there are no todos', () => {
    expect(getProgress([])).toBe(0)
  })

  it('returns 25 when 1 of 4 todos is done', () => {
    const todos: Todo[] = [
      { id: 1, text: 'A', completed: true },
      { id: 2, text: 'B', completed: false },
      { id: 3, text: 'C', completed: false },
      { id: 4, text: 'D', completed: false, priority: 'high' }
    ]
    expect(getProgress(todos)).toBe(25)
  })

  it('returns 100 when all todos are done', () => {
    const todos: Todo[] = [
      { id: 1, text: 'A', completed: true },
      { id: 2, text: 'B', completed: true }
    ]
    expect(getProgress(todos)).toBe(100)
  })
})