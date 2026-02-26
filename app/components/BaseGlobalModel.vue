<script setup lang="ts">
import type { ModalProps, ButtonProps, IconProps } from '@nuxt/ui'
import { merge } from 'lodash-es'

type UModalProps = Pick<
  ModalProps,
  | 'title'
  | 'description'
  | 'content'
  | 'overlay'
  | 'portal'
  | 'scrollable'
  | 'fullscreen'
  | 'close'
  | 'closeIcon'
  | 'dismissible'
  | 'modal'
  | 'ui'
> & {
  cancelBtnProps?: ButtonProps
  confirmBtnProps?: ButtonProps
  okBtnProps?: ButtonProps
  confirm?: boolean
  body?: string
  titleIcon?: IconProps
}
const { t } = useI18n()

const props = withDefaults(defineProps<UModalProps>(), {
  overlay: true,
  modal: true,
  portal: true,
  close: true,
  dismissible: true,
  confirm: false,
  ui: () => ({
    header: 'border-0 text-xl pb-0',
    body: 'border-0 text-lg sm:p-5',
    footer: 'pt-0'
  })
})

const modelProps = computed(() => {
  return Object.keys(props).reduce((acc, key) => {
    if (!['body', 'cancelBtnProps', 'confirmBtnProps', 'okBtnProps', 'confirm', 'titleIcon'].includes(key)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      acc[key] = props[key]
    }
    return acc
  }, {})
})

const obBtnConfig = computed(() => {
  return merge({ label: t('general.ok'), ui: { base: 'min-w-24.5 flex justify-center' } }, props.okBtnProps)
})

const cancelBtnConfig = computed(() => {
  return merge(
    { label: t('general.cancel'), variant: 'outline', ui: { base: 'min-w-24.5 flex justify-center' } },
    props.cancelBtnProps
  )
})

const confirmBtnConfig = computed(() => {
  return merge({ label: t('general.confirm'), ui: { base: 'min-w-24.5 flex justify-center' } }, props.confirmBtnProps)
})

function handleCancel(closeFn: () => void) {
  closeFn()
  const cancelBtnClick = props.confirm ? cancelBtnConfig.value?.onClick : obBtnConfig.value?.onClick
  if (cancelBtnClick) {
    if (Array.isArray(cancelBtnClick)) {
      // 如果是函数数组，则遍历调用每个函数
      cancelBtnClick.forEach((fn) => fn && typeof fn === 'function' && fn(new MouseEvent('click')))
    } else if (typeof cancelBtnClick === 'function') {
      // 如果是单个函数，则直接调用
      cancelBtnClick(new MouseEvent('click'))
    }
  }
}
</script>

<template>
  <UModal v-bind="modelProps">
    <template #title>
      <div class="flex items-center gap-2 pr-10">
        <UIcon v-if="titleIcon && titleIcon.name" v-bind="titleIcon" />
        <span class="ml-1">{{ title }}</span>
      </div>
    </template>
    <template v-if="body" #body>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="body" />
    </template>
    <template #footer="{ close }">
      <div class="flex w-full justify-end gap-4">
        <template v-if="confirm">
          <UButton class="cursor-pointer" v-bind="cancelBtnConfig" @click="handleCancel(close)" />
          <UButton class="cursor-pointer" v-bind="confirmBtnConfig" />
        </template>
        <template v-else>
          <UButton class="cursor-pointer" v-bind="obBtnConfig" @click="handleCancel(close)" />
        </template>
      </div>
    </template>
  </UModal>
</template>
