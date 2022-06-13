import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../context/ThemeContext';
import { contentBlockStyle } from '../css/contentBlockStyles';
import { headerBlockStyles } from '../css/headerBlockStyles';

import DropdownMenu from './DropdownMenu';
import SettingsItem from './SettingsItem';


const Wrapper = styled.div`
    ${contentBlockStyle}
`;

const Header = styled.div`
    ${headerBlockStyles}
`;

const SettingsList = () => {
    const { theme, themeKey, themesKeys, setThemeByKey } = useContext(ThemeContext);

    return (
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