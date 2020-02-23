let time = 500
let basicStylePath = {// 私有样式集合
 cover: {
     userSelect : "none",
     position: "fixed",
     zIndex: "999",
     top: 0,
     left: 0,
     width: "100%",
     height: "100%",
     backgroundColor: "rgba(33,44,55,.4)",
     transition: time+"ms",
     opacity:'1',
 },
 main: {
     position: "absolute",
     top: "50%",
     left: "50%",
     width: "600px",
     height: "400px",
     marginLeft:'-300px',
     marginTop:'-150px',
     backgroundColor: "#2c2c2c",
     transition: time+"ms",
     opacity:'1',
 },
 tips:{
     width:'300px',
     height:'200px',
     margin:'50px auto',
     background:"url(2.jpg) no-repeat center/cover",
     color:'#fff',
     fontSize:'25px',
     textAlign:'center',
     lineHeight:'320px',
     opacity:'1',
     cursor:'pointer',
 },
 close:{
     position: "absolute",
     left: "95%",
     top: "0",
     width: "30px",
     height: "30px",
     backgroundColor: "#ccc",
     fontSize:'25px',
     textAlign: "center",
     lineHeight: "30px",
     transition: time +"ms",
     opacity:'1',
     cursor:'pointer',
 },
 confirm: {
     position: "absolute",
     top: '85%',
     left: '30%',
     width: "100px",
     height: "40px",
     backgroundImage:'linear-gradient(#fff,#f40,#fff)',
     textAlign: "center",
     lineHeight: "40px",
     opacity:'1',
     cursor:'pointer',
 },
 cancel: {
     position: "absolute",
     top: '85%',
     left: '60%',
     width: "100px",
     height: "40px",
     backgroundImage:'linear-gradient(#fff,#9c0,#fff)',
     textAlign: "center",
     lineHeight: "40px",
     opacity:'1',
     cursor:'pointer',
 },
}
class Dialog{
 constructor(){
     this.addTipWindow()
 }
 addTipWindow(){
  this.cover = new Basic('cover').addToPlace(document.body)
  this.main = new Basic('main').addToPlace(this.cover.el)
  this.tips = new Basic('tips')
                    .addToPlace(this.main.el)
                    .addContent('请问易烊千玺帅不？')
  this.close = new Basic('close')
                    .addToPlace(this.main.el)
                    .addContent('×')
                    .bindEvent('onclick',()=>{
                        this.tips.addContent('必须回答')
                    })
  this.confirm = new Basic('confirm')
                    .addToPlace(this.main.el)
                    .addContent('喜欢')
                    .bindEvent('onclick',
                                ()=>this.tips.addContent('喜欢怎么能关闭？')
                            )   
  this.cancel = new Basic('cancel')
                            .addToPlace(this.main.el)
                            .addContent('不喜欢')
                            .bindEvent('onclick',()=>{
                                this.tips.addContent('呵，男人!!!')
                                this.tips.setStyle({background:'url(2.jpg) no-repeat center/cover'})
                                setTimeout(()=>this.closeBtn(),2000)
                            })    
                                       
 }
 closeBtn(json = {top:'-200px',opacity:'0'}){
  this.main.closeNode(json)//关闭弹窗
  this.cover.closeNode(json)
  setTimeout(()=>{
      this.cover.el.parentNode.removeChild(this.cover.el)//移除节点
  },time)
}
}
class Basic{
 constructor(type){
     this.type = type
     this.privateStyle = basicStylePath[this.type]
     this.createNode(this.privateStyle)
 }
 createNode(styleJson){
  this.el = document.createElement('div')//创建节点
  this.setStyle(styleJson)
}
setStyle(styleJson = {}){//渲染样式
 Object.assign(this.el.style,styleJson)
}
addToPlace(target){
 target.appendChild(this.el)//添加节点，添加到哪儿
 this.setStyle({top:'200px',opacity:'0'})
 setTimeout(()=>{
     this.setStyle(this.privateStyle)
 },time)
 return this
}
addContent(con){//给节点添加内容
 this.el.innerHTML = con
 return this
}
bindEvent(ev,callback = ()=>{}){//给节点绑定实践
 this.el[ev] = callback
 return this
}
closeNode(closeStyle = {}){//关闭弹窗
 this.setStyle(closeStyle)
}
}
let clickMe = document.querySelector('.click')
    clickMe.onclick = () => new Dialog()