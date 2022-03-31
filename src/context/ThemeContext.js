import { createContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';

const ThemeContext = createContext();

const Globals = {
    transitionTime: 200,
    componentTransitionTime: 300,
    todoChekcedBackgroundColor: '#86CF9B',
    todoCheckedBorderColor: '#5E9F71',
    importantSelectedColor: '#DCA844'
};

const Themes = {
    light: {
        ...Globals,
        backgroundColor: '#FFFFFF',
        textColor: '#3D3D3D',
        borderColor: '#DCDCDC',
        boxShadowColor: 'rgba(0, 0, 0, 0.25)',
        buttonSelectedColor: '#F5F5F5',
        titleBarBackgroundColor: '#E4E4E4',
        textSelectedBackgroundColor: '#EDEDED'
    },
    dark: {
        ...Globals,
        backgroundColor: '#212121',
        textColor: '#D0D0D0',
        borderColor: '#393939',
        boxShadowColor: 'rgba(137, 137, 137, 0.25)',
        buttonSelectedColor: '#272727',
        titleBarBackgroundColor: '#1B1B1B',
        textSelectedBackgroundColor: '#3A3A3A'
    }
};

const ThemeProvider = ({children}) => {
    const initialTheme = localStorage.getItem('theme');
    const [theme, setTheme] = useState(initialTheme == null ? Themes.light : Themes[initialTheme]);

    const toggleTheme = () => {
        const newThemeType = (theme == Themes.light) ? 'dark' : 'light';
        setTheme(Themes[newThemeType]);
        localStorage.setItem('theme', newThemeType);
    };

    const setThemeByKey = (key) => {
        setTheme(Themes[key]);
        localStorage.setItem('theme', key);
    };

    return(
        <ThemeContext.Provider value={{ theme, themeKey: Object.entries(Themes).find((pair) => pair[1] == theme)[0], themesKeys: Object.keys(Themes), toggleTheme, setThemeByKey }}>
            <StyledProvider theme={theme}>
                {children}
            </StyledProvider>
        </ThemeContext.Provider>
    );
};

export { ThemeContext,  ThemeProvider };