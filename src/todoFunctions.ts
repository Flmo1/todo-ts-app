export type Priority = 'low' | 'medium' | 'high'

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority?: Priority;
}

export const clearCompleted = (todos: Todo[]): Todo[] => {
  return todos.filter(todo => todo.completed === false)
}

export const getProgress = (todos: Todo[]): number => {
  if (todos.length === 0) {
    return 0
  }

  let doneCount = 0
  todos.forEach(todo => {
    if (todo.completed) {
      doneCount++
    }
  })

  return Math.round((doneCount / todos.length) * 100)
}

export const parseTodos = (text: string): Todo[] | null => {
  try {
    const data = JSON.parse(text)
    if (Array.isArray(data)) {
      return data as Todo[]
    }
    return null
  } catch {
    return null
  }
}