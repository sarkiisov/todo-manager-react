import React, { useContext, useState, useRef, useEffect } from 'react';

import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';
import { IconContext } from 'react-icons';
import { buttonStyle, titleStyle } from '../css/sidebarButtonStyles';


import { ThemeContext } from '../context/ThemeContext';
import { CollectionsContext } from '../context/CollectionsContext';
import useOutsideClick from '../hooks/useOutsideClick';


const Button = styled.div`
    ${buttonStyle} 
`;

const Title = styled.p`
    ${titleStyle}
`;

const Input = styled.input`
    width: auto;
    height: 40px;
    font-size: 16px;
    margin-left: 15px;
    border: none;
    outline: none;
    background-color: ${(props) => props.isButtonHovered ? props.theme.backgroundColor : props.theme.buttonSelectedColor};
    color: ${(props) => props.theme.textColor};
    transition: ${(props) => props.theme.transitionTime}ms;
    text-decoration: ${(props) => props.isCollectionFree ? 'none' : 'line-through'}
`;

const SidebarEditor = () => {
    const { theme } = useContext(ThemeContext);
    const { collections, addCollection } = useContext(CollectionsContext);
    const [editorOpened, setEditorOpened] = useState(false);
    const [buttonHovered, setButtonHovered] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [collectionFree, setCollectionFree] = useState(true);

    const handleKeyDown = (e) => {
        if (e.key == 'Enter') {
            if (collectionFree && inputValue) {
                addCollection(inputValue);
            }
            setEditorOpened(false);
        }
    };

    useEffect(() => {
        for (const collection of collections) {
            if (collection.title == inputValue) {
                setCollectionFree(false);
                break;
            } else {
                setCollectionFree(true);
            }
        }
    }, [inputValue]);

    const inputRef = useRef(null);
    useOutsideClick(inputRef, () => setEditorOpened(false));

    return (
        <Button onClick={() => setEditorOpened(true)} ref={inputRef} onMouseEnter={() => setButtonHovered(true)} onMouseLeave={() => setButtonHovered(false)}>
            <IconContext.Provider value={{ color: theme.textColor, size: '18px', style: { transition: `color ${theme.transitionTime}ms` } }}>
                {editorOpened ? <FiIcons.FiList/> : <FiIcons.FiPlus/>}
            </IconContext.Provider>
            {editorOpened
                ? <Input autoFocus={true} onKeyDown={handleKeyDown} isButtonHovered={buttonHovered} onChange={(e) => setInputValue(e.target.value)} isCollectionFree={collectionFree}/>
                : <Title>New collection</Title>}
        </Button>
    );
};

export default SidebarEditor;