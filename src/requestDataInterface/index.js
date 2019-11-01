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
export const logOut = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/auth/logout", data).then(res => res.data)
}
//获取权限侧边栏菜单

export const getMenuList = params => {
    let data = qs.stringify( params )
    return axiosInstance.post("/auth/getMenuList",data).then(res => res.data)
}

/*-----------------------系统管理---------------------*/

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

/*---------------商户管理--------------------*/


//添加商户
export const addMerchant = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/merchant/addMerchant",data).then(res => res.data)
}

//获取商户列表
export const getMerchantList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/merchant/getMerchantList",data).then(res => res.data)
}
//商户编辑
export const editMerchant = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/merchant/editMerchant",data).then(res => res.data)
}
//修改商户状态

export const changeMerchantStatus = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/merchant/changeStatus",data).then(res => res.data)
}

//加入黑名单
export const insertBlanklist = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/merchant/insertBlanklist",data).then(res => res.data)
}
//获取商户详情
export const getMerchantById = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/merchant/getMerchantById",data).then(res => res.data)
}
//根据资质方获取商户列表（互调时调用来获取下方商户列表）
export const getMerchantListByZZF = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/merchant/getMerchantListByZZF",data).then(res => res.data)
}
//商户调账申请
export const applicationSubmit = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/accountAdjustment/applicationSubmit",data).then(res => res.data)
}


/*---------------资质方管理---------------*/

//查询省
export const getProvinceList = params => {
    return axiosInstance.post("/merchant/getProvinceList").then(res => res.data)
}
//查询根据省查询市
export const getCityListByProvinceId = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/merchant/getCityListByProvinceId",data).then(res => res.data)
}
//查询所有的市
export const getCityList = params => {

    return axiosInstance.post("/merchant/getCityList").then(res => res.data)
}

//资质方新增
export const addQualificationParty = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/qualificationParty/addQualificationParty",data).then(res => res.data)
}

//编辑资质方
export const editQualificationParty = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/qualificationParty/editQualificationParty",data).then(res => res.data)
}

//查询资质方列表
export const getQualificationPartyList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/qualificationParty/getQualificationPartyList",data).then(res => res.data)
}

//获取单月可用额度
export const getSingleMonthPayment = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/qualificationParty/getSingleMonthPayment",data).then(res => res.data)
}
//修改资质方状态
export const changeQualificationStatus = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/qualificationParty/changeStatus",data).then(res => res.data)
}

//获取资质方详情
export const getQualificationPartyById = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/qualificationParty/getQualificationPartyById",data).then(res => res.data)
}

/*---------风险管理------------*/

//拦截订单  使用代付请求的接口，仅展示代付状态为7风险拦截的代付请求

//获取商户黑名单列表
export const getBlacklist = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/merchant/getBlacklist",data).then(res => res.data)
}

//解除商户黑名单
export const removeBlacklist = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/merchant/removeBlacklist",data).then(res => res.data)
}

//获取用户黑名单列表
export const getUserBlacklist = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/userInfo/getBlacklist",data).then(res => res.data)
}

//解除用户黑名单
export const removeUserBlacklist = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/userInfo/removeBlacklist",data).then(res => res.data)
}
/*-------------------用户管理---------------------*/

// 获取用户列表
export const getUserInfoList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/userInfo/getUserInfoList",data).then(res => res.data)
}

//获取详情用户

export const getUserInfoById = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/userInfo/getUserInfoById",data).then(res => res.data)
}

//用户修改
export const editUserInfo = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/userInfo/editUserInfo",data).then(res => res.data)
}

//用户删除
export const deleteUserInfo = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/userInfo/deleteUserInfo",data).then(res => res.data)
}

//加入黑名单

export const addBlackList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/userInfo/insertBlanklist",data).then(res => res.data)
}

/*-------------------------代付管理------------------------------*/

//渠道列表
export const getPaymentChannelList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/paymentChannel/getPaymentChannelList",data).then(res => res.data)
}

export const addPaymentChannel = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/paymentChannel/addPaymentChannel",data).then(res => res.data)
}

