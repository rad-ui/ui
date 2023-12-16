module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true,
    },
    'extends': [
        'plugin:react/recommended',
        'eslint:recommended',
        'google',
    ],
    'overrides': [
    ],
    'parser': '@babel/eslint-parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
    },
    'plugins': [
        'react',
    ],
    'rules': {
        'react/react-in-jsx-scope': 'off',
        'no-multiple-empty-lines': ['warn', {'max': 1, 'maxEOF': 1}],
        'indent': ['warn', 4],
        'key-spacing': ['warn', {'beforeColon': false, 'afterColon': true}],
        'no-trailing-spaces': 'warn',
        'no-mixed-spaces-and-tabs': 'warn',
        'no-multi-spaces': 'warn',
        'no-unexpected-multiline': 'warn',
        'no-unused-vars': 'warn',
        'no-undef':'warn',
        'no-var': 'warn',
        'prefer-const': 'warn',
        'space-before-blocks': 'warn',
        'space-before-function-paren': ['warn', 'never'],
        'space-in-parens': 'warn',
        'spaced-comment': 'warn',
        'arrow-spacing': 'warn',
        'comma-style': 'warn',
        'eol-last': 'warn',
        'func-call-spacing': 'warn',
        'comma-spacing': ['warn', {'before': false, 'after': true}],
        'quotes': ['warn', 'single'],
        'react/prop-types': 'off',
        'prefer-rest-params': 'off',
        'no-func-assign': 'off',
        'no-invalid-this': 'off',
        'react/no-unknown-property': 'off',
        'camelcase': 'off',
        'react/jsx-key': 'off',
        'require-jsdoc': 'off',
        'guard-for-in': 'off',
        'no-empty-pattern': 'off',

        // ignore long strings
        'max-len': 'off',
        'semi': [
            'warn',
            'always',
        ],
    },
};
