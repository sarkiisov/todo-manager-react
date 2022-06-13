import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createGlobalStyle } from 'styled-components';
import fontFace from './fonts/fontLoader';
import RobotoLight from './fonts/Roboto-Light.ttf';
import RobotoRegular from './fonts/Roboto-Regular.ttf';
import RobotoMedium from './fonts/Roboto-Medium.ttf';

import { ThemeProvider } from './context/ThemeContext';
import { TodosProvider } from './context/TodosContext';

import { HashRouter as Router } from 'react-router-dom';
import { RouterProvider } from './context/RouterContext';
import { CollectionsProvider } from './context/CollectionsContext';
import { SyncProvider } from './context/SyncContext';

const GlobalStyles = createGlobalStyle`
    ${fontFace('Roboto', RobotoLight, 'normal', 300)}
    ${fontFace('Roboto', RobotoRegular, 'normal', 400)}
    ${fontFace('Roboto', RobotoMedium, 'normal', 500)}
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto';
    }    
`;

ReactDOM.render(
    <>
        <GlobalStyles />
        <Router>
            <ThemeProvider>
                <TodosProvider>
                    <RouterProvider>
                        <CollectionsProvider>
                            <SyncProvider>
                                <App />
                            </SyncProvider>
                        </CollectionsProvider>
                    </RouterProvider >
                </TodosProvider>
            </ThemeProvider>
        </Router>
    </>,
    document.getElementById('root')
);