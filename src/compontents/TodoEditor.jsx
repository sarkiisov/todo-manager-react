import { useContext, useRef } from 'react';

import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';
import { IconContext } from 'react-icons';

import { ThemeContext } from '../context/ThemeContext';
import { TodosContext } from '../context/TodosContext';
import { RouterContext } from '../context/RouterContext';
import Todo from '../models/Todo';


const Editor = styled.div`
    display: flex;
    align-items: center;
    width: auto;
    height: 50px;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    transition: ${(props) => props.theme.transitionTime}ms;
`;

const Input = styled.input`
    flex: 1;
    height: 40px;
    margin-left: 29px;
    font-size: 16px;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.backgroundColor};
    transition: ${(props) => props.theme.transitionTime}ms;
    outline: none;
    border: none;
    ::placeholder {
        color: ${(props) => props.theme.textColor};
    }
`;

const TodoEditor = () => {
    const {theme} = useContext(ThemeContext);
    const {addTodo} = useContext(TodosContext);
    const { routes, activeRouteIndex } = useContext(RouterContext);

    const handleKeyDown = (e) => {
        if(e.key == 'Enter') {
            addTodo(new Todo(
                inputRef.current.value,
                routes[activeRouteIndex].type == 'important-collection' ? true : false,
                routes[activeRouteIndex].collectionId
            ));
            inputRef.current.value = '';
        }
    };

    const inputRef = useRef(null);

    return(
        <Editor>
            <IconContext.Provider value={{ color: theme.borderColor, size: '24px', style: { transition: `color ${theme.transitionTime}ms` } }}>
                <FiIcons.FiPlus />
            </IconContext.Provider>
            <Input placeholder="Add new task" onKeyDown={handleKeyDown} ref={inputRef}></Input>
        </Editor>
    );
};

export default TodoEditor;