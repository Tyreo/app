import React, {Component} from 'react';
import {NavBar, Button, InputItem, TextareaItem, WhiteSpace, WingBlank} from 'antd-mobile';
import Avatarselect from "../../component/avatarselect/avatarselect";
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from "../../redux/user.redux";
@connect(
    state=>state.user,
    {update}
)
class Interviewerinfo extends Component {
    constructor(props) {
        super(props);
        this.state={
            title:'',
            company:'',
            money:'',
            desc:''
        }
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    selectAvatar=(imgname)=>{
        this.setState({
            avatar:imgname
        })
    }

    render() {
        const path = this.props.location.pathname
        const redirect =this.props.redirecTo
        return (
            <div>
                {redirect&&redirect!==path?<Redirect to={this.props.redirecTo}/>:null}
                <NavBar mode="light">招聘者完善信息</NavBar>


                    <Avatarselect selectAvatar={this.selectAvatar}>
                    </Avatarselect>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <InputItem onChange={(v)=>this.onChange('title',v)}>职位选择</InputItem>
                    <InputItem onChange={(v)=>this.onChange('company',v)}>公司名称</InputItem>
                    <InputItem onChange={(v)=>this.onChange('money',v)}>薪资范围</InputItem>
                    <TextareaItem title='职位简介' autoHeight={true} onChange={(v)=>this.onChange('desc',v)}>
                    </TextareaItem>
                <WingBlank>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <Button type='primary' onClick={()=>{this.props.update(this.state)}}>保存</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Interviewerinfo;