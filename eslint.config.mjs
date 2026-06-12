import jest from '@aboutbits/eslint-config/configs/jest'
import ts from '@aboutbits/eslint-config/configs/ts'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  ts,
  jest,
  {
    rules: {
      'import/namespace': 'off',
      'import/order': 'error',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    ignores: ['node_modules', 'dist'],
  },
])
