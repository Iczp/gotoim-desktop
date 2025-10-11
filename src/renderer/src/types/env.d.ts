/// <reference types="vite/client" />

interface Env extends ImportMetaEnv {
  // NODE_ENV: 'development' | 'production' | 'test'
  readonly MAIN_VITE_SOME_KEY: string
  /**
   * appId
   */
  readonly VITE_APP_ID: string
  /**
   * appTitle
   */
  readonly VITE_APP_TITLE: string
  /**
   * some key
   */
  readonly MAIN_VITE_SOME_KEY?: string
  /**
   * auth host
   */
  readonly VITE_AUTH_HOST: string
  /**
   * auth client id
   */
  readonly VITE_AUTH_CLIENT_ID: string
  /**
   * auth client secret
   */
  readonly VITE_AUTH_CLIENT_SECRET: string
  /**
   * chat host
   */
  readonly VITE_CHAT_HOST: string
  /**
   * chat websocket
   */
  readonly VITE_CHAT_WEBSOCKET: string

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
