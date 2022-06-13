import React, { createContext, useState } from 'react';

import * as FiIcons from 'react-icons/fi';

import SettingsList from '../compontents/SettingsList';
import TodoList from '../compontents/TodoList';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../models/AppRoute';
import SyncProcess from '../compontents/SyncProcess';

const RouterContext = createContext();

const GlobalRoutes = [
    new AppRoute('defined-collection', null, '/', 'Overview', <FiIcons.FiHome />, null, <TodoList filter={(todo) => todo}/>),
    new AppRoute('important-collection', null, '/important', 'Important', <FiIcons.FiStar />, null, <TodoList filter={(todo) => todo.isImportant} />),
    new AppRoute('service', null, '/settings', 'Settings', <FiIcons.FiSettings />, null, <SettingsList />),
    new AppRoute('service', null, '/sync', 'Sync', <FiIcons.FiShare2 />, null, <SyncProcess />)
];

const RouterProvider = ({ children }) => {
    const navigate = useNavigate();
    const [activeRouteIndex, setActiveRouteIndex] = useState(0);
    const [routes, setRoutes] = useState(GlobalRoutes);

    const addRoutes = (collectionRoutesArr) => {
        setRoutes([...routes, ...collectionRoutesArr]);
    };

    const addRoute = (appRoute) => {
        setRoutes([...routes, appRoute]);
    };

    const setRoutesArr = (collectionRoutesArr) => {
        setRoutes([...GlobalRoutes, ...collectionRoutesArr]);
    };

    const updateRoute = (collectionId, title, buttonEmojiIcon) => {
        setRoutes(routes.map((route) => route?.collectionId == collectionId ? {
            ...route,
            title,
            buttonEmojiIcon: buttonEmojiIcon === undefined ? route.buttonEmojiIcon : buttonEmojiIcon
        } : route));
    };

    const removeRoute = (collectionId) => {
        const routeIndex = routes.findIndex((route) => route.collectionId == collectionId);
        if (routeIndex == activeRouteIndex) {
            navigateRoute('/');
        }
        setRoutes(routes.filter((route) => route.collectionId != collectionId));
    };

    const removeCustomCollectionRoutes = () => {
        setRoutes(routes.filter((route) => route.type != 'custom-collection'));
    };

    const navigateRoute = (routePath) => {
        const routeIndex = routes.findIndex((route) => route.to == routePath);
        if (routeIndex != -1) {
            setActiveRouteIndex(routeIndex);
            navigate(routePath);
        } else {
            setActiveRouteIndex(0);
            navigate('/');
        }
    };

    return (
        <RouterContext.Provider value={{ routes, activeRouteIndex, addRoutes, addRoute, setRoutesArr, updateRoute, removeRoute, removeCustomCollectionRoutes, navigateRoute }}>
            {children}
        </RouterContext.Provider>
    );
};

export { RouterContext, RouterProvider };