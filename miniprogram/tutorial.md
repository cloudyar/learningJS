# 简易教程
---
# 基础
## 代码构成: (html + css + js + json)
1. .json 配置文件
2. .wxml 模板文件
3. .wxss 样式文件
4. .js 逻辑文件

### 1. JSON配置文件
根目录下有app.json / project.config.json

在pages/logs下有logs.json

**app.json**:当前小程序全局配置

1. 所有页面路径；
2. 界面表现；
3. 网络超时时间；
4. 底部tab；
```
{
  //所有页面路径
  "pages": [
    "pages/index/index",
    "pages/logs/logs"
  ],
  //界面表现
  "window": {
    "navigationBarTitleText": "Demo"
  },
  //底部导航Tabbar
  "tabBar": {
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页"
    }, {
      "pagePath": "pages/logs/logs",
      "text": "日志"
    }]
  },
  //网络超时
  "networkTimeout": {
    "request": 10000,
    "downloadFile": 10000
  },
  "debug": true
}
```
**page.json**:页面配置文件

### 2. WXML模板文件
wxml文件充当html文件的角色

### 3. WXSS样式文件
wxss文件充当css文件的角色
新增了尺寸单位，wxss在底层支持新的尺寸单位rpx，可以适配不同手机的屏幕

**app.wxss**：当前小程序的全局样式文件

**page.wxss**：针对某个页面的样式文件

### 4. JS交互逻辑文件
## 小程序的能力
### 小程序的启动
```
{
  "pages":[
    "pages/index/index",
    "pages/logs/logs"
  ]
}
```
pages字段的第一个页面就是打开小程序的首页，微信客户端把首页的代码装载进来，通过底层的机制渲染出这个首页

小程序启动后，在app.js定义的App实例的onLaunch回调会被执行
```
App({
	onLaunch: function() {
		//小程序启动之后触发
	}
})
```
整个小程序只有一个App实例，是全部页面共享的。
### 程序与页面
根据pages.json配置文件生成一个界面，顶部的颜色和文字都可以在这个文件预先定义好。

接着客户端会装载这个页面的WXML结构和WXSS样式

最后客户单会装载pages.js，大体内容是这样的：
```
page({
	data: { //参与页面渲染的数据
		logs: []
	},
	onLoad: function() {
		//页面渲染后执行
	}
})
```
在渲染完界面后，页面实例就会收到一个onLoad的回调，您可以在这个回调处理您的逻辑。
### 组件
```
<map></map>
```
```
<map longitude="广州经度" latitude="广州纬度"></map>
```
```
<map bindmarkertap="markertap" longitude="广州经度" latitude="广州纬度"></map>
```
### API
小程序提供了很多API供开发者使用

比如获取用户的地理位置，可以：
```
wx.getLocation({
	type: 'wgs84',
	success: (res) => {
		var latitude = res.latitude //经度
		var longitude = res.longitude //纬度
	}
})
```
调用微信扫一扫能力，可以：
```
wx.scanCode({
	success: (res) => {
		console.log(res);
	}
})
```