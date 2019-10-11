<template>
  <div class="rolelist">
    <div class="operate paddingcontainer">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          
          <el-col :span="6">
            <el-form-item label="银行名称">
              <el-input v-model="formSearch.bankName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联行号">
              <el-input v-model="formSearch.bankLinkSn"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <div class="operate">
              <div class="operateBtn">
                <el-button type="primary" size="small" @click="handleSearch">
                  <i class="el-icon-search"></i>&nbsp;查询
                </el-button>
                <el-button type="primary" size="small" @click="handleAdd">
                  <i class="el-icon-circle-plus-outline"></i>&nbsp;录入
                </el-button>
                <el-button type="primary" size="small" @click="handleEdit">
                  <i class="el-icon-edit-outline"></i>&nbsp;修改
                </el-button>
                <!-- <el-button type="primary" size="small" @click="handleExport">
                  <i class="el-icon-edit"></i>&nbsp;导出
                </el-button> -->
                <!-- <el-button type="primary" size="small" @click="handleImport">
                  <i class="el-icon-download"></i>&nbsp;导入
                </el-button> -->
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="paddingcontainer">
      <el-table
        :data="paymentChannelsList"
        style="width: 100%"
        @select="handleSelectionChange"
        @select-all="handleSelectAll"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <!-- <el-table-column label="序号" prop="channelSn" width="120"></el-table-column> -->
        <el-table-column label="银行名称" prop="bankName" width="120"></el-table-column>
        <el-table-column label="支行名称" prop="bankBranchName" width="360"></el-table-column>
        <el-table-column label="联行号" prop="bankLinkSn"></el-table-column>
        <el-table-column label="生效日期" prop="effectiveDate"></el-table-column>
        <el-table-column label="失效日期" prop="expirationDate"></el-table-column>
      </el-table>
    </div>
    <div class="paddingcontainer pagecontainer">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
        @current-change="handlegetBankLinkSnList"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getBankLinkSnList } from "@/requestDataInterface";
export default {
  props: {},
  data() {
    return {
      dialogBlackList: false,
      currentPage: 1,
      total: 1,
      paymentChannelsList: [],
      multipleSelection: [],
      formSearch: {
        bankLinkSn: "",
        bankName: ""
      }
    };
  },
  created() {},
  methods: {
    handleExport(){

    },
    handleImport(){

    },
    handleSearch() {
      this.handlegetBankLinkSnList(this.currentPage);
    },
    handleAdd() {
      this.$router.push("/home/addunionpaynum");
    },
    handleEdit() {
      let multipleSelection = this.multipleSelection;
      if (!this.judgeRight(multipleSelection)) {
        return false;
      }
      this.$router.push({
        name: "EditUnionPayNum",
        params: multipleSelection[0]
      });
    },
    handlegetBankLinkSnList(currentPage) {
      let params = Object.assign({}, this.formSearch, {
        page: currentPage,
        rows: 20
      });
      getBankLinkSnList(params)
        .then(res => {
          if (res.success) {
            this.paymentChannelsList = res.result.bankLinks;
            this.total = res.result.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleSelectionChange(selection, row) {
      this.multipleSelection = selection;
    },
    handleSelectAll(selection) {
      this.multipleSelection = selection;
    },
    
    judgeRight(multipleSelection) {
      if (!multipleSelection.length) {
        this.$message({
          type: "error",
          message: "请选择数据"
        });
        return false;
      } else if (multipleSelection.length > 1) {
        this.$message({
          type: "error",
          message: "请选择一条数据"
        });
        return false;
      }
      return true;
    }
  },
  computed: {},
  mounted() {
    this.handlegetBankLinkSnList(this.currentPage);
  },
  components: {},
  beforeDestroy() {}
};
</script>
<style scoped>
.operate {
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.operate .el-button--small {
  padding: 9px 12px;
  margin-left:4px;
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

</style>