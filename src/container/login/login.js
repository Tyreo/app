import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import Logo from "../../component/logo/logo";
import {Button, WhiteSpace, WingBlank,List,InputItem} from "antd-mobile";
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
@connect(
    state=>state.user,
    {login}
)
class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            user:'',
            pwd:'',
        }
        this.register=this.register.bind(this)
    }

    handleChange(key,val){
        this.setState({
            [key]:val
        })

    }
    register(){
        // console.log(this.props)
        this.props.history.push('/register')

    }
    handleLogin=()=>{
        // console.log(this.props.location.pathname);
        // this.props.location.state={from:this.props.location.pathname}
        // this.setState({from:this.props.location.pathname})
        // console.log(this.props.location.pathname)
        // console.log(this.state.from)
        this.props.login(this.state)
        // let state = this.props.location.state;
        // this.props.history.replace(this.props.location.pathname, state);
        // console.log(this.state)
        // console.log(this.props)
    }

    render() {
        // console.log(this.props)

        return (
            <div>
                {this.props.redirecTo?<Redirect to={this.props.redirecTo}/>:null}
                <Logo/>
                <h2 style={{textAlign:'center'}}>登录页面</h2>
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
                {this.props.msg?<p style={{textAlign:'center',color:'red'}}>{this.props.msg}</p>:null}
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
                <WingBlank>
                    <List>
                        <InputItem
                            placeholder='用户名'
                            onChange={v=>this.handleChange('user',v)}>
                            用户名
                        </InputItem>
                        <InputItem
                            placeholder='密码'
                            type='password'
                            onChange={v=>this.handleChange('pwd',v)}>
                            密码
                        </InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Login;