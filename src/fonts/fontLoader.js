const fontFace = (name, src, fontStyle = 'normal', fontWeight = 'normal') => {
    return`
        @font-face {
            font-family: '${name}';
            src: url(${src}) format('truetype');
            font-style: ${fontStyle};
            font-weight: ${fontWeight};
        }
    `;
};

export default fontFace;