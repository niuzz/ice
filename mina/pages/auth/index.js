// pages/auth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authButtonShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onLogin();
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

  onLogin: function () {
    let userInfo = wx.getStorageSync('user');
    let loginFlag = wx.getStorageSync('loginFlag');
    if (loginFlag) {
      // 检查 session_key 是否过期
      wx.checkSession({
        // session_key 有效(未过期)
        success: function () {
          // 业务逻辑处理
          wx.switchTab({
            url: '/pages/list/index',
          })
          wx.setStorage({
            key: 'loginFlag',
            data: true,
          });

        },
        // session_key 过期
        fail: function () {
          // session_key过期，重新登录
          wx.login({
            success: function (res) {
              wx.request({
                url: 'http://natapp.niuzhuangzhi.com/api/user',
                method: 'post',
                data: {
                  code: res.code
                },
                success: function (response) {
                  const _id = response.data.data._id;
                  wx.setStorage({
                    key: 'openid',
                    data: openid,
                  });
                  wx.setStorage({
                    key: 'loginFlag',
                    data: true,
                  });
                }
              })
            },
            fail: function (res) { 
              wx.setStorage({
                key: 'loginFlag',
                data: false,
              });
            },
            complete: function (res) { },
          })
        }
      });
    } else {
      console.log(111111111)
      wx.login({
        success: function (res) {
          wx.request({
            url: 'http://natapp.niuzhuangzhi.com/api/user',
            method: 'post',
            data: {
              code: res.code
            },
            success: function (response) {
              const _id = response.data.data._id;
              wx.setStorage({
                key: '_id',
                data: _id,
              });
              wx.setStorage({
                key: 'loginFlag',
                data: true,
              });
            }
          })
        },
        fail: function (res) { 
          wx.setStorage({
            key: 'loginFlag',
            data: false,
          });
        },
        complete: function (res) { },
      })
    }
    
    if (userInfo) {
      wx.switchTab({
        url: '/pages/list/index',
      })
    } else {
      this.setData({
        authButtonShow:true
      })
    }
  },

  getUserInfo(data) {
    const { detail } = data
    wx.getStorage({
      key: '_id',
      success: function(res) {
        const _id = res.data
        wx.request({
          url: 'http://natapp.niuzhuangzhi.com/api/user',
          method: 'put',
          data: {
            detail,
            _id
          },
          success: function (response) {
            const code = response.data.code 
            if (code === 200) {
              wx.setStorage({
                key: 'loginFlag',
                data: true,
              });
              wx.switchTab({
                url: '/pages/list/index',
              })
            }
          }
        })
      },
    })
  }
})