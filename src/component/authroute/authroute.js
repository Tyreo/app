import  {Component} from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {loadData} from "../../redux/user.redux";
// import {Redirect} from 'react-router-dom'

@withRouter
@connect(
    null,
    {loadData}
)
class Authroute extends Component {

    componentDidMount() {

        const publicList = ['/login','/register']
        const pathname = this.props.location.pathname
        if (publicList.indexOf(pathname)>-1){
            return null
        }
        axios.get('/user/info')
            .then(res=>{
                if (res.status===200){
                    // console.log(res.data)
                    if (res.data.code===0){
                        // console.log(res.data.code)
                        this.props.loadData(res.data.data)
                    }else {
                        this.props.history.push('/login')
                        // console.log(typeof (res.data.code))
                    }

                }
            })

    }
    render() {
        return null
    }
}

export default Authroute;