import status from "../Status.js"

export default class Bullet {
  constructor(ctx) {
    this.ctx = ctx
    // 子弹是否死亡
    this.dead = false
    this.rect = {
      x: 0,
      y: 0,
      w: 18,
      h: 27
    }
    this.vy = -5
    this.init()
  }

  setPosition(rect){
    this.rect.x = rect.x + (rect.w - this.rect.w) / 2
    this.rect.y = rect.y - this.rect.h / 2
  }

  init(){
    this.img = new Image()
    this.img.src = "static/images/bullet.png"
  }

  render(){
    this.ctx.drawImage(this.img, ...this.rect)
  }

  update(){
    // 运动轨迹
    this.vy -= 0.1
    this.rect.y += this.vy

    // 死亡判断
    if(this.rect.y < - this.rect.h){
      this.kill()
    }
  }

  // 杀死子弹
  kill(){
    this.dead = true
  }
}
