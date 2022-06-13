import { css } from 'styled-components';

const BasicButtonStyles = css`
    min-width: 150px;
    min-height: 20px;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 14px;
    background-color: ${(props) => props.theme.backgroundColor};
    border: 1px solid ${(props) => props.theme.borderColor};
    color: ${(props) => props.theme.textColor};
    transition: ${(props) => props.theme.transitionTime}ms;

    &:hover {
        cursor: pointer;
        background-color: ${(props) => props.theme.buttonSelectedColor};
    }
`;

export { BasicButtonStyles };