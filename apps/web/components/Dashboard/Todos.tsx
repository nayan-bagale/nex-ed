'use client'

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Todo {
    id: number;
    task: string;
}

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [task, setTask] = useState<string>('');

    const addTodo = () => {
        const newTodo: Todo = {
            id: todos.length + 1,
            task: task
        };
        setTodos([...todos, newTodo]);
        setTask('');
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Todo App</h1>
            <div className=' flex gap-4 '>

            <Input
            className=' w-72'
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <Button
                onClick={addTodo}
            >
                Add
            </Button>
            </div>

            <ul className="mt-4">
                {todos.map((todo: Todo) => (
                    <li key={todo.id} className="border p-2 rounded my-2">
                        {todo.task}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
