const electron = require('electron');
// 控制应用生命周期的模块
const {app, Menu} = electron;
// 创建本地浏览器窗口的模块
const {BrowserWindow} = electron;
// 指向窗口对象的一个全局引用，如果没有这个引用，那么当该javascript对象被垃圾回收的
// 时候该窗口将会自动关闭
let win;

function createWindow() {
  // 创建一个新的浏览器窗口
  win = new BrowserWindow({kiosk:true});//570+50
  win.setMenu(null);
  // 并且装载应用的index.html页面
  win.loadURL(`file:///${__dirname}/electron/index.html`)
  // 打开开发工具页面
  win.webContents.openDevTools();
  // 当窗口关闭时调用的方法
  win.on('closed', () => {
    // 解除窗口对象的引用，通常而言如果应用支持多个窗口的话，你会在一个数组里
    // 存放窗口对象，在窗口关闭的时候应当删除相应的元素。
    win = null;
  });
}

// 当Electron完成初始化并且已经创建了浏览器窗口，则该方法将会被调用。
// 有些API只能在该事件发生后才能被使用。
app.on('ready', createWindow);

// 当所有的窗口被关闭后退出应用
app.on('window-all-closed', () => {
  // 对于OS X系统，应用和相应的菜单栏会一直激活直到用户通过Cmd + Q显式退出
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 对于OS X系统，当dock图标被点击后会重新创建一个app窗口，并且不会有其他
  // 窗口打开
  if (win === null) {
    createWindow();
  }
});

//通信模块，mian process与renderer process（web page）
const {ipcMain} = require('electron')
//监听web page里发出的message
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log("mian1" + arg)  // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')//在main process里向web page发出message
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log("mian2" + arg)  // prints "ping"
  event.returnValue = 'pong'
})
// const template = [
//   {
//     label: 'Edit',
//     submenu: [
//       {role: 'undo'},
//       {role: 'redo'},
//       {type: 'separator'},
//       {role: 'cut'},
//       {role: 'copy'},
//       {role: 'paste'},
//       {role: 'pasteandmatchstyle'},
//       {role: 'delete'},
//       {role: 'selectall'}
//     ]
//   },
//   {
//     label: 'View',
//     submenu: [
//       {role: 'reload'},
//       {role: 'forcereload'},
//       {role: 'toggledevtools'},
//       {type: 'separator'},
//       {role: 'resetzoom'},
//       {role: 'zoomin'},
//       {role: 'zoomout'},
//       {type: 'separator'},
//       {role: 'togglefullscreen'}
//     ]
//   },
//   {
//     role: 'window',
//     submenu: [
//       {role: 'minimize'},
//       {role: 'close'}
//     ]
//   },
//   {
//     role: 'help',
//     submenu: [
//       {
//         label: 'Learn More',
//         click () { require('electron').shell.openExternal('https://electron.atom.io') }
//       }
//     ]
//   }
// ]

// if (process.platform === 'darwin') {
//   template.unshift({
//     label: app.getName(),
//     submenu: [
//       {role: 'about'},
//       {type: 'separator'},
//       {role: 'services', submenu: []},
//       {type: 'separator'},
//       {role: 'hide'},
//       {role: 'hideothers'},
//       {role: 'unhide'},
//       {type: 'separator'},
//       {role: 'quit'}
//     ]
//   })

//   // Edit menu
//   template[1].submenu.push(
//     {type: 'separator'},
//     {
//       label: 'Speech',
//       submenu: [
//         {role: 'startspeaking'},
//         {role: 'stopspeaking'}
//       ]
//     }
//   )

//   // Window menu
//   template[3].submenu = [
//     {role: 'close'},
//     {role: 'minimize'},
//     {role: 'zoom'},
//     {type: 'separator'},
//     {role: 'front'}
//   ]
// }

// const menu = Menu.buildFromTemplate(template)
// Menu.setApplicationMenu(menu)