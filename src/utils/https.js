import axios from 'axios'

const baseUrl = () => {
    switch (process.env.NODE_ENV) {
        case 'development':
            return "http://10.2.102.97:3100"   //开发环境url
        case 'production':
            return "http://10.2.102.97:3100"   //生产环境url
        case 'test':
            return "http://10.2.102.97:3100"   //测试环境url
        default:
            return "http://10.2.102.97:3100"   //其它环境url
    }
}

axios.defaults.baseURL = "http://10.2.102.97:3100"

axios.interceptors.request.use(config => {
    let token = sessionStorage.getItem('token')
    if(token) {
        config.headers.common["token"] = token
    }
    return config
}, error => {
    return Promise.reject(error)
})

// axios.interceptors.response.use(response => {
//     return response
// }, error => {
//     console.log(error.response)
//     return Promise.reject(error)
// })

const promise = (url, params, method) => {

    let options = { url, params, method}
    if(method !== 'get' || method !== 'delete') {
        options = { url, data: params, method}
    }
    return new Promise((resolve, reject) => {
        axios(options)
            .then(response => {
                resolve(response.data)
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