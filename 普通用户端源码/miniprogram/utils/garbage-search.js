const garbage_data = require('./garbage-sort/garbage-sort-data.js');
const garbage_categroy = require('./garbage-sort/garbage-categroy.js');

function search(text,successCallback) {

  var data = garbage_data.garbage_sort_data ;
  var searchResult = new Array();
    data.forEach(function (categroyItem){
      if(categroyItem&&categroyItem.data&&categroyItem.data.length>0){
          categroyItem.data.forEach(function(letterItem){
            var garbageItem = letterItem.garbageItem;
              garbageItem.forEach(function(item){
                if(text.indexOf(item)>-1||item.indexOf(text)>-1){
                    //如果要搜索的字符串包含分类表中的一项，或者被包含，则该项返回
                    searchResult.push({                         
                        "categroyName":garbage_categroy.getCategoryName(categroyItem.categroy-1),
                        //该垃圾所处的目录是哪个
                        "garbageName":item,
                        //垃圾的名称
                        "categroyId":categroyItem.categroy
                        //垃圾目录的下标
                    })   
                }              
              })
          })
      }
    })
    console.log('searchResult:'+JSON.stringify(searchResult));
    return successCallback(searchResult);
}
module.exports = {
    search: search,
}