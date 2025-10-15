// electron-builder.ts
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as builder from 'electron-builder'
import { Configuration } from 'electron-builder'

const Platform = builder.Platform

// 加载 .env 文件
dotenv.config({ path: path.resolve(__dirname, '.env') })

const APP_ID: string = process.env.VITE_APP_ID || 'com.gotoim.fallbackapp'
const PRODUCT_NAME: string = process.env.VITE_PRODUCT_NAME || 'gotoim-desktop'

console.log('APP_ID:', APP_ID)
console.log('PRODUCT_NAME:', PRODUCT_NAME)

// 定义 electron-builder 配置对象
const options: Configuration = {
  appId: APP_ID,
  productName: PRODUCT_NAME,
  directories: {
    output: 'dist/artifacts/local',
    buildResources: 'build',
  },
  files: [
    '!**/.vscode/*',
    '!src/*',
    '!electron.vite.config.{js,ts,mjs,cjs}',
    '!{.eslintcache,eslint.config.mjs,.prettierignore,.prettierrc.yaml,dev-app-update.yml,CHANGELOG.md,README.md}',
    '!{.env,.env.*,.npmrc,pnpm-lock.yaml}',
    '!{tsconfig.json,tsconfig.node.json,tsconfig.web.json}',
    'dist/**/*',
  ],
  asarUnpack: ['resources/**'],
  compression: 'normal',
  removePackageScripts: true,
  nodeGypRebuild: false,
  buildDependenciesFromSource: false,
  win: {
    executableName: PRODUCT_NAME,
  },
  nsis: {
    artifactName: '${name}-${version}-setup.${ext}',
    shortcutName: '${productName}',
    uninstallDisplayName: '${productName}',
    createDesktopShortcut: 'always',
  },
  mac: {
    target: 'dmg',
    hardenedRuntime: true,
    gatekeeperAssess: true,
    extendInfo: {
      NSCameraUsageDescription: "Application requests access to the device's camera.",
      NSMicrophoneUsageDescription: "Application requests access to the device's microphone.",
      NSDocumentsFolderUsageDescription:
        "Application requests access to the user's Documents folder.",
      NSDownloadsFolderUsageDescription:
        "Application requests access to the user's Downloads folder.",
    },
    entitlementsInherit: 'build/entitlements.mac.plist',
    notarize: false,
  },
  dmg: {
    iconSize: 100,
    artifactName: '${name}-${version}.${ext}',
  },
  linux: {
    desktop: {
      StartupNotify: 'false',
      Encoding: 'UTF-8',
      MimeType: 'x-scheme-handler/deeplink',
    },
    target: ['AppImage', 'snap', 'deb'],
    maintainer: 'electronjs.org',
    category: 'Utility',
  },
  appImage: {
    artifactName: '${name}-${version}.${ext}',
  },
  electronDownload: {
    mirror: 'https://npmmirror.com/mirrors/electron/',
  },
}

// 执行构建
builder
  .build({
    targets: Platform.MAC.createTarget(),
    config: options,
  })
  .then((result) => {
    console.log('Electron build successful:', JSON.stringify(result))
  })
  .catch((error) => {
    console.error('Error during electron build:', error)
    process.exit(1)
  })
