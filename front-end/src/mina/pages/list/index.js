// pages/list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onLogin: function() {

    let loginFlag = wx.getStorageSync('skey');
    
    if(loginFlag) {
      // 检查 session_key 是否过期
      wx.checkSession({
        // session_key 有效(未过期)
        success: function () {
          // 业务逻辑处理
          
        },

        // session_key 过期
        fail: function () {
          // session_key过期，重新登录
          wx.login({
            success: function (res) {
              wx.request({
                url: 'http://127.0.0.1:7001/api/mina',
                method: 'post',
                data: {
                  code: res.code
                },
                success: function (response) {
                  const openid = response.data.data.openid;
                  const skey = response.data.data.skey;
                  wx.setStorage({
                    key: 'openid',
                    data: openid,
                  });
                  wx.setStorage({
                    key: 'skey',
                    data: skey,
                  });
                }
              })
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      });

    } else {
      wx.login({
        success: function (res) {
          wx.request({
            url: 'http://127.0.0.1:7001/api/mina',
            method: 'post',
            data: {
              code: res.code
            },
            success: function(response) {
              const openid = response.data.data.openid;
              const skey = response.data.data.skey;
              wx.setStorage({
                key: 'openid',
                data: openid,
              });
              wx.setStorage({
                key: 'skey',
                data: skey,
              });
            }
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }

    
  },

  getPhoneNumber: function(data) {
    console.log(data)
  }
})