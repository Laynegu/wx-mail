Page({
  data: {
    userInfo: {}
  },
  onShow: function(){
    
  },
  login(e) {
    this.setData({
      userInfo: e.detail.userInfo
    })
  }
});
