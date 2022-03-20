import { useContext } from 'react';

import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';
import { IconContext } from 'react-icons';

import { ThemeContext } from '../context/ThemeContext';

const BarWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 800px;
    height: 30px;
    background-color: ${(props) => props.theme.titleBarBackgroundColor};
    transition: ${(props) => props.theme.transitionTime}ms;

    -webkit-user-select: none;
    -webkit-app-region: drag;
`;

const ControlButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    transition: ${(props) => props.theme.transitionTime}ms;

    -webkit-app-region: no-drag;

    &:hover {
        cursor: pointer;
        background-color: ${(props) => props.theme.buttonSelectedColor}
    }
`;

const TitleBar = () => {
    const {theme} = useContext(ThemeContext);

    return(
        <BarWrapper>
            <IconContext.Provider value={{ color: theme.textColor, size: '16px'}}>
                <ControlButton className="minimize-window-button">
                    <FiIcons.FiMinus />
                </ControlButton>
                <ControlButton className="close-window-button">
                    <FiIcons.FiX />
                </ControlButton>
            </IconContext.Provider>
        </BarWrapper>
    );
};

export default TitleBar;