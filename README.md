# Nuxt Layer 启动模板

使用这个 GitHub 模板创建可扩展的 Nuxt Layer。

## 安装

请确保安装依赖项：

```bash
pnpm install
```

## 开发您的 Layer

您的 Layer 位于此仓库的根目录，它完全和常规的 Nuxt 项目一样，只是您可以将其发布到 NPM。

`.playground` 目录可帮助您在开发过程中测试您的 Layer。

运行 `pnpm dev` 将会准备并启动 `.playground` 目录，其中导入了您的 Layer 本身。

## 分发您的 Layer

您的 Nuxt Layer 的结构与任何其他 Nuxt 项目完全相同，只是您可以将其发布到 NPM。

为此，您只需检查 [package.json](file://d:\Projects\nbc-nuxt-layer\package.json) 中的 `files` 是否有效，然后运行：

```bash
npm publish --access public
```

完成后，您的用户只需运行：

```bash
npm install --save your-layer
```

然后在 `nuxt.config` 中的 `extends` 添加依赖：

```ts
defineNuxtConfig({
  extends: "your-layer",
});
```

## 开发服务器

在 http://localhost:3000 启动开发服务器

```bash
pnpm dev
```

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
