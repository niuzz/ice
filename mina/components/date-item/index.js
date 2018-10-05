// components/date-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    date: '',
    week: '',
    weeks: [
      '日', '一', '二', '三', '四', '五', '六'
    ],
    can_order: true,
  },


  attached: function () { 
    const _d = new Date(this.properties.item.date);
    const day = _d.getDate();
    const month = _d.getMonth() + 1;
    const week = _d.getUTCDay();
    const weeks = this.data.weeks;

    this.setData({
      date: month + '-' + day,
      week: weeks[week],
      can_order: this.properties.item.can_order
    })
  },


  /**
   * 组件的方法列表
   */
  methods: {
    click(e) {
      const item = e.currentTarget.dataset.item
      if (!item.can_order) return false;
      wx.setStorage({
        key: 'currentDate',
        data: item,
      })
      wx.navigateTo({
        url: '/pages/order/order-detail',
      })
    }
  }
})
