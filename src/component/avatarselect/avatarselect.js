import React, {Component} from 'react';
import {Grid,List} from "antd-mobile";
import PropTypes from 'prop-types'

class Avatarselect extends Component {
    static propType = {
        selectAvatar:PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        const avatarList = '1,2,3,4,5,6,7,8,9,10,11,12'
            .split(',')
            .map(v=>({
                icon:require(`../img/${v}.jpeg`),
                text:v
            }))
        const gridHeader = this.state.icon
            ? (<div>
                <span>已选头像</span>
                <img style={{width:20,height:20}} src={this.state.icon} alt="avatar"/>
            </div>)
            : <div>请选择头像</div>
        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid
                        data={avatarList}
                        onClick={elm=>{
                            this.setState(elm)
                            this.props.selectAvatar(elm.text)}}
                    />
                </List>
            </div>
        );
    }
}

export default Avatarselect;