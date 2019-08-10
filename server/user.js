//express中间件，user相关的路由
const express = require('express')
const Router = express.Router()//Router路由对象
// const utils = require('utility')
const md5Pwd = require('./utils')
const model = require('./model')
const User = model.getModel('user')
const _filter = {pwd:0,__v: 0}
//使用路由对象挂载Router.get
Router.get('/list',function (req,res) {
    User.find({},function (err,doc) {
        return  res.json(doc)
    })
})
Router.post('/update',function (req,res) {
    // console.log(req.body)
    const userid = req.cookies.userid
    if (!userid){
        return res.json.dumps({code:1})
    }
    const body=req.body
    User.findByIdAndUpdate(userid,body,function (err,doc) {
        /*const data=Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)*/
        const data={user: doc.user,type:doc.type,...body}
        return res.json({code:0,data})
    })
})
Router.post('/login',function (req,res) {
    // console.log(req.body)
    const {user,pwd}=req.body
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function (err,doc) {
        if (!doc){
            return res.json({code:1,msg:'用户名或密码错误'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})
Router.post('/register',function (req,res) {
    // console.log(req.body)
    const {user,pwd,type}=req.body
    User.findOne({user},function (err,doc) {
        if (doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        const userModel = new User({user,pwd:md5Pwd(pwd),type})
        userModel.save(function (err,doc) {
            if (err){
                return res.json({code:1,msg:'后端错误'})
            }
            const {user,type,_id} = doc
            res.cookie('userid',_id)
            return res.json({code:0,data:{user,type,_id}})
        })
        /*User.create({user,pwd:md5Pwd(pwd),type},function (err,doc) {
            if (err){
                return res.json({code:1,msg:'后端错误'})
            }
            return res.json({code:0})
        })*/
    })
})
/*User.remove({},function (err,doc) {
    console.log(doc)
})*/
Router.get('/info',function (req,res) {
    const {userid} = req.cookies
    if (!userid){
        return res.json({code:1})
    }
    User.findById(userid,_filter,function (err,doc) {
        if (err){
            return res.json({code:1,msg:'后端出错500'})
        }
        if (doc){
            return res.json({code:0,data:doc})
        }
    })
})
module.exports = Router