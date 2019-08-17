import React, {Component} from 'react';
import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'
import {Result,List,WhiteSpace,Button,Modal} from "antd-mobile";
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
@connect(
    state=>state.user,
    {logoutSubmit}
)
class User extends Component {
    /*shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (this.props.history.action === 'POP')
    }*/
    constructor(props) {
        super(props);
        this.logout=this.logout.bind(this)
    }

    logout(){
        const alert = Modal.alert
        alert('注销', '确认退出登录吗？', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            { text: '确认', onPress: () => {
                browserCookie.erase('userid')
                this.props.logoutSubmit()
                this.props.history.push('/login')
                // window.location.href = window.location.href
            }},

        ])
        /*browserCookie.erase('userid')
        window.location.href = window.location.href*/
        // console.log('sssssssssssss')
    }
    render() {

        const props = this.props
        // console.log(props.redirecTo)props.user?
        // const target =((props.location.pathname==='/me')&&(props.user===''))?null:<Redirect to={props.redirecTo}/>
        /*if (props.redirecTo==='/login'){
            return <Redirect to='/login'/>
        }*/
        return props.user?(
                <div>
                    {/*{props.redirecTo?<Redirect to='/login'/>:null}*/}
                    <Result
                        img={<img src={require(`../img/${props.avatar}.jpeg`)} alt="" style={{width:20}}/>}
                        title={props.user}

                        message={(props.type==='interviewer')?props.company:null}
                    />
                    <List renderHeader={()=>'简介'}>
                        <List.Item
                            multipleLine
                        >
                            {props.title}
                            {props.desc.split('\n').map(v=><List.Item.Brief key={v}>{v}</List.Item.Brief>)}
                            {props.money?<List.Item.Brief >薪资：{props.money}</List.Item.Brief>:null}
                        </List.Item>
                    </List>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <Button type='warning' onClick={this.logout}>注销登录</Button>
                </div>
            ):null;
    }
}

export default User;