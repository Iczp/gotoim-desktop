export interface Env {
  appId: string
}

export const env: Env = {
  appId: import.meta.env.VITE_APP_ID,
}
