<script setup lang="ts">
// 设置页面的的TDK
useSeoMeta({
  title: '首页 - smart nuxt template'
})
</script>

<template>
  <PageScrollAnimation />
  <UContainer>
    <section>
      <BasePagination />
    </section>
  </UContainer>
</template>
