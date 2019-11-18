// pages/search/search.js
import {network} from '../../utils/network.js'
import { globalUrls } from '../../utils/urls.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchData: [],
    histories: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'searched',
      success: function(res) {
        var data = res.data
        that.setData({
          histories: data
        })
      },
    })
  },
  onShow: function() {
    var that = this;
    wx.getStorage({
      key: 'searched',
      success: function (res) {
        var data = res.data
        that.setData({
          histories: data
        })
      },
    })
    
    that.setData({
      searchData: []
    })
  },

  // 搜索事件触发请求
  onSearchInputEvent: function (event) {
    var that = this;
    var value = event.detail.value;
    var url = globalUrls.searchUrl('movie', value);
    network.getDetails({
      url: url,
      success: function(res) {
        console.log(res)
        var data = res.data.subjects;
        that.setData({
          searchData: data
        })
      }
    })
  },

  onItemTapEvent: function (event) {
    var that =this;


    var id = event.currentTarget.dataset.id;
    var title = event.currentTarget.dataset.title;

    var histories = that.data.histories;
    var isExisted = false;
    if (histories) {
      for (var i = 0; i < histories.length; i++) {
        var movie = histories[i];
        if (movie.id === id) {
          isExisted = true;
          break;
        }
      }
    }
    
    if (!isExisted) {
      if (!histories) {
        histories= [];
      }
      histories.push({ id: id, title: title });
      // 将数据存储在本地
      wx.setStorage({
        key: 'searched',
        data: histories,
      })
    }

    wx.navigateTo({
      url: '/pages/detail/detail?type=movie&id=' + id,
    })
  },

  // 清除历史记录
  onClearEvent: function(event) {
    wx.removeStorage({
      key: 'searched'
    })

    this.setData({
      histories: []
    })
  }
})