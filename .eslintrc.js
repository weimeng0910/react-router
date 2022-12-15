module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // 通过从插件配置扩展，我们可以获得推荐的规则，而无需手动添加它们。
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    // 这将禁用 Prettier 将负责处理的 ESLint 中的格式化规则。
    // 确保它始终是最后一个配置，因此它有机会覆盖其他配置。
    'eslint-config-prettier',
  ],
  settings: {
    react: {
      // 告诉 eslint-plugin-react 自动检测要使用的 React 版本。
      version: 'detect',
    },
    //告诉 eslint 如何解析导入
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    //project: 'tsconfig.json',
    project: ['./tsconfig.json'],
    parser: '@typescript-eslint/parser',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // 在此处添加您自己的规则以覆盖扩展配置中的规则。
    'react/react-in-jsx-scope': 'off', // 使用 jsx 时不需要引用 React
    '@typescript-eslint/strict-boolean-expressions': 'off', // 表达式中的布尔值必须严格是布尔类型
  },
};
