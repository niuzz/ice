// components/listItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    color: String,
    path: String,
    imgUrl: String,
    title: String,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail: function(event) {
      wx.setStorageSync('detailType', this.properties.title);
      wx.navigateTo({
        url: this.properties.path,
      })
    }
  }
})
