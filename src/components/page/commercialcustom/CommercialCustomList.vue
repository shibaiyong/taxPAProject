<template>
  <div class="rolelist">
    <div class="operate">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="商户编号">
              <el-input v-model="formSearch.sn"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业名称">
              <el-input v-model="formSearch.enterpriseName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业账户">
              <el-input v-model="formSearch.enterpriseAccounts"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="纳税人识别号">
              <el-input v-model="formSearch.taxpayerIdentificationSn"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当前状态">
              <el-select v-model="formSearch.status">
                <el-option
                  v-for="option in statusOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
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
                v-model="formSearch.endDate"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
                placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <div class="operate">
              <div class="operateBtn">
                <el-button type="primary" size="small" @click="handleSearch">
                  <i class="el-icon-search"></i>&nbsp;查询
                </el-button>
                <el-button type="primary" size="small" @click="handleResetSearchForm">
                  <i class="el-icon-circle-close"></i>&nbsp;清空
                </el-button>
                <el-button type="primary" size="small" @click="handleAdd">
                  <i class="el-icon-circle-plus-outline"></i>&nbsp;录入
                </el-button>
                <el-button type="primary" size="small" @click="handleEdit">
                  <i class="el-icon-edit-outline"></i>&nbsp;修改
                </el-button>
                <!-- <el-button type="primary" size="small" @click="handleBlackList">
                  <i class="el-icon-search"></i>&nbsp;加入黑名单
                </el-button> -->
                <el-button type="primary" size="small" @click="handleExport">
                  <i class="el-icon-download"></i>&nbsp;导出
                </el-button>
                <el-button type="primary" size="small" @click="handleAdjust">
                  <i class="el-icon-sort"></i>&nbsp;调账
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="paddingcontainer">
      <el-table
        :data="merchantList"
        style="width: 100%"
        @select="handleSelectionChange"
        @select-all="handleSelectAll"
        @cell-click="handleShowDetail"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="商户编号" prop="sn" width="120"></el-table-column>
        <el-table-column label="企业名称">
          <template slot-scope="scope">
            <span class="myblue">{{scope.row.enterpriseName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系人姓名" prop="contactsName"></el-table-column>
        <el-table-column label="当前状态">
          <template slot-scope="scope">
            {{ scope.row.status == 1 ? '启用' : '停用' }}
          </template>
        </el-table-column>
        <el-table-column label="账户余额">
          <template slot-scope="scope">
            {{scope.row.totalAccountPayment | fMoney}}
          </template>
        </el-table-column>
        <el-table-column label="入网日期" prop="createdTime" width="140"></el-table-column>
        <el-table-column label="关闭日期" prop="closedTime" width="140"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <button class="statusbtn" v-status="scope.row" :key="scope.row.id"></button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paddingcontainer pagecontainer">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
        @current-change="handleGetMerchantList"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
    <div class="dialogblack dialogchange">
    <el-dialog title="调账" :visible.sync="dialogChangeAccount">
      <el-form :model="formChangeAccount" size="small" label-width="80px">
        <el-row>
            <el-col :span="24" v-show="formChangeAccount.type != 2">
              <el-form-item label="商户名称">
                <el-input v-model="formChangeAccount.turnInMerchantName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-show="formChangeAccount.type != 2">
              <el-form-item label="商户编号">
                <el-input v-model="formChangeAccount.turnInMerchantSn" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-show="formChangeAccount.type == 2">
              <el-form-item label="商户名称">
                <el-input v-model="formChangeAccount.turnOutMerchantName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-show="formChangeAccount.type == 2">
              <el-form-item label="商户编号">
                <el-input v-model="formChangeAccount.turnOutMerchantSn" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          <el-col :span="24">
            <el-form-item label="调账类型">
              <el-select v-model="formChangeAccount.type" @change="handleChangeAccount">
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
              <el-input v-model="formChangeAccount.payment"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="eachOther">
            <div style="border-bottom: 1px solid #DCDFE6;margin-bottom:10px;"></div>
          </el-col>
          <el-col :span="24" v-if="eachOther">
            <el-form-item label="商户名称" prop="openingBankBranchInfo">
              <el-select placeholder="" v-model="formChangeAccount.turnOutMerchantId" filterable remote :remote-method="remoteMethod" @change="translateValue">
                <el-option
                  v-for="option in merchantListById"
                  :key="option.id"
                  :label="option.enterpriseName"
                  :value="option.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="eachOther">
            <el-form-item label="商户编号">
              <el-input v-model="formChangeAccount.turnOutMerchantSn" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogChangeAccount = false">取 消</el-button>
        <el-button type="primary" size="small" @click="handleAdjustAccount">确 定</el-button>
      </div>
    </el-dialog>
    </div>
    <div class="dialogblack">
      <el-dialog title="黑名单" :visible.sync="dialogBlackList">
        <p>确定要将该商户加入黑名单吗？</p>
        <el-form size="small" :model="formSearch">
          <el-form-item label="备注：">
            <el-input v-model="remark" placeholder=""></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogBlackList = false">取 消</el-button>
          <el-button type="primary" size="small" @click="handleInsertBlanklist">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  changeMerchantStatus,
  insertBlanklist,
  getMerchantList,
  applicationSubmit,
  getMerchantListByZZF
} from "@/requestDataInterface";
export default {
  props: {},
  data() {
    return {
      eachOther:false,
      dialogChangeAccount: false,
      dialogBlackList: false,
      currentPage: 1,
      total: 1,
      remark:'',
      statusOptions: [
        { label: "全部", value: '' },
        { label: "生效中", value: 1 },
        { label: "停用中", value: 0 }
      ],
      changeAccountType: [
        { label: "调增", value: 1 },
        { label: "调减", value: 2 },
        { label: "互调", value: 3 }
      ],
      merchantList: [],
      merchantListById:[
      ],
      multipleSelection: [],
      formChangeAccount: {
        turnInMerchantSn:'',
        turnInMerchantId:'',
        turnInMerchantName:'',
        turnOutMerchantSn:'',
        turnOutMerchantId:'',
        turnOutMerchantName:'',
        type:1,
        payment:''
      },
      resetFormChangeAccount: {
        turnInMerchantSn:'',
        turnInMerchantId:'',
        turnInMerchantName:'',
        turnOutMerchantSn:'',
        turnOutMerchantId:'',
        turnOutMerchantName:'',
        payment:''
      },
      formSearch: {
        sn: "",
        enterpriseName: "",
        enterpriseAccounts: "",
        taxpayerIdentificationSn: "",
        status: "",
        beginDate: "",
        endDate: ""
      },
      resetFormSearch: {
        sn: "",
        enterpriseName: "",
        enterpriseAccounts: "",
        taxpayerIdentificationSn: "",
        status: "",
        beginDate: "",
        endDate: ""
      }
    };
  },
  created() {},
  methods: {
    handleEffect(id, status) {
      return changeMerchantStatus({ id: id, status: status }).then(res => {
        if (res.success) {
          this.handleGetMerchantList(this.currentPage);
        } else {
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      });
    },
    handleChangeAccount(val){
      let multipleSelection = this.multipleSelection;
      Object.assign(this.formChangeAccount,this.resetFormChangeAccount)
      this.eachOther = false
      if(val == '3'){
        this.eachOther = true
        this.formChangeAccount.turnInMerchantId = multipleSelection[0].id
        this.formChangeAccount.turnInMerchantSn = multipleSelection[0].sn
        this.formChangeAccount.turnInMerchantName = multipleSelection[0].enterpriseName
      }else if(val == '1'){
        this.formChangeAccount.turnInMerchantId = multipleSelection[0].id
        this.formChangeAccount.turnInMerchantSn = multipleSelection[0].sn
        this.formChangeAccount.turnInMerchantName = multipleSelection[0].enterpriseName
      }else if(val == '2'){
        this.formChangeAccount.turnOutMerchantId = multipleSelection[0].id
        this.formChangeAccount.turnOutMerchantSn = multipleSelection[0].sn
        this.formChangeAccount.turnOutMerchantName = multipleSelection[0].enterpriseName
      }
    },
    handleSearch() {
      this.handleGetMerchantList(this.currentPage)
    },
    handleAdd() {
      this.$router.push("/home/addcommercialcustom")
    },
    translateValue( val ){
      let obj = this.merchantListById.find((item)=>{
          return item.id === val
      })
      this.formChangeAccount.turnOutMerchantName = obj.enterpriseName
      this.formChangeAccount.turnOutMerchantSn = obj.sn
    },
    remoteMethod(val){
      let multipleSelection = this.multipleSelection
      getMerchantListByZZF({qualificationId:multipleSelection[0].qualificationId,merchantId:multipleSelection[0].id,enterpriseName:val}).then(res => {
        if(res.code == 2000){
          this.merchantListById = res.result
        }
      }).catch()
    },
    handleAdjust() {
      let multipleSelection = this.multipleSelection
      if (!this.judgeRight(multipleSelection)) {
        return false
      }
      this.dialogChangeAccount = true
      this.formChangeAccount.type = 1
      this.handleChangeAccount(1)
    },
    handleAdjustAccount(){
      applicationSubmit(this.formChangeAccount).then( res => {
        if(res.code==2000){
          this.dialogChangeAccount = false
          this.$message({
              type: "success",
              message: res.msg
          });
        }else{
          this.$message({
              type: "error",
              message: res.msg
          });
        }
      }).catch(err=>{})
    },
    handleBlackList() {
      let multipleSelection = this.multipleSelection
      if (!this.judgeRight(multipleSelection)) {
        return false;
      }
      this.dialogBlackList = true;
    },
    handleInsertBlanklist() {
      let id = this.multipleSelection[0].id;
      let remark = this.remark;
      insertBlanklist({ id, remark })
        .then(res => {
          if (res.success) {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.handleGetMerchantList(this.currentPage);
            this.dialogBlackList = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      let multipleSelection = this.multipleSelection;
      if (!this.judgeRight(multipleSelection)) {
        return false;
      }
      this.$router.push({
        name: "EditCommercialCustom",
        params: multipleSelection[0]
      });
    },
    handleShowDetail(row, column, cell, event) {
      if(column.label == '企业名称'){
        this.$router.push({ name: 'DetailCommercialCustom', params: row })
      }
    },
    handleGetMerchantList(currentPage) {
      let params = Object.assign({}, this.formSearch, {
        page: currentPage,
        rows: 20
      });
      getMerchantList(params)
        .then(res => {
          if (res.success) {
            this.merchantList = res.result.merchants;
            this.total = res.result.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleExport(){
      let idsStr = ''
      let ids = []
      if(this.multipleSelection.length){
        ids = this.multipleSelection.map((item,index)=>item.id)
      }
      idsStr = ids.join(',')
      if(idsStr){
        window.open('http://localhost:8088/export/merchantList?ids='+idsStr,'_self')
      }else{
        window.open('http://localhost:8088/export/merchantList','_self')
      }
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
    },
    cancelEidt() {},
    confirmEdit() {}
  },
  computed: {},
  mounted() {
    this.handleGetMerchantList(this.currentPage);
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
.el-row h4 {
  padding-bottom: 6px;
}
>>> .el-dialog {
  width: 62%;
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
</style>