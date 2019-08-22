import axiosInstance from '@/axiosInstance'
import qs from 'qs'

/**
 * 产品详情模块--录入实名制信息以及评估报告相关接口
 * @author baiyongshi
 * **/

//登录
export const Login = params => {
    return axiosInstance.post("/apii/auth/login", params).then(res => res.data)
}

//登出
export const Logout = params => {
    return axiosInstance.get("/user/logout").then(res => res.data)
}

//获取数据总量
export const getUserList = params => {
    return axiosInstance.get("/apii/auth/getUserList").then(res => res.data)
}

//获取数据总量
export const getCityList = params => {
    return axiosInstance.get("/apii/auth/getCityList").then(res => res.data)
}










