import {
  defineConfig,
  presetIcons,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import presetAttributify from '@unocss/preset-attributify'

export default defineConfig({
  presets: [
    presetAttributify({
      /* preset options */
    }),
    presetWind3(),
    presetIcons({
      /* preset options */
    }),
  ],
  transformers: [
    // 启用指令功能：主要用于支持 @apply、@screen 和 theme() 等 CSS 指令
    transformerDirectives(),
    // 启用 () 分组功能
    // 支持css class组合，eg: `<div class="hover:(bg-gray-400 font-medium) font-(light mono)">测试 unocss</div>`
    transformerVariantGroup(),
  ],
  shortcuts: [
    {
      center: 'flex justify-center items-center',
      'flex-center': 'flex justify-center items-center',
      'flex-between': 'flex justify-between items-center',
      'flex-around': 'flex justify-around items-center',
      'flex-column': 'flex flex-col',
      'text-ellipsis': 'overflow-hidden text-ellipsis whitespace-nowrap',
    },
  ],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  rules: [[/^m-([\\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })]],
  theme: {
    preflightRoot: ['::before,::after'],
    colors: {
      /** 主题色，用法如: text-primary */
      primary: 'var(--wot-color-theme, #0957DE)',
    },
    fontSize: {
      /** 提供更小号的字体，用法如：text-2xs */
      // '2xs': ['20px', '28px'],
      // '3xs': ['18px', '26px'],
    },
  },
})
