import { useContext, useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import { RouterContext } from '../context/RouterContext';
import { CollectionsContext } from '../context/CollectionsContext';
import useOutsideClick from '../hooks/useOutsideClick';


const Header = styled.div`
    display: flex;
    align-items: center;
    width: auto;
    height: 100px;
    padding: 50px;
`;

const FakeDiv = styled.div`
    z-index: 1;
    
    font-size: 24px;
    font-weight: 500;
`;

const Title = styled.h2`
    font-weight: 500;
    padding: 10px 10px 10px 0px;
    transition: ${(props) => props.theme.transitionTime}ms;

    &:hover {
        background-color: ${(props) => props.isEditable ? props.theme.buttonSelectedColor : 'none'};
        cursor: ${(props) => props.isEditable ? 'pointer' : 'auto'};
    }
`;

const Input = styled.input`
    font-size: 24px;
    font-weight: 500;
    border: none;
    outline: none;
    width: 100%;
    padding: 10px 0px;
    width: ${(props) => props.width}px;
    background-color: ${(props) => props.theme.buttonSelectedColor};
    color: ${(props) => props.theme.textColor};
    text-decoration: ${(props) => props.isCollectionFree ? 'none' : 'line-through'}
`;

const PageHeader = () => {
    const { routes, activeRouteIndex } = useContext(RouterContext);
    const { collections, updateCollection } = useContext(CollectionsContext);
    const [inputValue, setInputValue] = useState('');
    const [editorOpened, setEditorOpened] = useState(false);
    const [collectionFree, setCollectionFree] = useState(true);
    const isEditable = routes[activeRouteIndex].collectionId ? true : false;

    useEffect(() => {
        for(let collection of collections) {
            if(collection.title == inputValue && routes[activeRouteIndex].title != inputValue) {
                setCollectionFree(false);
                break;
            } else {
                setCollectionFree(true);
            }
        }
    }, [inputValue]);

    useEffect(() => {
        if(collectionFree && inputValue && inputValue != routes[activeRouteIndex].title) {
            updateCollection(routes[activeRouteIndex].collectionId, inputValue);
        }
    }, [editorOpened]);

    useEffect(() => {
        setInputValue(routes[activeRouteIndex].title);
    }, [routes[activeRouteIndex].title, editorOpened]);

    const inputRef = useRef(null);
    useOutsideClick(inputRef, () => {
        setEditorOpened(false);
    });

    return(
        <Header>
            {editorOpened
                ? <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} ref={inputRef} isCollectionFree={collectionFree} autoFocus />
                : <Title isEditable={isEditable} onClick={() => isEditable && setEditorOpened(true)}>{routes[activeRouteIndex].title}</Title>
            }
        </Header>
    );
};

export default PageHeader;