export const editPaymentChannel = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/paymentChannel/editPaymentChannel",data).then(res => res.data)
}

export const changeChannelStatus = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/paymentChannel/changeChannelStatus",data).then(res => res.data)
}

//联行号列表

export const getBankLinkSnList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/bankLinkSn/getBankLinkSnList",data).then(res => res.data)
}

export const addBankLinkSn = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/bankLinkSn/addBankLinkSn",data).then(res => res.data)
}

export const editBankLinkSn = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/bankLinkSn/editBankLinkSn",data).then(res => res.data)
}


//代付请求

export const getPaymentRequestList = params => {//查询列表
    let data = qs.stringify(params)
    return axiosInstance.post("/paymentRequest/getPaymentRequestList",data).then(res => res.data)
}

export const paymentRequestExport = params => {//导出
    // let data = qs.stringify(params)
    return axiosInstance.post("/paymentRequest/export",params).then(res => res.data)
}

export const statistics = params => {//生批统计
    return axiosInstance.post("/paymentRequest/statistics", params).then(res => res.data)
}

export const createBatch = params => {//生批
    return axiosInstance.post("/paymentRequest/createBatch", params).then(res => res.data)
}

export const getPayBatchList = params => {//生批列表
    return axiosInstance.post("/payBatch/getPayBatchList", params).then(res => res.data)
}

export const getPayReviewList = params => {//代付请求复核列表
    return axiosInstance.post("/paymentReview/getPayReviewList", params).then(res => res.data)
}

export const getReviewIdByBatchList = params => {//代付批次复核明细列表
    return axiosInstance.post("/paymentReview/getReviewIdByBatchList", params).then(res => res.data)
}

export const getReviewIdByRequestList = params => {//代付请求复核明细列表
    return axiosInstance.post("/paymentReview/getReviewIdByRequestList", params).then(res => res.data)
}

export const payBatchStatistics = params => {//批次出款统计
    return axiosInstance.post("/payBatch/statistics", params).then(res => res.data)
}

export const submitReview = params => {//批次出款审核
    return axiosInstance.post("/payBatch/submitReview", params).then(res => res.data)
}

export const revokeOrIntercept = params => {//代付请求数据风险拦截与撤销提交复核
    return axiosInstance.post("/paymentRequest/revokeOrIntercept", params).then(res => res.data)
}

export const confirmPay = params => {//复核界面--业务复核
    return axiosInstance.post("/paymentReview/confirmPay", params).then(res => res.data)
}

export const importPayment = params => {//导入
    let data = qs.stringify(params)
    return axiosInstance.post("/paymentChannel/getPaymentChannelList",data).then(res => res.data)
}

/*--------------------------- 账户管理 ---------------------------------*/

//获取商户调账数据列表
export const getAccountAdjustmentList = params => {
  return axiosInstance.post("/accountAdjustment/getAccountAdjustmentList", params).then(res => res.data)
}
//获取商户调账数据
export const getAccountAdjustmentById = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/accountAdjustment/getAccountAdjustmentById", data).then(res => res.data)
}
//获取商户调账审核
export const applicationExamine = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/accountAdjustment/applicationExamine", data).then(res => res.data)
}
//商户调账驳回
export const applicationReject = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/accountAdjustment/applicationReject", data).then(res => res.data)
}
//日终账单查询接口
export const getDailyBillList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/bailyBill/getDailyBillList", data).then(res => res.data)
}

//日账单详情
export const getDailyBillDetailList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/dailyBillDetail/getDailyBillDetailList", data).then(res => res.data)
}
//账户总额查询接口
export const getMerchantManagementList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/merchantManagement/getMerchantManagementList", data).then(res => res.data)
}
/*-------------------------------- 对账管理 --------------------------------------*/

//对账结果查询接口
export const getReconciliationResultList = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/reconciliationResult/getReconciliationResultList", data).then(res => res.data)
}

/*-------------------------------- 修改密码 --------------------------------------*/

export const changePassword = params => {
    let data = qs.stringify(params)
    return axiosInstance.post("/user/changePassword", data).then(res => res.data)
}






