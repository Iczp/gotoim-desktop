import { defineConfig, presetIcons, presetWind3 } from 'unocss'

import presetAttributify from '@unocss/preset-attributify'

export default defineConfig({
  presets: [
    presetAttributify({
      /* preset options */
    }),
    presetWind3(),
    presetIcons(),
  ],
  rules: [],
  theme: {},
})
