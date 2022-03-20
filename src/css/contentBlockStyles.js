import { css } from 'styled-components';

const contentBlockStyle = css`
    padding: 0px 50px;
    overflow-y: scroll;
    flex: 1;

    ::-webkit-scrollbar {
        display: none;
    }
`;

export { contentBlockStyle };