import { createI18n } from 'vue-i18n'
import en from './lang/en'
import zh from './lang/zh'

export type Lang = 'en' | 'zh'

export const languages: {
  [key: string]: string
} = {
  zh: '简体中文',
  en: 'English',
}

export const langs = Object.entries(languages).map(([code, text]) => ({
  code,
  text,
}))

export const l = (key: Lang | any) => languages[key] || key

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

console.log('i18n', i18n)

export type MessageSchema = (typeof messages)['en']

export default i18n
