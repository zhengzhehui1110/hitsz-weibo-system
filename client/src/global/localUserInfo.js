// 从浏览器缓存取出或写入用户信息
export const localUserInfo = {
    getInfo: ()=>{
        console.log('storage:get info');
        return JSON.parse(sessionStorage.getItem('userInfo'))
    },
    setInfo: (info) =>{
        console.log('storage:get info', info);
        sessionStorage.setItem('userInfo', JSON.stringify(info))
    }
}
