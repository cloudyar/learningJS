## 微信小程序的userInfoReadyCallback相关解释
1. userInfoReadyCallback函数方法是在page.onload中定义的；
2. 如果userInfoReadyCallback方法被定义了，说明page.onload比当前方法运行的要早(page已经完成初始化),app的globalData还没有数据，通过此回调去及时刷新数据；
3. 如果userInfoReadyCallback方法没有被定义，说明page.onload比当前方法运行的晚(page还没完成初始化),app的globalData是有值的，可以在page.onload中取globalData的值。
```
//app.js
wx.getSetting({
	success: res => {
		if(res.authSetting['scope.userInfo']) {
			wx.getUserInfo({
				success: res => {
					this.globalData.userInfo = res.userInfo
					if(this.userInfoReadyCallback) {
						//userInfoReadyCallback方法有定义
						//说明这一步是比page.onload执行慢
						//page中userInfo没有数据
						//需要这一步刷新数据
						this.userInfoReadyCallback(res);
					}
				}
			});
		}
	}
});
```
```
    onLoad: function () {  
      if (app.globalData.userInfo) {
      	//app.glbalData.userInfo有数据
        this.setData({  
          userInfo: app.globalData.userInfo,  
          hasUserInfo: true  
        })  
      } else if (this.data.canIUse){
      	//app.globalData.userInfo没有数据
      	//有可能是page.onLoad执行太快，所以给app.js定义一个方法
      	//userInfoReadyCallback,待会app中getUserInfo()执行了会
      	//调用该函数，从而可以给app.globalData.userInfo赋值
        app.userInfoReadyCallback = res => {  
          this.setData({  
            userInfo: res.userInfo,  
            hasUserInfo: true  
          })  
        }  
      } else {  
        // 在没有 open-type=getUserInfo 版本的兼容处理  
        wx.getUserInfo({  
          success: res => {  
            app.globalData.userInfo = res.userInfo  
            this.setData({  
              userInfo: res.userInfo,  
              hasUserInfo: true  
            })  
          }  
        })  
      }  
    }  
```
总体来说userInfoReadyCallback函数的作用，就是保证页面的userInfo和hasUserInfo被正确赋值，无论用户信息在页面加载完成之前还是之后返回。