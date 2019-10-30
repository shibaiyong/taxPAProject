<template>
  <div class="rolelist">
    <div class="operate">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          
          <el-col :span="8">
            <el-form-item label="打款账户">
              <el-input v-model="formSearch.actualPayAccount" placeholder="打款账户"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="批次编号">
              <el-input v-model="formSearch.id" placeholder="批次编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select v-model="formSearch.flag">
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
            <el-form-item label="导入日期">
              <el-date-picker
                v-model="formSearch.beginInputTime"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyyMMdd"
                placeholder="开始日期"
              ></el-date-picker>
              -
              <el-date-picker
                v-model="formSearch.endInputTime"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyyMMdd"
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
                <el-button type="primary" size="small" @click="handleSearch">
                  <i class="el-icon-download"></i>&nbsp;导入
                </el-button>
                <el-button type="primary" size="small" @click="handlesubmitReview">
                  <i class="el-icon-check"></i>&nbsp;提交复核
                </el-button>
                <el-button type="primary" size="small" @click="handlesubmitReview('statistics')">
                  <i class="el-icon-check"></i>&nbsp;统计
                </el-button>
                <el-button type="primary" size="small" @click="handleDownLoad">
                  <i class="el-icon-download"></i>&nbsp;下载
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="paddingcontainer">
      <el-table
        :data="payBatchList"
        style="width: 100%"
        @select="handleSelectionChange"
        @select-all="handleSelectAll"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="批次编号" prop="id" width="220"></el-table-column>
        <el-table-column label="文件名称" prop="fileName" width="240"></el-table-column>
        <el-table-column label="处理时间" prop="payDate" width="100"></el-table-column>
        <el-table-column label="打款渠道" prop="channelId" width="140"></el-table-column>
        <el-table-column label="打款账户" prop="actualPayAccount" width="140"></el-table-column>
        <el-table-column label="状态" width="160">
          <template slot-scope="scope">
            {{scope.row.flag | bussType}}
          </template>
        </el-table-column>
        <el-table-column label="打款总笔数" prop="totalNum" width="90"></el-table-column>
        <el-table-column label="打款总金额" prop="totalAmt" width="120"></el-table-column>
        <el-table-column label="打款备注" prop="remark" width="120"></el-table-column>
        <el-table-column label="成功总笔数" prop="successNum" width="120"></el-table-column>
        <el-table-column label="成功金额" prop="successAmt" width="120"></el-table-column>
        <el-table-column label="失败总笔数" prop="failNum" width="120"></el-table-column>
        <el-table-column label="失败金额" prop="failAmt" width="120"></el-table-column>
      </el-table>
    </div>
    <div class="paddingcontainer pagecontainer">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
        @current-change="handlegetPayBatchList"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
    
    <div class="dialogblack">
      <el-dialog title="复核" :visible.sync="dialogBlackList">
        
        <p><label class="labelname">总笔数：</label><label class="labelvalue">{{ COUNT }}</label></p>
        <p><label class="labelname">总金额：</label><label class="labelvalue">{{ TOTAL_AMT }}</label></p>
        <p>您确定要提交该代付吗？</p>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogBlackList = false">取 消</el-button>
          <el-button type="primary" size="small" @click="submitReview">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="dialogblack statisticsdialog">
      <el-dialog title="统计" :visible.sync="statistics">
        <p><label class="labelname">总笔数：</label><label class="labelvalue">{{ COUNT }}</label></p>
        <p><label class="labelname">总金额：</label><label class="labelvalue">{{ TOTAL_AMT }}</label></p>
        <div slot="footer" class="dialog-footer">
          <div></div>
          <el-button type="primary" size="small" @click="statistics = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPayBatchList, submitReview, payBatchStatistics } from "@/requestDataInterface";
