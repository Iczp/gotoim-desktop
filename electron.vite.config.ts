import path, { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import Unocss from '@unocss/vite'

// 开启字节码插件保护源代码
// 启用 bytecodePlugin 插件：

// 提示

// bytecodePlugin 仅适用于生产阶段构建并且只支持主进程和预加载脚本。

// 需要注意的是，预加载脚本需要禁用 sandbox 才能支持字节码，因为字节码是基于 Node 的 vm 模块实现。
// 从 Electron 20 开始，渲染器默认会被沙箱化，所以如果你想使用字节码来保护预加载脚本，你需要设置
// sandbox: false。

export default defineConfig(({ command, mode }) => {
  console.log('command', command)
  console.log('mode', mode)
  const isProd = mode === 'production'
  const isDev = mode === 'development'
  const plugins = [externalizeDepsPlugin()]

  if (command === 'build') {
    plugins.push(bytecodePlugin())
  }
  return {
    main: {
      plugins: [...plugins],
    },
    preload: {
      plugins: [...plugins],
    },
    renderer: {
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
        host: 'localhost',
        port: 5175,
        strictPort: true,
      },
      esbuild: {
        drop: isProd ? ['console', 'debugger'] : ['debugger'],
      },
      build: {
        // outDir: `dist/${UNI_PLATFORM}-${mode === 'production' ? 'prod' : 'dev'}`, // h5-prod, h5-dev, mp-weixin-prod, mp-weixin-dev
        sourcemap: false,
        // 方便非h5端调试
        // sourcemap: VITE_SHOW_SOURCEMAP === 'true', // 默认是false
        // target: 'es6',
        target: 'es2020',
        // 开发环境不用压缩
        minify: isDev ? false : 'esbuild',
      },
    },
  }
})
