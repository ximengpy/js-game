import status from "../Status.js"
export default class Player {
  constructor(ctx) {
    this.ctx = ctx

    // 角色的大小位置
    this.rect = {
      x: status.size.w / 2 - 49,
      y: status.size.h - 65,
      w: 98,
      h: 65
    }
    this.init()
  }

  init(){
    this.img = new Image()
    this.img.src = "static/images/hero.png"
    // TODO 按下飞机拖动飞行, 没拖动到就是不飞
  }

  render(){
    this.ctx.drawImage(this.img, ...this.rect)
  }

  update(){

  }
}
