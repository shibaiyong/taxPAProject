<template>
  <div class="rolelist operate">
      <el-form :model="formEdit" label-width="120px" :rules="rules" auto-complete="off" size="small" ref="formEdit">
        <el-row><h4>用户信息</h4></el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="formEdit.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号">
              <el-input v-model="formEdit.phone"></el-input>
            </el-form-item>
          </el-col>
        
          <el-col :span="12">
            <el-form-item label="身份证号">
              <el-input v-model="formEdit.idCard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号">
              <el-input v-model="formEdit.bankAccount"></el-input>
            </el-form-item>
          </el-col>
        
          <el-col :span="12">
            <el-form-item label="开户行名称">
              <el-input v-model="formEdit.bankName"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="开户行支行信息">
              <el-input v-model="formEdit.bankBranchName"></el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row><h4>账户信息</h4></el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="资质方编号">
              <el-input v-model="formEdit.sn" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业名称">
              <el-input v-model="formEdit.enterpriseName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="resetForm('formEdit')" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm('formEdit')" size="small">保 存</el-button>
      </div>
  </div>
</template>

<script>
import { editUserInfo } from "@/requestDataInterface"
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
      qualificationId:[
        { label: "资质方关联暂时写死", value: "1234567889" },
      ],
      provinceList:[],
      cityList:[],
      formEdit: {
        name:'',
        phone:'',
        idCard:'',
        bankAccount:'',
        bankName:'',
        bankBranchName:'',
        sn:'',
        enterpriseName:''
      },
      resetFormEdit: {
        name:'',
        phone:'',
        idCard:'',
        bankAccount:'',
        bankName:'',
        bankBranchName:'',
        sn:'',
        enterpriseName:''
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
      let row = this.$route.params
      Object.assign(this.formEdit,row)
    },
    submitForm(ref){
      this.$refs[ref].validate((valid) => {
        if (valid) {
            let params = this.formEdit
            editUserInfo( this.formEdit ).then( res => {
              if(res.success){
                this.$router.push('/home/userlist')
              }else{
                this.$message({
                  type:'error',
                  message:res.msg
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
    this.handleEdit();
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