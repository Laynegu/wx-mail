// 全局请求次数
let requestTime = 0;

const request = (params) => {

  requestTime++;

  // 请求前弹出加载等待效果
  wx.showLoading({
    title: "加载中",
    mask: true
  });

  // 提取公共请求路径
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";

  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        requestTime--;
        // 关闭加载等待效果
        if (requestTime === 0) {
          wx.hideLoading();
        }
      }
    });
  });
}

module.exports = {
  request
}
