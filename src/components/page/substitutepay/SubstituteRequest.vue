<template>
  <div class="rolelist">
    <div class="operate">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="业务类型">
              <el-select v-model="formSearch.bussType">
                <el-option
                  v-for="option in bussType"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算流水">
              <el-input v-model="formSearch.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算卡号">
              <el-input v-model="formSearch.payeeBankNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算户名">
              <el-input v-model="formSearch.payeeName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户名称">
              <el-input v-model="formSearch.merchName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出款金额">
              <el-input v-model="formSearch.actualPayAmt"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="导入日期">
              <el-date-picker
                v-model="formSearch.beginInputTime"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
              -
              <el-date-picker
                v-model="formSearch.endInputTime"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出款日期">
              <el-date-picker
                v-model="formSearch.beginCreateBatchTime"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
              -
              <el-date-picker
                v-model="formSearch.endCreateBatchTime"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="批次编号">
              <el-input v-model="formSearch.batchCode" :style="{'width':'164px'}"></el-input>
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
                <el-button type="primary" size="small" @click="handleCreatePaymentBatch">
                  <i class="el-icon-edit-outline"></i>&nbsp;生批
                </el-button>
                <el-button type="primary" size="small" @click="handleIntercept">
                  <i class="el-icon-download"></i>&nbsp;拦截
                </el-button>
                <el-button type="primary" size="small" @click="handleCancel">
                  <i class="el-icon-circle-close"></i>&nbsp;撤销
                </el-button>
                <el-button type="primary" size="small" @click="handleImport">
                  <i class="el-icon-search"></i>&nbsp;导入
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
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="代付流水号" prop="id" width="90"></el-table-column>
        <el-table-column label="特约商户号" prop="tyMerchId" width="180"></el-table-column>
        <el-table-column label="商户编号" prop="merchId" width="100"></el-table-column>
        <el-table-column label="商户名称" prop="merchName" width="140"></el-table-column>
        <el-table-column label="收款人姓名" prop="payeeName" width="140"></el-table-column>
        <el-table-column label="收款人银行账号" prop="payeeBankNumber" width="160"></el-table-column>
        <el-table-column label="联行号" prop="payeeBankCode" width="90"></el-table-column>
        <el-table-column label="收款人身份证号" prop="payeeCardId" width="120"></el-table-column>
        <el-table-column label="导入日期" prop="inputTime" width="120"></el-table-column>
        <el-table-column label="出款日期" prop="createBatchTime" width="120"></el-table-column>
        <el-table-column label="应出款金额" prop="orgPayeeAmt" width="120"></el-table-column>
        <el-table-column label="商户服务费" prop="merchFee" width="120"></el-table-column>
        <el-table-column label="个人服务费" prop="personalFee" width="120"></el-table-column>
        <el-table-column label="实际出款金额" prop="actualPayAmt" width="120"></el-table-column>
        <el-table-column label="发票类型" prop="invoiceType" width="120"></el-table-column>
        <el-table-column label="批次号" prop="batchCode" width="120"></el-table-column>
        <el-table-column label="代付状态" prop="flag" width="120"></el-table-column>
        <el-table-column label="打款失败原因描述" prop="failReason" width="120"></el-table-column>
        <el-table-column label="业务类型" prop="bussType" width="120"></el-table-column>
        <el-table-column label="原代付账户" prop="orgPayAccount" width="120"></el-table-column>
        <el-table-column label="实际代付账户" prop="actualPayAccount" width="120"></el-table-column>
        <el-table-column label="备注" prop="remark" width="120"></el-table-column>
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
    
    <div class="dialogblack">
      <el-dialog :title="title" :visible.sync="dialogBlackList">
        <p>{{ describe }}</p>
        <el-form size="small" :model="formSearch">
          <el-form-item label="备注：">
            <el-input v-model="remark" placeholder=""></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogBlackList = false">取 消</el-button>
          <el-button type="primary" size="small">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { interceptPayment, getPaymentRequestList, cancelPaymentBatch, importPayment } from "@/requestDataInterface";
