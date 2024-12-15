// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

import react from "eslint-plugin-react";

// Convert all jsxA11y errors to warnings //
const a11yRules = jsxA11y.flatConfigs.recommended.rules;
if (a11yRules)
  Object.keys(a11yRules).forEach((key) => {
    const value = a11yRules[key];
    if (Array.isArray(value) && value[0]) value[0] = "warn";
    else a11yRules[key] = "warn";
  });

// Reference https://tseslint.com/getting-started
export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: [],
    settings: { react: { version: "18.2" } },
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",

        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    // extends: ["plugin:react/jsx-runtime"],

    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },

    rules: {
      ...a11yRules,
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "warn",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
);

