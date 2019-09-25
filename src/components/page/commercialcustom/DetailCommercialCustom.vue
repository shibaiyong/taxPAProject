<template>
  <div class="addqualifypart paddingcontainer">
    <h4>企业信息</h4>
    <el-row>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">商户编号</label></el-col>
            <el-col :span="18"><label class="labelname">{{formEdit.sn}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">特约商户码</label></el-col>
            <el-col :span="18"><label class="labelname">{{formEdit.otherSn}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">企业名称</label></el-col>
            <el-col :span="18"><label class="labelname">{{formEdit.enterpriseName}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">纳税人识别号</label></el-col>
            <el-col :span="18"><label class="labelname">{{formEdit.taxpayerIdentificationSn}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">法人姓名</label></el-col>
            <el-col :span="18"><label class="labelname">{{formEdit.legalPerson}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">纳税人类型</label></el-col>

           <el-col :span="18">
            <el-radio-group v-model="formEdit.taxpayerType" :disabled="true">
                <el-radio :label="0">一般纳税人</el-radio>
                <el-radio :label="1">小规模纳税人</el-radio>
              </el-radio-group>
              </el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">联系人姓名</label></el-col>
            <el-col :span="18"><label class="labelname">{{formEdit.contactsName}}</label></el-col>
        </el-col>

        <el-col :span="12">
            <el-col :span="6"><label class="descr">联系人手机号</label></el-col>
            <el-col :span="18"><label class="labelname">{{formEdit.contactsPhone}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">联系人邮箱</label></el-col>
            <el-col :span="18"><label class="labelname">{{formEdit.contactsEmail}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">注册地址</label></el-col>
            <el-col :span="18"><label class="labelname">{{formEdit.registrationAddress}}</label></el-col>
        </el-col>

        <el-col :span="12">
            <el-col :span="6"><label class="descr">实际经营地址</label></el-col>
            <el-col :span="18"><label class="labelname">{{formEdit.businessAddress}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">开户行名称</label></el-col>
            <el-col :span="18"><label class="labelname">{{formEdit.openingBankName}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">企业账户</label></el-col>
            <el-col :span="18"><label class="labelname">{{formEdit.enterpriseAccounts}}</label></el-col>
        </el-col>
    </el-row>
    <h4>账户信息</h4>
    <el-row>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">开户行地域</label></el-col>
            <el-col :span="18">
                <el-select v-model="formEdit.openingBankRegionProvince" size="small" :disabled="true">
                    <el-option v-for="option in provinceList" :key="option.id" :label="option.name" :value="option.id"></el-option>
                </el-select>&nbsp;-&nbsp;<el-select v-model="formEdit.openingBankRegionCity" size="small" :disabled="true">
                    <el-option v-for="option in cityList" :key="option.id" :label="option.name" :value="option.id"></el-option>
                </el-select>
            </el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="7"><label class="descr">开户行支行信息</label></el-col>
            <el-col :span="17"><label class="labelname">{{formEdit.openingBankBranchInfo}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">开户行联行号</label></el-col>
            <el-col :span="18"><label class="labelname">{{formEdit.openingBankLinkSn}}</label></el-col>
        </el-col>
    
        <el-col :span="12">
            <el-col :span="6"><label class="descr">企业电子账户</label></el-col>
            <el-col :span="18"><label class="labelname">{{formEdit.enterpriseElectronicAccount}}</label></el-col>
        </el-col>
        
    </el-row>
    <h4>税务信息</h4>
    <el-row>
        
        <el-col :span="12">
            <el-col :span="6"><label class="descr">资质方关联</label></el-col>
            <el-col :span="18">
                <el-select v-model="formEdit.qualificationId" placeholder="" :disabled="true">
                    <el-option v-for="option in qualificationList" :key="option.id" :label="option.enterpriseName" :value="option.id"></el-option>
                </el-select>
            </el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">开票信息</label></el-col>
            <el-col :span="18">
            <el-radio-group v-model="formEdit.invoiceType" :disabled="true">
                <el-radio :label="0">普通发票</el-radio>
                <el-radio :label="1">专用发票</el-radio>
              </el-radio-group>
              </el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">商户服务费</label></el-col>
            <el-col :span="18"><label class="labelname">{{formEdit.merchantServiceCharge}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">个人服务费</label></el-col>
            <el-col :span="18"><label class="labelname">{{formEdit.personalServiceCharge}}</label></el-col>
        </el-col>
    </el-row>
    <h4>税务信息</h4>
    <el-row>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">销售经理</label></el-col>
            <el-col :span="18"><label class="labelname">{{formEdit.salesManager}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">联系方式</label></el-col>
            <el-col :span="18"><label class="labelname">{{formEdit.salesManagerTel}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">邮箱</label></el-col>
            <el-col :span="18"><label class="labelname">{{formEdit.salesManagerEmail}}</label></el-col>
        </el-col>
        
    </el-row>
    <p>
        <el-button type="primary" size="small" @click="goback">返回</el-button>
    </p>
  </div>
</template>

<script>
import { getProvinceList, getCityListByProvinceId, getCityList, getQualificationPartyList, getMerchantById } from "@/requestDataInterface"

export default {
  props: {},
  data() {
    return {
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
            status:''
       },
       provinceList:[],
       cityList:[],
       qualificationList:[]
    }
  },
  created() {},
  methods: {
    handleDetail() {
      let id = this.$route.params.id
      getMerchantById({ id }).then(res => {
        if(res.success){
          Object.assign(this.formEdit, res.result)
        }
      }).catch(err=>{})
    },
    goback(){
        this.$router.go(-1)
    },
    handleGetProvinceList(){
      getProvinceList().then(res => {
        if(res.success){
          this.provinceList = res.result
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
  },
  computed: {},
  mounted() {
      this.handleDetail()
      this.handleGetProvinceList();
      this.handleGetAllCityList();
      this.handlegetQualificationPartyList()
  },
  components: {},
  beforeDestroy() {}
}
</script>
<style scoped>
h4 {
  padding-bottom: 30px;
}

.el-row {
  padding-left:40px;
  margin-bottom: 10px;
}

.el-col-12{
    margin-bottom:20px;
}
.labelname,.descr{
    color:#606266;
    display: inline-block;
    width:100%;
}
label.descr{
    text-align: right;
    padding-right: 20px;
    box-sizing: border-box;
}
p{
    text-align: center;
}
>>>.el-select {
  width: 150px;
}
</style>