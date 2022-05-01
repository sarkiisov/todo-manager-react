import styled from 'styled-components';

const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: auto;
    height: 50px;
    font-size: 16px;
`;

const SettingsItem = ({title, settingsElement}) => {
    return(
        <Item>
            <p>{title}</p>
            {settingsElement}
        </Item>
    );
};

export default SettingsItem;