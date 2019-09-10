<template>
  <div class="rolelist">
    <div class="tabcontainer">
      <el-tabs v-model="activename" @tab-click="handleClick">
        <el-tab-pane label="商户黑名单" name="/home/blacklist/marchantblack"></el-tab-pane>
        <el-tab-pane label="用户黑名单" name="/home/blacklist/userblack"></el-tab-pane>
      </el-tabs>
    </div>

    <router-view></router-view>

  </div>
</template>

<script>
import { getBlacklist, removeBlacklist } from "@/requestDataInterface"
export default {
  props: {},
  data() {
    
    return {
      activename:'/home/blacklist/marchantblack',
      isEffect:true,
      dialogBlackList: false,
      currentPage:1,
      total:1,
      statusOptions: [
        { label: "生效中", value: 1 },
        { label: "停用中", value: 0 }
      ],
      blackList: [
        
      ],
      multipleSelection:[],
      formSearch: {
        sn:'',
        enterpriseName:'',
        enterpriseAccounts:'',
        status:'',
        beginDate:'',
        endDate:''
      },
      resetFormSearch: {
        sn:'',
        enterpriseName:'',
        enterpriseAccounts:'',
        status:'',
        beginDate:'',
        endDate:''
      } 
    }
  },
  created() {},
  methods: {
    handleClick(tab,event){
      this.$router.push(tab.name)
    }
  },
  computed: {},
  mounted() {
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
}
.tabcontainer{
  padding: 0 3%;
  box-sizing: border-box;
}
.operate .el-button--small{
  padding:9px 12px;
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
.dialogblack >>>.el-dialog{
  width:40%;
}

.statusbtn{
  display:inline-block;
  width:50px;
  height:25px;
  font-size: 12px;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  background:#409eff;
  border:none;
  color:white;
}

</style>