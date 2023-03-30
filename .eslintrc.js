module.exports = {
  extends: 'standard-with-typescript',
  ignorePatterns: ['**/node_modules/**/*', '**/dist/**/*', 'schemas.d.ts'],
  parserOptions: {
    project: './tsconfig.eslint.json'
  },
  rules: {
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off'
  }
}
