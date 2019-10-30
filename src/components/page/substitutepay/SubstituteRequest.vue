<template>
  <div class="rolelist">
    <div class="operate">
      <el-form :model="formSearch" label-width="114px" :rules="rules">
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
            <el-form-item label="收款人银行账号">
              <el-input v-model="formSearch.payeeBankNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款人姓名">
              <el-input v-model="formSearch.payeeName"></el-input>
            </el-form-item>
          </el-col>
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
            <el-form-item label="实际打款账户">
              <el-input v-model="formSearch.actualPayAccount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际出款金额">
              <el-input v-model="formSearch.actualPayAmt"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="批次编号">
              <el-input v-model="formSearch.batchCode"></el-input>
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
          <el-col :span="18">
            <div class="operate">
              <div class="operateBtn">
                <el-button type="primary" size="small" @click="handleSearch">
                  <i class="el-icon-search"></i>&nbsp;查询
                </el-button>
                <el-button type="primary" size="small" @click="handleStatistics">
                  <i class="el-icon-document"></i>&nbsp;生批
                </el-button>
                <el-button type="primary" size="small" @click="handleIntercept">
                  <i class="el-icon-warning"></i>&nbsp;拦截
                </el-button>
                <el-button type="primary" size="small" @click="handleRevoke">
                  <i class="el-icon-circle-close"></i>&nbsp;撤销
                </el-button>
                <el-upload action="http://12.3.0.15:8090/paymentRequest/uploadFileExcel" :style="{display:'inline-block'}"
                  :auto-upload="true"
                  :show-file-list="false"
                  :multiple="false"
                  accept=".xlsx"
                  :on-success="handleSuccess"
                  :before-upload="handleBeforeUpload">
                  <el-button type="primary" size="small">
                    <i class="el-icon-search"></i>&nbsp;导入
                  </el-button>
                </el-upload>
                <el-button type="primary" size="small" @click="handleStatistics('statistics')">
                  <i class="el-icon-news"></i>&nbsp;统计
                </el-button>
                <el-button type="primary" size="small" @click="handleExport">
                  <i class="el-icon-download"></i>&nbsp;导出
                </el-button>
                
                <el-button type="primary" size="small" @click="handleResetSearchForm">
                  <i class="el-icon-circle-close"></i>&nbsp;重置
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
        <el-table-column label="代付状态" width="100">
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
          <!-- <el-form-item label="备注：">
            <el-input v-model="remark" placeholder=""></el-input>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogBlackList = false">取 消</el-button>
          <el-button type="primary" size="small" @click="revokeOrIntercept">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="dialogblack statisticsdialog">
      <el-dialog title="统计" :visible.sync="statistics">
        <el-form size="small" :model="formCreateBatch" ref="formEdit" label-width="114px">
          <el-form-item label="总笔数">
            <el-input v-model="COUNT" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="应出款金额">
            <el-input v-model="ORG_PAYEE_AMT" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="商户服务费">
            <el-input v-model="MERCH_FEE" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="个人服务费">
            <el-input v-model="PERSONAL_FEE" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="实际出款金额">
            <el-input v-model="AMT" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div></div>
          <el-button type="primary" size="small" @click="statistics = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="dialogblack">
    <el-dialog title="批量生批" :visible.sync="createBatch">
        <el-form size="small" :model="formCreateBatch" ref="formEdit" label-width="114px">
          <el-form-item label="总笔数">
            <el-input v-model="COUNT" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="应出款金额">
            <el-input v-model="ORG_PAYEE_AMT" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="商户服务费">
            <el-input v-model="MERCH_FEE" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="个人服务费">
            <el-input v-model="PERSONAL_FEE" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="实际出款金额">
            <el-input v-model="AMT" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="打款渠道">
              <el-select v-model="formCreateBatch.channelId">
                <el-option
                  v-for="option in paymentChannelsList"
                  :key="option.channelSn"
                  :label="option.bankName"
                  :value="option.channelSn"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="打款账户" prop="batchPayAccount">
              <el-select v-model="formCreateBatch.batchPayAccount">
                <el-option
                  v-for="option in qualificationPartiesList"
                  :key="option.id"
                  :label="option.enterpriseName"
                  :value="option.enterpriseBankAccount"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注：">
            <el-input v-model="formCreateBatch.remark" placeholder=""></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="createBatch = false">取 消</el-button>
          <el-button type="primary" size="small" @click="submitForm('formEdit')">确 定</el-button>
        </div>
      </el-dialog>
      </div>
  </div>
