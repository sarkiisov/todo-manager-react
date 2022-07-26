import React, { createContext, useContext, useEffect, useState } from 'react';

import * as FiIcons from 'react-icons/fi';

import TodoList from '../compontents/TodoList';
import { AppRoute } from '../models/AppRoute';
import { RouterContext } from './RouterContext';
import { TodosContext } from './TodosContext';
import CustomCollection from '../models/CustomCollection';

const CollectionsContext = createContext();

const CollectionsProvider = ({ children }) => {
    const { removeTodos } = useContext(TodosContext);
    const { setRoutesArr, updateRoute, removeRoute, removeCustomCollectionRoutes } = useContext(RouterContext);
    const initialCollections = localStorage.getItem('collections');
    const [collections, setCollections] = useState(initialCollections == null ? [] : JSON.parse(initialCollections));

    const collectionEmojiArr = [
        '×', '🔥', '💪', '🙉', '🌊', '🧨', '🎮', '🧭', '⚡', '🍒', '🍑', '🍦', '🏆',
        '🏀', '🎯', '🎧', '🏗️', '🏫', '🏠', '🏭', '🚗', '✈️', '💵', '🗿', '🎉', '📞', '💻', '🔧', '💊', '🛒'
    ];

    const addCollection = (title) => {
        const collection = new CustomCollection(title);
        setCollections([...collections, collection]);
    };

    const setCollectionsArr = (collections) => {
        removeCustomCollectionRoutes();
        setCollections(collections);
    };

    const updateCollection = (id, title, icon) => {
        setCollections(collections.map((collection) => collection.id == id ? {
            ...collection,
            title,
            icon: icon === undefined ? collection.icon : icon
        } : collection));
        updateRoute(id, title, icon);
    };

    const removeCollection = (id) => {
        setCollections(collections.filter((collection) => collection.id != id));
        removeTodos(id);
        removeRoute(id);
    };

    const buildRoute = (collection) => {
        return new AppRoute(
            'custom-collection',
            collection.id,
            `/collection/${collection.id}`,
            collection.title,
            <FiIcons.FiList />,
            collectionEmojiArr[collection.icon],
            <TodoList filter={(todo) => todo.collectionId == collection.id}/>
        );
    };

    useEffect(() => {
        setRoutesArr(collections.map((collection) => buildRoute(collection)));
        localStorage.setItem('collections', JSON.stringify(collections));
    }, [collections]);


    return (
        <CollectionsContext.Provider value={{ collections, addCollection, updateCollection, removeCollection, setCollections: setCollectionsArr, collectionEmojiArr }}>
            {children}
        </CollectionsContext.Provider>
    );
};

export { CollectionsContext, CollectionsProvider };