(function(window,document,undefined){
  //私有方法
  if(window.typeof){
   Py.type = window.typeof
  }else{
   Py.type = function(object){
    var str = Object.prototype.toString.call(object)
    //var 为了兼容
   
    // return str.toLowercase()
   }
  }
  function trim(str){
  return str.replace(/(^\s*)|(\s*$)/g,"")
 }
 


 function Py(selector){
   // console.log(new Py.prototype.init(selector))
   return new Py.prototype.init(selector)
  }


  Py.prototype = {
   init:function(selector){
    function selectType(selector){//返回对应的字符串类型
     if(/^[a-z]/.test(selector))  return "tagname" 
     if(/^\./.test(selector))  return "calssname" 
     if(/^#/.test(selector))  return "id" 
     return "html" //生成一个htmll节点
     throw new Error("传入错误")
  
    }
    var selectTool = {
     "tagname":function(selector){
       return document.getElementsByTagName(selector)
     },
     "classname":function(selector){
      selector = selector.replace(/^\./,"")
      return document.getElementsByClassName(selector)
    },
    "id":function(selector){
     selector = selector.replace(/^#/,"")
     return document.getElementsById(selector)
   },
    "html": function(selector){
     var div = document.createElement("div")
     div.innerHTML = selector
     return div.children
    }
    }
    var arr = []//选择元素集合
    if(typeof(selector) === "string"){
     selector = trim(selector)
     arr = selectTool[selectType(selector)](selector)
    }
    if(Py.type(selector) === "object"){
     arr = [selector]
    }
    var that = this
    this.each(arr,function(item,index,arr){
      that[index] = item
    })
    this.length = arr.length
   // Object.assign(this,arr)
   },
   css:function(arg1,arg2){
    if(typeof arg1 === "string"){
     this.each(this,function(item,i,arr){
      
      item.style[arg1] = arg2
     }
      )
    }else{
     this.each(this,function (item,i,arr) {
      for(i in arg1){
       item.style[i] = arg1[i]
      }
     })
    }
    return this
   },
   eq:function(num){
    if(num < 0 || num > this.length){
        throw new Error('没有该元素')
    }
    return Py(this[num])
    },
   on:function(type,fn){
    this.each(this,function(item) {
      item["on"+type] = fn
    })
    return this
   },
   fadeIn: function(speed,fn){
    var that = this
    this.each(this, function(item){
        item.style.display = ''
        var t0 = new Date()
        var timer = setInterval(function(){
            if(new Date() - t0 < speed){
                item.style.opacity = (new Date() - t0) / speed
            }else{
                item.style.opacity = 1
                clearTimeout(timer)
                fn && fn()
            }
        },1000/60)
    })
    return this
},
fadeOut: function(speed, fn){//时间 回调
    var that = this
    this.each(this, function(item){
        var t0 = new Date()
        var timer = setInterval(function(){
            if(new Date() - t0 < speed){
                item.style.opacity = 1 - (new Date() - t0) / speed
            }else{
                item.style.opacity = 0
                clearTimeout(timer)
                fn && fn()
                that.each(that,function(item){
                    item.style.display = 'none'
                })
            }
        },1000/60)
    })
    return this
},

   addClass:function(className){
     if(typeof className ==="string"){
      this.each(this,function(item){
        item.className += " "+className
       })
     }else{
       var that = this
      this.each(this,function(item1){
        that.each(className,function(item2){
          item1.className += item2+" "
        })
      })
     }         


    
    // this.each(this,function(item){
    //   console.log(item)
    //   var currentClassList = trim(item.className).slice(" ")
    //     console.log(concat)

    //       currentClassList.concat(className)
    // })
     return this
   },
   removeClass:function(className){
    this.each(this,function(){
      item.parentNode.removeChild(item)
    })
  },

   each:function(arr,fn){
    for(var i = 0, l = arr.length;i<l;i++){
     fn(arr[i],i,arr)
    }
   }
  },
 

  
  Py.prototype.init.prototype = Py.prototype
 
 window._$ =  Py
})(window,document,undefined)//传参让代码更严谨，作用链查询范围更小