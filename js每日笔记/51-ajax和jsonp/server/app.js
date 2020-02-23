const express = require("express") // 引入express库
const bodyParser = require("body-parser")

const app = express() // 生成一个express实例

// 处理一下post请求的数据整理问题
// req.body里面有数据了
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static("public")) // 开启一个静态资源目录 默认进找index.html网页

app.listen(80) // 监听本地 http://localhost:80 端口

// 当我们通过get方式访问的时候: 我们返回一段数据
// get处理请求
app.get("/get", function (req, res) {
  // 返回一段数据对象
  // 可以先处理再返回 访问数据库, 发起其他的请求...计算
  const {user, password} = req.query
  // 本来是应该去数据库中查询数据
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

app.post("/post", function (req, res) {
  // 通过req.body获取发送过来的数据
  // console.log(req.body)
  const {user, password} = req.body
  if(user==="yinshi" && password==="456"){
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


//处理jsonp的代码
app.get("/jsonp", function (req, res) {
  // 拿到传过来的函数的函数名
  const {cb} = req.query
  const data = JSON.stringify({a:1,b:2})
  res.send(`${cb}(${data})`)
})

