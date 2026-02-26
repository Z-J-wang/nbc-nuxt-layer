<script setup lang="ts">
import type { ButtonProps, CheckboxGroupItem } from '@nuxt/ui'
import type { Updater } from '@tanstack/vue-table'

interface TableColumnFilter {
  label?: string
  color?: string
  variant?: string
  ui?: object
  checkoutOptions: CheckboxGroupItem[]
  setFilterValue: (value: Updater<unknown>) => void
  getFilterValue?: () => unknown
}

const props = withDefaults(defineProps<TableColumnFilter>(), {
  color: 'neutral',
  variant: 'ghost',
  trailingIcon: 'lucide:filter',
  ui: () => ({
    base: 'w-full justify-between group px-0',
    label: 'font-bold text-lg'
  })
})

const popoverModel = ref(false)

const { t } = useI18n()
const checkoutValue = ref<string[]>([])
const buttonProps = computed(() => {
  return Object.keys(props).reduce((acc, key) => {
    // 排除不属于 TableProps 的属性
    if (!['checkoutOptions', 'setFilterValue', 'getFilterValue'].includes(key)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      acc[key] = props[key]
    }
    return acc
  }, {} as ButtonProps)
})

const triggerClassname = computed(() => {
  const filterValue = props.getFilterValue?.()
  return classNameMerge('size-4.5 cursor-pointer hover:text-primary', filterValue ? 'text-primary' : '')
})

function reset() {
  checkoutValue.value = []
  props.setFilterValue('')
  popoverModel.value = false
}

function confirm() {
  props.setFilterValue(checkoutValue.value.length ? checkoutValue.value : undefined)
  popoverModel.value = false
}
</script>

<template>
  <UButton v-bind="buttonProps">
    <slot></slot>
    <template #trailing>
      <UPopover v-model:open="popoverModel" :content="{ align: 'end' }">
        <UIcon name="lucide:filter" :class="triggerClassname" />
        <template #content>
          <div class="px-4 pt-4 pb-2">
            <div class="max-h-50 overflow-auto">
              <UCheckboxGroup v-model="checkoutValue" :items="checkoutOptions" />
            </div>
            <USeparator class="my-2" :ui="{ border: 'border-slate-300' }" />
            <div class="flex justify-between items-center gap-2">
              <UButton variant="link" class="cursor-pointer px-0" :label="t('general.reset')" @click="reset" />
              <UButton color="primary" class="cursor-pointer" :label="t('general.confirm')" @click="confirm" />
            </div>
          </div>
        </template>
      </UPopover>
    </template>
  </UButton>
</template>
