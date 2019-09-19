<template>
  <div class="rolelist">
    <div class="operate paddingcontainer">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="打款通道类型">
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
          <el-col :span="8">
            <el-form-item label="通道状态">
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
          <el-col :span="8">
            <el-form-item label="所属银行">
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
          <el-col :span="24">
            <div class="operate">
              <div class="operateBtn">
                <el-button type="primary" size="small" @click="handleSearch">
                  <i class="el-icon-search"></i>&nbsp;查询
                </el-button>
                <el-button type="primary" size="small" @click="handleSearch">
                  <i class="el-icon-circle-close"></i>&nbsp;新增
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
        <el-table-column label="通道编号" prop="name" width="90"></el-table-column>
        <el-table-column label="通道名称" prop="idCard" width="180"></el-table-column>
        <el-table-column label="所属银行" prop="phone" width="100"></el-table-column>
        <el-table-column label="账户类型" prop="enterpriseName" width="140"></el-table-column>
        <el-table-column label="通道状态" prop="bankName" width="140"></el-table-column>
        <el-table-column label="单笔限额" prop="createdTime" width="160"></el-table-column>
        <el-table-column label="当日限额" prop="usablePayment" width="90"></el-table-column>
        <el-table-column label="单笔最小限额" prop="usedPayment" width="120"></el-table-column>
        <el-table-column label="单批限量" prop="usedPayment" width="120"></el-table-column>
        <el-table-column label="单批限额" prop="usedPayment" width="120"></el-table-column>
        <el-table-column label="支持币种" prop="usedPayment" width="120"></el-table-column>
        <el-table-column label="操作" prop="usedPayment" width="120">
            <template slot-scope="scope">
                <button class="statusbtn" v-status="scope.row">启用</button>
                <button class="statusbtn">修改</button>
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
        @current-change="handlegetUserInfoList"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
    
    <div class="dialogblack">
      <el-dialog title="黑名单" :visible.sync="dialogBlackList">
        <p>您确定要提交该代付吗？</p>
        <el-form size="small" :model="formSearch">
          <el-form-item label="备注：">
            <el-input v-model="remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogBlackList = false">取 消</el-button>
          <el-button type="primary" size="small" @click="handleaddBlackList">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { addBlackList, getUserInfoList, editUserInfo, exportUser } from "@/requestDataInterface";
export default {
  props: {},
  data() {
    return {
      dialogBlackList: false,
      currentPage: 1,
      total: 1,
      remark:'',
      statusOptions: [
        { label: "生效中", value: 1 },
        { label: "停用中", value: 0 }
      ],
      qualificationList:[],
      merchantList: [],
      multipleSelection: [],
      formSearch: {
        enterpriseName: "",
        idCard: "",
        beginDate: "",
        endDate: "",
        phone:""
      }
    };
  },
  created() {},
  methods: {
    handleSearch() {
      this.handlegetUserInfoList(this.currentPage);
    },
    handleAdd() {
      this.$router.push("/home/addcommercialcustom");
    },

    handleExportUser(){
      let idsStr = ''
      let ids = []
      if(this.multipleSelection.length){
        ids = this.multipleSelection.map((item,index)=>item.id)
      }
      idsStr = ids.join(',')
      window.open('http://192.168.130.103:14541/apii/export/userInfoList?ids='+idsStr)
    },
    
    handleBlackList() {
      let multipleSelection = this.multipleSelection;
      if (!this.judgeRight(multipleSelection)) {
        return false;
      }
      this.dialogBlackList = true;
    },
    handleaddBlackList() {
      let id = this.multipleSelection[0].id;
      let remark = this.remark;
      addBlackList({ id, remark })
        .then(res => {
          if (res.success) {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.handlegetUserInfoList(this.currentPage);
            this.dialogBlackList = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleEdit() {
      let multipleSelection = this.multipleSelection;
      if (!this.judgeRight(multipleSelection)) {
        return false;
      }
      this.$router.push({
        name: "UserEdit",
        params: multipleSelection[0]
      });
    },
    handlegetUserInfoList(currentPage) {
      let params = Object.assign({}, this.formSearch, {
        page: currentPage,
        rows: 20
      });
      getUserInfoList(params)
        .then(res => {
          if (res.success) {
            this.merchantList = res.result.userInfos;
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
    },
    cancelEidt() {},
    confirmEdit() {}
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
.operate {
  /* padding: 0 15px; */
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