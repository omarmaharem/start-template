// @ts-check
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * Typescript Config
 */
const tsconfig = [
  {
    name: "app/typescript",
    files: ["**/*.{js,ts,tsx}"],
    languageOptions: {
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        parser: tseslint.parser,
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: { "typescript-eslint": tseslint.plugin },
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
    },
  },
];

/**
 * React Config
 */

const reactConfig = [
  {
    name: "app/react",
    files: ["**/*.{js,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
          allowExportNames: ["Route", "loader"],
        },
      ],
    },
  },

  {
    name: "app/react-routes-override",
    files: ["src/routes/**/*.{ts,tsx}"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
];

/**
 * Eslint Config
 */
const eslintConfig = defineConfig([
  tsconfig,
  reactConfig,
  prettier,
  prettierPlugin,
  globalIgnores([
    "**/coverage/**",
    "**/dist/**",
    "**/vite.config.*.timestamp-*.*",
    "src/routeTree.gen.ts",
  ]),
]);

export default eslintConfig;
