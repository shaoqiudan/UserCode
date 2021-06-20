// pages/updatepwd/updatepwd.js
const app=getApp();
// pages/password/password.js
Page({
 
  /**
   * 页面的初始数据
   */
  data:
  {
id:null
  },
  
  formSubmit:function(e){

    
    var oldpwd=e.detail.value.oldpwd;
    var newpwd = e.detail.value.newpwd;
    var newpwd2 = e.detail.value.newpwd2;

    if(oldpwd=='' || newpwd=='' || newpwd2==''){
      wx.showToast({
        title: '密码不能为空',
        icon:'none',
        duration:1000
      })
    }else if(newpwd!=newpwd2){
      wx.showToast({
        title: '两次输入不一致',
        icon: 'none',
        duration: 1000
      })
    }else{
      var page = this;
      wx.login({
        success: function (res) {
            console.log(res)
             if (res.code) {
                console.log('通过login接口的code换取openid')
                 wx.request({
                   url: 'https://api.weixin.qq.com/sns/jscode2session',
                   data: {
                      //填上自己的小程序唯一标识
                     appid: 'wx7f2c2a38554ac9c0',
                      //填上自己的小程序的 app secret
                     secret: 'b6b39e1dd4267a6a770e3e53396c5783',
                     grant_type: 'authorization_code',
                     js_code: res.code
                   },
                   method: 'GET',
                   header: { 'content-type': 'application/json'},
                   success: function(openIdRes){
      
                        console.info("登录成功返回的openId：" + openIdRes.data.openid);
                         
                        const db=wx.cloud.database()
                        db.collection('user').where({
                          _openid:openIdRes.data.openid
                               }).get({
                          success(res) {
                            console.log("res")
                            console.log(res.data[0].pwd)
                            if(res.data[0].pwd!=oldpwd)
                            {
                              wx.showToast({
                                title: '原密码不正确',
                                icon:'none',
                                duration:1000
                              })
                            }
                            else
                            {
                              db.collection('user').where({
                                _openid:openIdRes.data.openid
                                     }).update({
                                    data: {
                                        pwd:newpwd
                                           }
                                       })
                                       wx.navigateTo({
                                        url: '/pages/person/person'
                                    })
                            }
                          }
                      })  


                       
     

                   },
                   fail: function(error) {
                       console.info("获取用户openId失败");
                       console.info(error);
                   }
                })
              }
            }
        })
    
    }
  
   
  



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