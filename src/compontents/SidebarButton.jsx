import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { buttonStyle, titleStyle} from '../css/sidebarButtonStyles';
import { IconContext } from 'react-icons';

import { ThemeContext } from '../context/ThemeContext';
import { RouterContext } from '../context/RouterContext';
import { CollectionsContext } from '../context/CollectionsContext';


const Button = styled.div`
    ${buttonStyle}
    background-color: ${(props) => props.isActive ? props.theme.buttonSelectedColor : props.theme.backfeoundColor}
`;

const Title = styled.p`
    ${titleStyle}
`;

const SidebarButton = ({ icon, title, route, id, collectionId }) => {
    const {theme} = useContext(ThemeContext);
    const { activeRouteIndex, navigateRoute } = useContext(RouterContext);
    const { removeCollection } = useContext(CollectionsContext);
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(true);
        navigateRoute(route);
    };

    const handleMouseDown = (e) => {
        if(e.button == 1 && collectionId) {
            removeCollection(collectionId);
        }
    };

    useEffect(() => {
        setIsActive(id == activeRouteIndex ? true : false);
    }, [activeRouteIndex]);

    return(
        <Button onClick={handleClick} onMouseDown={handleMouseDown} isActive={isActive}>
            <IconContext.Provider value={{ color: theme.textColor, size: '18px', style: { transition: `color ${theme.transitionTime}ms`} }}>
                {icon}
            </IconContext.Provider>
            <Title>{title}</Title>
        </Button>
    );
};

export default SidebarButton;