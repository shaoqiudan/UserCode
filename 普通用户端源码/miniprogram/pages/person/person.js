Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    // onPullDownRefresh: function () {
    //   wx.stopPullDownRefresh()
    // },
    myinfo:null
  
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    const db=wx.cloud.database();
    db.collection('user').get({
      success(res) {
        console.log("res")  
        that.setData({
          myinfo:res.data[0]
        })
      }
  })  
    // console.log(this.data.myinfo);
  },
  exit:function(e){
    wx.showModal({
      title: '提示',
      content: '是否确认退出',
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          wx.removeStorageSync('student');
          //页面跳转
          wx.redirectTo({
            url: '../first/first',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
resetpwd:function(e){
    var no=this.data.myinfo.no;
    wx.navigateTo({
      url: '/pages/updatepwd/updatepwd',
    })
  },
  setemail: function (e) {
    var no = this.data.myinfo.no;
    wx.navigateTo({
      url: '../email/email?no=' + no,
    })
  }
})