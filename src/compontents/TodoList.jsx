import { useContext } from 'react';
import styled from 'styled-components';
import TodoEditor from './TodoEditor';
import TodoItem from './TodoItem';
import { CSSTransition } from 'react-transition-group';

import { TodosContext } from '../context/TodosContext';
import { ThemeContext } from '../context/ThemeContext';
import { TransitionGroup } from 'react-transition-group';
import { contentBlockStyle } from '../css/contentBlockStyles';


const ListWrapper = styled.div`
    ${contentBlockStyle}
`;

const TodoList = ({filter}) => {
    const {theme} = useContext(ThemeContext);
    const {todos} = useContext(TodosContext);

    return(
        <ListWrapper>
            <TodoEditor/>
            <TransitionGroup>
                {todos.filter(filter).map((todo, index) => (
                    <CSSTransition key={index} classNames="tr-todo" timeout={theme.componentTransitionTime}>
                        <TodoItem todo={todo} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ListWrapper>
    );
};

export default TodoList;