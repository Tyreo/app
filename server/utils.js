/*函数工具*/
const utils = require('utility')
function md5Pwd(pwd) {
    const salt = 'lijun.appwork.pwd_jiami!1008234'//密码加密盐
    return utils.md5(utils.md5(pwd+salt))
}
module.exports = md5Pwd