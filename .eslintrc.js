module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'babel',
    '@emotion'
  ],
  globals: {
    fetch: false,
    document: false,
    process: false,
    module: false
  },
  env: {
    es6: true,
    browser: true,
    jest: true,
    amd: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  rules: {
    'indent': [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: {
          var: 2,
          let: 2,
          const: 3
        },
        MemberExpression: 1,
        FunctionDeclaration: {
          parameters: 1
        },
        CallExpression: {
          arguments: 1
        },
        ArrayExpression: 1,
        ObjectExpression: 1
      }
    ],
    'no-extra-semi': 'error',
    'curly': [
      'error',
      'all'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'object-curly-spacing': [
      'error',
      'never'
    ],
    'comma-dangle': [
      'error',
      'never'
    ],
    'no-unused-vars': [
      'off',
      {
        'vars': 'local',
        'args': 'after-used'
      }
    ],
    'semi': [
      'error',
      'always',
      {
        'omitLastInOneLineBlock': true
      }
    ],
    'no-console': 'off',
    'space-before-function-paren': [
      'error',
      {
        'anonymous': 'never',
        'named': 'never'
      }
    ],
    'brace-style': [
      'error',
      '1tbs'
    ],
    'keyword-spacing': 'error',
    'eol-last': 'error',
    'no-trailing-spaces': 'error',
    'no-multiple-empty-lines': 'error',
    'jsx-a11y/onclick-has-role': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/media-has-caption': 0,
    'jsx-a11y/no-autofocus': 0,
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-curly-spacing': [
      'error',
      'never'
    ],
    'react/jsx-equals-spacing': [
      'error',
      'never'
    ],
    'react/jsx-indent': [
      'error',
      2
    ],
    'react/jsx-key': 'error',
    'react/jsx-no-bind': [
      'error',
      {
        'allowArrowFunctions': true
      }
    ],
    'react/jsx-no-comment-textnodes': 'warn',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-tag-spacing': [
      'error',
      {
        'beforeSelfClosing': 'never'
      }
    ],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-wrap-multilines': 'error',
    'react/no-did-mount-set-state': 'error',
    'react/no-did-update-set-state': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-is-mounted': 'error',
    'react/no-multi-comp': [
      'error',
      {
        'ignoreStateless': true
      }
    ],
    'react/no-unescaped-entities': 'error',
    'react/no-unknown-property': ['error', {'ignore': ['css']}],
    'react/no-unused-prop-types': 'error',
    'react/prefer-es6-class': [
      'error',
      'always'
    ],
    'react/prop-types': 'error',
    'react/require-render-return': 'error',
    'react/sort-comp': [
      'error', {
        'order': [
          'static-methods',
          'lifecycle',
          'everything-else',
          'render'
        ],
        'groups': {
          'lifecycle': [
            'displayName',
            'propTypes',
            'props',
            'defaultProps',
            'state',
            'contextTypes',
            'childContextTypes',
            'mixins',
            'statics',
            'constructor',
            'getDefaultProps',
            'getInitialState',
            'getChildContext',
            'componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'componentDidUpdate',
            'componentWillUnmount'
          ]
        }
      }
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/prefer-interface': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/ban-types': [
      'error',
      {
        'types': {
          'Function': false
        },
        'extendDefaults': true
      }
    ],
    '@typescript-eslint/no-var-requires': 0,

    'babel/semi': 2
  }
};