export default {
  props: {},
  data() {
    return {
      dialogBlackList: false,
      statistics:false,
      currentPage: 1,
      total: 1,
      remark:'',
      COUNT:'',
      TOTAL_AMT:'',
      flag:[
        {label:"全部",value:''},
        { label: "未处理", value: '0' },
        { label: "复核中", value: '1' },
        { label: "复核通过", value: '2' },
        { label: "复核不通过", value: '3' },
        { label: "已撤销", value: '4' },
        { label: "银行受理中", value: '5' },
        { label: "银行受理失败", value: '6' },
        { label: "银行处理成功", value: '7' },
        { label: "银行处理失败", value: '8' },
        { label: "上送渠道失败", value: '9' }
      ],
      qualificationList:[],
      payBatchList: [],
      multipleSelection: [],
      formSearch: {
        actualPayAccount:'',
        beginInputTime:'',
        id:'',
        flag:'',
        endInputTime:''
      }
    };
  },
  created() {},
  methods: {
    handleSearch() {
      this.handlegetPayBatchList(this.currentPage);
    },
    handleDownLoad(){
      let flag = this.judgeRight(this.multipleSelection)
      if( !flag ){
        return false
      }
      window.open('http://12.3.0.15:8090/payBatch/downLoadFile?id='+this.multipleSelection[0].id,'_self')
    },
    handlesubmitReview( params ){
      if(this.payBatchList.length){
        this.payBatchStatistics( params )
      }else{
        this.dialogBlackList = false
        this.statistics = false
      }
    },
    submitReview(){
      let multipleSelection = this.multipleSelection
      let len = multipleSelection.length
      let params = {}
      let idList = []
      if ( !len && this.formSearch.flag=='0') {

        params = Object.assign({},this.formSearch, {reviewType:'1'})

      }else if(!len && this.formSearch.flag !='0'){
        this.$message({
          type: "error",
          message: '复核数据状态必需是“未处理”'
        })
        return false
      } else if (len >= 1) {
        for(let i = 0; i < len; i++){
          var item = multipleSelection[i]
          if(item.flag == '0'){
            idList.push(item.id)
          }else{
            this.$message({
              type: "error",
              message: '复核数据状态必需是“未处理”'
            });
            return false
          }
        }
        params = Object.assign(params,{idList,flag:'0',reviewType:'1'})
      }
      submitReview(params).then(res => {
        if (res.success) {
         this.$message({
            type: "success",
            message: res.msg
          })
        }else{
          this.$message({
            type: "error",
            message: res.msg
          })
        }
        this.dialogBlackList = false
        this.handlegetPayBatchList(this.currentPage)
      })
    },

    payBatchStatistics( dialogFlag ){
      let multipleSelection = this.multipleSelection
      let len = multipleSelection.length
      let params = {}
      let idList = []
      if ( !len && this.formSearch.flag=='0') {

        params = Object.assign({},this.formSearch, {reviewType:'1'})

      }else if(!len && this.formSearch.flag !='0'){
        this.$message({
          type: "error",
          message: '复核数据状态必需是“未处理”'
        })
        return false
      } else if (len >= 1) {
        for(let i = 0; i < len; i++){
          var item = multipleSelection[i]
          if(item.flag == '0'){
            idList.push(item.id)
          }else{
            this.$message({
              type: "error",
              message: '复核数据状态必需是“未处理”'
            });
            return false
          }
        }
        params = Object.assign(params,{idList,flag:'0',reviewType:'1'})
      }
      payBatchStatistics(params).then(res => {
        if (res.success) {
          this.COUNT = res.result.COUNT
          this.TOTAL_AMT = res.result.TOTAL_AMT
        }
        if( dialogFlag == 'statistics' ){
          this.statistics = true
        }else{
          this.dialogBlackList = true
        }
      }).catch(err => {console.log(err)})
    },
    
    handlegetPayBatchList(currentPage) {
      let params = Object.assign({}, this.formSearch, {
        page: currentPage,
        rows: 20
      });
      getPayBatchList(params)
        .then(res => {
          if (res.success) {
            this.payBatchList = res.result.payBatchList;
            this.total = res.result.total;
          }
        }).catch(err => {
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
    },
    cancelEidt() {},
    confirmEdit() {}
  },
  computed: {},
  mounted() {
    this.handlegetPayBatchList(this.currentPage);
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
          text = "复核中";
          break;
        case '2':
          text = "复核通过";
          break;
        case '3':
          text = "复核不通过";
          break;
        case '4':
          text = "已撤销";
          break;
        case '5':
          text = "银行受理中";
          break;
        case '6':
          text = "银行受理失败";
          break;
          case '7':
          text = "银行处理成功";
          break;
          case '8':
          text = "银行处理失败";
          break;
          case '9':
          text = "上送渠道失败";
          break;
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

.dialogblack >>> .el-dialog__body{
  padding-top:15px;
  padding-bottom: 15px;
}

</style>