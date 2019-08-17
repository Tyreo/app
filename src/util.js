/*
工具函数
* */
export function getRedirectPath(type,avatar) {
//    根据用户信息跳转到相应地址
//     user.type/interviewer/applicant
//     user.avatar/interviewer/applicantinfo
    let url = (type==='interviewer')?'/interviewer':'/applicant'
    if (!avatar){
        url +='info'
    }
    return url
}
export function getChatId(userId,targetId) {
    return [userId,targetId].sort().join('_')
}