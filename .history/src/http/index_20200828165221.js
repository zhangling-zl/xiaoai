import axios from 'axios'
import nprogress from 'nprogress'

//运行环境：本地环境和线上(生产)环境:production
const isPro = process.env.NODE_ENV ==='production'

const service = axios.create({
    //所有请求的根路径
    // baseURL: isPro ? '线上的接口路径'：'/api',
    //超时时间
    timeout:100000
})