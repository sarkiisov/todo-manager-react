export const stringToChars = (string) => {
    const chars = [];
    for (let i = 0; i < string.length; i++) {
        chars.push(string.charCodeAt(i));
    }
    return chars;
};