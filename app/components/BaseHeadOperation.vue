<script setup lang="ts">
import { useLanguage } from '../composables/useLanguage'
import type { ButtonProps } from '@nuxt/ui'

export interface BaseHeadOperationUserInfo {
  userID: string
  username: string
  avatar?: string
  email?: string
  [key: string]: unknown
}

export interface BaseHeadOperationDropdownItem {
  label?: string
  to?: string
  icon?: string
  disabled?: boolean
  divider?: boolean
  [key: string]: unknown
}

interface BtnConfig extends ButtonProps {
  to: string
  disabled?: boolean
  text?: string
  variant?: 'subtle' | 'outline' | 'solid' | 'ghost' | 'link' | 'soft'
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
}

interface Props {
  dark?: boolean
  userInfo?: BaseHeadOperationUserInfo
  userDropdownItems?: BaseHeadOperationDropdownItem[]
  logoutUrl?: string
  languageMode?: // 语言切换方式: button | select。
    'button' | 'select' // ! 由于 setLocale 方法失效，暂时不要使用 select 模式
  loginConfig?: BtnConfig
  registerConfig?: BtnConfig
}

const props = withDefaults(defineProps<Props>(), {
  dark: false,
  gap: 'middle',
  languageMode: 'button',
  logoutUrl: '/logout',
  loginConfig: () => ({ to: '/login', color: 'primary', variant: 'solid' }),
  registerConfig: () => ({ to: '/register', variant: 'ghost' })
})

const dropdownItems = computed(() => {
  const items = props.userDropdownItems || []

  if (items.length > 0) {
    items.push({ divider: true })
  }

  return [...items, { label: $t('general.logout'), to: props.logoutUrl, icon: 'lucide:log-out' }]
})

const language = useLanguage()
const localeCode = language.localeCode
const locales = language.locales

const languageBtnConfig = computed(() => {
  return locales.value.find((lang) => lang?.code !== localeCode.value)
})
</script>

<template>
  <ClientOnly>
    <div class="flex items-center gap-2 sm:gap-4">
      <slot />
      <slot name="language">
        <template v-if="languageMode === 'button'">
          <SwitchLocalePathLink v-if="languageBtnConfig" :key="languageBtnConfig.code" :locale="languageBtnConfig.code">
            <UButton
              :ui="{
                base: props.dark
                  ? 'cursor-pointer bg-transparent text-white outline outline-white hover:bg-white hover:text-[#00274C] active:bg-white active:text-[#00274C]'
                  : ''
              }"
            >
              {{ languageBtnConfig.alias || languageBtnConfig.name }}
            </UButton>
          </SwitchLocalePathLink>
        </template>
        <template v-else>
          <ULocaleSelect v-model="localeCode" :locales="locales" />
        </template>
      </slot>
      <template v-if="userInfo">
        <slot name="user">
          <UDropdownMenu
            :items="dropdownItems"
            :content="{
              align: 'start',
              side: 'bottom',
              sideOffset: 8
            }"
          >
            <UButton
              icon="lucide:circle-user"
              :ui="{
                base: props.dark
                  ? 'cursor-pointer bg-transparent text-white hover:bg-white hover:text-[#00274C] active:bg-white active:text-[#00274C]'
                  : ''
              }"
              >{{ userInfo.username }}</UButton
            >
            <template #item="{ item }">
              <USeparator v-if="item.divider" />
              <UButton
                v-else
                :to="item.to"
                :icon="item.icon"
                :disabled="item.disabled"
                class="w-full"
                variant="ghost"
                >{{ item.label }}</UButton
              >
            </template>
          </UDropdownMenu>
        </slot>
      </template>
      <template v-else>
        <slot name="login">
          <UButton
            :ui="{
              base: props.dark
                ? 'md:px-6 cursor-pointer bg-transparent text-white outline outline-white hover:bg-white hover:text-[#00274C] active:bg-white active:text-[#00274C]'
                : ''
            }"
            v-bind="loginConfig"
          >
            {{ props.loginConfig.text || $t('general.login') }}
          </UButton>
        </slot>
        <slot name="register">
          <UButton
            :ui="{
              base: props.dark
                ? 'md:px-6 cursor-pointer bg-transparent text-white outline outline-white hover:bg-white hover:text-[#00274C] active:bg-white active:text-[#00274C]'
                : ''
            }"
            v-bind="registerConfig"
          >
            {{ props.registerConfig.text || $t('general.register') }}
          </UButton>
        </slot>
      </template>
    </div>
  </ClientOnly>
</template>
