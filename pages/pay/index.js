// import { chooseAddress, showModel, showToast } from '../../utils/util';

Page({
  data: {
    cart: [],
    address: {},
    totalPrice: 0,
    accountNum: 0
  },
  // 页面显示时触发
  onShow: function () {
    let cart = wx.getStorageSync("cart") || [];
    // 过滤已被选中的商品
    cart = cart.filter(item => item.isSelect);
    // 获取地址
    let address = wx.getStorageSync("address") || {};
    let [totalPrice, accountNum] = [0, 0];
    cart.forEach(item => {
      totalPrice += item.goods_price * item.num;
      accountNum += item.num;
    });
    this.setData({
      cart,
      address,
      totalPrice,
      accountNum
    })
  },
  // 处理结算
  handlePay: async function () {
    // 判断 token 是否存在
    let token = wx.getStorageSync("token");
    if (!token) {
      // 跳转授权页面
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    // 根据 token 获取订单编号



  }
});
