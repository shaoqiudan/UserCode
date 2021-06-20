const db = wx.cloud.database();
const activityInfo = db.collection('tiku');
 Page({
  data: {
    curring:-1,
    detail:[],
    number: 0,
    answer:0,
  },
  onLoad:function()
  {var that=this;
    activityInfo.get({
      success :(res)=>{
              let temp=res.data
              var len =temp.length;
              var num=4;
              for (var i = len - 1; i >= 0; i--) {
                var randomIndex = Math.floor(Math.random() * (i + 1));
                var itemIndex = temp[randomIndex];
                temp[randomIndex] =temp[i];
                temp[i] = itemIndex;
              }
              var arrList = [];
              for (let i = 0; i < num; i++) {
                arrList.push(temp[i]);                                                                              
              };
              this.setData({
                detail:arrList
              })   
          }
      })
   
  },
  previous:function(e){
    this.setData({
      number: this.data.number-1,
      curring: this.data.curring-1,
    })
  },
  
  radioChange:function(e){
    var detail = this.data.detail;
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    // var detail = this.data.arr;
    
    for(let i = 0;i<detail.length;i++){
      if(detail[i].id == id){
        detail[i].array[index].usname = true
        for(let j = 0;j<detail[i].array.length;j++){
          if (j != index){
            detail[i].array[j].usname = false
          }
        }
      }
    }
    this.setData({
      detail:detail
    })
    console.log(detail)
  },
  nextstep:function(e){
    let detail = this.data.detail
    let number = this.data.number
    let curring = this.data.curring
    let usname = 0;
    for(let i = 0;i<detail[number].array.length;i++){
      if(!detail[number].array[i].usname){
        usname++
      }
    }
    if(usname == detail[number].array.length){
      wx.showToast({
        title: '答题选项不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    curring++
    number++
    if (curring > 3){
      curring = -1
    }
    this.setData({
      curring: curring,
      number: number,
    })
  },
  backto:function(e)
  {
    wx.switchTab({
      url: '/pages/start/start',
    })
  },
  subsic:function(e){
    let detail = this.data.detail
    let answer = 0
    let letter = ''
    for(let i = 0;i < detail.length;i++){
      for(let j = 0;j < detail[i].array.length;j++){
        if(detail[i].array[j].usname){
          letter = detail[i].answer-1
          if(letter == j){
            answer++
          }
          else
          {
            const db = wx.cloud.database()
            db.collection('errorproblem').add({
              data: {
                question: detail[i].title,
                answer:detail[i].array[letter].name
              },
              success: res => {
                // 在返回结果中会包含新创建的记录的 _id
                this.setData({
                  counterId: res._id,
                  count: 1
                })
                wx.showToast({
                  title: '新增记录成功',
                })
                console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
              },
              // fail: err => {
              //   wx.showToast({
              //     icon: 'none',
              //     title: '新增记录失败'
              //   })
              //   console.error('[数据库] [新增记录] 失败：', err)
              // }
            })
          }
        }
      }
    }
    wx.showToast({
      title: '答对了:' + answer + '题',
      icon: 'none',
      duration: 2000
    })
  },

})
