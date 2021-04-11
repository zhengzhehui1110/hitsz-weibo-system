// 常用的正则校验表达式
const REG_EMAIL=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
const REG_MOBILE=/^[1][3,4,5,7,8][0-9]{9}$/
const REG_NAME=/^[A-Za-z0-9\u4e00-\u9fa5_]+$/
const REG_PASSWORD=/^[A-Za-z0-9]+$/

export default {
    email:REG_EMAIL,
    mobile:REG_MOBILE,
    userName:REG_NAME,
    password:REG_PASSWORD,
}