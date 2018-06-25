//获取App实例
const app = getApp();

Page({
  data: {
    motto: 'Hello World!',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    console.log('Index: onLoad()');
    //查看是否有用户信息内容
    if(app.globalData.userInfo) {
      console.log('当前已经有用户的信息了，直接调用即可');
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if(this.data.canIUse) {
      //当前没有用户的信息，查看当前版本是否可用button.open-type.getUserInfoAPI
      console.log('当前没有用户的信息，不过button.open-type.getUserInfo的API是可用的');
      //由于getUserInfo是网络请求，可能会在Page.onLoad之后才返回
      //所以此处加入callback以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log('加入userInfoReadyCallback获取数据');
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      }
    } else {
      //当前没有用户的信息，button也没有属性open-type=getUserInfo的问题，那需要做兼容处理
      console.log('当前没有用户的信息，button也没有属性open-type=getUserInfo的问题，那需要做兼容处理');
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }
  },
  getUserInfo: function(e) {
    console.log(e);
    console.log(e.detail.userInfo);
    //获取用户资料
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  }
});