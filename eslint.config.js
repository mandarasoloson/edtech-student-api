import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        process: "readonly",
        console: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "error", 
      "no-console": "warn",      
      "indent": ["error", 2]
    }
  }
];