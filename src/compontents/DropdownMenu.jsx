import React, { useState, useContext, useRef } from 'react';

import styled from 'styled-components';
import { transitionClassesStyle } from '../css/transitionClassesStyles';
import { CSSTransition } from 'react-transition-group';

import useOutsideClick from '../hooks/useOutsideClick';
import { ThemeContext } from '../context/ThemeContext';


const Wrapper = styled.div`
    position: relative;
`;

const DropdownBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 150px;
    min-height: 20px;
    padding: 10px 15px;
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 5px;
    font-size: 14px;
    user-select: none;
    background-color: ${(props) => props.isOpened ? props.theme.buttonSelectedColor : props.theme.backgroundColor};
    transition: ${(props) => props.theme.transitionTime}ms;

    p::first-letter {
        text-transform: uppercase;
    }

    &:hover {
        cursor: pointer;
    }
`;

const DropdownStatusIcon = styled.span`
    font-size: 9px;
    margin-left: 5px;
`;

const DropdownOptions = styled.div`
    position: absolute;
    z-index: 2;
    width: 100%;
    border-radius: 5px;
    box-shadow: 0px 2px 5px ${(props) => props.theme.boxShadowColor};

    ${transitionClassesStyle('dropdown-options')}
`;

const DropdownOption = styled.div`
    display: flex;
    align-items: center;
    padding-left: 16px;
    top: 40px;
    width: 100%;
    height: 40px;
    font-size: 14px;
    background-color: ${(props) => props.theme.backgroundColor};
    transition: ${(props) => props.theme.transitionTime}ms;
    user-select: none;

    &:last-child {
        border-radius: 0px 0px 5px 5px;
    }

    p::first-letter {
        text-transform: uppercase;
    }

    &:hover {
        cursor: pointer;
        background-color: ${(props) => props.theme.buttonSelectedColor}
    }
`;

const DropdownMenu = ({ options, selectedOption, onChange }) => {
    const { theme } = useContext(ThemeContext);
    const [optionsOpened, setOptionsOpened] = useState(false);
    const [option, setOption] = useState(selectedOption);

    const toggleOptionMenu = () => {
        setOptionsOpened(!optionsOpened);
    };

    const handleClick = (value) => {
        setOption(value);
        onChange(value);
    };

    const dropdownRef = useRef(null);

    useOutsideClick(dropdownRef, () => {
        setOptionsOpened(false);
    });

    return (
        <Wrapper>
            <DropdownBlock onClick={toggleOptionMenu} isOpened={optionsOpened} ref={dropdownRef}>
                <p>{option}</p>
                <DropdownStatusIcon>{optionsOpened ? '▲' : '▼'} </DropdownStatusIcon>
            </DropdownBlock>
            <CSSTransition in={optionsOpened} timeout={theme.componentTransitionTime} classNames="dropdown-options" unmountOnExit>
                <DropdownOptions>
                    {options.map((key, index) =>
                        <DropdownOption onClick={() => handleClick(key)} key={index}>
                            <p>{key}</p>
                        </DropdownOption>
                    )}
                </DropdownOptions>
            </CSSTransition>

        </Wrapper>
    );
};

export default DropdownMenu;