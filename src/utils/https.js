import store from '@/store'
import router from '@/router'
import axios from 'axios'
import { Notification } from 'element-ui';

// FIXME:因music api是网络接口和node服务器两个不同的接口，暂时只能通过反向代理实现请求，否则无法请求网络接口
// axios.defaults.baseURL = 'http://10.2.103.72:3100'
// axios.defaults.baseURL = "http://169.254.186.21:3100"

// 请求前拦截数据
axios.interceptors.request.use(config => {

    //FIXME: 判断vuex中的token是否存在，若存在，则加入头部，当页面刷新时在router里重新获取token加入vuex
    if (store.state.token) {
        config.headers.common["token"] = store.state.token
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 返回请求的数据后，一般做错误处理
axios.interceptors.response.use(response => {

    return response.data
}, error => {

    if (error && error.response) {

        let status = error.response.status
        // TODO:暂时只针对token的有效期做了处理
        switch (status) {
            case 401:
                Notification({ message: error.response.data })
                router.push({ path: '/login' })
        }
    }
    console.log(error.response)
    return Promise.reject(error)
})

// TODO:需要重新封装
const promise = (url, params, method) => {

    let options = { url, params, method }

    if (method === 'post' || method === 'put') {
        options = { url, data: params, method }
    }
    return new Promise((resolve, reject) => {
        axios(options)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export const https = {
    get: (url, params = {}, method = 'get') => promise(url, params, method),
    post: (url, data = {}, method = 'post') => promise(url, data, method),
    put: (url, data = {}, method = 'put') => promise(url, data, method),
    delete: (url, data = {}, method = 'delete') => promise(url, data, method)
}