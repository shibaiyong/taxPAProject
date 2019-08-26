import axiosInstance from '@/axiosInstance'
import qs from 'qs'

/**
 * 产品详情模块--录入实名制信息以及评估报告相关接口
 * @author baiyongshi
 * **/

//登录
export const Login = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/auth/vueLogin", data).then(res => res.data)
}

//登出
export const Logout = params => {
    return axiosInstance.get("/user/logout").then(res => res.data)
}

//获取权限侧边栏菜单

export const getMenuList = params => {
    let data = qs.stringify( params )
    return axiosInstance.post("/apii/auth/getMenuList",data).then(res => res.data)
}

//获取用户列表
export const getUserList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/user/getUserList",data).then(res => res.data)
}

//新增用户
export const addUser = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/user/addUser",data).then(res => res.data)
}

//编辑用户

export const editUser = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/user/editUser",data).then(res => res.data)
}

//删除用户

export const deleteUser = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/user/deleteUser",data).then(res => res.data)
}

//获取数据总量
export const getCityList = params => {
    return axiosInstance.get("/apii/auth/getCityList").then(res => res.data)
}










