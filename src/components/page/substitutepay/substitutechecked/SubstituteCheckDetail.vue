<template>
  <div class="rolelist">
    
    <div class="paddingcontainer">
      <el-table
        :data="paymentRequestlList"
        style="width: 100%"
      >
        <el-table-column label="代付流水号" prop="id" width="220"></el-table-column>
        <el-table-column label="特约商户号" prop="tyMerchId" width="90"></el-table-column>
        <el-table-column label="商户编号" prop="merchId" width="130"></el-table-column>
        <el-table-column label="商户名称" prop="merchName" width="120"></el-table-column>
        <el-table-column label="收款人姓名" prop="payeeName" width="80"></el-table-column>
        <el-table-column label="收款人银行账号" prop="payeeBankNumber" width="160"></el-table-column>
        <el-table-column label="联行号" prop="payeeBankCode" width="90"></el-table-column>
        <el-table-column label="收款人身份证号" prop="payeeCardId" width="150"></el-table-column>
        <el-table-column label="导入日期" prop="inputTime" width="140"></el-table-column>
        <el-table-column label="出款日期" prop="createBatchTime" width="140"></el-table-column>
        <el-table-column label="应出款金额" width="100">
          <template slot-scope="scope">
            {{scope.row.orgPayeeAmt | fMoney}}
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
        <el-table-column label="实际出款金额" width="100">
          <template slot-scope="scope">
            {{scope.row.actualPayAmt | fMoney}}
          </template>
        </el-table-column>
        <el-table-column label="发票类型" width="90">
          <template slot-scope="scope">
            {{scope.row.invoiceType == 1 && scope.row.invoiceType ? '专用发票':'普通发票'}}
          </template>
        </el-table-column>
        <el-table-column label="批次号" prop="batchCode" width="200"></el-table-column>
        <el-table-column label="代付状态" width="80">
          <template slot-scope="scope">
            {{scope.row.flag | bussType}}
          </template>
        </el-table-column>
        <el-table-column label="打款失败原因描述" prop="failReason" width="120"></el-table-column>
        <el-table-column label="业务类型" width="100">
          <template slot-scope="scope">
            {{ scope.row.bussType == '1' && scope.row.bussType ? '特约商户代付' : '普通商户代付' }}
          </template>
        </el-table-column>
        <el-table-column label="原代付账户" prop="orgPayAccount" width="160"></el-table-column>
        <el-table-column label="实际代付账户" prop="actualPayAccount" width="160"></el-table-column>
        <el-table-column label="备注" prop="remark" width="160"></el-table-column>
      </el-table>
    </div>
    <p>
        <el-button type="primary" size="small" @click="goback">返回</el-button>
    </p>
  </div>
</template>

<script>
import { getReviewIdByRequestList } from "@/requestDataInterface";
export default {
  props: {},
  data() {
    return {
      paymentRequestlList: [],
      total:1,
      currentPage:1
    };
  },
  created() {},
  methods: {
    goback(){
        this.$router.go(-1)
    },
    handlegetReviewIdByBatchList() {
      let id = this.$route.params.id
      getReviewIdByRequestList({ id }).then(res => {
        if(res.success){
          this.paymentRequestlList = res.result.paymentRequestlList
        }
      }).catch(err=>{})
    }
  },
  computed: {},
  mounted() {
    this.handlegetReviewIdByBatchList()
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
p{
    text-align: center;
}
</style>