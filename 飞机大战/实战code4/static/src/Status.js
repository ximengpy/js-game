import Background from "./mod/Background.js"
import Player from "./mod/Player.js"
import Bullet from "./mod/Bullet.js"
import Enemy from "./mod/Enemy.js"
import Score from "./mod/Score.js"
import rectCollide from "./tools.js"
/**
 * 数据管理 => 项目尺寸 飞机和子弹的碰撞, 点击位置和飞机关系
 *
 * 记录全局状态, 可以在任何模块里面引入 获取全局的值
 */
class Status {
  constructor() {
    this.size = {
      w: 0,
      h: 0
    }

    this.gameOver = false
  }

  init(canvas){
    this.canvas = canvas
    this.ctx = this.canvas.getContext("2d")
    this.size.w = canvas.width
    this.size.h = canvas.height
    // 初始化游戏的对象
    this.bg = new Background(this.ctx)
    this.player = new Player(this.ctx)
    this.score = new Score(this.ctx)
    // 我方子弹的列表
    this.bulletList = []
    // 敌机列表
    this.enemyList = []
  }

  // 发射子弹
  fire(){
    let bullet = null
    // 创建子弹并且渲染子弹 多个的
    switch (this.player.level) {
      case 1:
        bullet = new Bullet(this.ctx)
        bullet.setPosition(this.player.rect)
        this.bulletList.push(bullet)
        break
      case 2:
        bullet = new Bullet(this.ctx)
        let rect1 = {
          x: this.player.rect.x - 10,
          y: this.player.rect.y,
          w: this.player.rect.w,
          h: this.player.rect.h
        }
        bullet.setPosition(rect1)
        this.bulletList.push(bullet)

        bullet = new Bullet(this.ctx)
        let rect2 = {
          x: this.player.rect.x + 10,
          y: this.player.rect.y,
          w: this.player.rect.w,
          h: this.player.rect.h
        }
        bullet.setPosition(rect2)
        this.bulletList.push(bullet)
        break
    }
  }

  update(){
    this.bg.update()
    this.player.update()

    if(this.player.dead){
      this.gameOver = true
      return
    }


    this.bulletList.forEach( bullet => {
      bullet.update()
    })

    // 维护有效子弹
    this.bulletList = this.bulletList.filter( bullet => !bullet.dead)

    // 随机生成敌机
    if(Math.random() < 0.06){
      this.enemyList.push(new Enemy(this.ctx))
    }

    this.enemyList.forEach( enemy => {
      enemy.update()
    })
    // 维护敌机的生死
    this.enemyList = this.enemyList.filter( enemy => !enemy.dead)
    if(this.score.count > 20){
      this.player.level = 2
    }
    // 碰撞检测 子弹和 敌机的碰撞
    this.bulletList.forEach( bullet => {
      this.enemyList.forEach( enemy => {
        // 如果任何一架飞机和任何一发子弹有重合
        if(rectCollide(bullet.rect, enemy.rect)){
          bullet.kill()
          if(!enemy.booming){
            enemy.kill(this.player.vip)
            if(enemy.lives <= 0){
              this.score.add()
            }
          }
        }
      })
    })

    // 我方飞机和敌机的碰撞

    this.enemyList.forEach( enemy => {
      if(rectCollide(enemy.rect, this.player.rect)  && !enemy.booming){
        enemy.kill(this.player.vip)
        this.player.kill()
      }
    })

  }
  render(){
    this.bg.render()
    this.player.render()
    // this.bullet.render()
    this.bulletList.forEach( bullet => {
      bullet.render()
    })

    this.enemyList.forEach( enemy => {
      enemy.render()
    })

    // 得分面板
    this.score.render()

  }

  reset(){
    this.gameOver = false
    this.bg.reset()
    this.player.reset()
    this.score.reset()
    this.bulletList = []
    this.enemyList = []
  }

  setSize(w, h){
    console.log("set")
    this.size.w = w
    this.size.h = h
  }


}

/**
 * 导出是一次性导出 new只执行一次
 */
export default new Status()
