# Vite + React + Typescript + Eslint + Prettier搭建开发构建环境
## 前言
  使用webpack5开发环境两年了，听说vite开发速度快，现在 vite 生态已经比较完善了，所以自己搭建一个脚手架，由 webpack 转向 vite！开始搭建vite的环境，相比之下比 webpack 来说简单了很多，但是仍然有一些配置需要记录一下，以便之后可以快速搭建一个本地开发构建的环境
## 用 create-vite 脚手架生成基础模板
安装版本为：

- Vite 3.0.0

- React 18.2.0


[Vite 官方中文文档](https://link.zhihu.com/?target=https%3A//cn.vitejs.dev/)

运行命令安装脚手架，然后安照提示向下进行就可以

````
yarn create vite
````
项目已经默认集成了 @vitejs/plugin-react 这个插件。

自动集成 HMR，jsx，ts，css module，资源打包等一系列功能。

和 webpack对比，简直是太友好了。

## 然后再自己安装eslint prettier等工具
### 安装 eslint：
````
yarn add eslint -D
````
1.初始化eslint
````
yarn eslint --init
````
2.配制相关的库
````
eslint:主要的库
eslint-plugin-react@latest：针对 ESLint 的 React 特定 linting 规则。
@typescript-eslint/eslint-plugin:：一个 ESLint 插件，为 TypeScript 代码库提供规则。
@typescript-eslint/parser：一个允许 ESLint 对 TypeScript 源代码进行 lint 的解析器。
eslint-plugin-import：告诉 ESLint 如何解析导入。
eslint-plugin-jsx-a11y：检查可访问性问题。
eslint-plugin-n：
eslint-plugin-promise：这个插件意在通过代码风格检测让开发者养成较好地使用promise的方式
````
3. ESLint 无法解析 ts 代码，所以还需要安装 @typescript-eslint/parser
````
yarn add @typescript-eslint/parser -D

````
4.ESLint 配置文件：
首先让我们创建.eslintrc.js配置文件。我喜欢将我的创建为 javascript 文件，以便我可以添加评论。这是它的样子：
````
"parserOptions": {
    //...
    "project": "tsconfig.json"
},
````
5.使用eslint-config-prettier禁用掉 ESLint 中和 Prettier 配置有冲突的规则,然后用eslint-plugin-prettier保证 eslint 用 prettier 的风格校验。
````
yarn add eslint-config-prettier eslint-plugin-prettier -D
````
### ESLint 忽略文件
创建一个.eslintignore文件。这是我们告诉 ESLint 要忽略哪些目录和文件的地方。这取决于项目，但这是一个示例：
````
node_modules/
dist/
.prettierrc.js
.eslintrc.js
env.d.ts

````
添加新的脚本条目
在您的package.json文件中，您可以添加lint脚本条目以从命令行运行 ESLint。
````
  "scripts": {
    ...
    "lint": "eslint . --ext .ts,.tsx"
  },

````
## 配置prettier

````
yarn add prettier -D
````
创建prettierrc.js文件。这是我们指定所有 Prettier 格式规则的地方
````
module.exports = {
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "printWidth": 120,
  "bracketSpacing": true
}

````
创建.prettierignore文件，诉 Prettier 它应该忽略哪些文件
````
node_modules/
dist/
.prettierrc.js

````
## 安装react-router
````
yarn add react-router-dom
````
修改 main.tsx 中的代码
````
//...
import {RouterProvider} from "react-router-dom";
import router from './router';

//...
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

````
## 安装Antd
````
yarn add antd
````
然后在主 main.less 文件中加上代码：
````
@import 'antd/es/style/themes/default.less';
@import 'antd/dist/antd.less';

@primary-color: #4294ff; // 更换全局主色

````
然后还需要更改 vite.config.ts：

````
//...
export default defineConfig({
     //...
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
});
````
## 配制别名
使用下面的方式来使用别名
````
import reactLogo from "@/assets/react.svg";

````
默认情况下，会直接报错，所以我们需要在vite.config.ts进行如下配置：
````
//...
import path from "path";

export default defineConfig({
    //...
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});

````

需要安装path库

````
yarn add path -D
````

此时别名功能已经可以正常使用，但是__dirname会报红，需要安装@types/node

````
yarn add @types/node -D
````

## Vite 已集成了 CSS Module 功能，但是想要使用 Less 还需要安装 less 这个库

````
yarn add less
````
最后使用的方式如下：

````
import styles from "./App.module.less";

````
我们可能会用到一些Less全局变量来作为主题之类的，它可能是这样的theme.less：
`@primaryColor: #4294ff; // 全局主色`

### 然后修改vite.config.ts为：

````
export default defineConfig({
  // ...
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(__dirname, 'src/theme.less')}";`,
      },
    },
  },
});
````
## 集成 husky 规范+ lint-staged
husky , Git Hook 工具，可以设置在 git 各个阶段（pre-commit、commit-msg、pre-push 等）触发我们的命令。主要为了解决配置eslint后仍不能将eslint中的问题解决掉。我们需要提交的代码符合eslint代码规范，则需要执行git commit命令时对其进行校验，如若不符合eslint规范就会自动进行修复。
lint-staged 这个工具一般结合 husky 来使用，它可以让 husky 的 hook 触发的命令只作用于 git add那些文件（即 git 暂存区的文件），而不会影响到其他文件。
1.初始化Git
````
git init
````
1.安装依赖
````
yarn add husky lint-staged -D 
````
2.初始化 husky
````
npx husky-init && yarn 

````
3.husky 配置
创建一个。husky文件
````
yarn husky install
````
4.接下来，运行命令：
````
 npx husky add .husky/pre-commit "yarn lint-staged && yarn test:ci"
````
修改 .husky/pre-commit
````
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

yarn lint-staged && yarn test:ci

````
为什么test:ci？
````
"test:ci": "CI=true react-scripts test",

````
此命令将运行所有应用程序测试。所以现在，当您尝试提交更改时，git hook 将触发pre-commit命令。您可以手动检查它：
````
yarn lint-staged && yarn test:ci
````
5.修改 package.json
**表示在保存提交代码时会按顺序执行lint-staged下的命令**
````
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,vue,ts,jsx,tsx}": [
      "npm run lint",
      "npm run prettier"
    ],
    "*.{html,css,less,scss,md}": [
      "npm run prettier"
    ]
  }
}

````
## 前端代码风格自动化commitlint
在有了Husky赋能之后，我们有能力在Git的钩子里做一些事情，首先不得不提的是代码的提交规范和规范的校验，优雅的提交，方便团队协作和快速定位问题。首推[Commitlint](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40commitlint%2Fconfig-conventional)
1.安装依赖
````
yarn add  @commitlint/config-conventional @commitlint/cli -D

````
2.添加 commit-msg 钩子
````
yarn add  husky add .husky/commit-msg "npx --no -- commitlint --edit ${1}"
````
3.创建 commitlint.config.js
````
// commitlint.config.cjs
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build', // 编译相关修改（新版本发布）
        'feat', // 新功能
        'fix', // 修复bug
        'update', // 更新某功能
        'refactor', // 重构
        'docs', // 文档
        'chore', // 增加依赖或库
        'style', // 格式（不影响代码变动）
        'revert', // 撤销commit 回滚上一版本
        'perf', // 性能优化
        'test', // 测试单元
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
}

````
