import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Switch,Route} from "react-router-dom";
import {NavBar} from 'antd-mobile';
import Navlink from "../../component/navlink/navlink";
import Interviewer from "../../component/interviewer/interviewer";
import Applicant from "../../component/applicant/applicant";
import User from "../../component/user/user";
import {getMsgList,recvMsg} from "../../redux/chat.redux";
import Msg from "../../component/msg/msg";
@connect(
    state=>state,
    {getMsgList,recvMsg}
)
class Dashboard extends Component {

    componentDidMount() {
        if (!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }

    render() {
        // console.log(this.props)
        const {pathname} = this.props.location
        // console.log(pathname)
        const user = this.props.user
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
                component:Msg
            },
            {
                path:'/me',
                text:'我的',
                icon:'user',
                title:'个人中心',
                component:User
            }

        ]
        // console.log(navList) (pathname==='/applicant'||pathname==='/interviewer'||pathname==='/msg'||pathname==='/me')?
        return (
            <div >
                <NavBar className='fixed-header' mode='dark'>
                    {navList.find(v=>v.path===pathname).title}
                </NavBar>
                <div style={{marginTop:45,marginBottom:75}}>
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