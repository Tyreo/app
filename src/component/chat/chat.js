import React, {Component} from 'react';
// import io from 'socket.io-client'
import {List, InputItem, NavBar,Grid,Icon} from "antd-mobile";
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg,readMsg} from "../../redux/chat.redux";
import {getChatId} from "../../util";

// const socket=io('ws://localhost:9093')//当前socket
@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg,readMsg}
)
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state={
            text:'',
            showEmoji:false
        }
    }

    componentDidMount() {
        // const socket=io('ws://localhost:9093')//当前socket,可以用来发送，emit
        /*socket.on('recvmsg',(data)=> {
            // console.log(data)
            this.setState({
                msg: [...this.state.msg,data.text]
            })
        })*/

        if (!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }

    }
    componentWillUnmount() {
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }

    fixCarousel(){//isCarousel修正跑马灯
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    handleSubmit(){
        // socket.emit('sendmsg',{text:this.state.text})
        // this.setState({text:''})
        // console.log(this.state)
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from,to,msg})
        this.setState({text:''})
    }
    render() {
        // console.log(this.props)
        const emoji = '😀 😃 😄 😁 😆 😅 🤣 😂 🙂 😂 😀 😃 😄 😁 😆 😅 🤣 😂 🙂 😂 😃 😄 😁 😆 😅 🤣 😂 🙂 😂 😀 😃 😄 😁 😆 😅 🤣 😂 🙂 😂 😃 😄 😁 😆 😅 🤣 😂 🙂 😂 😀 😃 😄 😁 😆 😅 🤣 😂 🙂 😂 😃 😄 😁 😆 😅 🤣 😂 🙂 😂 😀 😃 😄 😁 😆 😅 🤣 😂 🙂 😂'
            .split(' ')
            .filter(v=>v)
            .map(v=>({
                text:v
            }))
        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        const chatid = getChatId(userid,this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter((v=>v.chatid===chatid))
        if (!users[userid]){
            return null
        }
        return (
            <div id='chat-page'>
                <NavBar
                    icon={<Icon type="left" />}
                    leftContent="返回"
                    onLeftClick={() =>{this.props.history.goBack()}}
                >
                    {users[userid].name}
                </NavBar>
                {chatmsgs.map(v=>{
                    const avatar=require(`../img/${users[v.from].avatar}.jpeg`)
                    return v.from===userid?(
                        <List key={v._id}>
                            <Item
                                thumb={avatar}
                            >
                                {v.content}
                            </Item>
                        </List>
                    ):(
                        <List key={v._id}>
                            <Item
                                extra={<img src={avatar} alt="avatar"/>}
                                className='chat-me'
                            >
                                {v.content}
                            </Item>
                        </List>
                    )
                    // return <p key={v._id}>{v.content}</p>
                })}
                <div className='stick-footer'>
                   <List>
                       <InputItem
                           placeholder='请输入'
                           value={this.state.text}
                           onChange={v=>{this.setState({text:v})}}
                           extra={
                               <div>
                                   <span
                                       style={{marginRight:10}}
                                       onClick={v=>{this.setState({showEmoji:!this.state.showEmoji})
                                           this.fixCarousel()
                                       }}
                                       role="img"
                                       aria-label='emoji'
                                   >😀</span>
                                   <span onClick={()=>this.handleSubmit()}>发送</span>
                               </div>
                           }
                       >
                       </InputItem>
                   </List>
                    {this.state.showEmoji?<Grid
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={ele=>{
                            this.setState({
                                text:this.state.text+ele.text
                            })
                        }}
                    />:null}
                </div>
            </div>
        );
    }
}

export default Chat;