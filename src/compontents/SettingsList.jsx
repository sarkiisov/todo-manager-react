import styled from 'styled-components';
import { contentBlockStyle } from '../css/contentBlockStyles';

import DropdownMenu from './DropdownMenu';


const Wrapper = styled.div`
    ${contentBlockStyle}
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    width: auto;
    height: 50px;
    font-size: 14px;
    font-weight: 500;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: auto;
    height: 50px;
    font-size: 16px;
`;

const SettingsList = () => {
    return(
        <Wrapper>
            <Header>
                <p>Appearance</p>
            </Header>
            <Item>
                <p>Application theme</p>
                <DropdownMenu />
            </Item>
        </Wrapper>
    );
};

export default SettingsList;