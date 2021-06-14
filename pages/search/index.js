const { request } = require('../../request/index');
import { throttle } from '../../utils/util';

Page({
  data: {
    goods: [],
    isShowBtn: false,
    inputVal: ""
  },
  onShow: function () {
    this.inputFunc = throttle(this.goodsSearch, 500);
  },
  handleInput(e) {
    this.inputFunc(e);
  },
  // 搜索处理
  async goodsSearch(event) {
    let { value } = event.detail;
    if (!value.trim()) {
      // 处理无效输入
      // 重置数据
      this.setData({
        goods: [],
        isShowBtn: false
      })
      return;
    }
    this.setData({
      isShowBtn: true
    })
    // 发送请求获取数据
    const goods = await this.getSearchData(value);
    this.setData({
      goods
    })
  },
  // 搜索数据请求
  async getSearchData(query) {
    try {
      const res = await request({
        url: "/goods/qsearch",
        data: {query}
      });
      return res.data.message;
    } catch (error) {
      console.log(error);
    }
  },
  // 取消搜索
  cancelSearch() {
    // 重置数据
    this.setData({
      goods: [],
      isShowBtn: false,
      inputVal: ""
    })
  }
});
