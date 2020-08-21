const {
    app,
    BrowserWindow
}=require('electron');

/**
 *安装electron-is-dev库，判断是否是开发环境 
 */
//使用
const isDev = require('electron-is-dev');
const winURL = isDev ? 'http://localhost:3000':`file://${path.join(__dirname, './index.html')}`;

let mainWindow;

function createWindow () {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 750,
        width: 1100,
        center: true, // 是否出现在屏幕居中的位置
        useContentSize: true,
        frame:true,//设置为 false 时可以创建一个无边框窗口
        resizable:true,//窗口是否可以改变尺寸
        autoHideMenuBar:true,//是否隐藏菜单栏
        backgroundColor:'#fff',// 窗口的背景颜色为十六进制值
        titleBarStyle:'hidden',//窗口标题栏的样式
        webPreferences:{//网页功能的设置
            nodeIntegration: true,//是否集成node
            devTools:true,//是否开启 DevTools
            // webSecurity: false//是否禁用同源策略(上线删除)
        }
    });

    mainWindow.loadURL(winURL);
    // mainWindow.webContents.openDevTools();//打包后可打开调试窗口
  
    mainWindow.on('closed', () => {
      mainWindow = null
    });
  
    // //系统托盘图标
    // if(process.platform === 'win32'){
    //   //设置托盘图标和菜单
    //   var trayMenuTemplate = [
    //     {
    //       label: '打开',
    //       click: () => {
    //         mainWindow.show();
    //         mainWindow.webContents.send('changeWin',1);
    //       }
    //     },
    //     {
    //       label: '退出',
    //       click: () => {
    //         app.quit();
    //         app.quit();//因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
    //       }
    //     }
    //   ];
    //   appTray = process.env.NODE_ENV === 'development'?new Tray('build/icons/icon.ico'):new Tray(`${__dirname}/static/images/icon.ico`);
    //   //图标的上下文菜单
    //   const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    //   //设置此托盘图标的悬停提示内容
    //   appTray.setToolTip('葵花宝典v'+config.version);
    //   //设置此图标的上下文菜单
    //   appTray.setContextMenu(contextMenu);
    //   //单击右下角小图标显示应用左键
    //   appTray.on('click',function(){
    //     mainWindow.show();
    //     mainWindow.webContents.send('changeWin',1);
    //   });
    //   //右键
    //   appTray.on('right-click', () => {
    //     appTray.popUpContextMenu(trayMenuTemplate);
    //   });
    // };
  
    // 手动更新
    // if (!updateStatus) return;
    // let randStr = Date.parse(new Date()) +Math.random().toString(36).substr(2);
    // /*
    // * 说明：这里是通过请求服务器的pubversion.json文件以获取其版本号具体路径可自行修改，这里路径为http://xxx/downloads/pubversion.json
    // * 这里randStr是为了防止浏览器缓存
    // */
    // axios.get(`${config.app}/downloads/pubversion.json?${randStr}`).then(function (res) {
    //   mainWindow.webContents.once('dom-ready', () => {
    //     mainWindow.webContents.send('new-version', res.data)
    //   })
    // }).catch(function (error) {
    //   console.log(error);
    // });
    // updateStatus = false;
};

app.on('ready',createWindow);
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