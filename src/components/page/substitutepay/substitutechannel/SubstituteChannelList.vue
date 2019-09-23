<template>
  <div class="rolelist">
    <div class="operate paddingcontainer">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="打款通道类型">
              <el-select v-model="formSearch.accountType">
                <el-option
                  v-for="option in accountType"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="通道状态">
              <el-select v-model="formSearch.channelStatus">
                <el-option
                  v-for="option in channelStatus"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属银行">
              <el-input v-model="formSearch.bankName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="operate">
              <div class="operateBtn">
                <el-button type="primary" size="small" @click="handleSearch">
                  <i class="el-icon-search"></i>&nbsp;查询
                </el-button>
                <el-button type="primary" size="small" @click="handleAdd">
                  <i class="el-icon-circle-close"></i>&nbsp;录入
                </el-button>
                <el-button type="primary" size="small" @click="handleEdit">
                  <i class="el-icon-edit"></i>&nbsp;修改
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="paddingcontainer">
      <el-table
        :data="paymentChannelsList"
        style="width: 100%"
        @select="handleSelectionChange"
        @select-all="handleSelectAll"
      >
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="渠道编号" prop="channelSn" width="120"></el-table-column>
        <el-table-column label="渠道名称" prop="channelName" width="120"></el-table-column>
        <el-table-column label="所属银行" prop="bankName" width="120"></el-table-column>
        <el-table-column label="账户类型" width="80">
            <template slot-scope="scope">
                {{scope.row.accountType == 1 ? '对公' : '对私'}}
            </template>
        </el-table-column>
        <el-table-column label="渠道状态" width="80">
            <template slot-scope="scope">
                {{scope.row.channelStatus == 1 ? '启用' : '停用'}}
            </template>
        </el-table-column>
        <el-table-column label="单笔限额（对公）" width="120">
            <template slot-scope="scope">
                {{scope.row.publicSinglePayment | fMoney}}
            </template>
        </el-table-column>
        <el-table-column label="单笔限额（对私）" width="120">
            <template slot-scope="scope">
                {{scope.row.privateSinglePayment | fMoney}}
            </template>
        </el-table-column>
        <el-table-column label="当日限额" width="120">
            <template slot-scope="scope">
                {{scope.row.dayPayment | fMoney}}
            </template>
        </el-table-column>
        <el-table-column label="单笔最小限额" width="120">
            <template slot-scope="scope">
                {{scope.row.minSinglePayment | fMoney}}
            </template>
        </el-table-column>
        <el-table-column label="单批限量" prop="batchSingleNum" width="120"></el-table-column>
        <el-table-column label="单批限额" width="120">
            <template slot-scope="scope">
                {{scope.row.batchSinglePayment | fMoney}}
            </template>
        </el-table-column>
        <el-table-column label="支持币种" prop="currency" width="90"></el-table-column>
        <el-table-column label="操作" prop="usedPayment" width="100">
            <template slot-scope="scope">
                <button class="statusbtn" v-status="{status:scope.row.channelStatus,id:scope.row.id}">启用</button>
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
        @current-change="handlegetPaymentChannelList"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getPaymentChannelList, changeChannelStatus } from "@/requestDataInterface";
export default {
  props: {},
  data() {
    return {
      dialogBlackList: false,
      currentPage: 1,
      total: 1,
      remark:'',
      accountType: [
        {label:"全部",value:0},
        { label: "对公", value: 1 },
        { label: "对私", value: 2 }
      ],
      channelStatus: [
        { label: "开启", value: 1 },
        { label: "关闭", value: 0 }
      ],
      paymentChannelsList: [],
      multipleSelection: [],
      formSearch: {
        accountType: "",
        bankName: "",
        channelStatus: ""
      }
    };
  },
  created() {},
  methods: {
    handleEffect(id, channelStatus) {
      return changeChannelStatus({ id, channelStatus }).then(res => {
        if (res.success) {
          this.$message({
            type: "success",
            message: res.msg
          });
          this.handlegetPaymentChannelList(this.currentPage);
        } else {
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      });
    },
    handleSearch() {
      this.handlegetPaymentChannelList(this.currentPage);
    },
    handleAdd() {
      this.$router.push("/home/addsubstitutechannel");
    },
    handleEdit() {
      let multipleSelection = this.multipleSelection;
      if (!this.judgeRight(multipleSelection)) {
        return false;
      }
      this.$router.push({
        name: "EditSubstituteChannel",
        params: multipleSelection[0]
      });
    },
    handlegetPaymentChannelList(currentPage) {
      let params = Object.assign({}, this.formSearch, {
        page: currentPage,
        rows: 20
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
    this.handlegetPaymentChannelList(this.currentPage);
  },
  components: {},
  beforeDestroy() {}
};
</script>
<style scoped>
.operate {
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
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