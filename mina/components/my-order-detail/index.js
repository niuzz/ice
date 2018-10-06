// components/my-order-detail/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    date: ''
  },

  attached: function() {
    const date = new Date(this.data.item.date)
    const str = (
        date.getFullYear() + '-' +
        (date.getMonth() + 1) + '-' +
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      )
    this.setData({
      date: str
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})