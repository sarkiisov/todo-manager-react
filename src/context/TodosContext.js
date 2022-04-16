import { useState, createContext, useEffect } from 'react';

const TodosContext = createContext();

const TodosProvider = ({children}) => {
    const initialTodos = localStorage.getItem('todos');
    const [todos, setTodos] = useState(initialTodos == null ? [] : JSON.parse(initialTodos));

    const addTodo = (todo) => {
        setTodos([todo, ...todos]);
    };

    const toggleCompleteTodo = (id) => {
        setTodos(todos.map((todo) => todo.id == id ? {...todo, isCompleted: !todo.isCompleted} : todo));
    };

    const toggleImportantTodo = (id) => {
        setTodos(todos.map((todo) => todo.id == id ? {...todo, isImportant: !todo.isImportant} : todo));
    };

    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id != id));
    };

    const removeTodos = (collectionId) => {
        setTodos(todos.filter((todo) => todo.collectionId != collectionId));
    };

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return(
        <TodosContext.Provider value={{ todos, addTodo, toggleCompleteTodo, toggleImportantTodo, removeTodo, removeTodos }}>
            {children}
        </TodosContext.Provider>
    );
};

export { TodosContext, TodosProvider };