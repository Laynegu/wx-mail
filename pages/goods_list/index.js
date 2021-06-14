const { request } = require('../../request/index');

Page({
  data: {
    tabs: [
      {
        id: 0,
        name: "综合",
        isActive: true
      },
      {
        id: 1,
        name: "销量",
        isActive: false
      },
      {
        id: 2,
        name: "价格",
        isActive: false
      }
    ],
    goods: []
  },
  queryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  maxPageNum: 0,
  currentTab: 0,
  onLoad: function (options) {
    this.queryParams.cid = options.cid || "";
    this.queryParams.query = options.query || "";
    this.getGoodsData();
  },
  // 上拉加载
  onReachBottom: function () {
    // 请求页数大于最大页数时不再请求
    if (this.queryParams.pagenum >= this.maxPageNum) {
      wx.showToast({
        title: '没有数据了',
        icon: 'success',
        mask: true
      });
      return;
    }
    // 请求页数加一
    this.queryParams.pagenum++;
    this.getGoodsData();
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    // 商品列表数据清空，请求页面数重置为一
    this.queryParams.pagenum = 1;
    this.setData({
      goods: []
    });
    // 重新发起请求
    this.getGoodsData(() => {
      wx.stopPullDownRefresh();
    });
  },
  handleTabsItem(e) {
    let { id } = e.detail;
    this.currentTab = id;
    this.data.tabs.forEach((item, index) => {
      if (index === id) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    });
    this.setData({
      tabs: this.data.tabs,
      goods: []
    });
    // 重发请求
    this.queryParams.pagenum = 1;
    this.getGoodsData();
  },
  getGoodsData(callback) {
    request({
      url: "/goods/search",
      data: this.queryParams
    })
      .then(result => {
        // 最大请求页面数
        this.maxPageNum = Math.ceil(result.data.message.total / this.queryParams.pagesize);
        let goods = [...this.data.goods, ...result.data.message.goods];
        switch (this.currentTab) {
          case 1:
            goods.sort((a, b) => b.goods_number - a.goods_number);
          break;
          case 2:
            goods.sort((a, b) => b.goods_price - a.goods_price);
          break;
          default:
          break;
        }
        this.setData({
          goods
        })
        // 执行回调
        callback && callback();
      })
      .catch(err => {
        console.log("get the goods data fail", err);
      })
  }
});
