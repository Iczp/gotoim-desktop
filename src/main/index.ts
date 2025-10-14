import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import logger from 'electron-log'
// import * as dotenv from 'dotenv'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  // In development, open the renderer URL in the default browser instead
  // of creating an Electron BrowserWindow. This keeps main process running
  // while using the system browser for UI.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    const devUrl = process.env['ELECTRON_RENDERER_URL'] as string
    // open in default system browser
    // shell.openExternal(devUrl)
    console.log('devUrl', devUrl)
    // return
  }

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

const appUpdater = () => {
  // Auto updater: during development point to local test server
  try {
    if (is.dev) {
      autoUpdater.setFeedURL({ provider: 'generic', url: 'http://localhost:8080/auto-updates' })
    }
    autoUpdater.addAuthHeader('Bearer xxxxxx')

    autoUpdater.forceDevUpdateConfig = true

    //  强制更新程序
    autoUpdater.logger = logger
    // autoUpdater.logger.transports.file.level = 'info'

    autoUpdater.checkForUpdatesAndNotify()

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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // console.log('process.env', process.env)

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.gotoim.app')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  appUpdater()

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
