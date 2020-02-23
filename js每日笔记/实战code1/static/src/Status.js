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
  }

  init(canvas){
    this.canvas = canvas
    this.size.w = canvas.width
    this.size.h = canvas.height
  }
}

/**
 * 导出是一次性导出 new只执行一次
 */
export default new Status()
