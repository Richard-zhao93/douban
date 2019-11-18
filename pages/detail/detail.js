// pages/detail/detail.js
import {globalUrls} from '../../utils/urls.js'
import {network} from '../../utils/network.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    comments: [],
    type: '',
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options)
    // Loading展示
    wx.showLoading({
      title: 'Loading'
    })

    var type = options.type;
    var id = options.id;
    that.setData({
      type,
      id
    })
    var url = "";
    var commentUrl = "";
    if (type === "movie") {
      url = globalUrls.movieDetail + "/" + id;
      commentUrl = globalUrls.movieCommentsUrl(id);
    } else if (type === "tv") {
      url = globalUrls.tvDetail + "/" + id;
      commentUrl = globalUrls.tvCommentsUrl(id);
    } else if (type === "show") {
      url = globalUrls.showDetail + "/" + id;
      commentUrl = globalUrls.showCommentsUrl(id);
    }

    // 详情页面头部以及标签数据获取
    network.getDetails({
      url: url,
      success: function(res) {
        var detail = res.data;
        var rating = new Object();
        if (detail.rating && detail.rating.value) {
          rating.value = detail.rating.value;
        }
        detail.rating = rating;
        // 类型处理
        var genres = detail.genres;
        genres = genres.join(' / ');
        detail.genres = genres;

        // 导演 演员处理
        var director = "未知";
        if (detail.directors.length > 0) {
          director = detail.directors[0].name;
        }
        var actors = detail.actors;
        if(actors.length > 3) {
          actors = actors.slice(0, 3);
        }
        var actorNames = '';
        if (actors.length > 0) {
          actorNames = [];
          for (var i = 0; i < actors.length; i++) {
            actorNames.push(actors[i].name)
          }
          actorNames = actorNames.join(' / ');
        }
        
        var authors = director + "（导演）/ " + actorNames; 
        detail.authors = authors;
        that.setData({
          detail
        })
      }
    });

    // 评论数据获取
    network.getDetails({
      url: commentUrl,
      success: function(res) {
        wx.hideLoading();// 隐藏Loading
        var comments = res.data;
        that.setData({
          comments
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  }
})