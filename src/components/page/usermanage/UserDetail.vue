<template>
  <div class="addqualifypart paddingcontainer">
    <h4>企业信息</h4>
    <el-row>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">姓名</label></el-col>
            <el-col :span="18"><label>{{formEdit.name}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">手机号</label></el-col>
            <el-col :span="18"><label>{{formEdit.phone}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">身份证号</label></el-col>
            <el-col :span="18"><label>{{formEdit.idCard}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">账号</label></el-col>
            <el-col :span="18"><label>{{formEdit.bankAccount}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">开户行名称</label></el-col>
            <el-col :span="18"><label>{{formEdit.bankName}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="7"><label class="descr">开户行支行信息</label></el-col>
            <el-col :span="17"><label>{{formEdit.bankBranchName}}</label></el-col>
        </el-col>
        
    </el-row>
    <h4>账户信息</h4>
    <el-row>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">资质方编号</label></el-col>
            <el-col :span="18"><label>{{formEdit.sn}}</label></el-col>
        </el-col>
        <el-col :span="12">
            <el-col :span="6"><label class="descr">企业名称</label></el-col>
            <el-col :span="18"><label>{{formEdit.enterpriseName}}</label></el-col>
        </el-col>
        
    </el-row>
    <P>
        <el-button type="primary" size="small" @click="goback">返回</el-button>
    </P>
  </div>
</template>

<script>
import { getUserInfoById } from "@/requestDataInterface"
export default {
  props: {},
  data() {
    return {
        formEdit: {
            sn:'',
            enterpriseName:'',
            enterpriseTaxSn:'',
            enableTime:'',
            unEnableTime:'',
            yearPayment:'',
            singleMonthPayment:'',
            thisMonthPayment:'',
            nextMonthPayment:'',
            address:'',
            tel:'',
            openingBankName:'',
            openingBankBranchInfo:'',
            enterpriseBankAccount:'',
            contacts:'',
            contactsTel:'',
            allYearPayment:''
      },
    }
  },
  created() {},
  methods: {
    handleDetail() {
      let id = this.$route.params.id
      getUserInfoById({id}).then( res => {
        if(res.success){
          Object.assign(this.formEdit,res.result)
        }
      }).catch(err=>{})
    },
    goback(){
        this.$router.go(-1)
    }
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
p{
    text-align: center;
}
</style>