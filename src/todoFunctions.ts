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