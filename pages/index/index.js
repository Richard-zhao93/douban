//index.js
import {
  network
} from '../../utils/network.js'
import {
  globalUrls
} from '../../utils/urls.js'

const app = getApp()

Page({
  data: {
    movies: [],
    tvs: [],
    shows: []
  },

  onLoad: function() {
    var that = this;
    // Loading展示
    wx.showLoading({
      title: 'Loading'
    })

    // 请求电影数据
    network.getItems({
      url: globalUrls.movies,
      count: 7,
      success: function(res) {
        var movies = res.data.videos;
        that.setData({
          movies
        })
      }
    });

    // 请求电视剧数据
    network.getItems({
      url: globalUrls.tvs,
      count: 7,
      success: function(res) {
        var data = res.data.subject_collection_items;
        var tvs = [];
        for (var i = 0; i < data.length; i++) {
          let obj = new Object();
          obj.id = data[i].id;
          obj.title = data[i].title;
          obj.background_url = data[i].cover.url;
          var rating = new Object();
          if (data[i].rating && data[i].rating.value) {
            rating.value = data[i].rating.value;
          }
          obj.rating = rating;
          tvs.push(obj);
        }
        that.setData({
          tvs
        })
      }
    });

    // 请求综艺数据
    network.getItems({
      url: globalUrls.shows,
      count: 7,
      success: function(res) {
        wx.hideLoading();// 隐藏Loading
        var data = res.data.subject_collection_items;
        var shows = [];
        for (let i = 0; i < data.length; i++) {
          let obj = new Object();
          obj.id = data[i].id;
          obj.title = data[i].title;
          obj.background_url = data[i].cover.url;
          let rating = new Object();
          if (data[i].rating && data[i].rating.value) {
            rating.value = data[i].rating.value;
          }
          obj.rating = rating;
          shows.push(obj);
        }
        that.setData({
          shows
        })
      }
    });
  },

  onShow: function() {}
})