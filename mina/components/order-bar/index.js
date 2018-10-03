// components/order-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    triggerName: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    order() {
      // this.triggerEvent(this.properties.triggerName, {})
      wx.navigateTo({
        url: '/pages/date-list/index',
      })
    },
    showdesc() {
      this.setData({
        show: true
      })
    }
  }
})
