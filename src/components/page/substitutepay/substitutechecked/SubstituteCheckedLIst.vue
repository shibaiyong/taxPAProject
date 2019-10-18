<template>
  <div class="rolelist">
    <div class="operate">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="复核编号">
              <el-input v-model="formSearch.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="复核状态">
              <el-select v-model="formSearch.status">
                <el-option
                  v-for="option in statusOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="复核日期">
              <el-date-picker
                v-model="formSearch.beginInputTime"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
                placeholder="开始日期"
              ></el-date-picker>
              -
              <el-date-picker
                v-model="formSearch.endInputTime"
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
                <el-button type="primary" size="small" @click="handleConfirmPay">
                  <i class="el-icon-check"></i>&nbsp;审核
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="paddingcontainer">
      <el-table
        :data="payReviewList"
        style="width: 100%"
        @select="handleSelectionChange"
        @select-all="handleSelectAll"
        @cell-click="handleShowDetail"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="复核编号" width="240">
          <template slot-scope="scope">
            <span class="myblue">{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column label="发起时间" prop="createdTime" width="140"></el-table-column>
        <el-table-column label="发起人" prop="createdBy" width="100"></el-table-column>
        <el-table-column label="复核时间" prop="updatedTime" width="140"></el-table-column>
        <el-table-column label="复核人" prop="updatedBy" width="140"></el-table-column>
        <el-table-column label="总笔数" prop="reviewCount" width="160"></el-table-column>
        <el-table-column label="总金额" prop="reviewAmt" width="90"></el-table-column>
        <el-table-column label="业务类型" width="140">
          <template slot-scope="scope">
            {{scope.row.reviewType | reviewType}}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            {{scope.row.status | bussType}}
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
        @current-change="handlegetPayReviewList"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>

    <div class="dialogblack">
      <el-dialog title="审核" :visible.sync="dialogBlackList">
        <p>您确定要审核通过该代付请求吗？</p>
        <el-form size="small" :model="formSearch">
          <!-- <el-form-item label="备注：">
            <el-input v-model="remark" placeholder=""></el-input>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="confirmPay('2')">驳 回</el-button>
          <el-button type="primary" size="small" @click="confirmPay('1')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPayReviewList, confirmPay } from "@/requestDataInterface";
export default {
  props: {},
  data() {
    return {
      dialogBlackList: false,
      currentPage: 1,
      total: 1,
      remark:'',
      statusOptions: [
        { label: "待复核", value: '0' },
        { label: "复核通过", value: '1' },
        { label: "复核拒绝", value: '2' }
      ],
      qualificationList:[],
      payReviewList: [],
      multipleSelection: [],
      formSearch: {
        id: "",
        beginInputTime: "",
        endInputTime: "",
        status:''
      },
      checkParamsForm:{
        
      }
    };
  },
  created() {},
  methods: {
    handleSearch() {
      this.handlegetPayReviewList(this.currentPage)
    },
    handleShowDetail(row, column, cell, event) {
      if(column.label == '复核编号'){
        if(row.reviewType == 1){
          this.$router.push({
            name: "BatchCheckDetail",
            params: row
          })
        }else{
          this.$router.push({
            name: "SubstituteCheckDetail",
            params: row
          })
        }
        
      }
      
    },
    handlegetPayReviewList(currentPage) {
      let params = Object.assign({}, this.formSearch, {
        page: currentPage,
        rows: 20
      });
      getPayReviewList(params)
        .then(res => {
          if (res.success) {
            this.payReviewList = res.result.payReviewList
            this.total = res.result.total
          }
        }).catch()
    },

    handleConfirmPay(){
      let multipleSelection = this.multipleSelection
      if (!this.judgeRight(multipleSelection)) {
        return false;
      }
      this.dialogBlackList = true
      this.checkParamsForm = {id:multipleSelection[0].id,reviewType:multipleSelection[0].reviewType}
    },

    confirmPay( status ){
      let multipleSelection = this.multipleSelection
      let params = Object.assign(this.checkParamsForm,{status})
      confirmPay(params).then(res => {
        this.dialogBlackList = false
        this.handlegetPayReviewList(this.currentPage)
        if (res.success) {
          this.$message({
            type: "success",
            message: '操作成功！'
          })
        }else{
          this.$message({
            type: "error",
            message: '操作失败！'
          })
        }
      })
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
    this.handlegetPayReviewList(this.currentPage);
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
          text = "待复核";
          break;
        case '1':
          text = "复核通过";
          break;
        case '2':
          text = "复核拒绝";
      }
      return text
    },
    reviewType( val ){
      let text;
      switch ( val ) {
        default: 
          text = "";
          break;
        case '0':
          text = "代付批次撤销复核";
          break;
        case '1':
          text = "代付批次复核";
          break;
        case '2':
          text = "代付风险拦截复核";
          break;
        case '3':  
          text = "代付撤销复核";
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