/** 
 **@Desc: axios实例
 **/
import axios from 'axios'
import router from '@/router'

// 创建实例
// http://12.3.16.12:8090/
//http://12.3.0.15:8090     测试环境
//http://10.3.144.20:8090   生产环境
//baseURL:'http://192.168.129.108:8088',
let axiosInstance = axios.create({
    //baseURL:'http://192.168.129.108:8088',
    //baseURL:'http://12.3.0.15:8090',
    //baseURL:'http://10.3.144.20:8090',
    baseURL:'http://localhost:8088',
    timeout: 300000
})

// 请求拦截器
axiosInstance.interceptors.request.use(
    config => {
      config.headers.Authorization = sessionStorage.getItem('RyxToken')
      return config
    },
    err => {
      return Promise.reject(err)
    }
)


// 响应拦截器
axiosInstance.interceptors.response.use(
    response => {
        if (response.data.code == 2002) {
            return router.replace('/login')
        }
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

export default axiosInstance