export default {
  props: {},
  data() {
    return {
      dialogBlackList: false,
      currentPage: 1,
      total: 1,
      remark:'',
      title:'拦截',
      describe:'您确定要拦截该笔代付吗？',
      bussType: [
        {label:"全部",value:''},
        { label: "特约商户代付", value: '1' },
        { label: "普通商户代付", value: '0' }
      ],
      flag:[
        {label:"全部",value:''},
        { label: "未处理", value: '0' },
        { label: "已生批", value: '1' },
        { label: "复核中", value: '2' },
        { label: "复核通过", value: '3' },
        { label: "打款成功", value: '4' },
        { label: "打款失败", value: '5' },
        { label: "撤销", value: '6' },
        { label: "风险拦截", value: '7' }
      ],
      merchantList: [],
      multipleSelection: [],
      formSearch: {
        bussType:'',
        id:'',
        inputTime:'',
        payeeBankNumber:'',
        payeeName:'',
        createBatchTime:'',
        merchId:'',
        merchName:'',
        actualPayAmt:'',
        batchCode:'',
        actualPayAccount:'',
        flag:''
      }
    };
  },
  created() {},
  methods: {
    handleSearch() {
      this.handlegetPaymentRequestList(this.currentPage);
    },
    handleImport(){
      
    },
    handleCancel() {
      let multipleSelection = this.multipleSelection;
      if (!this.judgeRight(multipleSelection)) {
        return false;
      }
      this.dialogBlackList = true;
      this.title = '撤销';
      this.describe = '您确定要撤销该批次吗？';
    },
    handleCancelPaymentBatch() {
      let id = this.multipleSelection[0].id;
      let remark = this.remark;
      cancelPaymentBatch({ id, remark })
        .then(res => {
          if (res.success) {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.handlegetPaymentRequestList(this.currentPage);
            this.dialogBlackList = false;
          }
        })
    },
    handleIntercept() {
      let multipleSelection = this.multipleSelection;
      if (!this.judgeRight(multipleSelection)) {
        return false;
      }
      this.dialogBlackList = true;
      this.title = '拦截';
      this.describe = '您确定要拦截该笔代付吗？';
    },
    handleAddIntercept() {
      let id = this.multipleSelection[0].id;
      let remark = this.remark;
      interceptPayment({ id, remark })
        .then(res => {
          if (res.success) {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.handlegetPaymentRequestList(this.currentPage);
            this.dialogBlackList = false;
          }
        })
    },
    handleCreatePaymentBatch() {
      let idsStr = ''
      let ids = []
      if(this.multipleSelection.length){
        ids = this.multipleSelection.map((item,index)=>item.id)
      }
      idsStr = ids.join(',')
      return false;
      createPaymentBatch({ id, remark }).then(res => {
        if (res.success) {
          this.$message({
            type: "success",
            message: res.msg
          })
          this.handlegetPaymentRequestList(this.currentPage)
          this.dialogBlackList = false
        }
      })
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
      this.multipleSelection = selection;
    },
    handleSelectAll(selection) {
      this.multipleSelection = selection;
    },
    judgeRight(multipleSelection, interrupt) {
      if(interrupt && multipleSelection.length > 1){
        return true
      }
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
    this.handlegetPaymentRequestList(this.currentPage)
  },
  components: {},
  directives: {
    status: {
      bind(el, binding, vonode) {
        if (binding.value.status == 1) {
          el.innerHTML = "启用";
        } else {
          el.innerHTML = "停用";
        }
      },
      inserted(el, binding, vonode) {
        el.onclick = function() {
          if (el.innerHTML == "启用") {
            vonode.context.handleEffect(binding.value.id, 0).then(res => {
              el.innerHTML = "停用";
            });
          } else {
            vonode.context.handleEffect(binding.value.id, 1).then(res => {
              console.log(res);
              el.innerHTML = "启用";
            });
          }
        };
      }
    }
  },
  beforeDestroy() {}
};
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