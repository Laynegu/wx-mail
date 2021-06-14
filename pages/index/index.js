//Page Object
const { request } = require('../../request/index')

Page({
  data: {
    swiperList: [],
    navList: [],
    floorList: []
  },
  //options(Object)
  onLoad: function (options) {
    this.getSwiperList();
    this.getNavList();
    this.getFloorList();
  },
  getSwiperList() {
    request({
      url: '/home/swiperdata'
    }).then(result => {
      this.setData({
        swiperList: result.data.message
      })
    }).catch(err => {
      console.log("get the swiper data failly", err);
    })
  },
  getNavList() {
    request({
      url: '/home/catitems'
    }).then(result => {
      this.setData({
        navList: result.data.message
      })
    }).catch(err => {
      console.log("get the nav data failly", err);
    })
  },
  getFloorList() {
    request({
      url: '/home/floordata'
    }).then(result => {
      let floorList = result.data.message;
      floorList.forEach(item => {
        item["product_list"].forEach(ele => {
          ele["navigator_url"] = ele["navigator_url"].split("?")[1];
        })
      });
      this.setData({
        floorList
      })
    }).catch(err => {
      console.log("get the floor data failly", err);
    })
  },
});
