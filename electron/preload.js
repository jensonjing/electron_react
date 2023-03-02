// 所有Node.js API都可以在预加载过程中使用。
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) {
      element.innerText = text
    }
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
  // 适用于全屏展示，但又不想在渲染进程中操作主进程
  const path = require('path');
  const NODE_ENV = process.env.NODE_ENV
  const minIn = path.join(__dirname, '../dist/icons/min1.png');
  const maxIn1 = path.join(__dirname, '../dist/icons/max1.png');
  const maxIn3 = path.join(__dirname, '../dist/icons/max3.png');
  const closeIn = path.join(__dirname, '../dist/icons/close.png');
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf(' electron/') !== -1) {
    const { ipcRenderer } = require('electron');
    const first = document.body.firstChild
    const dv = document.createElement('div');
    dv.style.position = 'fixed';
    dv.style.width = '100vw';
    dv.style.textAlign = 'right';
    dv.style.top = '0px';
    dv.style.right = '0px';
    dv.style.zIndex = '5';
    dv.style.appRegion = 'drag' // 允许窗口拖拽
    // 最小化图标
    const smdv = document.createElement('img');
    smdv.setAttribute('src', NODE_ENV === 'development' ? '/icons/min1.png' : minIn);
    smdv.style.width = '15px';
    smdv.style.marginRight = '5px';
    smdv.style.padding = '6px';
    smdv.style.cursor = 'pointer';
    smdv.style.appRegion = 'no-drag' // 取消拖拽,恢复点击事件窗口拖拽
    smdv.onmouseover = () => {
      smdv.style.backgroundColor = '#ccc';
    }
    smdv.onmouseleave = () => {
      smdv.style.backgroundColor = 'transparent';
    }
    smdv.onclick = () => {
      ipcRenderer.send('close', { type: 2, msg: '最小化'})
    }
    dv.appendChild(smdv);
    // 最大化图标
    const bigdv = document.createElement('img');
    bigdv.setAttribute('src', NODE_ENV === 'development' ? '/icons/max1.png' : maxIn1);
    bigdv.style.width = '15px';
    bigdv.style.marginRight = '5px';
    bigdv.style.padding = '6px';
    bigdv.style.cursor = 'pointer';
    bigdv.style.appRegion = 'no-drag' // 取消拖拽,恢复点击事件窗口拖拽
    bigdv.onmouseover = () => {
      bigdv.style.backgroundColor = '#ccc';
    }
    bigdv.onmouseleave = () => {
      bigdv.style.backgroundColor = 'transparent';
    }
    bigdv.onclick = () => {
      ipcRenderer.send('close', { type: 3, msg: '最大化'})
      bigdv.style.display = 'none';
      resetdv.style.display = 'inline-block';
    }
    dv.appendChild(bigdv);
    // 还原图标
    const resetdv = document.createElement('img');
    resetdv.setAttribute('src', NODE_ENV === 'development' ? '/icons/max3.png' : maxIn3);
    resetdv.style.width = '15px';
    resetdv.style.marginRight = '5px';
    resetdv.style.padding = '6px';
    resetdv.style.cursor = 'pointer';
    resetdv.style.display = 'none';
    resetdv.style.appRegion = 'no-drag' // 取消拖拽,恢复点击事件窗口拖拽
    resetdv.onmouseover = () => {
      resetdv.style.backgroundColor = '#ccc';
    }
    resetdv.onmouseleave = () => {
      resetdv.style.backgroundColor = 'transparent';
    }
    resetdv.onclick = () => {
      ipcRenderer.send('close', { type: 4, msg: '还原'})
      resetdv.style.display = 'none';
      bigdv.style.display = 'inline-block';
    }
    dv.appendChild(resetdv);
    // 关闭图标
    const closedv = document.createElement('img');
    closedv.setAttribute('src', NODE_ENV === 'development' ? '/icons/close.png' : closeIn);
    closedv.style.width = '15px';
    closedv.style.marginRight = '5px';
    closedv.style.padding = '6px';
    closedv.style.cursor = 'pointer';
    closedv.style.appRegion = 'no-drag' // 取消拖拽,恢复点击事件窗口拖拽
    closedv.onmouseover = () => {
      closedv.style.backgroundColor = '#ccc';
    }
    closedv.onmouseleave = () => {
      closedv.style.backgroundColor = 'transparent';
    }
    closedv.onclick = () => {
      ipcRenderer.send('close', { type: 5, msg: '关闭'})
    }
    dv.appendChild(closedv);
    // const cv = document.createElement('button');
    // cv.innerHTML = '关闭';
    // cv.style.appRegion = 'no-drag' // 取消拖拽,恢复点击事件窗口拖拽
    // cv.onclick = () => {
    //   ipcRenderer.send('close', { type: 5, msg: '关闭'})
    // }
    // dv.appendChild(cv);
    document.body.insertBefore(dv, first)
    /**
     * 自定义拖拽窗口
     * 拖拽幅度太大会导致卡顿，出现拖拽位置不准确现象
     * 不建议使用
     */
    // let flag = false;
    // let startX = 0;
    // let startY = 0;
    // dv.onmousedown = (e) => {
    //   flag = true;
    //   startX = e.x;
    //   startY = e.y;
    // }
    // dv.onmousemove = (e) => {
    //   if (flag) {
    //     const x = e.screenX - startX
    //     const y = e.screenY - startY
    //     ipcRenderer.send('move-application',{
    //       posX: x,
    //       posY: y
    //     })
    //   }
    // }
    // dv.onmouseup = (e) => {
    //   flag = false
    // }
  }
})