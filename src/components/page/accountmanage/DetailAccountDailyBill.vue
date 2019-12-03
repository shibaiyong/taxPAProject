<template>
  <div class="rolelist">
    <div class="operate">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input v-model="formSearch.userName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <div class="operate">
              <div class="operateBtn">
                <el-button type="primary" size="small" @click="handleSearch">
                  <i class="el-icon-search"></i>&nbsp;查询
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="paddingcontainer">
      <el-table
        :data="dailyBillDetailList"
        style="width: 100%"
      >
        <el-table-column label="姓名" prop="userName"></el-table-column>
        <el-table-column label="实际出款金额">
          <template slot-scope="scope">
            {{scope.row.actualPayAmt | fMoney}}
          </template>
        </el-table-column>
        <el-table-column label="服务费">
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
        @current-change="handleGetDailyBillDetailList"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getDailyBillDetailList } from "@/requestDataInterface";
export default {
  props: {},
  data() {
    return {
      total:1,
      currentPage:1,
      dailyBillDetailList: [],
      formSearch: {
        userName: ""
      }
    };
  },
  created() {},
  methods: {
    handleSearch() {
      this.handleGetDailyBillDetailList(this.currentPage)
    },
    handleGetDailyBillDetailList(currentPage) {
      let dailyBillId = this.$route.query.id
      let params = Object.assign({}, this.formSearch, {
        page: currentPage,
        rows: 20,
        dailyBillId
      });
      getDailyBillDetailList(params)
        .then(res => {
          if (res.success) {
            this.dailyBillDetailList = res.result.dailyBillDetailList;
            this.total = res.result.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {},
  mounted() {
    this.handleGetDailyBillDetailList(this.currentPage);
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


</style>