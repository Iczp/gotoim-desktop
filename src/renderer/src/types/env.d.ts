// /// <reference types="vite/client" />

export interface MetaEnv extends ImportMetaEnv {
  [x: string]: unknown
}

export declare global {
  interface Env extends ImportMetaEnv {
    readonly VITE_APP_ID?: string
    readonly VITE_APP_TITLE?: string
    readonly MAIN_VITE_SOME_KEY?: string
    [x: string]: unknown
  }
}
