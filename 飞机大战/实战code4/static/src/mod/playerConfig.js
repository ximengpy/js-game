import rectCollide from "../tools.js"

export default [
  {
    type: "touchstart",
    handleList: [
      function(e){
        // 按下鼠标的位置的中心点 10px的矩形
        console.log("touch")
        const mouseRect = {
          x: e.touches[0].clientX - 5,
          y: e.touches[0].clientY - 5,
          w: 10,
          h: 10
        }
        if(rectCollide(mouseRect, this.rect)){
          this.draged = true
        }
      },
    ]
  },
  {
    type: "touchmove",
    handleList: [
      function(e){
        if(!this.draged) return
        this.rect.x = e.touches[0].clientX - this.rect.w / 2
        this.rect.y = e.touches[0].clientY - this.rect.h / 2
      }
    ]
  },
  {
    type: "touchend",
    handleList: [
      function(e){
        this.draged = false
      }
    ]
  },
  {
    type: "keydown",
    handleList:[
      function (e) {
        console.log(e)
        if(e.key.toLowerCase() === "f"){
          console.log("发射子弹")
        }
      }
    ]
  }
]
