// pages/comment/comment.js
import {
  network
} from '../../utils/network.js'
import {
  globalUrls
} from '../../utils/urls.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    comment: {},
    start: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData(options);
    that.getComments(1);
    that.setData({
      start: 1,
      count: 20
    });

    
  },

  onShow: function() {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },

  getComments: function(start) {
    var that = this;
    var url = "";
    var type = that.data.type;
    var id = that.data.id;
    if (type === "movie") {
      url = globalUrls.movieCommentsUrl(id, start, 20);
    } else if (type === "tv") {
      url = globalUrls.tvCommentsUrl(id, start, 20);
    } else if (type === "show") {
      url = globalUrls.showCommentsUrl(id, start, 20);
    }

    // 评论数据获取
    network.getDetails({
      url: url,
      success: function(res) {
        // 回到页面头部
        wx.pageScrollTo({
          scrollTop: 0,
        })
        wx.hideLoading(); // 隐藏Loading
        var comment = res.data;
        that.setData({
          comment
        })
      }
    })
  },

  onItemtapEvent: function(event) {
    wx.navigateBack({});// 回到上一页
  },

  onPrePageTap: function(event) {
    var that = this;
    var oldStart = that.data.start;
    var count = that.data.count;
    if (oldStart - count > 0) {
      var start = oldStart - count;
      this.setData({
        start: start
      })
      that.getComments(start);
    }
  },

  onNextPageTap: function(event) {
    var that = this;
    var oldStart = that.data.start;
    var start = oldStart + that.data.count;
    this.setData({
      start: start
    })
    that.getComments(start);
  }
})