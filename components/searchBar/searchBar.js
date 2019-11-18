// components/searchBar/searchBar.js
Component({
  /**
   * 组件属性
   */
  properties: {
    isNavigator: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 页面的初始数据
   */
  data: {

  },
  methods: {
    onInputEvent: function(event) {
      var value = event.detail.value;
      var detail = {"value": value};
      var options ={};
      this.triggerEvent("searchInput", detail, options)
    }
  }
})