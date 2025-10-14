import { autoUpdater } from 'electron-updater'
import logger from 'electron-log'
import { is } from '@electron-toolkit/utils'
import { ipcMain } from 'electron'

export const appUpdater = () => {
  // Auto updater: during development point to local test server
  try {
    console.log('autoUpdater init env', process.env)
    if (is.dev) {
      autoUpdater.setFeedURL({ provider: 'generic', url: 'http://localhost:8080/auto-updates' })
    }
    autoUpdater.addAuthHeader('Bearer xxxxxx')

    //  强制更新程序
    autoUpdater.forceDevUpdateConfig = true

    autoUpdater.logger = logger
    // autoUpdater.logger.transports.file.level = 'info'

    autoUpdater.checkForUpdatesAndNotify({
      title: '更新可用',
      body: '有新版本可用，即将下载更新。',
    })

    autoUpdater.on('checking-for-update', () => console.log('checking-for-update'))
    autoUpdater.on('update-available', (info) => console.log('update-available', info))
    autoUpdater.on('update-not-available', () => console.log('update-not-available'))
    autoUpdater.on('update-downloaded', (info) => console.log('update-downloaded', info))
    autoUpdater.on('error', (err) => console.error('auto-updater error', err))

    // IPC channel to trigger check manually from renderer
    ipcMain.handle('check-for-updates', async () => {
      try {
        await autoUpdater.checkForUpdates()
        return { ok: true }
      } catch (e) {
        console.error('check-for-updates failed', e)
        return { ok: false, error: String(e) }
      }
    })
  } catch (e) {
    console.warn('autoUpdater init failed', e)
  }
}
