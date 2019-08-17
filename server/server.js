//express入口
const express = require('express')
// const utils = require('utility')
const bodyParser = require('body-parser')
const cookiesParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
//work with express,io关联express
const app = express()
const server = require('http').Server(app)
const io =require('socket.io')(server)
// const md5Pwd = require('./utils')
io.on('connection',function (socket) {//io是全局连接的请求，socket是当前连接的请求
    console.log('user login')
    socket.on('sendmsg',function (data) {
        // console.log(data)
        // io.emit('recvmsg',data)
        const {from,to,msg}  = data
        const chatid=[from,to].sort().join('_')//两个用户的ID join拼成一个，代替from和to
        // console.log(chatid)
        Chat.create({chatid,from,to,content:msg},function (err,doc) {
            io.emit('recvmsg', {...doc._doc})
            //{...doc._doc}=Object.assign({},doc._doc)????
            // console.log({...doc._doc})
            // console.log({...doc._doc}==Object.assign({},doc._doc))
        })
    })
})
const userRouter = require('./user')

app.use(cookiesParser())
app.use(bodyParser.json())//开启bodyParser中间件来解析post请求过来的json数据
app.use('/user',userRouter)
/*app.use开启中间件，'/user'前缀相关的子路由userRouter，：例如：user.js中的
Router.get('/info',function (req,res) {
return res.json({code:1})
})*/
/*app.listen(9093,function () {
    console.log('Node app start at port 9093')
})*/
server.listen(9093,function () {
    console.log('Node app start at port 9093')
})