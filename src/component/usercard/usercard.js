import React, {Component} from 'react';
import {Card, WhiteSpace, WingBlank} from "antd-mobile";
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
@withRouter
class Usercard extends Component {
    static propType = {
        userList: PropTypes.array.isRequired
    }
    handleClick(v){
        this.props.history.push(`/chat/${v._id}`)
    }
    render() {
        return (
            <WingBlank>
                <WhiteSpace/>
                {this.props.userList.map(v=>(
                    v.avatar?(
                        <Card
                            key={v._id}
                            onClick={()=>this.handleClick(v)}
                        >
                            <Card.Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.jpeg`)}
                                extra={<span>{v.title}</span>}
                                thumbStyle={{width:80,height:80}}
                            >
                            </Card.Header>
                            <Card.Body>
                                {v.type==='interviewer'?<div>公司:{v.company}</div>:null}
                                {v.desc.split('\n').map(d=>(
                                    <div key={d}>{d}</div>
                                ))}
                                {v.type==='interviewer'?<div>薪资:{v.money}</div>:null}
                            </Card.Body>
                        </Card>
                    ):null
                ))}
            </WingBlank>
        );
    }
}

export default Usercard;