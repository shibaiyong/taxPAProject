<template>
  <div class="rolelist">
    
    <div class="paddingcontainer">
      <el-table
        :data="payBatchList"
        style="width: 100%"
      >
        <el-table-column label="出款渠道" prop="channelId"></el-table-column>
        <el-table-column label="出款账户" prop="actualPayAccount"></el-table-column>
        <el-table-column label="总笔数" prop="totalNum"></el-table-column>
        <el-table-column label="总金额" prop="totalAmt"></el-table-column>
      </el-table>
    </div>
    <p>
        <el-button type="primary" size="small" @click="goback">返回</el-button>
    </p>
  </div>
</template>

<script>
import { getReviewIdByBatchList} from "@/requestDataInterface";
export default {
  props: {},
  data() {
    return {
      payBatchList: [],
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
      getReviewIdByBatchList({ id }).then(res => {
        if(res.success){
          this.payBatchList = res.result.payBatchList
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

p{
    text-align: center;
}
</style>