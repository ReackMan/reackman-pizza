import {dirname} from "path";
import {fileURLToPath} from "url";
import {FlatCompat} from "@eslint/eslintrc";
import reactPlugin from 'eslint-plugin-react';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typeScriptEsLintPlugin from '@typescript-eslint/eslint-plugin'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: typeScriptEsLintPlugin.configs['recommended'],
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    // ...compat.extends('next/core-web-vitals', 'next/typescript', '@it-incubator/eslint-config'),
    {
        plugins: {
            react: reactPlugin,
            '@typescript-eslint': typescriptPlugin,
        },
        rules: {
            'react/jsx-curly-brace-presence': ['error', {
                props: 'always',
                children: 'ignore',
                propElementValues: 'always'
            }],
            'no-console': ['warn', {allow: ['warn', 'error']}],
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    }
];

export default eslintConfig;