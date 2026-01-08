<script setup lang="ts">
// const { t } = useI18n()

// 设置页面的的TDK
useSeoMeta({
  title: '首页 - smart nuxt template'
})
</script>

<template>
  <PageScrollAnimation />
  <UContainer />
</template>

<i18n lang="yaml">
en:
  name: Name
  age: Age
  getUserData: Get user data
zh-CN:
  name: 姓名
  age: 年龄
  getUserData: 获取用户数据
</i18n>
