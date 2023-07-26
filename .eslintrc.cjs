module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-trailing-spaces': 'error',
    'no-prototype-builtins': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always'],
    'eol-last': ['error', 'always'],
    quotes: ['error', 'single'],
    'vue/multi-word-component-names': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/html-indent': ['warn', 2],
    'vue/html-closing-bracket-newline': [
      'warn',
      {
        singleline: 'never',
        multiline: 'always',
      },
    ],
    'vue/no-v-html': 'off',
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: 3,
        multiline: 1,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/default': 'off',
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
};
