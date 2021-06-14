const { request } = require('../../request/index')
Page({
  data: {
    classList: [],
    detailList: [],
    currentIndex: 0,
    scrollTop: 0
  },
  timeout: 10 * 1000,
  goodList: [],
  onLoad: function (options) {
    // 缓存及过期判断
    let goods = wx.getStorageSync("goods");
    if (!goods || Date.now() - goods.time > this.timeout) {
      this.getCategoryData();
    } else {
      // 使用缓存
      this.goodList = goods.data;
      this.setData({
        classList: this.getClassList(goods.data),
        detailList: this.getDetailList(goods.data[this.data.currentIndex])
      })
      // 更新缓存时间
      goods.time = Date.now();
    }
  },
  getCategoryData() {
    request({
      url: "/categories"
    })
    .then(result => {
      this.goodList = result.data.message;
      let classList = this.getClassList(this.goodList);
      let detailList = this.getDetailList(this.goodList[0]);
      this.setData({
        classList,
        detailList
      })
      // 缓存
      wx.setStorageSync("goods", {
        time: Date.now(),
        data: this.goodList
      });
    })
    .catch(err => {
      console.log("get the category data fail", err);
    })
  },
  getClassList(data) {
    return data.map(item => {
      return {
        cat_id: item.cat_id,
        cat_name: item.cat_name,
        cat_pid: item.cat_pid,
        cat_icon: item.cat_icon
      }
    })
  },
  getDetailList(data) {
    return data.children;
  },
  changCateClass(e) {
    let currentIndex = Number(e.currentTarget.dataset.index);
    this.setData({
      detailList: this.getDetailList(this.goodList[currentIndex]),
      currentIndex,
      scrollTop: 0
    })
  }
});
