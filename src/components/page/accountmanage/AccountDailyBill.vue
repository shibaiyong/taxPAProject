<template>
  <div class="rolelist">
    <div class="operate">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="账单编号">
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
            <el-form-item label="开始日期">
              <el-date-picker
                v-model="formSearch.beginDate"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束日期">
              <el-date-picker
                v-model="formSearch.endDate"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
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
        :data="merchantList"
        style="width: 100%"
        @select="handleSelectionChange"
        @select-all="handleSelectAll"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="账单编号" prop="sn" width="160"></el-table-column>
        <el-table-column label="商户编号" prop="sn" width="160"></el-table-column>
        <el-table-column label="商户名称" prop="enterpriseName"></el-table-column>
        <el-table-column label="交易日期" prop="createdTime" width="160"></el-table-column>
        <el-table-column label="账单日期" prop="closedTime" width="160"></el-table-column>
        <el-table-column label="资质方" prop="enterpriseName"></el-table-column>
        <el-table-column label="充值金额" prop="totalAccountPayment"></el-table-column>
        <el-table-column label="应打款金额" prop="totalAccountPayment"></el-table-column>
        <el-table-column label="实际打款金额" prop="totalAccountPayment"></el-table-column>
        <el-table-column label="商户服务费" prop="totalAccountPayment"></el-table-column>
        <el-table-column label="个人服务费" prop="totalAccountPayment"></el-table-column>
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
  </div>
</template>

<script>
import {
  changeMerchantStatus,
  getMerchantList,
  applicationSubmit
} from "@/requestDataInterface";
export default {
  props: {},
  data() {
    return {
      dialogChangeAccount: false,
      dialogBlackList: false,
      currentPage: 1,
      total: 1,
      remark:'',
      statusOptions: [
        { label: "生效中", value: 1 },
        { label: "停用中", value: 0 }
      ],
      changeAccountType: [
        { label: "调增", value: 1 },
        { label: "调减", value: 2 },
        { label: "互调", value: 3 }
      ],
      merchantList: [],
      merchantListById:[],
      multipleSelection: [],
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
    handleSearch() {
      this.handleGetMerchantList(this.currentPage)
    },
    handleShowDetail() {
      
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
      window.open('http://localhost:8088/export/merchantList?ids='+idsStr)
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

</style>