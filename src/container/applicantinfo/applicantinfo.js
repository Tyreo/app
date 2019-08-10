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
class Applicantinfo extends Component {
    constructor(props) {
        super(props);
        this.state={
            title:'',
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
                <NavBar mode="light">应聘者完善信息</NavBar>


                <Avatarselect selectAvatar={this.selectAvatar}>
                </Avatarselect>
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
                <InputItem onChange={(v)=>this.onChange('title',v)}>应聘岗位</InputItem>
                <TextareaItem title='个人简介' autoHeight={true} onChange={(v)=>this.onChange('desc',v)}>
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

export default Applicantinfo;