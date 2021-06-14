const { request } = require('../../request/index');
Page({
  data: {
    goodsMesg: {},
    isCollect: false
  },
  goodsDetails: {},
  onLoad: function (options) {
    this.getGoodDetail(options.goods_id);
  },
  getGoodDetail: function (id) {
    request({
      url: "/goods/detail",
      data: {
        goods_id: id
      }
    })
      .then(result => {
        this.goodsDetails = result.data.message;
        let {
          goods_id,
          goods_name,
          goods_price,
          goods_introduce,
          pics,
        } = result.data.message;
        this.setData({
          goodsMesg: {
            goods_id,
            goods_name,
            goods_price,
            goods_introduce,
            pics,
          }
        })
      })
      .catch(err => {
        console.log("get the goods detail data fail", err);
      })
  },
  enlargeImg(e) {
    let { index } = e.currentTarget.dataset;
    const imgArr = this.data.goodsMesg.pics.map(item => item.pics_big_url);
    // 点击预览图片
    wx.previewImage({
      current: imgArr[index],
      urls: imgArr
    });
  },
  collect() {
    let collect = this.data.isCollect;
    let store = wx.getStorageSync("collection") || [];
    if (collect) {
      // 取消收藏
      let targetIndex = store.findIndex(val => val.goods_id === this.goodsDetails.goods_id);
      store.splice(targetIndex, 1);
    } else {
      // 点击收藏
      store.push(this.goodsDetails);
    }
    wx.setStorageSync("collection", store);
    this.setData({
      isCollect: !collect
    });
    // 弹框提示
    wx.showToast({
      title: !collect? '已收藏' : '取消收藏',
      icon: 'success',
      duration: 1500,
      mask: true
    });
  },
  addGoods() {
    // 点击加入购物车
    let cart = wx.getStorageSync("cart") || [];  
    let targetIndex = cart.findIndex(val => val.goods_id === this.goodsDetails.goods_id);
    if (targetIndex === -1) {
      // 未添加
      this.goodsDetails.num = 1;
      this.goodsDetails.isSelect = true;
      cart.push(this.goodsDetails);
    } else {
      // 添加数量加一
      cart[targetIndex].num++;
    }
    wx.setStorageSync("cart", cart);
    // 弹框提示
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 1500,
      mask: true
    });
  }
});
