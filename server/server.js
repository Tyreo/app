//express入口
const express = require('express')
// const utils = require('utility')
const bodyParser = require('body-parser')
const cookiesParser = require('cookie-parser')
const md5Pwd = require('./utils')
const userRouter = require('./user')
const app = express()
app.use(cookiesParser())
app.use(bodyParser.json())//开启bodyParser中间件来解析post请求过来的json数据
app.use('/user',userRouter)
/*app.use开启中间件，'/user'前缀相关的子路由userRouter，：例如：user.js中的
Router.get('/info',function (req,res) {
return res.json({code:1})
})*/
app.listen(9093,function () {
    console.log('Node app start at port 9093')
})