</template>

<script>
import { revokeOrIntercept, getPaymentRequestList, createBatch, statistics, getQualificationPartyList, getPaymentChannelList, paymentRequestExport } from "@/requestDataInterface";
export default {
  props: {},
  data() {
    return {
      rules: {
        batchPayAccount: [
          { required: true, message:'必填', trigger: 'blur' }
        ]
      },
      dialogBlackList: false,
      createBatch: false,
      statistics:false,
      currentPage: 1,
      total: 1,
      remark:'',
      COUNT: 0,
      AMT: 0,
      ORG_PAYEE_AMT:0,
      MERCH_FEE:0,
      PERSONAL_FEE:0,
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
        { label: "风险拦截", value: '7' },
        { label: "生批中", value: '8' },
        { label: "银行受理中", value: '9' },
        { label: "受理失败", value: '10' },
        { label: "上送渠道失败", value: '11' }
      ],
      
      merchantList: [],
      multipleSelection: [],
      qualificationPartiesList:[],
      paymentChannelsList:[],
      createBatchParams:{},
      formCreateBatch:{
        remark:'',
        channelId:'',
        batchPayAccount:''
      },
      formSearch: {
        bussType:'',
        id:'',
        beginInputTime:'',
        endInputTime:'',
        beginCreateBatchTime:'',
        endCreateBatchTime:'',
        payeeBankNumber:'',
        payeeName:'',
        merchId:'',
        merchName:'',
        actualPayAmt:'',
        batchCode:'',
        actualPayAccount:'',
        flag:''
      },
      resetFormSearch: {
        bussType:'',
        id:'',
        beginInputTime:'',
        endInputTime:'',
        beginCreateBatchTime:'',
        endCreateBatchTime:'',
        payeeBankNumber:'',
        payeeName:'',
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
      this.handlegetPaymentRequestList(this.currentPage)
    },
    handleResetSearchForm() {
      Object.assign(this.formSearch, this.resetFormSearch)
    },
    handleBeforeUpload(file){
      // console.log(file)
    },
    handleSuccess(res, file, fileList){
      if(res.success){
        this.$message({
          type: 'success',
          message: '导入文件成功'
        })
      }else{
        this.$message({
          type: 'error',
          message: res.msg
        })
      }
    },
    handleExport(){
      let formSearch = this.formSearch
      var str = ''
      Object.keys(formSearch).forEach((item,index)=>{
        str += item + '=' + formSearch[item] + '&'
      })
      window.open('http://12.3.0.15:8090/paymentRequest/export?'+str.substr(0,str.length-1),'_self')
      // paymentRequestExport(this.formSearch).then(res => {
      //   const content = res
      //   const blob = new Blob([content])
      //   const fileName = '导出信息.xlsx'
      //   if ('download' in document.createElement('a')) { // 非IE下载
      //     const elink = document.createElement('a')
      //     elink.download = fileName
      //     elink.style.display = 'none'
      //     elink.href = URL.createObjectURL(blob)
      //     document.body.appendChild(elink)
      //     elink.click()
      //     URL.revokeObjectURL(elink.href) // 释放URL 对象
      //     document.body.removeChild(elink)
      //   } else { // IE10+下载
      //     navigator.msSaveBlob(blob, fileName)
      //   }
      //})
    },
    handleStatistics( params ){
      if (!this.judgeRight({ flag: '0' })) {
        return false;
      }
      if(params == 'statistics'){
        statistics(this.createBatchParams).then(res => {
          if (res.success) {
            this.COUNT = res.result.COUNT
            this.AMT = res.result.AMT
            this.ORG_PAYEE_AMT = res.result.ORG_PAYEE_AMT
            this.MERCH_FEE = res.result.MERCH_FEE
            this.PERSONAL_FEE = res.result.PERSONAL_FEE
            this.statistics = true
          }
        })
      }else{
        statistics(this.createBatchParams).then(res => {
          if (res.success) {
            this.COUNT = res.result.COUNT
            this.AMT = res.result.AMT
            this.ORG_PAYEE_AMT = res.result.ORG_PAYEE_AMT
            this.MERCH_FEE = res.result.MERCH_FEE
            this.PERSONAL_FEE = res.result.PERSONAL_FEE
            this.handlegetQualificationPartyList()
            this.handlegetPaymentChannelList()
            this.createBatch = true
          }
        })
      }
    },

    handleRevoke() {
      if (!this.judgeRight({ flag: '0', reviewType:'3' })) {
        return false;
      }
      this.dialogBlackList = true;
      this.title = '撤销';
      this.describe = '您确定要撤销该批次吗？';
    },
    
    handleIntercept() {
      if (!this.judgeRight({ flag: '0', reviewType:'2' })) {
        return false;
      }
      this.dialogBlackList = true;
      this.title = '拦截';
      this.describe = '您确定要拦截该笔代付吗？';
    },

    revokeOrIntercept(){
      revokeOrIntercept(this.createBatchParams).then(res => {
        this.dialogBlackList = false
        if (res.success) {
          this.$message({
            type:'success',
            message: '提交审核成功！'
          })
          this.handlegetPaymentRequestList(this.currentPage)
        }else{
          this.$message({
            type:'error',
            message: '提交审核失败！'
          })
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
    handlegetQualificationPartyList(currentPage) {
      let params =Object.assign({}, {
        page: 1,
        rows: 200
      })
      getQualificationPartyList(params)
        .then(res => {
          if (res.success) {
            this.qualificationPartiesList = res.result.qualificationParties
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handlegetPaymentChannelList(currentPage) {
      let params = Object.assign( {
        page: 1,
        rows: 200
      });
      getPaymentChannelList(params)
        .then(res => {
          if (res.success) {
            this.paymentChannelsList = res.result.paymentChannels;
            this.total = res.result.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitForm(ref){
      this.$refs[ref].validate((valid) => {
        if (valid) {
            let params = Object.assign(this.createBatchParams,this.formCreateBatch)
            createBatch( params ).then(res => {
              this.createBatch = false
              if(res.success){
                this.$message({
                  type:'success',
                  message: res.msg
                })
                this.handlegetPaymentRequestList(this.currentPage)
              }else{
                this.$message({
                  type:'error',
                  message: res.msg
                })
              }
            }).catch(err => {console.log(err)})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSelectionChange(selection, row) {
      this.multipleSelection = selection;
    },
    handleSelectAll(selection) {
      this.multipleSelection = selection;
    },
    judgeRight( args ) {
      let multipleSelection = this.multipleSelection
      let len = multipleSelection.length
      let params = {}
      let idList = []
      if ( !len ) {
        params = Object.assign({}, this.formSearch, args)
      } else if (len >= 1) {
        for(let i = 0; i < len; i++){
          var item = multipleSelection[i]
          if(item.flag == '0'){
            idList.push(item.id)
          }else{
            this.$message({
              type: "error",
              message: '生批数据状态必需是“未处理”'
            });
            return false
          }
        }
        params = Object.assign(params,{idList},args)
      }
      this.createBatchParams = params
      return true
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
        case '0':
          text = "未处理";
          break;
        case '1':
          text = "已生批";
          break;
        case '2':
          text = "复核中";
          break;
        case '3':
          text = "复合通过";
          break;
        case '4':
          text = "打款成功";
          break;
        case '5':
          text = "打款失败";
          break;
        case '6':
          text = "撤销";
          break;
        case '7':
          text = "风险拦截";
          break;
        case '8':
          text = "生批中";
          break;
        case '9':
          text = "银行受理中";
          break;
        case '10':
          text = "受理失败";
          break;
        case '11':
          text = "上送渠道失败";
      }
      return text
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
  width: 210px;
}

.el-form-item__content > .el-select {
  width: 210px;
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
.statisticsdialog .el-button--small{
  width:20%;
}
</style>