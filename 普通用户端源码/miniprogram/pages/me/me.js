// pages/user/user.js
var _app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    menuitems: [
      { text: '个人资料', url: '/pages/person/person', icon: '/images/账号信息1.png', tips: '', arrows: '/images/箭头.png' },
      { text: '搜索记录', url: '/pages/correctrecord/correctrecord', icon: '/images/我的收藏1.png', tips: '', arrows: '/images/箭头.png'  },
      { text: '我的错题', url: '/pages/errorproblem/errorproblem', icon: '/images/错题1.png', tips: '',  arrows: '/images/箭头.png'  },
      { text: '设置中心', url: '#', icon: '/images/设置1.png', tips: '',  arrows: '/images/箭头.png' }
    ]
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
 
  }
})