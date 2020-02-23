const express = require("express") // 引入express库
const bodyParser = require("body-parser")

const app = express() // 生成一个express实例
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static("public")) // 开启一个静态资源目录 默认进找index.html网页

app.listen(80)
app.get("/get",function(req,res){
 const {user ,password}= req.query
 if(user == "aaa" && password == "123"){
  res.send({
   code:0,
   msg: "用户名密码正确,允许登录"
  })
 }else{
   res.send({
    code:1,
    msg:"用户名输入错误，请重新输入"
   })
  }

 
})
app.post("/post", function (req, res) {
  // 通过req.body获取发送过来的数据
  // console.log(req.body)
  const {user, password} = req.body
  if(user==="aaa" && password==="456"){
    res.send({
      code: 0,
      msg: "用户名密码正确,允许登录"
    })
  }else{
    res.send({
      code: 1,
      msg: "用户名输入错误，请重新输入"
    })
  }
})
