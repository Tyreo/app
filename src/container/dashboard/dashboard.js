import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Switch,Route} from "react-router-dom";
import {NavBar, Button, InputItem, TextareaItem, WhiteSpace, WingBlank} from 'antd-mobile';
import Navlink from "../../component/navlink/navlink";
function Interviewer() {
    return <h2>招聘者首页</h2>
}
function Applicant() {
    return <h2>应聘者首页</h2>
}
function Msg() {
    return <h2>消息列表</h2>
}
function User() {
    return <h2>个人中心</h2>
}
@connect(
    state=>state.user
)
class Dashboard extends Component {
    render() {
        // console.log(this.props)
        const {pathname} = this.props.location
        // console.log(pathname)
        const user = this.props
        const navList = [
            {
                path:'/interviewer',
                text:'应聘者',
                icon:'list',
                title:'应聘者列表',
                component:Interviewer,
                hide:user.type==='applicant'
            },
            {
                path:'/applicant',
                text:'招聘者',
                icon:'list',
                title:'招聘者列表',
                component:Applicant,
                hide:user.type==='interviewer'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg,
            },
            {
                path:'/me',
                text:'我的',
                icon:'user',
                title:'个人中心',
                component:User,
            }

        ]
        return (
            <div >
                <NavBar className='fixed-header' mode='dark'>{navList.find(v=>v.path===pathname).title}</NavBar>,
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}/>
                        ))}
                    </Switch>
                </div>
                <Navlink data={navList}/>
            </div>
        );
    }
}

export default Dashboard;