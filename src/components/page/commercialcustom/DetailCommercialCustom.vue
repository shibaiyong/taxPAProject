<template>
  <div class="addqualifypart paddingcontainer">
    <h4>企业信息</h4>
    <el-row>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">编码</label></el-col>
            <el-col :span="18"><label>{{formEdit.sn}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">企业名称</label></el-col>
            <el-col :span="18"><label>{{formEdit.enterpriseName}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">税号</label></el-col>
            <el-col :span="18"><label>{{formEdit.enterpriseTaxSn}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">开始时间</label></el-col>
            <el-col :span="18"><label>{{formEdit.enableTime}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">结束时间</label></el-col>
            <el-col :span="18"><label>{{formEdit.unEnableTime}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">全年缴税额度</label></el-col>
            <el-col :span="18"><label>{{formEdit.yearPayment}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">全年可用额度</label></el-col>
            <el-col :span="18"><label>{{formEdit.sn}}</label></el-col>
        </el-col>

        <el-col :span="12">
            <el-col :span="6"><label class="descr">全年已用额度</label></el-col>
            <el-col :span="18"><label>{{formEdit.sn}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">当月全部额度</label></el-col>
            <el-col :span="18"><label>{{formEdit.sn}}</label></el-col>
        </el-col>

        <el-col :span="12">
            <el-col :span="6"><label class="descr">当月可用额度</label></el-col>
            <el-col :span="18"><label>{{formEdit.thisMonthPayment}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">当月已用额度</label></el-col>
            <el-col :span="18"><label>{{formEdit.sn}}</label></el-col>
        </el-col>

        <el-col :span="12">
            <el-col :span="6"><label class="descr">当前占用额度</label></el-col>
            <el-col :span="18"><label>{{formEdit.sn}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">单位地址</label></el-col>
            <el-col :span="18"><label>{{formEdit.address}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">电话号码</label></el-col>
            <el-col :span="18"><label>{{formEdit.tel}}</label></el-col>
        </el-col>
    </el-row>
    <h4>账户信息</h4>
    <el-row>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">开户银行名称</label></el-col>
            <el-col :span="18"><label>{{formEdit.openingBankName}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="7"><label class="descr">开户行支行信息</label></el-col>
            <el-col :span="17"><label>{{formEdit.openingBankBranchInfo}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">企业银行账号</label></el-col>
            <el-col :span="18"><label>{{formEdit.enterpriseBankAccount}}</label></el-col>
        </el-col>
    </el-row>
    <h4>其他信息</h4>
    <el-row>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">资质方联系人</label></el-col>
            <el-col :span="18"><label>{{formEdit.contacts}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">手机号码</label></el-col>
            <el-col :span="18"><label>{{formEdit.contactsTel}}</label></el-col>
        </el-col>
    </el-row>
  </div>
</template>

<script>

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
    }
  },
  created() {},
  methods: {
    handleDetail() {
      let row = this.$route.params
      Object.assign(this.formEdit,row)
    },
  },
  computed: {},
  mounted() {
      this.handleDetail()
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
label{
    color:#606266;
    display: inline-block;
    width:100%;
}
label.descr{
    text-align: right;
    padding-right: 20px;
    box-sizing: border-box;
}
</style>