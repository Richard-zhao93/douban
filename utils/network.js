const network = {
  getItems: function(params) {
    var count = params.count ? params.count : 7;
    wx.request({
      url: params.url,
      data: {
        count: count
      },
      method: 'GET',
      success: function(res) {
        if (params && params.success) {
          params.success(res);
        }
      }
    })
  },
  getDetails: function(params) {
    wx.request({
      url: params.url,
      method: 'GET',
      success: function(res) {
        if (params && params.success) {
          params.success(res);
        }
      }
    })
  }
}

export {
  network
}