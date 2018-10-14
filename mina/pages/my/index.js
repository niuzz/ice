// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    isAdmin: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    const uid = wx.getStorageSync('_id')
    const _this = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    wx.request({
      url: 'http://natapp.niuzhuangzhi.com/api/order',
      data: {
        currentPage: 1,
        search: uid
      },
      success: function(res) {
        const { code } = res.data
        if (code === 200) {
          _this.setData({
            list: res.data.data.list
          })
        }
        wx.hideLoading({}) 
      }
    })
    
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

  toAdmin: function() {
    console.log(111)
  }
})