<template>
  <div class="rolelist">
    
    <div class="paddingcontainer">
      <el-table
        :data="merchantList"
        style="width: 100%"
      >
        <el-table-column label="复核编号" prop="idCard" width="90"></el-table-column>
        <el-table-column label="发起时间" prop="idCard" width="180"></el-table-column>
        <el-table-column label="发起人" prop="phone" width="100"></el-table-column>
        <el-table-column label="复核时间" prop="enterpriseName" width="140"></el-table-column>
        <el-table-column label="复核人" prop="bankName" width="140"></el-table-column>
        <el-table-column label="总笔数" prop="createdTime" width="160"></el-table-column>
        <el-table-column label="总金额" prop="usablePayment" width="90"></el-table-column>
        <el-table-column label="状态" prop="usedPayment" width="120"></el-table-column>
      </el-table>
    </div>
    <div class="paddingcontainer pagecontainer">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
        @current-change="handlegetUserInfoList"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getUserInfoList} from "@/requestDataInterface";
export default {
  props: {},
  data() {
    return {
      currentPage: 1,
      total: 1,
      merchantList: []
    };
  },
  created() {},
  methods: {
    handlegetUserInfoList(currentPage) {

    }
  },
  computed: {},
  mounted() {
    this.handlegetUserInfoList(this.currentPage);
  },
  components: {},
  beforeDestroy() {}
};
</script>
<style scoped>

.pagecontainer {
  text-align: right;
  margin-top: 20px;
}
.el-pagination {
  display: inline-block;
}
</style>