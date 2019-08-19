import axiosInstance from '@/axiosInstance'
import qs from 'qs'

/**
 * 产品详情模块--录入实名制信息以及评估报告相关接口
 * @author baiyongshi
 * **/

//产品信息查询
export const ProdInfoQuery = params => {
    return axiosInstance.post("/product/LERybProdInfoQuery").then(res => res.data)
}

//产品历史行情查询
export const ProdInfoHisQuery = params => {
    return axiosInstance.post("/product/LERybProdHisInfoQuery").then(res => res.data)
}

//上传身份证照片
export const uploadPhoto = params => {
    
    return axiosInstance.post("/accountOpen/upload", params).then(res => res.data)
}

//照片上传开户接口
export const photoUpload = params => {
    let postData
    if(params){
        postData = qs.stringify( params )
    }
    return axiosInstance.post("/accountOpen/LEIdPhotoUpload", postData).then(res => res.data)
}

//职业列表查询
export const OccupationListQuery = params => {
    return axiosInstance.post("/accountOpen/OccupationListQry",params).then(res => res.data)
}

//省市县列表
export const regionListQuery = params => {
    return axiosInstance.post("/accountOpen/AddrListQry",params).then(res => res.data)
}


//个人信息补充问题查询

export const RiskQuestionQuery = params => {
    return axiosInstance.post("/accountOpen/QryCustRiskPerInfoQuestion",params).then(res => res.data)
}

//风评信息查询

export const RiskQuestionQry = params => {
    return axiosInstance.post("/accountOpen/RiskQuestionQry",params).then(res => res.data)
}

//提交风评答案
export const RiskResultCommit = params => {

    return axiosInstance.post("/accountOpen/RiskResultCommit",qs.stringify( params )).then(res => res.data)
}

//开户签约如意宝风评答案提交(预风评)

export const RiskForOpenCommit = params => {

    return axiosInstance.post("/accountOpen/RiskForOpenCommit",qs.stringify( params )).then(res => res.data)
}


//获取随机数
export const getRandom = params => {
    let postData
    if(params){
        postData = qs.stringify( params )
    }
    return axiosInstance.post("/accountOpen/LEGenerateRand", postData).then(res => res.data)
}

//获取验证码

export const getPhoneCode = params => {
    let postData
    if(params){
        postData = qs.stringify( params )
    }
    return axiosInstance.post("/accountOpen/LEGetPhoneCode", postData).then(res => res.data)
}

//开户
export const accountOpen = params => {
    let postData
    if(params){
        postData = qs.stringify( params )
    }
    return axiosInstance.post("/accountOpen/accountOpen", postData).then(res => res.data)
}

//借记卡信息查询
export const DebitCardQuery = params => {
    return axiosInstance.post("/accountOpen/LECardBinQuery",qs.stringify( params )).then(res => res.data)
}

//签约如意宝

export const LERybOpenAccount = params => {
    return axiosInstance.post("/accountOpen/LERybOpenAccount",qs.stringify( params )).then(res => res.data)
}




