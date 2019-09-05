import axiosInstance from '@/axiosInstance'
import qs from 'qs'

/**
 * 产品详情模块--录入实名制信息以及评估报告相关接口
 * @author baiyongshi
 * **/

//登录
export const Login = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/auth/login", data).then(res => res.data)
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

//获取角色列表

export const getRoleList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/role/getRoleList",data).then(res => res.data)
}

//角色新增

export const addRole = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/role/addRole",data).then(res => res.data)
}

//编辑角色

export const editRole = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/role/editRole",data).then(res => res.data)
}

//删除角色
export const deleteRole = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/role/deleteRole",data).then(res => res.data)
}

//获取权限列表

export const getPermissionList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/permission/getPermissionList",data).then(res => res.data)
}

//权限新增

export const addPermission = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/permission/addPermission",data).then(res => res.data)
}

//编辑权限

export const editPermission = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/permission/editPermission",data).then(res => res.data)
}

//删除权限
export const deletePermission = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/permission/deletePermission",data).then(res => res.data)
}

//查询分配权限
export const getALLPermissionList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/role/getALLPermissionList",data).then(res => res.data)
}

//分配权限
export const configPermission = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/role/allocationPermissionToRole",data).then(res => res.data)
}

//获取所有角色
export const getALLRoleList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/user/getALLRoleList",data).then(res => res.data)
}

//用户分配角色
export const configRole = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/user/allocationRoleToUser",data).then(res => res.data)
}


//添加商户
export const addMerchant = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/merchant/addMerchant",data).then(res => res.data)
}

//获取商户列表
export const getMerchantList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/merchant/getMerchantList",data).then(res => res.data)
}
//商户编辑
export const editMerchant = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/merchant/editMerchant",data).then(res => res.data)
}
//修改商户状态

export const changeStatus = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/merchant/changeStatus",data).then(res => res.data)
}

//加入黑名单
export const insertBlanklist = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/merchant/insertBlanklist",data).then(res => res.data)
}


//资质方管理

//查询省
export const getProvinceList = params => {
    return axiosInstance.post("/apii/merchant/getProvinceList").then(res => res.data)
}
//查询根据省查询市
export const getCityListByProvinceId = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/merchant/getCityListByProvinceId",data).then(res => res.data)
}
//查询所有的市
export const getCityList = params => {

    return axiosInstance.post("/apii/merchant/getCityList").then(res => res.data)
}

//资质方新增
export const addQualificationParty = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/qualificationParty/addQualificationParty",data).then(res => res.data)
}

//编辑资质方
export const editQualificationParty = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/qualificationParty/editQualificationParty",data).then(res => res.data)
}

//查询资质方列表
export const getQualificationPartyList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/qualificationParty/getQualificationPartyList",data).then(res => res.data)
}

//获取单月可用额度
export const getSingleMonthPayment = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/qualificationParty/getSingleMonthPayment",data).then(res => res.data)
}


//风险管理

//获取黑名单列表
export const getBlacklist = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/merchant/getBlacklist",data).then(res => res.data)
}

//解除黑名单
export const removeBlacklist = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/apii/merchant/removeBlacklist",data).then(res => res.data)
}



