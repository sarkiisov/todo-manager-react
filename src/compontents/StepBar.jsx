import React from 'react';

import styled from 'styled-components';

const Node = styled.div`
    height: 14px;
    width: 14px;
    border-radius: 50%;
    display:inline-block;
    background-color: ${(props) => props.status ? props.theme.todoChekcedBackgroundColor : props.theme.textColor};
`;

const Divider = styled.div`
    height: 35px;
    width: 2px;
    margin-left: 6px;
    background-color: ${(props) => props.status ? props.theme.todoChekcedBackgroundColor : props.theme.textColor};
`;

const ListElement = styled.li`
    position: relative;
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;

    > p {
        position: absolute;
        margin-left: 25px;
        line-height: 20px;
    }
`;

const StepBar = ({ stepsArr }) => {
    return (
        <ul>
            {stepsArr.map((item, index) => (
                <>
                    {index !== 0 &&
                    <ListElement>
                        <Divider status={item.status} />
                    </ListElement>
                    }
                    <ListElement>
                        <Node status={item.status} />
                        <p>{item.label}</p>
                    </ListElement>
                </>
            ))}
        </ul>
    );
};

export default StepBar;