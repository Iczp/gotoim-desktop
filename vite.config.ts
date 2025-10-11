import path, { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from '@unocss/vite'

// Vite config specifically for the renderer (web) build

export default defineConfig((args) => {
  const { mode } = args
  console.log('args', args)
  // loadEnv expects a directory path (envDir), not a file path
  const envDir = process.cwd()
  const env = (args as any)?.env ?? loadEnv(mode, process.cwd())
  console.log('vite 环境变量 env -> ', env)
  const isProd = mode === 'production'
  const isDev = mode === 'development'
  return {
    root: 'src/renderer',

    base: './',
    envDir,
    resolve: {
      alias: {
        '@': path.join(process.cwd(), './src/renderer/src'),
        '~': resolve('src/renderer/src'),
        '@renderer': resolve('src/renderer/src'),
      },
    },
    plugins: [
      vue(),
      Unocss(),
      // {
      //   name: 'html-transform',
      //   transformIndexHtml(html) {
      //     return (
      //       html
      //         // .replace('%BUILD_TIME%', dayjs().format('YYYY-MM-DD HH:mm:ss'))
      //         .replace('%VITE_APP_TITLE%', 'Vite Electron')
      //     )
      //     // .replace('%BUILD_BRANCH%', VITE_USER_NODE_ENV || 'dev')
      //   },
      // },
    ],
    // Vite dev server options for renderer during `electron-vite dev`
    server: {
      host: '0.0.0.0',
      port: 5175,
      strictPort: true,
    },
    // ensure vite resolves env files from project root

    esbuild: {
      drop: isProd ? ['console', 'debugger'] : ['debugger'],
    },
    build: {
      outDir: path.join(process.cwd(), env.VITE_OUT_DIR || `./dist/web-${isProd ? 'prod' : 'dev'}`),
      // Allow emptying outDir even when it's outside the Vite project root.
      // Vite warns when outDir is not inside root; emptyOutDir:true overrides that.
      emptyOutDir: true,
      sourcemap: false,
      // 方便非h5端调试
      // sourcemap: VITE_SHOW_SOURCEMAP === 'true', // 默认是false
      // target: 'es6',
      target: 'es2022',
      // 开发环境不用压缩
      minify: isDev ? false : 'esbuild',
    },
  }
})
