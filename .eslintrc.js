// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'jsx-a11y',
    'import',
    'simple-import-sort',
    'prettier',
    '@typescript-eslint',
    'quick-prettier'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended'
  ],
  rules: {
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-inferrable-types': 'warn',
    'quick-prettier/prettier': 1,
    '@typescript-eslint/interface-name-prefix': 0,
    'no-prototype-builtins': 0,
    'no-case-declarations': 0,
    'jsx-a11y/no-autofocus': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/camelcase': 0,
    'react/react-in-jsx-scope': 'off', // React is always in scope with Blitz
    'jsx-a11y/anchor-is-valid': 'off', //Doesn't play well with Blitz/Next <Link> usage
    '@typescript-eslint/explicit-module-boundary-types': 0,
    /**
     * @motivation Anonymous default export is the best way to get functions
     * name "default" in call stack. — Not a nice debugging experience.
     *
     * Use named exports instead of default exporting anonymous object — they
     * treeshake better.
     */
    'import/no-anonymous-default-export': 'error',
    /**
     * @motivation ESM imports are resolved statically — they run before other
     * code in the module. Keeping them at the top of the file helps to remember
     * this fact.
     */
    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    /**
     * Override this per-file or per-project if needed.
     */
    'import/no-extraneous-dependencies': 'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Node.js builtins.
          // @ts-expect-error `builtinModules` should be defined :o
          // eslint-disable-next-line no-undef
          [`^(${require('module').builtinModules.join('|')})(/|$)`],
          // Packages. `react` related packages come first.
          ['^@?\\w'],
          // Internal packages.
          [`^(@)(/.*|$)`],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Side effect imports.
          ['^\\u0000']
        ]
      }
    ]
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off'
      }
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx']
  },
  ignorePatterns: [
    'blitz.config.js',
    'next.config.js',
    'detect-circular-deps.js',
    'jest.config.js',
    '.next/**/*',
    '.blitz/**/*',
    'scripts/*',
    'polyfills.js',
    'cypress/**/*.js'
  ]
}
