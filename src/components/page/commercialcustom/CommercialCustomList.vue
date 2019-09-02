<template>
  <div class="commercialList">
    <div class="operate">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="商户编号">
              <el-input v-model="formSearch.sn" placeholder="商户编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业名称">
              <el-input v-model="formSearch.enterpriseName" placeholder="企业名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业账户">
              <el-input v-model="formSearch.enterpriseAccounts" placeholder="企业账户"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="纳税人识别号">
          <el-input v-model="formSearch.taxpayerIdentificationSn" placeholder="纳税人识别号"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="8">
        <el-form-item label="当前状态">
          <el-select v-model="formSearch.status" placeholder="">
            <el-option v-for="option in statusOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="入网开始日期">
            <el-date-picker
              v-model="formSearch.beginDate"
              type="date"
              format="yyyy - MM - dd"
              value-format="yyyy-MM-dd"
              placeholder="开始日期"
            ></el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="入网结束日期">
            <el-date-picker
                v-model="formEdit.endDate"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
                placeholder="结束日期">
              </el-date-picker>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="operate">
      <div class="operateBtn">
        <el-button type="primary" size="small" @click="handleSearch">
          <i class="el-icon-search"></i>&nbsp;查询
        </el-button>
        <el-button type="primary" size="small">
          <i class="el-icon-search"></i>&nbsp;清空
        </el-button>
        <el-button type="primary" size="small" @click="handleAdd">
          <i class="el-icon-search"></i>&nbsp;录入
        </el-button>
        <el-button type="primary" size="small" @click="handleEdit">
          <i class="el-icon-search"></i>&nbsp;编辑
        </el-button>
        <el-button type="primary" size="small" @click="handleDelet">
          <i class="el-icon-search"></i>&nbsp;删除
        </el-button>
        <el-button type="primary" size="small">
          <i class="el-icon-search"></i>&nbsp;加入黑名单
        </el-button>
        <el-button type="primary" size="small" @click="handleAdjust">
          <i class="el-icon-search"></i>&nbsp;调账
        </el-button>
      </div>
    </div>
    <div class="paddingcontainer">
      <el-table :data="merchantList" style="width: 100%" @select="handleSelectionChange" @select-all="handleSelectAll">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="商户编号" prop="sn"></el-table-column>
        <el-table-column label="企业名称" prop="enterpriseName"></el-table-column>
        <el-table-column label="联系人姓名" prop="contactsName"></el-table-column>
        <el-table-column label="账户余额" prop="mobile"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="入网日期" prop="createdTime"></el-table-column>
        <el-table-column label="关闭日期" prop="registerdate"></el-table-column>
      </el-table>
    </div>
    <div class="paddingcontainer pagecontainer">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleGetMerchantList"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogEditVisible">
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
            <el-form-item label="企业名称" prop="enterpriseName">
              <el-input v-model="formEdit.enterpriseName" :disabled="editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纳税人识别号" prop="taxpayerIdentificationSn">
              <el-input v-model="formEdit.taxpayerIdentificationSn" :disabled="editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="法人姓名" prop="legalPerson">
              <el-input v-model="formEdit.legalPerson" :disabled="editable"></el-input>
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
              <el-input v-model="formEdit.registrationAddress" :disabled="editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="实际经营地址" prop="businessAddress">
              <el-input v-model="formEdit.businessAddress" :disabled="editable"></el-input>
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
              <el-input v-model="formEdit.openingBankName"  :disabled="editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业账户" prop="enterpriseAccounts">
              <el-input v-model="formEdit.enterpriseAccounts" :disabled="editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户行（省）" prop="openingBankRegionProvince">
              <el-select v-model="formEdit.openingBankRegionProvince" placeholder="请选择省" @change="handleGetCityList" :disabled="editable">
                <el-option v-for="option in provinceList" :key="option.id" :label="option.name" :value="option.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户行（市）" prop="openingBankRegionCity">
              <el-select v-model="formEdit.openingBankRegionCity" placeholder="请选择市" :disabled="editable">
                <el-option v-for="option in cityList" :key="option.id" :label="option.name" :value="option.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户行信息" prop="openingBankBranchInfo">
              <el-input v-model="formEdit.openingBankBranchInfo" :disabled="editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业电子账户" prop="enterpriseElectronicAccount">
              <el-input v-model="formEdit.enterpriseElectronicAccount" :disabled="editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户行联行号" prop="openingBankLinkSn">
              <el-input v-model="formEdit.openingBankLinkSn" :disabled="editable"></el-input>
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
          <el-col :span="12">
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm('formEdit')" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addMerchant, getProvinceList, getCityList, editMerchant, getMerchantList } from "@/requestDataInterface"
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
      value6: "",
      dialogTitle: "编辑",
      dialogEditVisible: false,
      isEidt:false,
      editable:false,
      currentPage:1,
      total:1,
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
        { label: "全部", value: "" },
        { label: "生效中", value: 1 },
        { label: "停用中", value: 0 }
      ],
      qualificationId:[
        { label: "资质方关联暂时写死", value: "1234567889" },
      ],
      provinceList:[],
      cityList:[],
      merchantList: [
        {
          id:1,
          date: "2014/02/02",
          name: "赵佳浩",
          nick: "过往云烟",
          mobile: "13716420520",
          email: "1850418899@qq.com",
          registerdate: "2011/09/09"
        },
        {
          id:2,
          date: "2014/02/03",
          name: "赵佳浩",
          nick: "过往云烟",
          mobile: "13716420520",
          email: "1850418899@qq.com",
          registerdate: "2011/09/09"
        },
        {
          id:3,
          date: "2014/02/04",
          name: "赵佳浩",
          nick: "过往云烟",
          mobile: "13716420520",
          email: "1850418899@qq.com",
          registerdate: "2011/09/09"
        },
        {
          id:4,
          date: "2014/02/05",
          name: "赵佳浩",
          nick: "过往云烟",
          mobile: "13716420520",
          email: "1850418899@qq.com",
          registerdate: "2011/09/09"
        }
        
      ],
      multipleSelection:[],
      formSearch: {
        sn:'',
        enterpriseName:'',
        enterpriseAccounts:'',
        taxpayerIdentificationSn:'',
        status:'',
        beginDate:'',
        endDate:''
      },
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
    handleSearch(){
      this.handleGetMerchantList(this.currentPage)
    },
    handleAdd() {
      this.dialogTitle = "录入商户"
      this.dialogEditVisible = true
      this.isEidt = true
      this.editable = false
      Object.assign(this.formEdit, this.resetFormEdit)
    },
    handleAdjust(){

      let multipleSelection = this.multipleSelection

      if(!this.judgeRight( multipleSelection )){
        return false
      }

    },
    handleEdit(index, row) {
      let multipleSelection = this.multipleSelection
      if(!this.judgeRight( multipleSelection )){
        return false
      }
      Object.assign( this.formEdit, multipleSelection[0])
      this.dialogTitle = "编辑商户"
      this.isEidt = false
      this.editable = true
      this.dialogEditVisible = true

    },
    handleDelet(){
      let multipleSelection = this.multipleSelection
      if(!this.judgeRight( multipleSelection )){
        return false
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          deleteUser( { id } ).then(res => {
          if(res.success){
              this.getMerchantList(this.currentPage)
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            }
          }).catch( err => {
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })         
        })
    },
    handleGetMerchantList(currentPage) {
      
      let params = Object.assign({}, this.formSearch, {page:currentPage, rows:10})
      getMerchantList(params).then(res => {
        if(res.success){
          this.merchantList = res.result.merchants
          this.total = res.result.total
        }
      }).catch(err => {
        console.log(err)
      })
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
      getCityList({ provinceId }).then(res => {
        console.log(res)
        if(res.success){
          this.cityList = res.result
        }
      }).catch(err=>{})
    },
    handleSelectionChange(selection,row) {
      this.multipleSelection = selection
    },
    handleSelectAll(selection){
      this.multipleSelection = selection
    },
    handleRole(index, row) {
      this.dialogRoleVisible = true
    },
    submitForm(ref){
      this.$refs[ref].validate((valid) => {
        if (valid) {
          if(this.dialogTitle == "录入商户"){
            let params = this.formEdit
            
            addMerchant( params ).then(res => {
              if(res.success){
                this.handleGetMerchantList(this.currentPage)
                this.dialogEditVisible = false
              }else{
                this.$message({
                  type:'error',
                  message:'新增失败,'+res.msg
                })
              }
            }).catch(err => {

              console.log(err)

            })
          }else{
            editMerchant( this.formEdit ).then( res => {
              if(res.success){
                this.handleGetMerchantList(this.currentPage)
                this.dialogEditVisible = false
              }else{
                this.$message({
                  type:'error',
                  message:'编辑失败,'+res.msg
                })
              }
            }).catch( err => {
              console.log( err )
            })
          }
          
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    judgeRight( multipleSelection ){
      if( !multipleSelection.length ){
        this.$message({
          type:'error',
          message:'请从列表中选择需要操作的行'
        })
        return false
      }else if( multipleSelection.length > 1 ){
        this.$message({
          type:'error',
          message:'只能选择一行进行操作'
        })
        return false
      }
      return true
    },
    cancelEidt() {},
    confirmEdit() {}
  },
  computed: {},
  mounted() {
    this.handleGetProvinceList()
    this.handleGetMerchantList(this.currentPage)
  },
  components: {},
  beforeDestroy() {}
}
</script>
<style scoped>
.operate {
  padding: 0 3%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.pagecontainer {
  text-align: right;
  margin-top: 20px;
}
.el-pagination {
  display: inline-block;
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
>>>.el-dialog{
  width:62%;
}
</style>