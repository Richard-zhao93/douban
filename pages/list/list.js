// pages/list/list.js
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
    items: [],
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var type = options.type;
    that.setData({
      type
    })
    var title ="";

    // Loading展示
    wx.showLoading({
      title: 'Loading'
    })

    if (type === "movie") {
      // 请求电影数据
      network.getItems({
        url: globalUrls.movies,
        count: 30,
        success: function(res) {
          wx.hideLoading();
          var items = res.data.videos;
          that.setData({
            items
          });
        }
      });
      title = "电影";
    } else if (type === "tv") {
      // 请求电视剧数据
      network.getItems({
        url: globalUrls.tvs,
        count: 29,
        success: function(res) {
          wx.hideLoading();
          const data = res.data.subject_collection_items;

          let tvs = [];
          for (let i = 0; i < data.length; i++) {
            let obj = new Object();
            obj.title = data[i].title;
            obj.background_url = data[i].cover.url;
            let rating = new Object();
            // rating.value = data[i].rating.value;
            obj.rating = rating;
            tvs.push(obj);
          }
          that.setData({
            items: tvs
          })
        }
      });
      title = "电视剧";
    } else if (type === "show") {
      // 请求综艺数据
      network.getItems({
        url: globalUrls.shows,
        count: 30,
        success: function(res) {
          wx.hideLoading();// 隐藏Loading
          var data = res.data.subject_collection_items;
          var shows = [];
          for (let i = 0; i < data.length; i++) {
            let obj = new Object();
            obj.title = data[i].title;
            obj.background_url = data[i].cover.url;
            let rating = new Object();
            rating.value = data[i].rating.value;
            obj.rating = rating;
            shows.push(obj);
          }
          that.setData({
            items: shows
          })
        }
      });
      title = "综艺";
    }

    wx.setNavigationBarTitle({
      title: title
    })
  }
})