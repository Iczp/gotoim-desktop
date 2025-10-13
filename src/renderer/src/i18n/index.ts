import { createI18n } from 'vue-i18n'
import en from './lang/en'
import zh from './lang/zh'

export const messages = {
  en,
  zh,
} as const

// For vue-i18n@11 we still use createI18n, but export the plugin instance
export const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages,
})

export type MessageSchema = (typeof messages)['en']

export default i18n
