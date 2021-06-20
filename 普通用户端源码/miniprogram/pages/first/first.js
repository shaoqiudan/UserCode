// index.js
// 获取应用实例
var util = require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    account:null,
    pwd:null,
    time:null,
    limit:0
  },
  // 事件处理函数
  getAccount:function(evt)
  { if(evt.detail.value=="")
  {
    wx.showToast({
      title: '账号不能为空！',
      icon: 'none',
      duration: 2500
    })
  }
  else
  {
    this.setData({account:evt.detail.value});//将数据存进data
    console.log(this.data.account);
  }
    
  },
  getPwd:function(evt)
  {
    if(evt.detail.value=="")
  {
    wx.showToast({
      title: '密码不能为空！',
      icon: 'none',
      duration: 2500
    })
  }
    else
    {
      this.setData({pwd:evt.detail.value});//将数据存进data
      console.log(this.data.pwd);
    }
   
  },
  reg:function(evt)//注册函数
  {
    if(this.data.account==null||this.data.pwd==null)
    {
      wx.showToast({
        title: '账号或者密码不能为空！',
        icon: 'none',
        duration: 2500
      })
    }
    else
    { const db = wx.cloud.database();
      const userCollection = db.collection("user");
      let flag = false  //表示账户是否存在,false为初始值
  
      userCollection.get({
        success: (res) => {
          let user = res.data;  //获取到的对象数组数据
          console.log(user);
          for (let i = 0; i < user.length; i++) {  //遍历数据库对象集合
            if (this.data.account === user[i].account) { //账户已存在
              flag = true;
              break;
            }
          }
          if (flag === true) {  //账户已存在
            wx.showToast({
              title: '账号已注册！',
              icon: 'error',
              duration: 2500
            })
          }
          else { 
             //账户未注册
            userCollection.add({
              data:{
                account:this.data.account,
                pwd:this.data.pwd,
                limit:this.data.limit,
              }
            })
            wx.showToast({	//显示注册成功信息
              title: '注册成功！',
              icon: 'success',
              duration: 2500
            })
            // wx.navigateTo({
            //   url: "pages/ai/index",
            // })
            wx.switchTab({  //登录成功后跳转页面
              url: "/pages/ai/index",
            })
          }
        }
      })}
   
  },
  login:function(evt)//登录函数
  {
    if(this.data.pwd==null||this.data.account==null)
    {
      wx.showToast({
        title: '账号或者密码不能为空！',
        icon: 'none',
        duration: 2500
      })
    }
    else
    { const db = wx.cloud.database();
      const userCollection = db.collection("user");
      const usevisitCollection = db.collection("uservisit");
      let flag = false  //表示账户是否存在,false为初始值
      userCollection.get({
        success: (res) => {
          let user = res.data;
          console.log(user);
          for (let i = 0; i < user.length; i++) {  //遍历数据库对象集合
            if (this.data.account === user[i].account) { //账户已存在
             flag = true;
              if (this.data.pwd !== user[i].pwd) {  //判断密码正确与否
                wx.showToast({  //显示密码错误信息
                  title: '密码错误！！',
                  icon: 'error',
                  duration: 2500
                });
               //  i=0; //密码错误则重头开始遍历数据库对象集合
                break;
              }else {
                wx.showToast({  //显示登录成功信息
                  title: '登陆成功！！',
                  icon: 'success',
                  duration: 2500
                })
                flag=true;
                var Time = util.formatTime(new Date());
                console.log(Time)
                wx.switchTab({  //登录成功后跳转页面
                  url: "/pages/ai/index",
                })
              
                    // wx.navigateTo({
                    //   url: "pages/ai/index",
                    // })
                    usevisitCollection.add({
                      data:{
                        account:this.data.account,
                        pwd:this.data.pwd,
                        time:Time,
                        limit:this.data.limit,
                      }
                    })
  
                break;
              }
            }
          };
          if(flag==false)//遍历完数据后发现没有该账户
          {
            wx.showToast({
              title: '该用户不存在',
              icon: 'error',
              duration: 2500
            })
          }
        }
      })
    }}
   
  // handlerSubmit:function(evt)
  // { let that=this
  //   console.log(evt);
  //   //获取用户名和密码
  //   let account = evt.detail.value.account;
  //   let pwd = evt.detail.value.pwd;
  //   let limits=that.data.limits;
  //   console.log(limits)
  //   const db = wx.cloud.database();//获取数据库引用
  //   const userCollection = db.collection("user");//获取集合（collection）的引用
  //    //通过集合向数据库添加数据
  //   userCollection.add({
  //     data:{
  //       account:account,
  //       pwd:pwd,
  //     }
  //   })
  // }

})