export const charsToString = (chars) => {
    if (chars == null) {
        return;
    }
    return String.fromCharCode(...chars);
};