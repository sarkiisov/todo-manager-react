import React, { useState, useContext, useEffect, useRef } from 'react';

import { Peer } from 'peerjs';
import styled from 'styled-components';
import StepBar from './StepBar';

import { contentBlockStyle } from '../css/contentBlockStyles';
import { headerBlockStyles } from '../css/headerBlockStyles';
import { BasicButtonStyles } from '../css/BasicbuttonStyles';

import * as FiIcons from 'react-icons/fi';
import { IconContext } from 'react-icons';

import { ThemeContext } from '../context/ThemeContext';
import { SyncContext } from '../context/SyncContext';
import { TodosContext } from '../context/TodosContext';
import { CollectionsContext } from '../context/CollectionsContext';


const Wrapper = styled.div`
    ${contentBlockStyle}
`;

const Header = styled.div`
    ${headerBlockStyles}
`;

const Button = styled.button`
    ${BasicButtonStyles};
    
    & + & {
        margin-left: 20px;
    }
`;

const Input = styled.input`
    width: 100%;
    height: 40px;
    font-size: 16px;
    outline: none;
    border: none;
    margin-bottom: 20px;
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const TextLineBlock = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
`;

const ConnectionButtonsBlock = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

const SyncProcess = () => {
    const { theme } = useContext(ThemeContext);
    const { SyncData } = useContext(SyncContext);
    const { collections, setCollections } = useContext(CollectionsContext);
    const { todos, setTodos } = useContext(TodosContext);

    const [peerId, setPeerId] = useState(null);
    const [peerIdFetched, setPeerIdFetched] = useState(false);

    const [connected, setConnected] = useState(false);
    const [syncConfirmed, setSyncConfirmed] = useState(false);
    const [todosSynced, setTodosSynced] = useState(false);

    const stepsArr = [
        {
            status: connected,
            label: 'Connection established'
        },
        {
            status: syncConfirmed,
            label: 'Sync process confirmed'
        },
        {
            status: todosSynced,
            label: 'Todos were synchronized'
        }
    ];

    useEffect(() => {
        SyncData.peer = new Peer();
        SyncData.peer.on('open', (id) => {
            setPeerIdFetched(true);
            setPeerId(id);
        });
        SyncData.peer.on('connection', (connection) => {
            SyncData.connection = connection;
            connection.on('open', () => {
                SyncData.mode = 'recieve';
                setConnected(true);
            });
            connection.on('data', (data) => {
                if (data.header == 'confirm') {
                    setSyncConfirmed(true);
                    connection.send({ header: 'data', payload: { collections, todos } });
                } else if (data.header == 'synced') {
                    setTodosSynced(true);
                }
            });
            connection.on('close', () => {
                resetSyncState();
            });
        });

        return function() {
            SyncData.peer.destroy();
            SyncData.peer = null;
            SyncData.connection = null;
            SyncData.mode = null;
        };
    }, []);

    const connectPeer = () => {
        SyncData.connection = SyncData.peer.connect(inputRef.current.value);
        SyncData.connection.on('open', () => {
            SyncData.mode = 'call';
            setConnected(true);
        });
        SyncData.connection.on('data', (data) => {
            if (data.header == 'data') {
                setCollections(data.payload.collections);
                setTodos(data.payload.todos);
                setTodosSynced(true);
                SyncData.connection.send({ header: 'synced', payload: null });
            }
        });
        SyncData.connection.on('close', () => {
            resetSyncState();
        });
    };

    const confirmSync = () => {
        setSyncConfirmed(true);
        SyncData.connection.send({ header: 'confirm', payload: null });
    };

    const closeConnection = () => {
        if (SyncData.connection) {
            SyncData.connection.close();
        }
        resetSyncState();
    };

    const resetSyncState = () => {
        setSyncConfirmed(false);
        setConnected(false);
        setTodosSynced(false);
    };

    const inputRef = useRef(null);

    return (
        <Wrapper>
            <Header>
                <p>App sync code</p>
            </Header>
            <TextLineBlock>
                {peerIdFetched &&
                    <>
                        <p className="peer-id">{peerId}</p>
                        <IconContext.Provider value={{
                            color: theme.textColor, size: '16px',
                            style: {
                                transition: `color ${theme.transitionTime}ms`,
                                marginLeft: '10px',
                                cursor: 'pointer'
                            }
                        }}>
                        </IconContext.Provider>
                    </>
                }
            </TextLineBlock>
            <Header>
                <p>Connection setup</p>
            </Header>
            {!connected &&
                <Input placeholder="Peer sync code" ref={inputRef}/>
            }
            <ConnectionButtonsBlock>
                {(connected && SyncData.mode == 'call' && !todosSynced) &&
                    <Button onClick={confirmSync}>Confirm sync</Button>
                }
                {connected
                    ? <Button onClick={closeConnection}>Close connection</Button>
                    : <Button onClick={connectPeer}>Connect</Button>
                }
            </ConnectionButtonsBlock>
            <Header>
                <p>Sync status</p>
            </Header>
            <StepBar stepsArr={stepsArr}/>
        </Wrapper>
    );
};

export default SyncProcess;