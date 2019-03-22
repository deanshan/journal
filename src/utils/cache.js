// import axios from 'axios'
// import { https } from './https.js'
// import { SUCCESS_CODE, USERINFO_ERROR, APP_KEY, MD_CONFIG } from '@/utils/constant.js'



// export const dictionary = () => {
//     for(const key in MD_CONFIG) {
//         https.get(`/mdConfig/getByParentConfigId?parentConfigId=${MD_CONFIG[key]}`)
//             .then(res => {
//                 sessionStorage.setItem(`${key}`, JSON.stringify(res.children))
//             })

//     }
// }

// // 通过appKey获取url
// export const getUrl = () => {
//     for(const key in APP_KEY) {
//         https
//             .get(`/app/getByAppKey?appKey=${APP_KEY[key]}`)
//             .then(res => {
//                 if(APP_KEY[key] == APP_KEY.account){
//                     document.getElementById('icon-logo')
//                         .setAttribute('href',sessionStorage.getItem(APP_KEY.account)+'/logo/detail?type=browserLogo')
//                 }
//                 sessionStorage.setItem(`${res.appKey}`, res.ipAddress)
//             })
//     }
// }

// // 获取token
// export const getToken = (callback) => {
//     let token = sessionStorage.getItem('token')
//     if(!token) {
//         axios
//             .get(`/auth/session`)
//             .then(res => {
//                 if(res.data.code == SUCCESS_CODE){
//                     sessionStorage.setItem("user",JSON.stringify(res.data.result))
//                     sessionStorage.setItem('token', res.data.result.sessionId)
//                     callback
//                 } else if(res.data.code == USERINFO_ERROR) {
//                     // window.open(`${sessionStorage.getItem(APP_KEY['account'])}/login.jsp`,"_self")
//                 }
//             })
//             .catch(error => {
//                 Promise.reject(error)
//             })
//     } else {
//         callback
//     }
// }