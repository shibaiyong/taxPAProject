<template>
  <div class="marchantblacklist">
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
            <el-form-item label="当前状态">
            <el-select v-model="formSearch.status" placeholder="">
                <el-option v-for="option in statusOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
            </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="入网开始日期">
            <el-date-picker
              v-model="formSearch.createdTime"
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
              v-model="formSearch.closedTime"
              type="date"
              format="yyyy - MM - dd"
              value-format="yyyy-MM-dd"
              placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <div class="operate">
            <div class="operateBtn">
              <el-button type="primary" size="small" @click="handleSearch">
                <i class="el-icon-search"></i>&nbsp;查询
              </el-button>
              <el-button type="primary" size="small" @click="handleRemoveBlackList">
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
      <el-table :data="blackList" style="width: 100%" @select="handleSelectionChange" @select-all="handleSelectAll">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="商户编号" prop="sn"></el-table-column>
        <el-table-column label="企业名称" prop="enterpriseName"></el-table-column>
        <el-table-column label="联系人姓名" prop="contactsName"></el-table-column>
        <el-table-column label="账户余额" prop="mobile"></el-table-column>
        <el-table-column label="入网日期" prop="createdTime"></el-table-column>
        <el-table-column label="关闭日期" prop="closedTime"></el-table-column>
        <!-- <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <button class="statusbtn" v-status="scope.row">启用</button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="paddingcontainer pagecontainer">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
        @current-change="handleGetBlacklist"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
    
    <div class="dialogblack">
    <el-dialog title="解除黑名单" :visible.sync="dialogBlackList">
      <p>确定要将该商户解除黑名单吗？</p>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogBlackList = false">取 消</el-button>
        <el-button type="primary" size="small" @click="removeBlanklist">确 定</el-button>
      </div>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { getBlacklist, removeBlacklist } from "@/requestDataInterface"
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
    handleSearch(){
      this.handleGetBlacklist(this.currentPage)
    },
    handleRemoveBlackList(){
      let multipleSelection = this.multipleSelection
      if(!this.judgeRight( multipleSelection )){
        return false
      }
      this.dialogBlackList = true
    },
    removeBlanklist(){
      let id = this.multipleSelection[0].id
      removeBlacklist({id}).then(res=>{
        if(res.success){
          this.$message({
            type:'success',
            message:res.msg
          })
          this.handleGetBlacklist(this.currentPage)
          this.dialogBlackList = false
        }
      }).catch(err => {console.log(err)})
    },
    handleGetBlacklist(currentPage) {
      
      let params = Object.assign({}, this.formSearch, {page:currentPage, rows:20})
      getBlacklist(params).then(res => {
        if(res.success){
          this.blackList = res.result.merchants
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
          message:'请选择商户'
        })
        return false
      }else if( multipleSelection.length > 1 ){
        this.$message({
          type:'error',
          message:'请选择一个商户'
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
    this.handleGetBlacklist(this.currentPage)
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