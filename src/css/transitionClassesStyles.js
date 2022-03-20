import { css } from 'styled-components';

const transitionClassesStyle = (className) => css`
    &.${className}-enter {
        opacity: 0;
    }
    &.${className}-enter-active {
        opacity: 1;
        transition: opacity ${(props) => props.theme.componentTransitionTime}ms;
    }
    &.${className}-exit {
        opacity: 1;
    }
    &.${className}-exit-active {
        opacity: 0;
        transition: opacity ${(props) => props.theme.componentTransitionTime}ms;
    }
`;

export { transitionClassesStyle };