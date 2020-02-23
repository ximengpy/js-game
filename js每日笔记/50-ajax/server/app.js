const express = require("express") // 引入express库

const app = express() // 生成一个express实例

app.use(express.static("public")) // 开启一个静态资源目录 默认进找index.html网页

app.listen(80) // 监听本地 http://localhost:80 端口

// 当我们通过get方式访问的时候: 我们返回一段数据
//
app.get("/get", function (req, res) {
  // 返回一段数据对象
  // 可以先处理再返回 访问数据库, 发起其他的请求...计算
  const {user, password} = req.query
  if(user==="yinshi" && password==="123"){
    res.send({
      code: 0,
      msg: "用户名密码正确,允许登录"
    })
  }else{
    res.send({
      code: 1,
      msg: "密码错误, 不允许登录"
    })
  }
})

