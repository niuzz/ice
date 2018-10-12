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
    bindfunc: String
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
      console.log(111)
      wx.setStorageSync('detailType', this.properties.title);
      wx.navigateTo({
        url: this.properties.path,
      })
    },
    choose: function(event) {
      console.log(222)
      wx.setStorageSync('detailType', this.properties.title)
    }
  }
})
