import React, {Component} from 'react';
import {connect} from 'react-redux'
import {List,Badge} from "antd-mobile";

@connect(
    state=>state
)
class Msg extends Component {
    getLast(arr){
        return arr[arr.length-1]
    }
    /*handleClick(v){
        this.props.history.push(`/chat/${v}`)
    }*/
    render() {
        //按照用户聊天分组分组

        const users = this.props.chat.users
        const userid = this.props.user._id
        const Item = List.Item
        const Brief = Item.Brief
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v=>{//按照用户聊天chatid分组
            msgGroup[v.chatid] = msgGroup[v.chatid]||[]
            msgGroup[v.chatid].push(v)
        })
        // const chatList = Object.values(msgGroup)//把一个对象{}里的元素的key值去掉，内容变为一个数组，例如{name：li，age：20}变为[li,20]
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return (b_last - a_last)

        })
        // console.log(1565664979451-1565664979451)
        // console.log(msgGroup)
        return (
            <div>

                    {chatList.map(v=> {
                        console.log(v)
                        const lastItem = this.getLast(v)
                        const targetId = lastItem.from===userid?lastItem.to:lastItem.from
                        const unreadNum =v.filter(v=>!v.read&&v.to===userid).length
                        const avatar=require(`../img/${users[targetId].avatar}.jpeg`)
                        if (!users[targetId]){
                            return null
                        }
                        return(
                                <List key={lastItem._id}>
                                    <Item
                                        thumb={avatar}
                                        extra={<Badge text={unreadNum}/>}
                                        arrow='horizontal'
                                        onClick={()=>this.props.history.push(`/chat/${targetId}`)}
                                    >
                                        {lastItem.content}
                                        <Brief>
                                            {users[targetId].name}
                                        </Brief>
                                    </Item>
                                </List>
                            )

                    })}

            </div>
        );
    }
}

export default Msg;