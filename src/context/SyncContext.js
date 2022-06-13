import React, { createContext } from 'react';

const SyncData = {
    mode: null,
    peer: null,
    connection: null
};

const SyncContext = createContext(null);

const SyncProvider = ({ children }) => {
    return (
        <SyncContext.Provider value={{ SyncData }}>
            {children}
        </SyncContext.Provider>
    );
};

export { SyncContext, SyncProvider };
