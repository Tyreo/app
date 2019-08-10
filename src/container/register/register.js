import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {Button,WhiteSpace,WingBlank,InputItem,List,Radio} from "antd-mobile";
import {connect} from 'react-redux'
import Logo from "../../component/logo/logo";
import {register} from "../../redux/user.redux";

@connect(
    state=>state.user,
    {register}
)
class Register extends Component {
    constructor(props){
        super(props)
        this.state={
            user:'',
            pwd:'',
            repeatpwd:'',
            type:'applicant'
        }
        this.handleRegister=this.handleRegister.bind(this)
    }
    handleChange(key,val){
         this.setState({
             [key]:val
         })
    }
    handleRegister(){
        this.props.register(this.state)
        // console.log(this.state)
        // console.log(this.props)
    }
    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirecTo?<Redirect to={this.props.redirecTo}/>:null}
                <Logo></Logo>
                <h2 style={{textAlign:'center'}}>注册页面</h2>

                <WingBlank>
                    {this.props.msg?<p style={{textAlign:'center',color:'red'}}>{this.props.msg}</p>:null}
                    <List>
                        <InputItem onChange={v=>this.handleChange('user',v)}>用户名</InputItem>
                        <InputItem type='password' onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
                        <InputItem type='password' onChange={v=>this.handleChange('repeatpwd',v)}>确认密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <RadioItem
                            checked={this.state.type==='applicant'}
                            onChange={()=>this.handleChange('type','applicant')}>应聘者
                        </RadioItem>
                        <RadioItem
                            checked={this.state.type==='interviewer'}
                            onChange={()=>this.handleChange('type','interviewer')}>招聘者
                        </RadioItem>
                    </List>
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Register;