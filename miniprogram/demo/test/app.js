App({
  onLaunch: function() {
    console.log('onLaunch');
    //本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    //调用接口wx.login() 获取临时登录凭证（code）
    wx.login();
    //获取用户信息
    wx.getSetting({
      success: res => {
        //用户已经授权的情况下，直接调用信息
        if(res.authSetting['scope.userInfo']) {
          console.log('用户授权获取信息，直接调用信息');
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo;
              if(this.userInfoReadyCallback) {
                console.log('app userInfoReadyCallback()');
                this.userInfoReadyCallback(res);
              }
            }
          });
        } else {
          console.log('用户还没授权获取信息，需要点击界面按钮去获取授权');
        }
      }
    });
  },
  globalData: {
    userInfo: null
  }
});