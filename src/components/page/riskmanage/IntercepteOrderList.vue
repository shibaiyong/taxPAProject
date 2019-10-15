<template>
  <div class="rolelist">
    <div class="operate">
      <el-form :model="formSearch" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="商户名称">
              <el-input v-model="formSearch.merchName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户编号">
              <el-input v-model="formSearch.merchId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出款金额">
              <el-input v-model="formSearch.actualPayAmt"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="代付状态">
              <el-select v-model="formSearch.flag" :style="{'width':'164px'}">
                <el-option
                  v-for="option in flag"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <div class="operate">
              <div class="operateBtn">
                <el-button type="primary" size="small" @click="handleSearch">
                  <i class="el-icon-search"></i>&nbsp;查询
                </el-button>
                <el-button type="primary" size="small" @click="handleExport">
                  <i class="el-icon-search"></i>&nbsp;导出
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
        <el-table-column label="代付流水号" prop="id" width="220"></el-table-column>
        <el-table-column label="特约商户号" prop="tyMerchId" width="90"></el-table-column>
        <el-table-column label="商户编号" prop="merchId" width="130"></el-table-column>
        <el-table-column label="商户名称" prop="merchName" width="120"></el-table-column>
        <el-table-column label="收款人姓名" prop="payeeName" width="80"></el-table-column>
        <el-table-column label="收款人银行账号" prop="payeeBankNumber" width="160"></el-table-column>
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
        <el-table-column label="业务类型" width="100">
          <template slot-scope="scope">
            {{ scope.row.bussType == '1' && scope.row.bussType ? '特约商户代付' : '普通商户代付' }}
          </template>
        </el-table-column>
        <el-table-column label="原代付账户" prop="orgPayAccount" width="160"></el-table-column>
        <el-table-column label="实际代付账户" prop="actualPayAccount" width="160"></el-table-column>
        <el-table-column label="拦截原因" prop="remark" width="160"></el-table-column>
      </el-table>
    </div>
    <div class="paddingcontainer pagecontainer">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
        @current-change="handlegetPaymentRequestList"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getPaymentRequestList } from "@/requestDataInterface";
export default {
  props: {},
  data() {
    return {
      currentPage: 1,
      total: 1,
      flag:[
        { label: "风险拦截", value: '7' }
      ],
      
      merchantList: [],
      multipleSelection: [],
      formSearch: {
        merchId:'',
        merchName:'',
        actualPayAmt:'',
        flag:'7'
      }
    }
  },
  created() {},
  methods: {
    handleSearch() {
      this.handlegetPaymentRequestList(this.currentPage)
    },
    handleExport(){
      let idsStr = ''
      let ids = []
      if(this.multipleSelection.length){
        ids = this.multipleSelection.map((item,index)=>item.id)
      }
      idsStr = ids.join(',')
      if(idsStr){
        window.open('http://12.3.0.15:8090/export/exportPaymentRequestlList?ids='+idsStr,'_self')
      }else{
        window.open('http://12.3.0.15:8090/export/exportPaymentRequestlList','_self')
      }
    },
    handlegetPaymentRequestList(currentPage) {
      let params = Object.assign({}, this.formSearch, {
        page: currentPage,
        rows: 20
      });
      getPaymentRequestList(params).then(res => {
        if (res.success) {
          this.merchantList = res.result.paymentRequestlList;
          this.total = res.result.total;
        }
      })
    },
    handleSelectionChange(selection, row) {
      this.multipleSelection = selection
    },
    handleSelectAll(selection) {
      this.multipleSelection = selection;
    }
  },
  computed: {},
  mounted() {
    this.handlegetPaymentRequestList(this.currentPage)
  },
  components: {},
  filters: {
    bussType( val ){
      let text;
      switch ( val ) {
        default: 
          text = "";
          break;
        case '7':
          text = "风险拦截";
      }
      return text
    }
  }
}
</script>
<style scoped>
.operate {
  padding: 0 0;
  padding-left:20px;
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
>>> .el-dialog {
  width: 62%;
}
.dialogblack >>> .el-dialog {
  width: 30%;
}

.dialogblack >>> .el-button--small{
  width:40%;
}
.dialogblack >>> .el-dialog__body{
  padding-top:15px;
  padding-bottom: 15px;
}
.dialog-footer{
  display:flex;
  justify-content: space-between;
}
</style>