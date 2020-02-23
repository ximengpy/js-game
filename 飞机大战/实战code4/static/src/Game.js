import "./lib/proto.js"
import status from "./Status.js"
import DialogModal from "./mod/DialogModal.js"
/**
 * 游戏主函数入口: 初始化项目 (canvas生成, 事件的生成, 项目尺寸数据的生成)
 */
class Game{
  constructor(container) {
    this.container = container

    // 游戏的暂停状态, 没有暂停
    this.paused = false

    // 游戏结束的状态
    this.gameOver = false

    // 项目初始值
    this.render = this.render.bind(this)
    this.pause = this.pause.bind(this)
    this.continue = this.continue.bind(this)


    this.initCanvas()
    this.restartGame()
  }

  /**
   * 初始化canvas标签 设置尺寸等内容, 只执行一次
   */
  initCanvas() {
    this.canvas = document.createElement("canvas")
    this.canvas.style.display = "block"
    this.canvas.width = this.container.getBoundingClientRect().width
    this.canvas.height = this.container.getBoundingClientRect().height
    this.ctx = this.canvas.getContext("2d")
    this.container.appendChild(this.canvas)
    this.restartDialog = new DialogModal(this.ctx)
    // 状态初始化
    status.init(this.canvas)

    this.container.onblur = this.pause
    this.container.onfocus = this.continue

    this.size = {
      w: status.size.w,
      h: status.size.h
    }
    // 初始化项目中的元素
  }
  /**
   * 重启游戏(包含第一次启动)
   * 多次执行, 回到最初的状态
   */
  restartGame(){
    cancelAnimationFrame(this.frame)
    // 不希望重启游戏的时候之前的事件还继续生效
    this.removeEvent()
    // 注册游戏基础事件
    this.initEvent()
    status.reset()
    this.continue()
    this.render()
  }

  /**
   * 不停渲染的函数, 游戏的刷新页面控制器
   */
  render(){

    this.frame = requestAnimationFrame(this.render)

    // 游戏暂停状态 不会渲染下面的内容的
    if(this.paused) return

    this.ctx.clearRect(0, 0, ...this.size)
    // 更新数据
    // 假如游戏还没有结束, 更新属性

    status.update()
    // 背景是 渲染在最底层的所以最先写
    status.render()
    console.log(status.gameOver)
    if(status.gameOver){
      this.removeEvent()
      clearInterval(this.fireTimer)
      cancelAnimationFrame(this.frame)
      this.renderRestartRect()
      return
      // 跳转到渲染别的内容
    }

  }

  // 渲染重新开始有的界面
  renderRestartRect(){
    this.restartDialog.render()
    this.restartDialog.bindEvent()
    this.restartDialog.handle(() => {
      this.restartGame()
    })
  }

  /**
   * 初始化事件系统
   */
  initEvent(){
    window.onresize = e => {
      status.setSize(window.innerWidth, window.innerHeight)
    }
    // 作弊按钮
    window.addEventListener("keydown", e => {
      if(e.key.toLowerCase() === "k"){
        status.enemyList.forEach( enemy => {
          enemy.dead = true
        })
      }
    })
    status.player.initEvent(this.canvas)
  }
  removeEvent(){
    // 将这个player中之前添加的时间移除
    status.player.removeEvent(this.canvas)
  }


  // 暂停
  pause(){
    clearInterval(this.fireTimer)
    this.paused = true
  }
  // 继续
  continue(){
    // 先去把之前添加的timer给搞掉
    clearInterval(this.fireTimer)
    this.fireTimer = setInterval(status.fire.bind(status), 1000/10)
    this.paused = false
  }
}

// 导出代码
export default Game
