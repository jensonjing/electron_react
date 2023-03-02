const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  Notification,
  Tray
} = require('electron');
// 获取系统和网络的相关信息
const os = require('os')
const si = require('systeminformation')
// 设备唯一识别码
const { machineId, machineIdSync } = require('node-machine-id')
const path = require('path');
const NODE_ENV = process.env.NODE_ENV
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'; // 屏蔽安全警告

//托盘对象
let appTray = null
let mainWindow = null
const ICO = path.join(__dirname, '../dist/icons/icon.ico'); // 打包后系统托盘图标
const nIcon = path.join(__dirname, '../dist/icons/64x64_n.ico'); // 打包后的系统托盘图标（闪烁用）

//解决10.X版本跨域不成功问题(上线删除)
// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
Menu.setApplicationMenu(null); // 去除左上角菜单

function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    fullscreen: false, // 是否默认全屏
    width: 1200,
    height: 800,
    icon: NODE_ENV === 'development' ? path.join(__dirname, '../public/icons/icon.ico') : ICO, // 左上角图标
    center: true,
    frame: false, // 设置为 false 时可以创建一个无边框窗口
    // titleBarStyle: 'hiddenInset', // 隐藏标题栏 - mac
    webPreferences: {
      nodeIntegration: true, // 是否启用Node integration
      enableRemoteModule: true, // 设置为true，否则不允许在渲染器上使用remote
      contextIsolation: false, // 是否在独立 JavaScript 环境中运行 Electron API
      preload: path.join(__dirname, 'preload.js'),
      // webSecurity: false // 是否禁用同源策略(上线时删除此配置)
    }
  })

  // 配置热更新
  mainWindow.loadURL(NODE_ENV === 'development' ? 'http://localhost:3000' : `file://${path.join(__dirname, '../dist/index.html')}`)

  // 打开调试
  if (NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  });

  // windows增加右下角图标菜单
  if (process.platform === 'win32') {
    // 设置托盘图标和菜单
    const trayMenuTemplate = [
      {
        label: '打开',
        click: () => {
          mainWindow.show();
        }
      },
      {
        label: '退出',
        click: () => {
          app.quit();
          app.quit();//因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
        }
      }
    ];
    //系统托盘图标
    appTray = process.env.NODE_ENV === 'development' ? new Tray('public/icons/icon.ico') : new Tray(ICO);
    //图标的上下文菜单
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    //设置此托盘图标的悬停提示内容
    appTray.setToolTip('我的托盘图标');
    //设置此图标的上下文菜单
    appTray.setContextMenu(contextMenu);
    //单击右下角小图标显示应用左键
    appTray.on('click',function(){
      mainWindow.show();
    })
    //右键
    appTray.on('right-click', () => {
      appTray.popUpContextMenu(trayMenuTemplate);
    });

    // 设置托盘图标闪烁
    let flag = true;
    let timer = null;
    if(timer) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      if (flag) {
        appTray.setImage(nIcon);
        flag = false
      } else {
        appTray.setImage(ICO);
        flag = true
      }
    }, 600)
    appTray.on('click', () => {
      if(timer) {
        clearInterval(timer);
        timer = null;
        flag = true
        appTray.setImage(ICO);
      }
    });
  }

  // 增加消息通知
  const isNofico = Notification.isSupported();
  if (isNofico) {
    const nofication = new Notification({
      title: '通知',
      body: '所有人放假！',
      silent: true, // 在显示通知时是否发出系统提示音
      timeoutType: 'default', // 通知的超时持续时间
      // sound: '', // 声音文件名称
    })
    setTimeout(() => {
      nofication.show();
    }, 5000)
  }

  // 向渲染进程发送消息
  netInfo()
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {  
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 限制只能启动一个应用
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore()
      }
      mainWindow.focus()
      mainWindow.show()
    }
  })
}

// 监听渲染进程的事件
ipcMain.on('close', (e, args) => {
  const { type, msg } = args
  switch(type) {
    case 1: // 隐藏到托盘
      mainWindow.hide()
      break;
    case 2: // 最小化
      mainWindow.minimize()
      break;
    case 3: // 最大化
      mainWindow.maximize()
      break;
    case 4: // 还原
      mainWindow.restore()
      break;
    case 5: // 关闭
      app.quit()
      break;
    default:
      break;
  };
})
// 监听拖拽
ipcMain.on('move-application',(event, pos) => {
  mainWindow.setPosition(pos.posX,pos.posY)
})

// 获取网络信息+设备信息
function netInfo() {
  Promise.all([
    machineId({ origin: true }), // p1
    si.networkInterfaceDefault(), // p2
    si.networkGatewayDefault(), // p3
    si.networkInterfaces(), // p4
    si.networkStats() // p5
  ]).then(([p1, p2, p3, p4, p5]) => {
    const params = {
      '操作系统主机名': os.hostname(),
      '操作系统类型': os.platform(),
      '操作系统版本': os.release(),
      '系统总内存': os.totalmem(),
      '机器唯一识别码': p1,
      '连接网络方式': p2,
      '连接的ip地址': p3,
      '延迟': p4[0].carrierChanges,
      '类型': p4[0].type === 'wired' ? `有线网` : `无线网`,
      '方式及速度': p4[0].operstate === 'up' ? `上传速度：${p4[0].speed}MB/s` : `下载速度：${p4[0].speed}MB/s`,
      ...p4,
      ...p5
    }
    // 向渲染进程发送信息
    mainWindow.webContents.send('netosInfo', {
      ...params
    })
  })
}