import React, {Component} from 'react';
// import axios from 'axios'
// import {Card,WhiteSpace,WingBlank} from "antd-mobile";
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import Usercard from "../usercard/usercard";
@connect(
    state=>state.chatuser,
    {getUserList}
)
class Interviewer extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[]
        }
    }

    componentDidMount() {
        /*axios.get('/user/list?type=applicant')
            .then(res=>{
                if (res.status===200&&res.data.code===0){
                    this.setState({data:res.data.data})
                }
            })*/
        this.props.getUserList('applicant')
    }


    render() {
        // console.log(this.state.data)
        return (
            <Usercard userList={this.props.userList}/>
           /* {/!*<WingBlank>
                <WhiteSpace/>
                {this.props.userList.map(v=>(
                    v.avatar?(<Card key={v._id}>
                        <Card.Header
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.jpeg`)}
                            extra={<span>{v.title}</span>}
                            thumbStyle={{width:80,height:80}}
                        >
                        </Card.Header>
                        <Card.Body>
                            {v.desc.split('\n').map(d=>(
                                <div key={d}>{d}</div>
                            ))}
                        </Card.Body>
                    </Card>
                    ):null
                ))}
            </WingBlank>*!/}*/
        );
    }
}

export default Interviewer;