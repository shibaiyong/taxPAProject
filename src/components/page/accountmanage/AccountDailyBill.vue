<template>
  <div class="rolelist">
    <div class="operate">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="账单编号">
              <el-input v-model="formSearch.billNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始日期">
              <el-date-picker
                v-model="formSearch.beginCreateTime"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束日期">
              <el-date-picker
                v-model="formSearch.endCreateTime"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资质方">
              <el-input v-model="formSearch.qualificationPartyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <div class="operate">
              <div class="operateBtn">
                <el-button type="primary" size="small" @click="handleSearch">
                  <i class="el-icon-search"></i>&nbsp;查询
                </el-button>
                <el-button type="primary" size="small" @click="handleShowDetail">
                  <i class="el-icon-search"></i>&nbsp;详情
                </el-button>
                <el-button type="primary" size="small" @click="handleExport">
                  <i class="el-icon-circle-close"></i>&nbsp;导出
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="paddingcontainer">
      <el-table
        :data="dailyBillList"
        style="width: 100%"
        @select="handleSelectionChange"
        @select-all="handleSelectAll"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="账单编号" prop="billNumber" width="160"></el-table-column>
        <el-table-column label="商户编号" prop="merchantNumber" width="160"></el-table-column>
        <el-table-column label="商户名称" prop="merchantName"></el-table-column>
        <el-table-column label="交易日期" prop="transactionTime" width="140"></el-table-column>
        <el-table-column label="账单日期" prop="billTime" width="140"></el-table-column>
        <el-table-column label="资质方" prop="qualificationPartyName" width="120"></el-table-column>
        <el-table-column label="充值金额">
          <template slot-scope="scope">
            {{scope.row.rechargeAmount | fMoney}}
          </template>
        </el-table-column>
        <el-table-column label="应打款金额" width="100">
            <template slot-scope="scope">
            {{scope.row.orgPayeeAmt | fMoney}}
          </template>
        </el-table-column>
        <el-table-column label="实际打款金额" width="100">
          <template slot-scope="scope">
            {{scope.row.actualPayAmt | fMoney}}
          </template>
        </el-table-column>
        <el-table-column label="商户服务费" width="100">
          <template slot-scope="scope">
            {{scope.row.merchFee | fMoney}}
          </template>
        </el-table-column>
        <el-table-column label="个人服务费" width="100">
          <template slot-scope="scope">
            {{scope.row.personalFee | fMoney}}
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
        @current-change="handleGetDailyBillList"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getDailyBillList } from "@/requestDataInterface";
export default {
  props: {},
  data() {
    return {
      currentPage: 1,
      total: 1,
      dailyBillList: [],
      multipleSelection: [],
      formSearch: {
        billNumber: "",
        qualificationPartyName: "",
        beginCreateTime: "",
        endCreateTime: ""
      },
      resetFormSearch: {
        billNumber: "",
        qualificationPartyName: "",
        beginCreateTime: "",
        endCreateTime: ""
      }
    };
  },
  created() {},
  methods: {
    handleSearch() {
      this.handleGetDailyBillList(this.currentPage)
    },
    handleShowDetail() {
      let multipleSelection = this.multipleSelection;
      if (!this.judgeRight(multipleSelection)) {
        return false;
      }
      this.$router.push({
        name: "DetailAccountDailyBill",
        params: multipleSelection[0]
      });
    },
    handleGetDailyBillList(currentPage) {
      let params = Object.assign({}, this.formSearch, {
        page: currentPage,
        rows: 20
      });
      getDailyBillList(params)
        .then(res => {
          if (res.success) {
            this.dailyBillList = res.result.dailyBillList;
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
        window.open('/apii/export/exportDailyBillList?ids='+idsStr)
      }else{
        window.open('/apii/export/exportDailyBillList')
      }
      
    },

    handleSelectionChange(selection, row) {
      this.multipleSelection = selection
    },
    handleSelectAll(selection) {
      this.multipleSelection = selection
    },
    handleResetSearchForm() {
      Object.assign(this.formSearch, this.resetFormSearch);
    },

    judgeRight(multipleSelection) {
      if (!multipleSelection.length) {
        this.$message({
          type: "error",
          message: "请选择账单"
        });
        return false;
      } else if (multipleSelection.length > 1) {
        this.$message({
          type: "error",
          message: "请选择一个账单"
        });
        return false;
      }
      return true;
    }
  },
  computed: {},
  mounted() {
    this.handleGetDailyBillList(this.currentPage);
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

</style>