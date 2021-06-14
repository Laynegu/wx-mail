// 封装异步处理操作
export const showModel = (title, content) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: title || '提示',
      content,
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        resolve(result.confirm);
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result)=>{
        resolve(result);
      },
      fail: (err)=>{
        reject(err);
      }
    });
  })
}

export const showToast = (title, icon) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title,
      icon: icon || 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result)=>{
        resolve(result);
      },
      fail: (err)=>{
        reject(err);
      }
    });
  })
}

export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout:10000,
      success: (result)=>{
        resolve(result);
      },
      fail: (err)=>{
        reject(err);
      }
    });
  })
}

// 防抖函数
export function throttle(task, wait, ...args) {
  const time = wait || 1000,
  fn = task || function() {};
  let params = args;
  let timeId;

  function res() {
    if (timeId) {
      clearTimeout(timeId);
    }
    let args = Array.prototype.slice.call(arguments);
    timeId = setTimeout(() => {
      fn.apply(null, args.concat(params));
      clearTimeout(timeId);
    }, time);
  }

  return res;

}
