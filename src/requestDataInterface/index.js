import axiosInstance from '@/axiosInstance'
import qs from 'qs'

/**
 * 产品详情模块--录入实名制信息以及评估报告相关接口
 * @author baiyongshi
 * **/

//登录
export const Login = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/auth/login", data).then(res => res.data)
}

//登出
export const Logout = params => {
    return axiosInstance.get("/user/logout").then(res => res.data)
}

//获取权限侧边栏菜单

export const getMenuList = params => {
    let data = qs.stringify( params )
    return axiosInstance.post("/auth/getMenuList",data).then(res => res.data)
}

//获取用户列表
export const getUserList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/user/getUserList",data).then(res => res.data)
}

//新增用户
export const addUser = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/user/addUser",data).then(res => res.data)
}

//编辑用户

export const editUser = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/user/editUser",data).then(res => res.data)
}

//删除用户

export const deleteUser = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/user/deleteUser",data).then(res => res.data)
}

//获取角色列表

export const getRoleList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/role/getRoleList",data).then(res => res.data)
}

//角色新增

export const addRole = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/role/addRole",data).then(res => res.data)
}

//编辑角色

export const editRole = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/role/editRole",data).then(res => res.data)
}

//删除角色
export const deleteRole = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/role/deleteRole",data).then(res => res.data)
}

//获取权限列表

export const getPermissionList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/permission/getPermissionList",data).then(res => res.data)
}

//权限新增

export const addPermission = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/permission/addPermission",data).then(res => res.data)
}

//编辑权限

export const editPermission = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/permission/editPermission",data).then(res => res.data)
}

//删除权限
export const deletePermission = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/permission/deletePermission",data).then(res => res.data)
}

//查询分配权限
export const getALLPermissionList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/role/getALLPermissionList",data).then(res => res.data)
}

//分配权限
export const configPermission = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/role/allocationPermissionToRole",data).then(res => res.data)
}

//获取所有角色
export const getALLRoleList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/user/getALLRoleList",data).then(res => res.data)
}

//用户分配角色
export const configRole = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/user/allocationRoleToUser",data).then(res => res.data)
}







