import type { MessageSchema } from '@/i18n'

// Keep declarations minimal to avoid tight coupling with vue-i18n internal generics
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $t: (key: string, ...args: any[]) => string
  }
}

// Provide a convenience alias for project message schema
declare global {
  type AppMessages = MessageSchema
}
