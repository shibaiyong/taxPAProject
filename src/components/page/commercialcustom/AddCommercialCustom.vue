<template>
  <div class="rolelist operate">
      <el-form :model="formEdit" label-width="120px" :rules="rules" auto-complete="off" size="small" ref="formEdit">
        <el-row><h4>企业信息</h4></el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商户编号">
              <el-input v-model="formEdit.sn"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="特约商户码">
              <el-input v-model="formEdit.otherSn"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称" prop="enterpriseName">
              <el-input v-model="formEdit.enterpriseName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纳税人识别号" prop="taxpayerIdentificationSn">
              <el-input v-model="formEdit.taxpayerIdentificationSn"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="法人姓名" prop="legalPerson">
              <el-input v-model="formEdit.legalPerson"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纳税人类型" prop="taxpayerType">
              <el-radio-group v-model="formEdit.taxpayerType">
                <el-radio :label="0">一般纳税人</el-radio>
                <el-radio :label="1">小规模纳税人</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人姓名" prop="contactsName">
              <el-input v-model="formEdit.contactsName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人手机号" prop="contactsPhone">
              <el-input v-model="formEdit.contactsPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人邮箱" prop="contactsEmail">
              <el-input v-model="formEdit.contactsEmail"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址" prop="registrationAddress">
              <el-input v-model="formEdit.registrationAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="实际经营地址" prop="businessAddress">
              <el-input v-model="formEdit.businessAddress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="formEdit.status" :disabled="isEidt">
                <el-radio :label="1">生效</el-radio>
                <el-radio :label="0">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row><h4>账户信息</h4></el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户行名称" prop="openingBankName">
              <el-input v-model="formEdit.openingBankName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业账户" prop="enterpriseAccounts">
              <el-input v-model="formEdit.enterpriseAccounts"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户行（省）" prop="openingBankRegionProvince">
              <el-select v-model="formEdit.openingBankRegionProvince" placeholder="请选择开户行地域（省）" @change="handleGetCityList">
                <el-option v-for="option in provinceList" :key="option.id" :label="option.name" :value="option.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户行（市）" prop="openingBankRegionCity">
              <el-select v-model="formEdit.openingBankRegionCity" placeholder="请选择开户行地域（市）">
                <el-option v-for="option in cityList" :key="option.id" :label="option.name" :value="option.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户行信息" prop="openingBankBranchInfo">
              <el-input v-model="formEdit.openingBankBranchInfo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业电子账户" prop="enterpriseElectronicAccount">
              <el-input v-model="formEdit.enterpriseElectronicAccount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户行联行号" prop="openingBankLinkSn">
              <el-input v-model="formEdit.openingBankLinkSn"></el-input>
            </el-form-item>
          </el-col> 
        </el-row>
        <el-row><h4>税务信息</h4></el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="资质方关联" prop="qualificationId">
              <el-select v-model="formEdit.qualificationId" placeholder="">
                <el-option v-for="option in qualificationId" :key="option.value" :label="option.label" :value="option.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开票类型" prop="invoiceType">
              <el-radio-group v-model="formEdit.invoiceType">
                <el-radio :label="0">普通发票</el-radio>
                <el-radio :label="1">专用发票</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商户服务费" prop="merchantServiceCharge">
              <el-input v-model.number="formEdit.merchantServiceCharge" style="width:210px;"></el-input>%
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="个人服务费" prop="personalServiceCharge">
              <el-input v-model.number="formEdit.personalServiceCharge" style="width:210px;"></el-input>%
            </el-form-item>
          </el-col>
        </el-row>
        <el-row><h4>服务信息</h4></el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="销售经理">
              <el-input v-model="formEdit.salesManager"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式">
              <el-input v-model="formEdit.salesManagerTel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱">
              <el-input v-model="formEdit.salesManagerEmail"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer">
        <el-button size="small" @click="resetForm('formEdit')">取 消</el-button>
        <el-button type="primary" @click="submitForm('formEdit')" size="small">确 定</el-button>
      </div>
  </div>
</template>

