import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {Button, WhiteSpace, WingBlank, InputItem, List, Radio, Icon, NavBar} from "antd-mobile";
import {connect} from 'react-redux'
import Logo from "../../component/logo/logo";
import {register} from "../../redux/user.redux";
import Appform from "../../component/appform/appform";
@connect(
    state=>state.user,
    {register}
)
@Appform
class Register extends Component {
    constructor(props){
        super(props)
        /*this.state={
            user:'',
            pwd:'',
            repeatpwd:'',
            type:'applicant'
        }*/
        this.handleRegister=this.handleRegister.bind(this)
    }

    componentDidMount() {
        this.props.handleChange('type','applicant')
    }

    /*handleChange(key,val){
         this.setState({
             [key]:val
         })
    }*/
    handleRegister(){
        this.props.register(this.props.state)
        // console.log(this.state)
        // console.log(this.props)
    }
    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                <NavBar
                    mode='light'
                    icon={<Icon type="left" />}
                    leftContent="返回"
                    onLeftClick={() =>{this.props.history.goBack()}}
                >
                    注册页面
                </NavBar>
                {this.props.redirecTo?<Redirect to={this.props.redirecTo}/>:null}
                <Logo></Logo>
                {/*<h2 style={{textAlign:'center'}}>注册页面</h2>*/}

                <WingBlank>
                    {this.props.msg?<p style={{textAlign:'center',color:'red'}}>{this.props.msg}</p>:null}
                    <List>
                        <InputItem onChange={v=>this.props.handleChange('user',v)}>用户名</InputItem>
                        <InputItem type='password' onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
                        <InputItem type='password' onChange={v=>this.props.handleChange('repeatpwd',v)}>确认密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <RadioItem
                            checked={this.props.state.type==='applicant'}
                            onChange={()=>this.props.handleChange('type','applicant')}>应聘者
                        </RadioItem>
                        <RadioItem
                            checked={this.props.state.type==='interviewer'}
                            onChange={()=>this.props.handleChange('type','interviewer')}>招聘者
                        </RadioItem>
                    </List>
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Register;