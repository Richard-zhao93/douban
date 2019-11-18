const globalUrls = {
  movies: "https://m.douban.com/rexxar/api/v2/skynet/playlist/recommend/event_videos",
  tvs: "https://m.douban.com/rexxar/api/v2/subject_collection/tv_hot/items",
  shows: "https://m.douban.com/rexxar/api/v2/subject_collection/tv_variety_show/items",
  movieDetail: "https://m.douban.com/rexxar/api/v2/movie",
  tvDetail: "https://m.douban.com/rexxar/api/v2/tv",
  showDetail: "https://m.douban.com/rexxar/api/v2/tv",
  movieCommentsUrl: function(id, start = 0, count = 3) {
    return "https://m.douban.com/rexxar/api/v2/movie/" + id + "/interests?count=" + count + "&start=" + start;
  },
  tvCommentsUrl: function(id, start = 0, count = 3) {
    return "https://m.douban.com/rexxar/api/v2/tv/" + id + "/interests?count=" + count + "&start=" + start;
  },
  showCommentsUrl: function(id, start = 0, count = 3) {
    return this.tvCommentsUrl(id, start, count)
  },
  searchUrl: function (type, q) {
    return "https://m.douban.com/rexxar/api/v2/search?type=" + type + "&q=" + q;
  }
}

export {
  globalUrls
}