<script>
import { addMerchant, getProvinceList, getCityListByProvinceId } from "@/requestDataInterface"
export default {
  props: {},
  data() {
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('电话不能为空'))
      }else if(!Number.isInteger(value*1)){
        callback(new Error('请输入11位数字'))
      }else{
        callback()
      }
    }
    let checkEmail = (rule, value, callback) => {
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if (!reg.test(value)) {
        return callback(new Error('邮箱格式不正确'))
      }else{
        callback()
      }
    }
    let checkServiceCharge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('服务费不能为空'));
      }else if(value >= 100){
          callback(new Error('服务费不能超过100%'));
      }else{
        callback()
      }   
    }
    return {
      isEidt:true,
      rules: {
        enterpriseName: [
          { required: true, message:'必填', trigger: 'blur' }
        ],
        taxpayerIdentificationSn: [
          { required: true, message:'必填', trigger: 'blur' }
        ],
        legalPerson:[
          { required: true, message:'必填', trigger: 'blur' }
        ],
        taxpayerType:[
          { required: true, message:'必填', trigger: 'blur' }
        ],
        contactsName: [
          { required: true, message:'必填', trigger: 'blur' }
        ],
        contactsPhone: [
          { validator: checkPhone, trigger: 'blur' },
          { required: true, min: 11, max: 11, message: '请输入11位数字', trigger: 'blur' }
        ],
        contactsEmail: [
          { validator: checkEmail, trigger: 'blur' },
          { required: true, message:'必填', trigger: 'blur' }
        ],
        registrationAddress:[
          { required: true, message:'必填', trigger: 'blur' }
        ],
        businessAddress:[
          { required: true, message:'必填', trigger: 'blur' }
        ],
        status: [
          { required: true, message:'必填', trigger: 'blur' }
        ],
        openingBankName: [
          { required: true, message:'必填', trigger: 'blur' }
        ],
        enterpriseAccounts: [
          { required: true, message:'必填', trigger: 'blur' }
        ],
        openingBankRegionProvince:[
          { required: true, message:'必填', trigger: 'blur' }
        ],
        openingBankRegionCity:[
          { required: true, message:'必填', trigger: 'blur' }
        ],
        openingBankBranchInfo:[
          { required: true, message:'必填', trigger: 'blur' }
        ],
        openingBankLinkSn: [
          { required: true, message:'必填', trigger: 'blur' }
        ],
        enterpriseElectronicAccount: [
          { required: true, message:'必填', trigger: 'blur' }
        ],
        qualificationId: [
          { required: true, message:'必填', trigger: 'blur' }
        ],
        invoiceType:[
          { required: true, message:'必填', trigger: 'blur' }
        ],
        merchantServiceCharge:[
          
          { validator: checkServiceCharge, trigger: 'blur' },
          { required: true, trigger: 'blur' }
        ],
        personalServiceCharge: [
          { validator: checkServiceCharge, trigger: 'blur' },
          { required: true, trigger: 'blur' }
        ]
      },
      statusOptions: [
        { label: "生效中", value: 1 },
        { label: "停用中", value: 0 }
      ],
      qualificationId:[
        { label: "资质方关联暂时写死", value: "1234567889" },
      ],
      provinceList:[],
      cityList:[],
      formEdit: {
        sn:'',
        otherSn:'',
        enterpriseName:'',
        taxpayerIdentificationSn:'',
        legalPerson:'',
        taxpayerType:'',
        contactsName:'',
        contactsPhone:'',
        contactsEmail:'',
        registrationAddress:'',
        businessAddress:'',
        openingBankName:'',
        enterpriseAccounts:'',
        openingBankRegionProvince:'',
        openingBankRegionCity:'',
        openingBankBranchInfo:'',
        openingBankLinkSn:'',
        enterpriseElectronicAccount:'',
        qualificationId:'',
        invoiceType:'',
        merchantServiceCharge:'',
        personalServiceCharge:'',
        salesManager:'',
        salesManagerTel:'',
        salesManagerEmail:'',
        status:1
      },
      resetFormEdit: {
        status:1,
        sn:'',
        otherSn:'',
        enterpriseName:'',
        taxpayerIdentificationSn:'',
        legalPerson:'',
        taxpayerType:'',
        contactsName:'',
        contactsPhone:'',
        contactsEmail:'',
        registrationAddress:'',
        businessAddress:'',
        openingBankName:'',
        enterpriseAccounts:'',
        openingBankRegionProvince:'',
        openingBankRegionCity:'',
        openingBankBranchInfo:'',
        openingBankLinkSn:'',
        enterpriseElectronicAccount:'',
        qualificationId:'1234567889',
        invoiceType:'',
        merchantServiceCharge:'',
        personalServiceCharge:'',
        salesManager:'',
        salesManagerTel:'',
        salesManagerEmail:''
      }
    };
  },
  created() {},
  methods: {
    resetForm( formEdit ){
      let form = formEdit || 'formEdit'
      Object.assign(this.formEdit, this.resetFormEdit)
      this.$refs[form].resetFields()
    },
    handleGetProvinceList(){
      getProvinceList().then(res => {
        if(res.success){
          this.provinceList = res.result
        }
      }).catch(err=>{})
    },
    handleGetCityList(id){
      this.formEdit.openingBankRegionCity = ''
      let provinceId = id
      getCityListByProvinceId({ provinceId }).then(res => {
        if(res.success){
          this.cityList = res.result
        }
      }).catch(err=>{})
    },
    
    submitForm(ref){
      this.$refs[ref].validate((valid) => {
        if (valid) {
            let params = this.formEdit
            addMerchant( params ).then(res => {
              if(res.success){
                this.$router.push('/home/commercialcustom')
              }else{
                this.$message({
                  type:'error',
                  message:'新增失败,'+res.msg
                })
              }
            }).catch(err => {console.log(err)})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  computed: {},
  mounted() {
    this.handleGetProvinceList()
  },
  components: {},
  beforeDestroy() {}
}
</script>
<style scoped>
.operate {
  padding: 0 3%;
  padding-bottom: 20px;
  box-sizing: border-box;
}

.el-form-item__content > .el-input {
  width: 230px;
}

.el-form-item__content > .el-select {
  width: 230px;
}
.el-form-item__content > .el-date-editor {
  width: 230px;
}
.el-form {
  width: 100%;
}
.el-row h4{
  padding-bottom:6px;
}
.dialog-footer{
    text-align: center;
    margin-top:20px;
}

</style>