/*
npm: 包管理工具

默认registry: https://registry.npmjs.org
配置为淘宝源 https://registry.npm.taobao.org

方法一：临时
> npm --registry https://registry.npm.taobao.org install [module name]
方法二：持久使用，添加到配置文件(%appdata%/npm/etc/.npmrc)
cmd> echo registry="https://registry.npm.taobao.org" > .npmrc
查看是否配置成功
> npm config get registry
方法三：安装cnpm
> npm install -g cnpm --registry=https://regitstry.npm.taobao.org
> 添加path: %nodejs path%/node_global
> cnpm -v

npm 安装模块
> npm install [module name] （本地安装）
  npm install express 
  模块express会安装在当前工程下的node_modules目录中

> npm install [module name] -g (全局安装)
  模块会安装在node安装目录下，可以直接在命令行中使用

npm 卸载模块
> npm uninstall [module name]

npm 更新模块
> npm update [module name]

Package.json文件
npm 创建模块
npm init


*/