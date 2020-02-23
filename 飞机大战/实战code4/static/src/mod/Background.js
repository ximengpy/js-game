import status from "../Status.js"
export default class Background {
  constructor(ctx) {
    this.ctx = ctx
    // 图片的位置和大小
    //
    this.vy = 2
    this.rect1 = {
      x: 0,
      y: 0,
      ...status.size
    }
    this.rect2 = {
      x: 0,
      y: this.rect1.y - status.size.h,
      ...status.size
    }
    this.init()
  }

  /**
   * 在加载的时候先准备好渲染的图片以及自己的位置
   */
  init(){
    this.img = new Image()
    this.img.src = "static/images/bg.jpg"
  }
  reset(){
    this.rect1.y = 0
  }

  render(){
    this.ctx.drawImage( this.img, ...this.rect1)
    this.ctx.drawImage( this.img, ...this.rect2)
  }

  update(){
    this.rect1.y += this.vy
    this.rect2.y = this.rect1.y - status.size.h
    // 边界判断瞬间归零
    if( this.rect1.y >= status.size.h ){
      this.rect1.y = 0
    }
  }
}
