<template>
  <div class="userblacklist">
    <div class="operate">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="资质方名称">
              <el-input v-model="formSearch.enterpriseName" placeholder="资质方名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号">
              <el-input v-model="formSearch.idcard" placeholder="身份证号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式">
              <el-input v-model="formSearch.phone" placeholder="联系方式"></el-input>
            </el-form-item>
          </el-col>
        
          <el-col :span="12">
            <el-form-item label="导入日期">
              <el-date-picker
                v-model="formSearch.beginDate"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
                placeholder="开始日期"
              ></el-date-picker>
              -
              <el-date-picker
                v-model="formSearch.endDate"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
                placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        <el-col :span="12">
          <div class="operate">
            <div class="operateBtn">
              <el-button type="primary" size="small" @click="handleSearch">
                <i class="el-icon-search"></i>&nbsp;查询
              </el-button>
              <el-button type="primary" size="small" @click="handleremoveUserBlacklist">
                <i class="el-icon-search"></i>&nbsp;解除黑名单
              </el-button>
              <el-button type="primary" size="small">
                <i class="el-icon-search"></i>&nbsp;导出
              </el-button>
            </div>
          </div>
        </el-col>
        </el-row>
      </el-form>
    </div>
    
    <div class="paddingcontainer">
      <el-table
        :data="blackList"
        style="width: 100%"
        @select="handleSelectionChange"
        @select-all="handleSelectAll"
      >
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="姓名" prop="name" width="90"></el-table-column>
        <el-table-column label="身份证号码" prop="idCard" width="180"></el-table-column>
        <el-table-column label="手机号" prop="phone" width="120"></el-table-column>
        <el-table-column label="对应资质方" prop="enterpriseName" width="140"></el-table-column>
        <el-table-column label="银行名称" prop="bankName" width="140"></el-table-column>
        <el-table-column label="银行账号" prop="bankAccount" width="160"></el-table-column>
        <el-table-column label="支行名称" prop="bankBranchName" width="140"></el-table-column>
        <el-table-column label="导入时间" prop="createdTime" width="160"></el-table-column>
        <el-table-column label="可报税额度" prop="usablePayment" width="90"></el-table-column>
        <el-table-column label="已报税额度" prop="usedPayment" width="90"></el-table-column>
        <el-table-column label="当前占用额度" prop="usingPayment" width="120"></el-table-column>
      </el-table>
    </div>
    <div class="paddingcontainer pagecontainer">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
        @current-change="handlegetUserBlacklist"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
    
    <div class="dialogblack">
    <el-dialog title="解除黑名单" :visible.sync="dialogBlackList">
      <p>确定要将该用户解除黑名单吗？</p>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogBlackList = false">取 消</el-button>
        <el-button type="primary" size="small" @click="removeBlanklist">确 定</el-button>
      </div>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { getUserBlacklist, removeUserBlacklist } from "@/requestDataInterface"
export default {
  props: {},
  data() {
    
    return {
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
        enterpriseName: "",
        idCard: "",
        beginDate: "",
        endDate: "",
        phone:""
      },
      resetFormSearch: {
        enterpriseName: "",
        idCard: "",
        beginDate: "",
        endDate: "",
        phone:""
      } 
    }
  },
  created() {},
  methods: {
    handleSearch(){
      this.handlegetUserBlacklist(this.currentPage)
    },
    handleremoveUserBlacklist(){
      let multipleSelection = this.multipleSelection
      if(!this.judgeRight( multipleSelection )){
        return false
      }
      this.dialogBlackList = true
    },
    removeBlanklist(){
      let id = this.multipleSelection[0].id
      removeUserBlacklist({id}).then(res=>{
        if(res.success){
          this.$message({
            type:'success',
            message:res.msg
          })
          this.handlegetUserBlacklist(this.currentPage)
          this.dialogBlackList = false
        }
      }).catch(err => {console.log(err)})
    },
    handlegetUserBlacklist(currentPage) {
      
      let params = Object.assign({}, this.formSearch, {page:currentPage, rows:20})
      getUserBlacklist(params).then(res => {
        if(res.success){
          this.blackList = res.result.userInfos
          this.total = res.result.total
        }
      }).catch(err => {
        console.log(err)
      })
    },
    
    handleSelectionChange(selection,row) {
      this.multipleSelection = selection
    },
    handleSelectAll(selection){
      this.multipleSelection = selection
    },
    handleResetSearchForm() {
      Object.assign(this.formSearch,this.resetFormSearch)
    },
    
    judgeRight( multipleSelection ){
      if( !multipleSelection.length ){
        this.$message({
          type:'error',
          message:'请选择用户'
        })
        return false
      }else if( multipleSelection.length > 1 ){
        this.$message({
          type:'error',
          message:'请选择一个用户'
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
    this.handlegetUserBlacklist(this.currentPage)
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
  width: 180px;
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
.dialogblack >>> .el-dialog {
  width: 30%;
}

.dialogblack >>> .el-button--small{
  width:40%;
}
.dialogblack >>> .el-dialog__body{
  padding-top:15px;
  padding-bottom: 15px;
}
.dialog-footer{
  
  display:flex;
  justify-content: space-between;
}

</style>