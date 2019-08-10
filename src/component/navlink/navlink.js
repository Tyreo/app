import React, {Component} from 'react';
import PropTypes from "prop-types";
import {TabBar} from "antd-mobile";
import {withRouter} from 'react-router-dom'
@withRouter
class Navlink extends Component {
    static propType = {
        data:PropTypes.array.isRequired
    }
    render() {
        // console.log(this.props)
        const navList = this.props.data.filter(v=>!v.hide)
        // console.log(navList)
        const {pathname} = this.props.location
        return (
                <TabBar>
                    {navList.map(v=>(
                            <TabBar.Item
                                title={v.text}
                                key={v.path}
                                icon={{uri:require(`./img/${v.icon}.jpg`)}}
                                selectedIcon={{uri:require(`./img/${v.icon}-active.jpg`)}}
                                selected={pathname===v.path}
                                onPress={()=>{
                                    this.props.history.push(v.path)
                                }}
                            >
                            </TabBar.Item>
                        )
                    )}
                </TabBar>
        )
    }
}

export default Navlink;