/// <reference types="vite/client" />

export interface Env {
  appId: string
}

interface ImportMetaEnv {
  readonly VITE_APP_ID: string
  readonly MAIN_VITE_SOME_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

export interface EnvJs {
  appId: string
}
