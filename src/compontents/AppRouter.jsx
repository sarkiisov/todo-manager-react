import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RouterContext } from '../context/RouterContext';


const AppRouter = () => {
    const { routes } = useContext(RouterContext);

    return (
        <Routes>
            {routes.map(({ to, component }, index) =>
                <Route path={to} element={component} key={index} />
            )}
        </Routes>
    );
};

export default AppRouter;