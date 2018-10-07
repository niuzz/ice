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
    period: '',
    checkeds: [],
    mobile: ''
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
    if (this.data.checkeds.length > 1 && !this.data.AM && !this.data.PM) {
      wx.showModal({
        title: '提示',
        content: '一次只能选择同一日期单个时间段',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            
          } 
        }
      })
    } else {
      if (!this.data.mobile || !(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.data.mobile))) {
        wx.showToast({
          title: '手机格式错误',
          icon: 'none',
          duration: 2000
        })
        return false
      }
      const uid = wx.getStorageSync('_id')
      const detailType = wx.getStorageSync('detailType')
      const type = detailType === '个人写真'? '2' : '1'
      const currentDate = wx.getStorageSync('currentDate')
      const period = this.data.checkeds[0] === 'AM' ? '10:00-11:00' : '13:00-15:00'
      const deposite = 200
      const mobile = this.data.mobile
      const date = currentDate.date
      wx.request({
        url: 'http://natapp.niuzhuangzhi.com/api/order',
        method: 'POST',
        data: {
          uid, type, date, period, deposite, mobile
        },
        success: function(res) {
          wx.showModal({
            title: '提示',
            content: '预订成功',
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/my/index',
                })
              }
            }
          })
        },
        fail: function(err) {
          wx.showToast({
            title: err,
          })
        }
      })
    }
    
  },
  checkboxChange(e) {
    let checkeds = e.detail.value
    if (this.data.AM) {
      let index = checkeds.indexOf('AM')
      checkeds.splice(index, 1)
    } 
    if (this.data.PM) {
      let index = checkeds.indexOf('PM')
      checkeds.splice(index, 1)
    } 
    this.setData({
      checkeds
    })
    if (checkeds.length === 2 && !this.data.AM && !this.data.PM) {
      wx.showModal({
        title: '提示',
        content: '一次只能选择同一日期单个时间段',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
    }
  },
  bindMobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  }
})