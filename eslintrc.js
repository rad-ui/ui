module.exports ={
    "env": {
      "browser": true,
      "es2021": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended"],
    "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "plugins": ["react", "react-hooks"],
    "rules": {
    }
} 
