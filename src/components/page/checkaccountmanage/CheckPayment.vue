<template>
  <div class="rolelist">
    <div class="operate">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="交易日期">
              <el-date-picker
                v-model="formSearch.beginDatePayment"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
                placeholder="开始日期"
              ></el-date-picker>
              -
              <el-date-picker
                v-model="formSearch.endDatePayment"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
                placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <div class="operate">
              <div class="operateBtn">
                <el-button type="primary" size="small" @click="handleSearch">
                  <i class="el-icon-search"></i>&nbsp;查询
                </el-button>
                <el-button type="primary" size="small" @click="handleReset">
                  <i class="el-icon-edit-outline"></i>&nbsp;重置
                </el-button>
               
                <el-button type="primary" size="small" @click="handleExportUser">
                  <i class="el-icon-download"></i>&nbsp;导出
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="paddingcontainer">
    <el-table :data="reconciliationResultList" style="width: 100%">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="datePayment" label="交易日期" width="150"></el-table-column>
        <el-table-column label="我司">
            <el-table-column prop="ourChannelSum" label="笔数" width="120"></el-table-column>
            <el-table-column label="金额" width="140">
                <template slot-scope="scope">
                    {{scope.row.ourChannelAmount | fMoney}}
                </template>
            </el-table-column>
        </el-table-column>
        <el-table-column label="渠道">
            <el-table-column prop="opposingChannelSum" label="笔数" width="120"></el-table-column>
            <el-table-column label="金额" width="140">
                <template slot-scope="scope">
                    {{scope.row.opposingChannelAmount | fMoney}}
                </template>
            </el-table-column>
        </el-table-column>
        <el-table-column label="对平">
            <el-table-column prop="ourEqualOpposingSum" label="笔数" width="120"></el-table-column>
            <el-table-column label="金额" width="140">
                <template slot-scope="scope">
                    {{scope.row.ourEqualOpposingAmount | fMoney}}
                </template>
            </el-table-column>
        </el-table-column>
        <el-table-column label="通路多">
            <el-table-column prop="ourLessOpposingSum" label="笔数" width="120"></el-table-column>
            <el-table-column label="金额" width="140">
                <template slot-scope="scope">
                    {{scope.row.ourLessOpposingAmount | fMoney}}
                </template>
            </el-table-column>
        </el-table-column>
        <el-table-column label="平台多">
            <el-table-column prop="ourManyOpposingSum" label="笔数" width="120"></el-table-column>
            <el-table-column label="金额" width="140">
                <template slot-scope="scope">
                    {{scope.row.ourManyOpposingAmount | fMoney}}
                </template>
            </el-table-column>
        </el-table-column>
    </el-table>
    </div>
    <div class="paddingcontainer pagecontainer">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
        @current-change="handlegetReconciliationResultList"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
</div> 
</template>

<script>
import { getReconciliationResultList } from "@/requestDataInterface";
export default {
  props: {},
  data() {
    return {
      currentPage: 1,
      total: 1,
      reconciliationResultList: [],
      multipleSelection: [],
      formSearch: {
        reconciliationType:'2',
        beginDatePayment:'',
        endDatePayment:''
      },
      resetFormSearch:{
        reconciliationType:'2',
        beginDatePayment:'',
        endDatePayment:''
      }
    };
  },
  created() {},
  methods: {
    handleSearch() {
      this.handlegetReconciliationResultList(this.currentPage);
    },

    handleExportUser(){
      let idsStr = ''
      let ids = []
      if(this.multipleSelection.length){
        ids = this.multipleSelection.map((item,index)=>item.id)
      }
      idsStr = ids.join(',')
      window.open('http://localhost:8088/export/userInfoList?ids='+idsStr)
    },

    handleReset(){
        Object.assign(this.formSearch, this.resetFormSearch)
    },

    handlegetReconciliationResultList(currentPage) {
      let params = Object.assign({}, this.formSearch, {
        page: currentPage,
        rows: 20
      });
      getReconciliationResultList(params)
        .then(res => {
          if (res.success) {
            this.reconciliationResultList = res.result.reconciliationResultList;
            this.total = res.result.total;
          }
        })
        .catch(err => {
          console.log(err);
      })
    }
  },
  computed: {},
  mounted() {
    this.handlegetReconciliationResultList(this.currentPage)
  },
  components: {},
  beforeDestroy() {}
};
</script>
<style scoped>
.operate {
  padding: 0 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
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

.el-form-item__content > .el-input {
  width: 230px;
}

.el-form-item__content > .el-select {
  width: 230px;
}
.el-form-item__content > .el-date-editor {
  width: 180px;
}
.el-form {
  width: 100%;
}
.el-row h4 {
  padding-bottom: 6px;
}

.dialog-footer{
  
  display:flex;
  justify-content: space-between;
}
>>>.el-table__header-wrapper thead th{
    text-align: center;
}
>>>.el-table__body-wrapper tbody tr td {
    text-align: center;
}
</style>