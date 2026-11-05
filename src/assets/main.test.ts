import {describe, it, expect } from 'vitest'

interface Todo {
    id: number,
    text: string,
    completed: boolean
}

const addTodo = (todos: Todo[], text: string) => {
    const newTodo:Todo = {
        id: 123,
        text,
        completed: false
    }
    return [...todos, newTodo]
}

const removeTodo = (todos: Todo[], id:number): Todo[] => {
   return todos.filter(todo => todo.id !== id);
}

describe('addTodo', () => {
    it('should add a new todo to the lsit', () =>{
        const todos: Todo[] = [];
        const result = addTodo(todos, 'Test todo');
        expect(result.length).toBe(1)
        expect(result[0].text).toBe('Test todo')
        expect(result[0].completed).toBe(false)
    })
})

describe('removeTodo', () => {
    it('should remove the todo with the given id', () => {
        const todos: Todo[] = [
            { id: 1, text: 'Buy milk', completed: false },
            { id: 2, text: 'Do homework', completed: false }
        ]
        const result = removeTodo(todos, 1)
        expect(result.length).toBe(1)
        expect(result[0].text).toBe('Do homework')
    })
})