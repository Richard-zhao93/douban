// components/starts/starts.js
Component({
  /**
   * 组件属性列表
   */
  properties: {
    rate: {
      type: Number,
      value: 0,
      observer(newVal, oldVal, changedPath) {
        this.updateRate();
      }
    },
    starSize: {
      type: Number,
      value: 20 // rpx
    },
    fontSize: {
      type: Number,
      value: 20 // rpx
    },
    fontColor: {
      type: String,
      value: '#ccc' // rpx
    },
    istext: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    updateRate: function() {
      var _that = this;
      // var rate = _that.properties.rate;
      var rate = _that.__data__.rate;
      var lightNum = parseInt(rate / 2);
      var halfNum = parseInt(rate) % 2;
      if (rate > parseInt(rate)) {
        halfNum = 1;
      }
      var grayNum = 5 - lightNum - halfNum;
      var lights = [];
      var halfs = [];
      var grays = [];
      for (var i = 1; i <= lightNum; i++) {
        lights.push(i);
      }
      for (var j = 1; j <= halfNum; j++) {
        halfs.push(j);
      }
      for (var k = 1; k <= grayNum; k++) {
        grays.push(k);
      }

      var rateText = rate && rate > 0 ? rate.toFixed(1) : "未评分"

      this.setData({
        rateText,
        lights,
        halfs,
        grays
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    rateText: '',
    lights: [],
    halfs: [],
    grays: []
  },

  lifetimes: {
    attached: function() {
      this.updateRate();
    }
  }
})