import { useContext, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../context/ThemeContext';
import { contentBlockStyle } from '../css/contentBlockStyles';

import DropdownMenu from './DropdownMenu';
import SettingsItem from './SettingsItem';


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
    const {theme, themeKey, themesKeys, setThemeByKey} = useContext(ThemeContext);

    return(
        <Wrapper>
            <Header>
                <p>Appearance</p>
            </Header>
            <SettingsItem
                title="Application theme"
                settingsElement={
                    <DropdownMenu
                        options={themesKeys}
                        selectedOption={themeKey}
                        onChange={(value) => {
                            setTimeout(() => {
                                setThemeByKey(value);
                            }, theme.componentTransitionTime);
                        }}
                    />
                }
            />
        </Wrapper>
    );
};

export default SettingsList;