<script setup lang="tsx">
import type { ButtonProps } from '@nuxt/ui'

const chevronsUpDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.51347 1.67416C7.75295 1.34232 8.24705 1.34232 8.48653 1.67416L11.6437 6.04888C11.9301 6.44569 11.6465 7 11.1572 7H4.84282C4.35345 7 4.06991 6.44569 4.35629 6.04888L7.51347 1.67416Z"
      fill="#1D293D"
    />
    <path
      d="M7.51347 14.3258C7.75295 14.6577 8.24705 14.6577 8.48653 14.3258L11.6437 9.95112C11.9301 9.55431 11.6465 9 11.1572 9H4.84282C4.35345 9 4.06991 9.55431 4.35629 9.95112L7.51347 14.3258Z"
      fill="#1D293D"
    />
  </svg>
)

const chevronsUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.51347 1.67416C7.75295 1.34232 8.24705 1.34232 8.48653 1.67416L11.6437 6.04888C11.9301 6.44569 11.6465 7 11.1572 7H4.84282C4.35345 7 4.06991 6.44569 4.35629 6.04888L7.51347 1.67416Z"
      fill="#1D293D"
    />
  </svg>
)

const chevronsDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.51347 14.3258C7.75295 14.6577 8.24705 14.6577 8.48653 14.3258L11.6437 9.95112C11.9301 9.55431 11.6465 9 11.1572 9H4.84282C4.35345 9 4.06991 9.55431 4.35629 9.95112L7.51347 14.3258Z"
      fill="#1D293D"
    />
  </svg>
)

interface TableColumnSort {
  label?: string
  color?: string
  variant?: string
  ui?: object
  toggleSorting: (desc?: boolean, isMulti?: boolean) => void
  getIsSorted?: () => unknown
}

const props = withDefaults(defineProps<TableColumnSort>(), {
  color: 'neutral',
  variant: 'ghost',
  ui: () => ({
    base: 'cursor-pointer w-full justify-between group px-0',
    label: 'font-bold text-lg'
  })
})

const emits = defineEmits(['click'])

const buttonProps = computed(() => {
  return Object.keys(props).reduce((acc, key) => {
    // 排除不属于 TableProps 的属性
    if (!['toggleSorting', 'getIsSorted'].includes(key)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      acc[key] = props[key]
    }
    return acc
  }, {} as ButtonProps)
})

const trailingIcon = computed(() => {
  if (props.getIsSorted) {
    const isSorted = props.getIsSorted()
    return isSorted ? (isSorted === 'asc' ? chevronsUpIcon : chevronsDownIcon) : chevronsUpDownIcon
  } else {
    return chevronsUpDownIcon
  }
})

const triggerClassname = computed(() => {
  const isSorted = props.getIsSorted?.()
  return classNameMerge('size-4.5 cursor-pointer hover:text-primary', isSorted ? 'text-primary' : '')
})

const clickHandler = () => {
  emits('click')
  props.toggleSorting(props.getIsSorted?.() === 'asc')
}
</script>

<template>
  <UButton v-bind="buttonProps" @click="clickHandler">
    <slot></slot>
    <template #trailing>
      <UIcon mode="svg" :name="trailingIcon" :class="triggerClassname" />
    </template>
  </UButton>
</template>
