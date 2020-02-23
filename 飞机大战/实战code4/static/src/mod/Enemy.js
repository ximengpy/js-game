import status from "../Status.js"
import boomImgList from "./Boom.js"
/**
 * 敌机
 */
export default class Enemy {
  constructor(ctx){
    this.ctx = ctx
    this.rect = {
      x: Math.random() * (status.size.w - 60),
      y: -40,
      w: 60,
      h: 40
    }
    this.boomingCount = 0
    this.lives = 3
    // 半死不活
    this.booming = false
    // 死透了
    this.dead = false
    this.vy = Math.random() * 2 + 1
    this.init()
  }
  init(){
    this.img = new Image()
    this.img.src = "static/images/enemy.png"
  }

  render(){
    this.ctx.drawImage(this.img, ...this.rect)
  }

  update(){
    this.rect.y += this.vy
    // 飞到屏幕外面移除
    if(this.rect.y > status.size.h + this.rect.h){
      this.kill()
    }
    // 如果是处于booming的状态, 那就修改this.img
    if(this.booming && this.boomingCount < boomImgList.length){
      this.img = boomImgList[this.boomingCount++]
    }
    if(this.boomingCount === boomImgList.length){
      this.dead = true
    }
  }

  kill(count = 1){
    this.lives -= count
    if(this.lives <= 0){
      this.booming = true
    }
  }
}
