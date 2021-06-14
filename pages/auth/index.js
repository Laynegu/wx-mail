import { login } from '../../utils/util';
const { request } = require('../../request/index');

Page({
  data: {

  },
  async getUserInfo(e) {
    const { encryptedData, rawData, iv, signature } = e.detail;
    // 获取登录信息
    const { code } = await login();
    // 获取 token
    const res = await request({
      url: "users/wxlogin",
      method: "POST",
      data: {
        encryptedData,
        rawData,
        iv,
        signature,
        code
      }
    })
    const { token } = res.data;
    wx.setStorageSync("token", token);
    wx.navigateBack({
      delta: -1
    });
  }
});
