# NBC Nuxt Layer

组内前端 Nuxt 项目基础 Layer(层)。

基础 Layer 内置了一些基础性的组件、页面、utils等等，以便于开发人员在开发项目时使用。

## 如何在项目中引入?

### 层注册

首先需要在项目中的`nuxt.config.ts` 中注册基础 Layer。

```ts
export default defineNuxtConfig({
  extends: ['github:Z-J-wang/nbc-nuxt-layer#v0.0.1-alpha.1']
})
```

> 详见：https://nuxt.zhcndoc.com/docs/4.x/guide/going-further/layers#git-%E4%BB%93%E5%BA%93

### 安装依赖

基础 Layer 中的依赖需要手动在具体项目中安装。所以需要把`package.json`中`dependencies`里面的依赖复制到具体项目中，然后执行`pnpm install`指令来安装依赖。

### 注册 nuxt 模块

基础 Layer 中的配置文件 `nuxt.config.ts` 会自动和项目的配置文件 `nuxt.config.ts` 进行合并。所以无需为基础 Layer 做额外的配置。

不过有一点需要注意的是，`modules` 配置项中的 `@nuxt/ui`顺序需要位于所有设计样式的模块之前。避免样式冲突。

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
