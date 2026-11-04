export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const clearCompleted = (todos: Todo[]): Todo[] => {
  return todos.filter(todo => todo.completed === false)
}