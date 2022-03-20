import { useState, useContext } from 'react';

import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';
import { IconContext } from 'react-icons';
import { transitionClassesStyle } from '../css/transitionClassesStyles';

import { ThemeContext } from '../context/ThemeContext';
import { TodosContext } from '../context/TodosContext';


const Item = styled.div`
    display: flex;
    align-items: center;
    width: auto;
    height: 50px;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    transition: ${(props) => props.theme.transitionTime}ms;

    &:hover {
        cursor: pointer;
        background-color: ${(props) => props.theme.buttonSelectedColor}
    }

    ${transitionClassesStyle('tr-todo')}
`;

const TodoCheckbox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: ${(props) => props.isCompleted ? props.theme.todoChekcedBackgroundColor : 'none'};
    border: 1px solid ${(props) => props.isCompleted ? props.theme.todoCompletedBorderColor : props.theme.borderColor};
    transition: border ${(props) => props.theme.transitionTime}ms;
`;

const Title = styled.p`
    flex: 1;
    font-size: 16px;
    margin-left: 25px;
    text-decoration: ${(props) => props.isCompleted ? 'line-through' : 'none'};
    text-decoration-color: ${(props) => props.theme.textColor};
`;


const TodoItem = ({todo}) => {
    const {toggleCompleteTodo, toggleImportantTodo, removeTodo} = useContext(TodosContext);
    const {theme} = useContext(ThemeContext);

    const toggleTodoCheckbox = () => {
        toggleCompleteTodo(todo.id);
    };

    const handleMouseDown = (e) => {
        if(e.button == 1) {
            removeTodo(todo.id);
        }
    };

    return(
        <Item onMouseDown={handleMouseDown}>
            <TodoCheckbox isCompleted={todo.isCompleted} onClick={toggleTodoCheckbox}>
                <IconContext.Provider value={{ color: 'white', size: '16px', style: { strokeWidth: '3' }} }>
                    {todo.isCompleted ? <FiIcons.FiCheck /> : null}
                </IconContext.Provider>
            </TodoCheckbox>
            <Title isCompleted={todo.isCompleted}>
                {todo.title}
            </Title>
            <IconContext.Provider value={{
                color: todo.isImportant ? theme.importantSelectedColor : theme.borderColor, size: '18px',
                style: { transition: `color ${theme.transitionTime}ms` }
            }}>
                <FiIcons.FiStar onClick={() => toggleImportantTodo(todo.id)}/>
            </IconContext.Provider>
        </Item>
    );
};

export default TodoItem;