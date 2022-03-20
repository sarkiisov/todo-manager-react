import { createContext, useContext, useEffect, useState } from 'react';

import * as FiIcons from 'react-icons/fi';

import TodoList from '../compontents/TodoList';
import { AppRoute } from '../models/AppRoute';
import { RouterContext } from './RouterContext';
import { TodosContext } from './TodosContext';

const CollectionsContext = createContext();

const CollectionsProvider = ({children}) => {
    const { removeTodos } = useContext(TodosContext);
    const { addRoutes, addRoute, updateRoute, removeRoute } = useContext(RouterContext);
    const initialCollections = localStorage.getItem('collections');
    const [collections, setCollections] = useState(initialCollections == null ? [] : JSON.parse(initialCollections));

    const addCollection = (collection) => {
        setCollections([...collections, collection]);
        addRoute(new AppRoute(
            'custom-collection',
            collection.id,
            `/collection/${collection.id}`,
            collection.title,
            <FiIcons.FiList />,
            <TodoList filter={(todo) => todo.collectionId == collection.id}/>
        ));
    };

    const updateCollection = (id, title) => {
        setCollections(collections.map((collection) => collection.id == id ? {...collection, title} : collection));
        updateRoute(id, title);
    };

    const removeCollection = (id) => {
        setCollections(collections.filter((collection) => collection.id != id));
        removeTodos(id);
        removeRoute(id);
    };

    useEffect(() => {
        addRoutes(collections.map(
            (collection) => (new AppRoute(
                'custom-collection',
                collection.id,
                `/collection/${collection.id}`,
                collection.title,
                <FiIcons.FiList />,
                <TodoList filter={(todo) => todo.collectionId == collection.id}/>
            ))
        ));
    }, []);

    useEffect(() => {
        localStorage.setItem('collections', JSON.stringify(collections));
    }, [collections]);


    return(
        <CollectionsContext.Provider value={{ collections, addCollection, updateCollection, removeCollection}}>
            {children}
        </CollectionsContext.Provider>
    );
};

export { CollectionsContext, CollectionsProvider };