<template>
  <div class="rolelist operate">
      <el-form :model="formEdit" label-width="120px" :rules="rules" auto-complete="off" size="small" ref="formEdit">
        <el-row><h4>企业信息</h4></el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商户编号">
              <el-input v-model="formEdit.sn" :disabled="editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="特约商户码">
              <el-input v-model="formEdit.otherSn" :disabled="editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称">
              <el-input v-model="formEdit.enterpriseName" :disabled="editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纳税人识别号">
              <el-input v-model="formEdit.taxpayerIdentificationSn" :disabled="editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="法人姓名">
              <el-input v-model="formEdit.legalPerson" :disabled="editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纳税人类型">
              <el-radio-group v-model="formEdit.taxpayerType" :disabled="editable">
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
            <el-form-item label="注册地址">
              <el-input v-model="formEdit.registrationAddress" :disabled="editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="实际经营地址">
              <el-input v-model="formEdit.businessAddress" :disabled="editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row><h4>账户信息</h4></el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户行名称">
              <el-input v-model="formEdit.openingBankName"  :disabled="editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业账户">
              <el-input v-model="formEdit.enterpriseAccounts" :disabled="editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户行（省）">
              <el-select v-model="formEdit.openingBankRegionProvince" placeholder="请选择开户行地域（省）" @change="handleGetCityList" :disabled="editable">
                <el-option v-for="option in provinceList" :key="option.id" :label="option.name" :value="option.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户行（市）">
              <el-select v-model="formEdit.openingBankRegionCity" placeholder="请选择开户行地域（市）" :disabled="editable">
                <el-option v-for="option in cityList" :key="option.id" :label="option.name" :value="option.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户行信息">
              <el-input v-model="formEdit.openingBankBranchInfo" :disabled="editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业电子账户">
              <el-input v-model="formEdit.enterpriseElectronicAccount" :disabled="editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户行联行号">
              <el-input v-model="formEdit.openingBankLinkSn" :disabled="editable"></el-input>
            </el-form-item>
          </el-col> 
        </el-row>
        <el-row><h4>税务信息</h4></el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="资质方关联" prop="qualificationId">
              <el-select v-model="formEdit.qualificationId" placeholder="" :disabled="editable">
                <el-option v-for="option in qualificationList" :key="option.id" :label="option.enterpriseName" :value="option.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开票信息" prop="invoiceType">
              <el-radio-group v-model="formEdit.invoiceType" :disabled="editable">
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
        <el-button @click="resetForm('formEdit')" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm('formEdit')" size="small"></el-button>
      </div>
  </div>
</template>

<script>
import { getProvinceList, getCityListByProvinceId, editMerchant, getCityList, getQualificationPartyList, getMerchantById } from "@/requestDataInterface"
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
      isEidt:false,
      editable:true,
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
      qualificationList:[
        
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
      //let form = formEdit || 'formEdit'
      //Object.assign(this.formEdit, this.resetFormEdit)
      this.$router.go(-1)
    },
    handleEdit() {
      let id = this.$route.params.id
      getMerchantById({ id }).then(res => {
        if(res.success){
          Object.assign(this.formEdit, res.result)
        }
      }).catch(err=>{})
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
    handleGetAllCityList(){
      return getCityList().then(res => {
        if(res.success){
          this.cityList = res.result
        }
      }).catch( err => {})
    },
    handlegetQualificationPartyList(currentPage) {
      let params =Object.assign({}, { page: 1, rows: 20 })
      getQualificationPartyList(params)
        .then(res => {
          if (res.success) {
            this.qualificationList = res.result.qualificationParties
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitForm(ref){
      this.$refs[ref].validate((valid) => {
        if (valid) {
            let params = this.formEdit
            editMerchant( this.formEdit ).then( res => {
              if(res.success){
                this.$router.push('/home/commercialcustom')
              }else{
                this.$message({
                  type:'error',
                  message:'编辑失败,'+res.msg
                })
              }
            }).catch( err => {
              console.log( err )
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    
    cancelEidt() {},
    confirmEdit() {}
  },
  computed: {},
  mounted() {
    this.handleGetProvinceList();
    this.handleGetAllCityList();
    this.handleEdit();
    this.handlegetQualificationPartyList()
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
.dialog-footer{
    text-align: center;
    margin-top:20px;
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


</style>