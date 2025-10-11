import { defineConfig, externalizeDepsPlugin, bytecodePlugin, loadEnv } from 'electron-vite'

import viteConfig from './vite.config'

// 开启字节码插件保护源代码
// 启用 bytecodePlugin 插件：

// 提示

// bytecodePlugin 仅适用于生产阶段构建并且只支持主进程和预加载脚本。

// 需要注意的是，预加载脚本需要禁用 sandbox 才能支持字节码，因为字节码是基于 Node 的 vm 模块实现。
// 从 Electron 20 开始，渲染器默认会被沙箱化，所以如果你想使用字节码来保护预加载脚本，你需要设置
// sandbox: false。

export default defineConfig((args) => {
  const { command, mode } = args
  console.log('command', command)
  console.log('mode', mode)
  console.log('viteConfig', viteConfig)
  const env = loadEnv(mode)
  console.log(`env:${mode}`, env)
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
    renderer: viteConfig({ ...args, env } as any),
  }
})
