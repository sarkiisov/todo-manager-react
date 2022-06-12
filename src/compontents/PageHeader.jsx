import React, { useContext, useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
import { transitionClassesStyle } from '../css/transitionClassesStyles';

import { RouterContext } from '../context/RouterContext';
import { CollectionsContext } from '../context/CollectionsContext';
import { ThemeContext } from '../context/ThemeContext';
import { IconContext } from 'react-icons';

import * as FiIcons from 'react-icons/fi';
import { CSSTransition } from 'react-transition-group';
import useOutsideClick from '../hooks/useOutsideClick';


const Header = styled.div`
    display: flex;
    align-items: center;
    max-width: 100%;
    height: 100px;
    padding: 50px;
`;

const Title = styled.h2`
    flex: 1;
    width: 100px;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
    padding: 10px 10px 10px 0px;
    transition: ${(props) => props.theme.transitionTime}ms;

    &:hover {
        background-color: ${(props) => props.isEditable ? props.theme.buttonSelectedColor : 'none'};
        cursor: ${(props) => props.isEditable ? 'pointer' : 'auto'};
    }
`;

const Input = styled.input`
    flex: 1;
    padding-top: 2px;
    font-size: 24px;
    font-weight: 500;
    border: none;
    outline: none;
    height: 50px;
    text-indent: 10px;
    background-color: ${(props) => props.theme.buttonSelectedColor};
    color: ${(props) => props.theme.textColor};
    text-decoration: ${(props) => props.isCollectionFree ? 'none' : 'line-through'}
`;

const IconEditorButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    font-size: 24px;
    background-color: ${(props) => props.theme.buttonSelectedColor};
    
    &:hover {
        cursor: pointer;
    }
`;

const DropdownOptions = styled.div`
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    top: 75px;
    width: 250px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.backgroundColor};
    box-shadow: 0px 2px 5px ${(props) => props.theme.boxShadowColor};

    ${transitionClassesStyle('dropdown-options')}
`;

const DropdownOption = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    color: ${(props) => props.theme.borderColor};
    transition: ${(props) => props.theme.transitionTime}ms;

    &:hover {
        cursor: pointer;
        background-color: ${(props) => props.theme.buttonSelectedColor}
    }
`;

const PageHeader = () => {
    const { theme } = useContext(ThemeContext);
    const { routes, activeRouteIndex } = useContext(RouterContext);
    const { collections, updateCollection, collectionEmojiArr } = useContext(CollectionsContext);

    const [inputValue, setInputValue] = useState('');
    const [editorOpened, setEditorOpened] = useState(false);
    const [collectionFree, setCollectionFree] = useState(true);
    const [iconEditorOpened, setIconEditorOpened] = useState(false);

    const isEditable = routes[activeRouteIndex].collectionId ? true : false;

    useEffect(() => {
        for (const collection of collections) {
            if (collection.title == inputValue && routes[activeRouteIndex].title != inputValue) {
                setCollectionFree(false);
                break;
            } else {
                setCollectionFree(true);
            }
        }
    }, [inputValue]);

    useEffect(() => {
        if (collectionFree && inputValue && inputValue != routes[activeRouteIndex].title) {
            updateCollection(routes[activeRouteIndex].collectionId, inputValue);
        }
    }, [editorOpened]);

    useEffect(() => {
        setInputValue(routes[activeRouteIndex].title);
    }, [routes[activeRouteIndex].title, editorOpened]);

    const inputRef = useRef(null);
    const iconEditorRef = useRef(null);
    const iconOptionsRef = useRef(null);

    useOutsideClick(inputRef, () => {
        setIconEditorOpened(false);
        setEditorOpened(false);
    }, [iconEditorRef, iconOptionsRef]);

    const handleClick = (icon, index) => {
        updateCollection(routes[activeRouteIndex].collectionId, routes[activeRouteIndex].title, index == 0 ? null : icon);
        setIconEditorOpened(false);
    };

    return (
        <Header>
            {editorOpened
                ?
                <>
                    <IconEditorButton ref={iconEditorRef} onClick={() => setIconEditorOpened(!iconEditorOpened)}>
                        {routes[activeRouteIndex].buttonEmojiIcon
                            ?
                            routes[activeRouteIndex].buttonEmojiIcon
                            :
                            <IconContext.Provider value={{ color: theme.borderColor, size: '28px', style: { transition: `color ${theme.transitionTime}ms`, pointerEvents: 'none' } }}>
                                <FiIcons.FiSmile />
                            </IconContext.Provider>}
                    </IconEditorButton>
                    <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} ref={inputRef} isCollectionFree={collectionFree} autoFocus />
                    <CSSTransition in={iconEditorOpened} timeout={theme.componentTransitionTime} classNames="dropdown-options" unmountOnExit>
                        <DropdownOptions ref={iconOptionsRef}>
                            {collectionEmojiArr.map((item, index) =>
                                <DropdownOption onClick={() => handleClick(item, index)} key={index}>
                                    {item}
                                </DropdownOption>
                            )}
                        </DropdownOptions>
                    </CSSTransition>
                </>
                :
                <Title isEditable={isEditable} onClick={() => isEditable && setEditorOpened(true)}>
                    {routes[activeRouteIndex].type == 'custom-collection' && routes[activeRouteIndex].buttonEmojiIcon != null
                        ? routes[activeRouteIndex].buttonEmojiIcon + ' ' + routes[activeRouteIndex].title
                        : routes[activeRouteIndex].title
                    }
                </Title>
            }
        </Header>
    );
};

export default PageHeader;