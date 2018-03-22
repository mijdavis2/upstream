'use strict'

import { app, BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater'
const log = require('electron-log')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  const shouldShow = true
  mainWindow = new BrowserWindow({
    height: 1000,
    useContentSize: true,
    width: 1434,
    show: false,
    fullscreen: process.env.NODE_ENV !== 'development'
  })

  mainWindow.loadURL(winURL)

  // workaround to fix weird scroll behavior
  mainWindow.on('ready-to-show', () => {
    if (shouldShow) {
      mainWindow.show()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// const { Menu } = require('electron')

const template = [
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://electron.atom.io') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  })

  // Edit menu
  template[1].submenu.push(
    {type: 'separator'},
    {
      label: 'Speech',
      submenu: [
        {role: 'startspeaking'},
        {role: 'stopspeaking'}
      ]
    }
  )

  // Window menu
  template[3].submenu = [
    {role: 'close'},
    {role: 'minimize'},
    {role: 'zoom'},
    {type: 'separator'},
    {role: 'front'}
  ]
}

// const menu = Menu.buildFromTemplate(template)
// Menu.setApplicationMenu(menu)

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */
autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})

log.info('App starting...')
//
// let win
//
function sendStatusToWindow (text) {
  log.info(text)
  // win.webContents.send('message', text)
}
// function createDefaultWindow () {
//   win = new BrowserWindow()
//   win.webContents.openDevTools()
//   win.on('closed', () => {
//     win = null
//   })
//   win.loadURL(`file://${__dirname}/version.html#v${app.getVersion()}`)
//   return win
// }
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...')
})
autoUpdater.on('update-available', (ev, info) => {
  sendStatusToWindow('Update available.')
})
autoUpdater.on('update-not-available', (ev, info) => {
  sendStatusToWindow('Update not available.')
})
autoUpdater.on('error', (ev, err) => {
  sendStatusToWindow('Error in auto-updater.')
})
autoUpdater.on('download-progress', (ev, progressObj) => {
  sendStatusToWindow('Download progress...')
})
autoUpdater.on('update-downloaded', (ev, info) => {
  sendStatusToWindow('Update downloaded will install in 5 seconds')
})
// app.on('ready', function () {
//   // Create the Menu
//   const menu = Menu.buildFromTemplate(template)
//   Menu.setApplicationMenu(menu)
//
//   createDefaultWindow()
// })
// app.on('window-all-closed', () => {
//   app.quit()
// })

const { dialog } = require('electron')

let updater
autoUpdater.autoDownload = false

autoUpdater.on('error', (error) => {
  dialog.showErrorBox('Error: ', error == null ? 'unknown' : (error.stack || error).toString())
})

autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Found Updates',
    message: 'Found updates, do you want update now?',
    buttons: ['Sure', 'No']
  }, (buttonIndex) => {
    if (buttonIndex === 0) {
      autoUpdater.downloadUpdate()
    } else {
      updater.enabled = true
      updater = null
    }
  })
})

autoUpdater.on('update-not-available', () => {
  dialog.showMessageBox({
    title: 'No Updates',
    message: 'Current version is up-to-date.'
  })
  updater.enabled = true
  updater = null
})

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    title: 'Install Updates',
    message: 'Updates downloaded, application will be quit for update...'
  }, () => {
    setImmediate(() => autoUpdater.quitAndInstall())
  })
})

// export this to MenuItem click callback
function checkForUpdates (menuItem, focusedWindow, event) {
  // updater = menuItem
  // updater.enabled = false
  autoUpdater.checkForUpdates()
}
module.exports.checkForUpdates = checkForUpdates
