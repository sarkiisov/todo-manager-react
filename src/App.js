import React, { useContext } from 'react';
import styled from 'styled-components';
import PageHeader from './compontents/PageHeader';
import SidebarButton from './compontents/SidebarButton';
import SidebarEditor from './compontents/SidebarEditor';

import AppRouter from './compontents/AppRouter';
import { RouterContext } from './context/RouterContext';
import TitleBar from './compontents/TitleBar';


const AppWrapper = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    width: 800px;
    height: 550px;
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
    transition: background-color ${(props) => props.theme.transitionTime}ms;

    * {
        &::selection {
            background: ${(props) => props.theme.textSelectedBackgroundColor};
        }
    }
`;

const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    width: 270px;
    height: 100%;
    padding-top: 100px;
    border-right: 1px solid ${(props) => props.theme.borderColor};
    transition: border-right ${(props) => props.theme.transitionTime}ms;
`;

const MainSidebarGroup = styled.div`
    flex: 1;
    overflow-y: scroll;
    margin-bottom: auto;

    ::-webkit-scrollbar {
        display: none;
    }
`;

const SidebarDivider = styled.div`
    width: 250px;
    height: 1px;
    margin: 0 auto;
    background-color: ${(props) => props.theme.borderColor};
    transition: ${(props) => props.theme.transitionTime}ms;
`;

const AddSidebarGroup = styled.div`
    height: auto;
`;

const ContentPage = styled.div`
    display: flex;
    flex-direction: column;
    flex: auto;
    height: 100%;
`;

const App = () => {
    const { routes } = useContext(RouterContext);

    return (
        <>
            <TitleBar />
            <AppWrapper>
                <Sidebar>
                    <MainSidebarGroup>
                        {routes.map((route, index) => {
                            return (route.type.includes('collection'))
                                ? <SidebarButton
                                    icon={route.type == 'custom-collection' && route.buttonEmojiIcon ? route.buttonEmojiIcon : route.buttonIcon}
                                    title={route.title}
                                    id={index}
                                    route={route.to}
                                    key={index}
                                    collectionId={route.collectionId} />
                                : null;
                        })}
                        <SidebarEditor/>
                    </MainSidebarGroup>
                    <SidebarDivider />
                    <AddSidebarGroup>
                        {routes.map((route, index) => {
                            return (route.type == 'service')
                                ? <SidebarButton
                                    icon={route.buttonIcon}
                                    title={route.title}
                                    route={route.to}
                                    id={index}
                                    key={index} />
                                : null;
                        })}
                    </AddSidebarGroup>
                </Sidebar>
                <ContentPage>
                    <PageHeader />
                    <AppRouter/>
                </ContentPage>
            </AppWrapper>
        </>
    );
};

export default App;