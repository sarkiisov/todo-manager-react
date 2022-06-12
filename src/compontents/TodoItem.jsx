import React, { useContext, useRef, useState } from 'react';

import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';
import { IconContext } from 'react-icons';
import { transitionClassesStyle } from '../css/transitionClassesStyles';

import { ThemeContext } from '../context/ThemeContext';
import { TodosContext } from '../context/TodosContext';


const Item = styled.div`
    position: relative;
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
    z-index: 1;
    background-color: ${(props) => props.isCompleted ? props.theme.todoChekcedBackgroundColor : 'none'};
    border: 1px solid ${(props) => props.isCompleted ? props.theme.todoCompletedBorderColor : props.theme.borderColor};
    transition: border ${(props) => props.theme.transitionTime}ms;
`;

const Title = styled.p`
    flex: 1;
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    margin-left: 25px;
    z-index: 1;
    text-decoration: ${(props) => props.isCompleted ? 'line-through' : 'none'};
    text-decoration-color: ${(props) => props.theme.textColor};
`;

const RemovingProgressBlock = styled.div`
    position: absolute;
    height: 100%;
    opacity: 0.3;
    width: ${(props) => props.progress}%;
    background-color: ${(props) => props.theme.borderColor};
    transition: width ${(props) => props.duration}ms linear;
`;


const TodoItem = ({ todo }) => {
    const { toggleCompleteTodo, toggleImportantTodo, removeTodo } = useContext(TodosContext);
    const { theme } = useContext(ThemeContext);
    const duration = 1500;
    const [progress, setProgress] = useState(0);
    const [transitionTime, setTransitionTime] = useState(duration);
    const timeoutRef = useRef(null);

    const startCounter = (e) => {
        if (e.button == 2) {
            if (timeoutRef.current) {
                return;
            }
            setTransitionTime(duration);
            setProgress(100);
            timeoutRef.current = setTimeout(() => {
                removeTodo(todo.id);
            }, duration);
        }
    };

    const stopCounter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
            setTransitionTime(0);
            setProgress(0);
        }
    };

    const toggleTodoCheckbox = () => {
        toggleCompleteTodo(todo.id);
    };

    return (
        <Item
            onMouseDown={startCounter}
            onMouseUp={stopCounter}
            onMouseLeave={stopCounter}
        >
            <RemovingProgressBlock progress={progress} duration={transitionTime}/>
            <TodoCheckbox isCompleted={todo.isCompleted} onClick={toggleTodoCheckbox}>
                <IconContext.Provider value={{ color: 'white', size: '16px', style: { strokeWidth: '3' } }}>
                    {todo.isCompleted ? <FiIcons.FiCheck /> : null}
                </IconContext.Provider>
            </TodoCheckbox>
            <Title isCompleted={todo.isCompleted}>
                {todo.title}
            </Title>
            <IconContext.Provider value={{
                color: todo.isImportant ? theme.importantSelectedColor : theme.borderColor, size: '18px',
                style: { transition: `color ${theme.transitionTime}ms`, marginLeft: '10px' }
            }}>
                <FiIcons.FiStar onClick={() => toggleImportantTodo(todo.id)}/>
            </IconContext.Provider>
        </Item>
    );
};

export default TodoItem;