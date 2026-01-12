# NBC Nuxt Layer

组内前端 Nuxt 项目 Base Layer(基础层)。

Base Layer 内置了一些基础的组件、页面、utils等等，以便于开发人员在开发项目时使用。

## 如何在项目中引入?

### 注册 Base Layer

首先需要在项目中的`nuxt.config.ts` 中注册 Base Layer。

```ts
export default defineNuxtConfig({
  extends: ['github:Z-J-wang/nbc-nuxt-layer#v0.0.1-alpha.1']
})
```

> 详见：https://nuxt.zhcndoc.com/docs/4.x/guide/going-further/layers#git-%E4%BB%93%E5%BA%93

### 安装依赖

Base Layer 中的依赖需要手动在具体项目中安装。所以需要把 `package.json` 中 `dependencies` 里面的依赖复制到具体项目中，然后执行`pnpm install`指令来安装依赖。

### 注册 nuxt 模块

Base Layer 的配置文件 `nuxt.config.ts` 会自动和项目的配置文件 `nuxt.config.ts` 进行合并。因此无需为 Base Layer 做额外的配置。

不过有一点需要注意的是，`modules` 配置项中的 `@nuxt/ui` 顺序需要位于所有涉及样式的模块之前。避免样式冲突。如果不清楚那些模块会引入样式，请直接将 `@nuxt/ui` 放在最前面。

### 将 Base Layer 组件纳入项目中的tailwindcss编译范围

默认情况下，tailwindcss 忽略 `node_modules` 中的文件，从而导致 Base Layer 组件中的 tailwindcss 不起作用。为了解决这个问题，我们需要手动把 Base Layer 添加到 tailwindcss 的编译范围中。

具体步骤如下：

在nuxt的主样式文件中添加以下内容：

```css
/* main.css 文件 */
@import 'tailwindcss';
@import '@nuxt/ui';

/* 显式注册所有的外部 layer */
@source "../../../node_modules/.c12/";
```

> 说明：
>
> - `/.c12` 目录是所有 nuxt layer 的存放目录。因此需要让 tailwindcss 主动去扫描 `/.c12` 目录下的文件。
> - 主样式文件由具体项目创建，未必是 `main.css` 文件。
>
> 更多详细说明：
>
> - https://tailwind.nodejs.cn/docs/detecting-classes-in-source-files#which-files-are-scanned
> - https://nuxt.zhcndoc.com/docs/4.x/guide/going-further/layers

## 开发您的 Layer

您的 Layer 位于此仓库的根目录，它完全和常规的 Nuxt 项目一样，只是您可以将其发布到 NPM。

`.playground` 目录可帮助您在开发过程中测试您的 Layer。

运行 `pnpm dev` 将会准备并启动 `.playground` 目录，其中导入了您的 Layer 本身。

## 生产环境

构建生产环境应用：

```bash
pnpm build
```

或静态生成：

```bash
pnpm generate
```

在本地预览生产构建：

```bash
pnpm preview
```

查阅[部署文档](https://nuxt.com/docs/getting-started/deployment)获取更多信息。
