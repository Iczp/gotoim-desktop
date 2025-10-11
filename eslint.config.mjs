import { defineConfig } from 'eslint/config'
import tseslint from '@electron-toolkit/eslint-config-ts'
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier'
import eslintPluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

export default defineConfig([
  { ignores: ['**/node_modules', '**/dist', '**/out'] },

  // recommended configs
  tseslint.configs.recommended,
  eslintPluginVue.configs['flat/recommended'],

  // include prettier config to ensure plugin is available
  eslintConfigPrettier,

  // vue files language options
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        extraFileExtensions: ['.vue'],
        parser: tseslint.parser,
      },
    },
  },

  // project-specific rules and prettier options
  {
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // 完全禁用
      '@typescript-eslint/explicit-function-return-type': [
        // 'warn', // 或 'error'
        {
          allowExpressions: true, // 允许表达式函数（如箭头函数）不声明返回类型
          allowTypedFunctionExpressions: true, // 允许类型化的函数表达式
          allowHigherOrderFunctions: true, // 允许高阶函数不声明返回类型
        },
      ],
      'vue/require-default-prop': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/block-lang': ['error', { script: { lang: 'ts' } }],

      // ensure ESLint's prettier rule accepts trailing commas and matches .prettierrc.yaml
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'all',
          singleQuote: true,
          semi: false,
          printWidth: 100,
          tabWidth: 2,
        },
      ],
    },
  },
])
