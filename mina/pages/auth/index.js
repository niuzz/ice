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
    wx.showLoading({
      title: '加载中……',
    })
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
    // wx.setEnableDebug({
    //   enableDebug: true
    // })
    let loginFlag = wx.getStorageSync('loginFlag');
    if (loginFlag) {
      // 检查 session_key 是否过期
      wx.checkSession({
        // session_key 有效(未过期)
        success: function () {
          // 业务逻辑处理
          wx.setStorage({
            key: 'loginFlag',
            data: true,
          });
          wx.switchTab({
            url: '/pages/list/index',
          });
          wx.hideLoading()
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
            complete: function (res) {
              wx.hideLoading()
             },
          })
        }
      });
    } else {
      wx.login({
        success: function (res) {
          wx.request({
            url: 'http://natapp.niuzhuangzhi.com/api/user',
            method: 'post',
            data: {
              code: res.code
            },
            success: function (response) {
              const { _id } = response.data.data;
              wx.setStorage({
                key: '_id',
                data: _id,
              });
              wx.setStorage({
                key: 'loginFlag',
                data: true,
              });
            },
            fail: function (response) {
              console.log(response)
              wx.setStorage({
                key: 'loginFlag',
                data: false,
              })
            }    
          })
        },
        fail: function (res) {
          wx.setStorage({
            key: 'loginFlag',
            data: false,
          });
        },
        complete: function (res) {
          wx.hideLoading()
         },
      })
    }
    let userInfo = wx.getStorageSync('user');
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
    wx.showLoading({
      title: '加载中……',
    })
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
            const { code } = response.data
            if (code === 200) {
              wx.setStorage({
                key: 'loginFlag',
                data: true,
              });
              wx.setStorage({
                key: 'user',
                data: response.data.data,
              })
              wx.switchTab({
                url: '/pages/list/index',
              })
            }
            wx.hideLoading()
          },
          fail: function(error) {
            console.log('error:', error)
            wx.hideLoading();
          }
        })
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {
        wx.hideLoading()
      }
    })
  }
})