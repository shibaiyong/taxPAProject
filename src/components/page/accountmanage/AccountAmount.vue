<template>
  <div class="rolelist">
    <!-- <div class="amount"><span>总余额：</span><span>100,000,000.00元</span></div> -->
    <div class="operate">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="商户编号">
              <el-input v-model="formSearch.merchantNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户名称">
              <el-input v-model="formSearch.merchantName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资金类型">
              <el-select v-model="formSearch.fundType">
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
            <el-form-item label="结算账户">
              <el-input v-model="formSearch.enterpriseName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出入金流水号">
              <el-input v-model="formSearch.inOutNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="借贷标识">
              <el-input v-model="formSearch.loanFlag"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="资金变动日期">
              <el-date-picker
                v-model="formSearch.beginDatePayment"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
              -
              <el-date-picker
                v-model="formSearch.endDatePayment"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <div class="operate">
              <div class="operateBtn">
                <el-button type="primary" size="small" @click="handleSearch">
                  <i class="el-icon-search"></i>&nbsp;查询
                </el-button>
                <el-button type="primary" size="small" @click="handleResetSearchForm">
                  <i class="el-icon-circle-close"></i>&nbsp;重置
                </el-button>
                <el-button type="primary" size="small" @click="handleExport">
                  <i class="el-icon-download"></i>&nbsp;导出
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="paddingcontainer">
      <el-table
        :data="merchantManagementList"
        style="width: 100%"
        @select="handleSelectionChange"
        @select-all="handleSelectAll"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="商户编号" prop="merchantNumber" width="160"></el-table-column>
        <el-table-column label="商户名称" prop="merchantName"></el-table-column>
        <el-table-column label="资金类型">
          <template slot-scope="scope">
            {{scope.row.fundType == '1' ? '提现' : '充值'}}
          </template>
        </el-table-column>
        <el-table-column label="金额" prop="total" width="120"></el-table-column>
        <el-table-column label="结算账户" prop="enterpriseName" width="120"></el-table-column>
        <el-table-column label="出入金流水号" prop="inOutNumber" width="120"></el-table-column>
        <el-table-column label="借贷标识">
          <template slot-scope="scope">
            {{scope.row.loanFlag == '1' ? '贷' : '借'}}
          </template>
        </el-table-column>
        <el-table-column label="资金变动日期" width="140" prop="createdTime"></el-table-column>
        <el-table-column label="商户状态" width="80">
          <template slot-scope="scope">
            {{scope.row.merchantState == '1' ? '生效中' : '停用中'}}
          </template>
        </el-table-column>
        <el-table-column label="资质方企业账户" width="120" prop="entityAccount"></el-table-column>
        <el-table-column label="资质方电子账户" width="120" prop="electronicAccount"></el-table-column>
      </el-table>
    </div>
    <div class="paddingcontainer pagecontainer">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
        @current-change="handleGetMerchantManagementList"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getMerchantManagementList } from "@/requestDataInterface";
export default {
  props: {},
  data() {
    return {
      currentPage: 1,
      total: 1,
      merchantManagementList: [],
      multipleSelection: [],
      statusOptions:[
        { label:'充值', value:'0' },
        { label:'提现', value:'1' }
      ],
      formSearch: {
        merchantNumber: "",
        merchantName: "",
        fundType:'',
        enterpriseName:'',
        inOutNumber: "",
        loanFlag: "",
        beginDatePayment:'',
        endDatePayment:''
      },
      resetFormSearch: {
        merchantNumber: "",
        merchantName: "",
        fundType:'',
        enterpriseName:'',
        inOutNumber: "",
        loanFlag: "",
        beginDatePayment:'',
        endDatePayment:''
      }
    };
  },
  created() {},
  methods: {
    handleSearch() {
      this.handleGetMerchantManagementList(this.currentPage)
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
    handleGetMerchantManagementList(currentPage) {
      let params = Object.assign({}, this.formSearch, {
        page: currentPage,
        rows: 20
      });
      getMerchantManagementList(params)
        .then(res => {
          if (res.success) {
            this.merchantManagementList = res.result.merchantManagementList;
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
        window.open('http://10.3.144.20:8090/export/exportMerchantManagementList?ids='+idsStr,'_self')
      }else{
        window.open('http://10.3.144.20:8090/export/exportMerchantManagementList','_self')
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
    this.handleGetMerchantManagementList(this.currentPage);
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
.amount {
  padding: 4px 12px;
  box-sizing: border-box;
  margin-bottom: 15px;
  background:#f5f5f5;
  display: inline-block;
  margin-left:3%;
  border:1px solid #7f9ee1;
  font-size: 14px;
}
.amount span{
  display:inline-block;
  vertical-align: middle;
  color:#618dd8;
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