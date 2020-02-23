import "./lib/proto.js"
import Background from "./mod/Background.js"
import Player from "./mod/Player.js"
import status from "./Status.js"
/**
 * 游戏主函数入口: 初始化项目 (canvas生成, 事件的生成, 项目尺寸数据的生成)
 */
class Game{
  constructor(container) {
    this.container = container
    // 项目初始值
    this.render = this.render.bind(this)
    this.initCanvas()
    this.restartGame()
  }

  /**
   * 初始化canvas标签 设置尺寸等内容
   */
  initCanvas(){
    this.canvas = document.createElement("canvas")
    this.canvas.style.display = "block"
    this.canvas.width = this.container.getBoundingClientRect().width
    this.canvas.height = this.container.getBoundingClientRect().height
    this.ctx = this.canvas.getContext("2d")
    this.container.appendChild(this.canvas)
    // 状态初始化
    status.init(this.canvas)

    this.size = {
      w: status.size.w,
      h: status.size.h
    }
  }

  /**
   * 重启游戏(包含第一次启动)
   */
  restartGame(){
    // 初始化项目中的元素
    this.bg = new Background(this.ctx)
    this.player = new Player(this.ctx)
    this.render()
  }

  /**
   * 不停渲染的函数
   */
  render(){
    requestAnimationFrame(this.render)
    this.ctx.clearRect(0, 0, ...this.size)
    // 更新数据
    this.bg.update()
    this.player.update()

    // 背景是 渲染在最底层的所以最先写
    this.bg.render()
    this.player.render()
  }

  // TODO 游戏暂停,(事件系统会关闭)如何实现?

}

// 导出代码
export default Game
