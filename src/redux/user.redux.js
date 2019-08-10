import axios from 'axios'
import {getRedirectPath} from "../util";
const AUTH_SUCCESS = 'AUTH_SUCCESS'
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERR_MSG = 'ERR_MSG'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const initState = {
    redirecTo:'',
    user:'',
    type:'',
    msg:'',
}
export function user(state=initState,action) {
    // console.log(state,action)
    switch (action.type) {
        case ERR_MSG:
            return ({
                ...state,msg:action.msg
            })
        case LOAD_DATA:
            return ({
                ...state,...action.payload
            })
        case AUTH_SUCCESS:
            return ({
                ...state,msg: '',...action.payload,
                redirecTo:getRedirectPath(action.payload.type,action.payload.avatar)
            })
       /* case LOGIN_SUCCESS:
            return ({
                ...state,msg: '',isAuth: true,...action.payload,login_register:'login',
                redirecTo:getRedirectPath(action.payload.type,action.payload.avatar)
            })*/
        default:
            return state
    }

}
function errMsg(msg) {
    return {
        msg,
        type:ERR_MSG,
    }
}

function authSuccess(obj) {
    const {pwd,...data} =obj
    return {type: AUTH_SUCCESS,payload:data}
}

export function update(data) {
    return dispatch=> {
        axios.post('/user/update', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errMsg(res.data.msg))
                }

            })
            .catch(err => {
                console.log(err.message)
            })
    }
}
export function loadData(userinfodata) {
    return{type: LOAD_DATA,payload:userinfodata}
}
export function login({user,pwd}) {
    if (!(user&&pwd)){
        return errMsg("用户名和密码不能为空")
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
            .then(res=>{
                if (res.status===200&&res.data.code===0){
                    dispatch(authSuccess(res.data.data))
                }else {
                    dispatch(errMsg(res.data.msg))
                }

            })
            .catch(err=>{
                console.log(err.message)
            })
    }
}
export function register({user,pwd,repeatpwd,type}) {
    if (!(user&&pwd&&type)){
        return errMsg("用户名和密码不能为空")
    }
    if (pwd!==repeatpwd){
        return errMsg('密码和确认密码不一致')
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
            .then(res=>{
                if (res.status===200&&res.data.code===0){
                    dispatch(authSuccess({user,type}))
                }else {
                    dispatch(errMsg(res.data.msg))
                }
            })
            .catch(err=>{
                console.log(err.message)
            })
    }

}
/*function loginSuccess(data) {
    return {type:LOGIN_SUCCESS,payload:data}
}*/