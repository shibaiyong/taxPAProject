<template>
  <div class="rolelist">
    <div class="operate">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="商户编号">
              <el-input v-model="formSearch.merchantSn"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商户名称">
              <el-input v-model="formSearch.merchantName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="调账类型">
              <el-select v-model="formSearch.type">
                <el-option
                  v-for="option in changeAccountType"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <div class="operate">
              <div class="operateBtn">
                <el-button type="primary" size="small" @click="handleSearch">
                  <i class="el-icon-search"></i>&nbsp;查询
                </el-button>
                <el-button type="primary" size="small" @click="handleCheck">
                  <i class="el-icon-circle-close"></i>&nbsp;审核
                </el-button>
                <el-button type="primary" size="small" @click="handleExport">
                  <i class="el-icon-circle-plus-outline"></i>&nbsp;导出
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="paddingcontainer">
      <el-table
        :data="accountAdjustments"
        style="width: 100%"
        @select="handleSelectionChange"
        @select-all="handleSelectAll"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="转出商户编号" prop="turnOutMerchantSn" width="140"></el-table-column>
        <el-table-column label="转出商户名称" prop="turnOutMerchantName" width="140"></el-table-column>
        <el-table-column label="转入商户编号" prop="turnInMerchantSn" width="140"></el-table-column>
        <el-table-column label="转入商户名称" prop="turnInMerchantName" width="140"></el-table-column>
        <el-table-column label="调账时间" prop="createdTime" width="160"></el-table-column>
        <el-table-column label="调账类型" width="80">
          <template slot-scope="scope">
            {{scope.row.type | type}}
          </template>
        </el-table-column>
        <el-table-column label="调整资金" prop="payment" width="120"></el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            {{scope.row.status | status}}
          </template>
        </el-table-column>
        <el-table-column label="失败原因" prop="failRemark" width="140"></el-table-column>
      </el-table>
    </div>
    <div class="paddingcontainer pagecontainer">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
        @current-change="handlegetAccountAdjustmentList"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
    <div class="dialogblack dialogchange">
    <el-dialog title="调账" :visible.sync="dialogChangeAccount">
      <el-form :model="formChangeAccount" size="small" label-width="80px">
        <el-row>
          <el-col :span="24" v-show="formChangeAccount.turnInMerchantName">
            <el-form-item label="商户名称">
              <el-input v-model="formChangeAccount.turnInMerchantName" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商户编号" v-show="formChangeAccount.turnInMerchantSn">
              <el-input v-model="formChangeAccount.turnInMerchantSn" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="!eachOther">
            <el-form-item label="商户名称" v-show="formChangeAccount.turnOutMerchantName">
              <el-input v-model="formChangeAccount.turnOutMerchantName" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="!eachOther">
            <el-form-item label="商户编号" v-show="formChangeAccount.turnOutMerchantSn">
              <el-input v-model="formChangeAccount.turnOutMerchantSn" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="调账类型">
              <el-select v-model="formChangeAccount.type" :disabled="isEdit">
                <el-option
                  v-for="option in changeAccountType"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="调账金额">
              <el-input v-model="formChangeAccount.payment" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="eachOther">
            <div style="border-bottom: 1px solid #DCDFE6;margin-bottom:10px;"></div>
          </el-col>
          <el-col :span="24" v-if="eachOther">
            <el-form-item label="商户名称">
              <el-input v-model="formChangeAccount.turnOutMerchantName" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="eachOther">
            <el-form-item label="商户编号">
              <el-input v-model="formChangeAccount.turnOutMerchantSn" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleReject">驳 回</el-button>
        <el-button type="primary" size="small" @click="handleApplicationExamine">确 定</el-button>
      </div>
    </el-dialog>
    </div>
    <div class="dialogblack">
      <el-dialog title="驳回" :visible.sync="dialogBlackList">
        <el-form size="small" :model="formSearch" label-width="100px">
          <el-form-item label="驳回原因：">
            <el-input v-model="failRemark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogBlackList = false">取 消</el-button>
          <el-button type="primary" size="small" @click="handleApplicationReject">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getAccountAdjustmentById,
  applicationExamine,
  getAccountAdjustmentList,
  applicationReject
} from "@/requestDataInterface";
export default {
  props: {},
  data() {
    return {
      isEdit:true,
      eachOther:false,
      dialogChangeAccount: false,
      dialogBlackList: false,
      currentPage: 1,
      total: 1,
      failRemark: '',
      changeAccountType: [
        { label: "请选择", value: '' },
        { label: "调增", value: 1 },
        { label: "调减", value: 2 },
        { label: "互调", value: 3 }
      ],
      accountAdjustments: [],
      multipleSelection: [],
      formChangeAccount: {
        turnOutMerchantName:'',
        turnOutMerchantSn:'',
        turnInMerchantSn:'',
        turnInMerchantName:'',
        type:'',
        payment:''
      },
      formSearch: {
        sn: "",
        enterpriseName: "",
        type: "",
      },
      resetFormSearch: {
        sn: "",
        enterpriseName: "",
        type: ""
      }
    };
  },
  created() {},
  methods: {
    
    handleSearch() {
      this.handlegetAccountAdjustmentList(this.currentPage)
    },

    handleExport(){
      let idsStr = ''
      let ids = []
      if(this.multipleSelection.length){
        ids = this.multipleSelection.map((item,index)=>item.id)
      }
      idsStr = ids.join(',')
      if(idsStr){
        window.open('/apii/export/accountAdjustmentList?ids='+idsStr)
      }else{
        window.open('/apii/export/accountAdjustmentList')
      }
    },
    
    handleCheck() {
      let multipleSelection = this.multipleSelection;
      if (!this.judgeRight(multipleSelection)) {
        return false
      }
      getAccountAdjustmentById({id:multipleSelection[0].id}).then(res => {
          if (res.success) {
            Object.assign(this.formChangeAccount,res.result)
            if(res.result.type == 3){
              this.eachOther = true
            }else{
              this.eachOther = false
            }
            this.dialogChangeAccount = true
          }
        }).catch(err => {
            console.log(err)
        })
    },
    handleApplicationExamine(){
        applicationExamine({id:this.formChangeAccount.id}).then(res => {
          if (res.success) {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.handlegetAccountAdjustmentList(this.currentPage)
            this.dialogChangeAccount = false
          }
        }).catch(err => {console.log(err)})
    },
    handleReject() {
      this.dialogChangeAccount = false
      this.dialogBlackList = true
    },
    handleApplicationReject(){

        applicationReject({id:this.formChangeAccount.id,remark:this.failRemark}).then(res => {
          if (res.success) {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.dialogBlackList = false
            this.handlegetAccountAdjustmentList(this.currentPage)
          }
        }).catch(err => {
            console.log(err)
        })
    },
    handlegetAccountAdjustmentList(currentPage) {
      let params = Object.assign({}, this.formSearch, {
        page: currentPage,
        rows: 20
      });
      getAccountAdjustmentList(params)
        .then(res => {
          if (res.success) {
            this.accountAdjustments = res.result.accountAdjustments
            this.total = res.result.total
          }
        }).catch(err => {})
    },
    handleSelectionChange(selection, row) {
      this.multipleSelection = selection;
    },
    handleSelectAll(selection) {
      this.multipleSelection = selection;
    },
    handleResetSearchForm() {
      Object.assign(this.formSearch, this.resetFormSearch);
    },
    judgeRight(multipleSelection) {
      if (!multipleSelection.length) {
        this.$message({
          type: "error",
          message: "请选择商户"
        });
        return false;
      } else if (multipleSelection.length > 1) {
        this.$message({
          type: "error",
          message: "请选择一个商户"
        });
        return false;
      }
      return true;
    }
  },
  computed: {},
  mounted() {
    this.handlegetAccountAdjustmentList()
  },
  filters: {
    type( val ){
      let text;
      switch ( val ) {
        default: 
          text = "";
          break;
        case 1:
          text = "调增";
          break;
        case 2:
          text = "调减";
          break;
        case 3:
          text = "互调";
      }
      return text
    },
    status( val ){
      let text;
      switch ( val ) {
        default: 
          text = "";
          break;
        case 1:
          text = "待审核";
          break;
        case 2:
          text = "审核通过";
          break;
        case 3:
          text = '审核不通过';
      }
      return text
    }
  },
  components: {},
  beforeDestroy() {}
};
</script>
<style scoped>
.operate {
  padding: 0 3%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.operate .el-button--small {
  padding: 9px 12px;
}
.pagecontainer {
  text-align: right;
  margin-top: 20px;
}
.el-pagination {
  display: inline-block;
}
.el-form {
  width: 100%;
}
.el-row h4 {
  padding-bottom: 6px;
}

.dialogblack >>> .el-dialog {
  width: 40%;
}
.dialogchange >>> .el-dialog {
  width: 30%;
}
.dialogchange hr{
  color:#DCDFE6
}
.dialogchange >>> .el-dialog__body{
  padding-top:15px;
  padding-bottom:15px;
}

.dialogchange >>> .el-dialog__body .el-select{
  width:100%;
}
</style>