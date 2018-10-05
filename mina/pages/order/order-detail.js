// pages/order/order-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    orders: [],
    AM: false,
    PM: false,
    period: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    let _am = false
    let _pm = false
    const item = wx.getStorage({
      key: 'currentDate',
      success: function(res) {
        
        res.data.orders.forEach(item => {
          if(item) {
            item.period === 'AM' ? _am = true: _am = false;
            item.period === 'PM' ? _pm = true: _pm = false;
          }
        })
        _this.setData({
          date: res.data.date,
          orders: res.data.orders,
          AM: _am,
          PM: _pm,
        })
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  openSubmit() {
    
  },
  checkboxChange(e) {
    const checkeds = e.detail.value
    if (checkeds.length === 2 && !this.data.AM && !this.data.PM) {
      wx.showModal({
        title: '提示',
        content: '一次只能选择同一日期单个时间段',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
})