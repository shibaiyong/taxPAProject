<template>
  <div class="rolelist">
    <div class="operate">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="资质方名称">
              <el-input v-model="formSearch.enterpriseName" placeholder="资质方名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号">
              <el-input v-model="formSearch.idcard" placeholder="身份证号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式">
              <el-input v-model="formSearch.phone" placeholder="联系方式"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="导入日期">
              <el-date-picker
                v-model="formSearch.beginDate"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
                placeholder="开始日期"
              ></el-date-picker>
              -
              <el-date-picker
                v-model="formSearch.endDate"
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
                <el-button type="primary" size="small" @click="handleEdit">
                  <i class="el-icon-edit-outline"></i>&nbsp;修改
                </el-button>
                <el-button type="primary" size="small" @click="handleShowDetail">
                  <i class="el-icon-info"></i>&nbsp;详情
                </el-button>
                <!-- <el-button type="primary" size="small" @click="handleBlackList">
                  <i class="el-icon-search"></i>&nbsp;加入黑名单
                </el-button> -->
                <el-button type="primary" size="small" @click="handleDelete">
                  <i class="el-icon-search"></i>&nbsp;删除
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
      <el-table
        :data="merchantList"
        style="width: 100%"
        @select="handleSelectionChange"
        @select-all="handleSelectAll"
      >
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="姓名" prop="name" width="90"></el-table-column>
        <el-table-column label="身份证号码" prop="idCard" width="180"></el-table-column>
        <el-table-column label="手机号" prop="phone" width="100"></el-table-column>
        <el-table-column label="对应资质方" prop="enterpriseName" width="140"></el-table-column>
        <el-table-column label="银行名称" prop="bankName" width="140"></el-table-column>
        <!-- <el-table-column label="银行账号" prop="bankAccount" width="140"></el-table-column> -->
        <!-- <el-table-column label="支行名称" prop="bankBranchName" width="140"></el-table-column> -->
        <el-table-column label="导入时间" prop="createdTime" width="160"></el-table-column>
        <el-table-column label="可报税额度" prop="usablePayment" width="90"></el-table-column>
        <el-table-column label="已报税额度" prop="usedPayment" width="90"></el-table-column>
        <el-table-column label="当前占用额度" prop="usingPayment" width="120"></el-table-column>
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
      <el-dialog title="删除" :visible.sync="dialogBlackList">
        <p>确定要将该用户删除吗？</p>
        <el-form size="small" :model="formSearch">
          <el-form-item label="备注：">
            <el-input v-model="remark" placeholder=""></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogBlackList = false">取 消</el-button>
          <el-button type="primary" size="small" @click="handleDeleteUser">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { addBlackList, getUserInfoList, exportUser, deleteUserInfo } from "@/requestDataInterface";
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
        .catch(err => {});
    },
    handleDelete(){
      let multipleSelection = this.multipleSelection;
      if (!this.judgeRight(multipleSelection)) {
        return false;
      }
      this.dialogBlackList = true;
    },
    handleDeleteUser(){
      let userInfoId = this.multipleSelection[0].id;
      let remark = this.remark;
      deleteUserInfo({ userInfoId, remark })
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
        .catch(err => {});
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
    handleShowDetail() {
      let multipleSelection = this.multipleSelection;
      if (!this.judgeRight(multipleSelection)) {
        return false;
      }
      this.$router.push({
        name: "UserDetail",
        params: multipleSelection[0]
      })
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
          message: "请选择用户"
        });
        return false;
      } else if (multipleSelection.length > 1) {
        this.$message({
          type: "error",
          message: "请选择一个用户"
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