import tokens from '../jsTokens/index';

module.exports = {
    content: [],
    theme: {
        extend: {
            colors: {
                ...tokens.colors
            }
        }
    }
};
