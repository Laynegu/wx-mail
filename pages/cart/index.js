import { chooseAddress, showModel, showToast } from '../../utils/util';

Page({
  data: {
    cart: [],
    address: {},
    totalPrice: 0,
    accountNum: 0,
    isAllSelect: true,
    isAllSelectDisable: false
  },
  // 页面显示时触发
  onShow: function () {
    let cart = wx.getStorageSync("cart") || [];
    this.setPageData(cart);
  },
  // 封装页面数据统一处理
  setPageData: function (cart) {
    let [totalPrice, accountNum] = [0, 0];
    let isAllSelect = true;
    cart.forEach(item => {
      if (item.isSelect) {
        totalPrice += item.goods_price * item.num;
        accountNum += item.num;
      } else {
        isAllSelect = false;
      }
    });
    let isAllSelectDisable = cart.length === 0;
    this.setData({
      cart,
      totalPrice,
      accountNum,
      isAllSelect,
      isAllSelectDisable
    })
  },
  // 全选或全不选
  changeAllCheck() {
    let isAllSelect = !this.data.isAllSelect;
    const { cart } = this.data;
    cart.forEach(item => item.isSelect = isAllSelect);
    this.setPageData(cart);
  },
  // 单独商品选择
  changeCheck(e) {
    const { index } = e.currentTarget.dataset;
    const { cart } = this.data;
    cart[index].isSelect = !cart[index].isSelect;
    this.setPageData(cart);
  },
  // 商品数量减一
  decreaseGood: async function(e) {
    const { index } = e.currentTarget.dataset;
    const { cart } = this.data;
    if (cart[index].num === 0) {
      // 提示是否删除商品
      try {
        const isdelGood = await showModel('提示', '是否删除该商品');
        if (isdelGood) {
          cart.splice(index, 1);
          this.setPageData(cart);
        }
      } catch (error) {
        console.log(error);
      }
      return;
    }
    cart[index].num--;
    this.setPageData(cart);
  },
  // 商品数量加一
  inceraseGood(e) {
    const { index } = e.currentTarget.dataset;
    const { cart } = this.data;
    cart[index].num++;
    this.setPageData(cart);
  },
  // 增加收货地址
  addAddress: async function() {
    try {
      const result = await chooseAddress();
      const {
        provinceName,
        cityName,
        countyName,
        detailInfo,
        userName,
        telNumber
      } = result;
      const address = {
        userName,
        userAddress: provinceName + cityName + countyName + detailInfo,
        telNumber
      }
      this.setData({ address });
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error);
    }
  },
  // 处理结算
  handleAccount: async function() {
    const {address, accountNum, cart} = this.data;
    if (!address.userName) {
      await showToast('请选择收货地址！');
      return;
    }
    if (accountNum === 0) {
      await showToast('请添加商品！');
      return;
    }
    wx.setStorageSync("cart", cart);
    // 跳转支付页面
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }
});
