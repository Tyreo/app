import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import Logo from "../../component/logo/logo";
import {Button, WhiteSpace, WingBlank,List,InputItem} from "antd-mobile";
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import Appform from "../../component/appform/appform";
/*function hello() {
    console.log("nihao")
}
function WrapperHello(fn) {
    return function () {
        console.log('qian')
        fn()
        console.log('hou')
    }
}
hello=WrapperHello(hello)
hello()*/
//属性代理：给原来的component加额外的属性
/*function WrapperHello(Comp) {
    class WrapComp extends Component {
        render() {
            return (
                <div>
                    <p>这是HOC高阶组建特有元素</p>
                    <Comp name='text' {...this.props}/>
                </div>
            );
        }
    }
    return WrapComp
}*/
//反向继承 改写生命周期，修改渲染流程
/*function WrapperHello(Comp) {
    class WrapComp extends Comp {

        componentDidMount() {
            console.log('高阶组件新增生命周期')
        }

        render() {
            return (
                <Comp/>
            );
        }
    }
    return WrapComp
}
@WrapperHello
class Hello extends Component {
    render() {
        return (
            <h2>hello</h2>
        );
    }
}*/

// Hello=WrapperHello(Hello)等价于@WrapperHello
@connect(
    state=>state.user,
    {login}
)
@Appform
class Login extends Component {
    constructor(props){
        super(props)
       /* this.state={
            user:'',
            pwd:'',
        }*/
        this.register=this.register.bind(this)
    }

   /* handleChange(key,val){
        this.setState({
            [key]:val
        })

    }*/
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
        this.props.login(this.props.state)
        // let state = this.props.location.state;
        // this.props.history.replace(this.props.location.pathname, state);
        // console.log(this.state)
        // console.log(this.props)
    }

    render() {
        // console.log(this.props)

        return (
            <div>
                {/*<Hello/>*/}
                {(this.props.redirecTo&&this.props.redirecTo!=='/login')?<Redirect to={this.props.redirecTo}/>:null}

                {/*{this.props.redirecTo?<Redirect to={this.props.redirecTo}/>:null}*/}
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
                            onChange={v=>this.props.handleChange('user',v)}>
                            用户名
                        </InputItem>
                        <InputItem
                            placeholder='密码'
                            type='password'
                            onChange={v=>this.props.handleChange('pwd',v)}>
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