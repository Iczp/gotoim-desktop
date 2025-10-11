// /// <reference types="vite/client" />

interface Env extends ImportMetaEnv {
  // NODE_ENV: 'development' | 'production' | 'test'
  readonly MAIN_VITE_SOME_KEY: string
  readonly VITE_APP_ID?: string
  readonly VITE_APP_TITLE?: string
  readonly MAIN_VITE_SOME_KEY?: string
  [x: string]: unknown
}

declare const importMeta: {
  env: Env
}

interface ImportMeta {
  env: Env
}

// 或者更简洁的方式
declare namespace NodeJS {
  interface ProcessEnv {
    // 这里可以添加 Node.js 环境变量
  }
}
