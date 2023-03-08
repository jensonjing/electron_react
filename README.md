# 说明
.env文件用来配置打包的基本配置，例如端口路径

# 注意点
- 1.PUBLIC_URL需要指定为./否则使用electron-builder打包后文件路径会报错
- 2.react-router需要使用HashRouter，否则使用electron-builder打包后页面会无法正常显示