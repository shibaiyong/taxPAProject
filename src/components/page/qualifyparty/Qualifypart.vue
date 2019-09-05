<template>
  <div class="rolelist">
    <div class="operate">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="资质方名称">
              <el-input v-model="formSearch.sn" placeholder="资质方名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <div class="operate">
              <div class="operateBtn">
                <el-button type="primary" size="small" @click="handleSearch">
                  <i class="el-icon-search"></i>&nbsp;查询
                </el-button>
                <el-button type="primary" size="small" @click="handleAdd">
                  <i class="el-icon-search"></i>&nbsp;录入
                </el-button>
                <el-button type="primary" size="small" @click="handleEdit">
                  <i class="el-icon-search"></i>&nbsp;编辑
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="paddingcontainer">
      <el-table
        :data="qualificationPartiesList"
        style="width: 100%"
        @select="handleSelectionChange"
        @select-all="handleSelectAll"
        @row-click="handleShowDetail"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="编号" prop="sn"></el-table-column>
        <el-table-column label="企业名称" prop="enterpriseName"></el-table-column>
        <el-table-column label="联系人" prop="contacts"></el-table-column>
        <el-table-column label="手机号" prop="contactsTel"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="当月全部额度" prop="yearPayment"></el-table-column>
        <el-table-column label="当月可用额度" prop="thisMonthPayment"></el-table-column>
        <el-table-column label="当月已用额度" prop="nextMonthPayment"></el-table-column>
      </el-table>
    </div>
    <div class="paddingcontainer pagecontainer">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
        @current-change="handlegetQualificationPartyList"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getQualificationPartyList
} from "@/requestDataInterface";
export default {
  props: {},
  data() {
    
    return {
      value6: "",
      dialogTitle: "编辑",
      dialogEditVisible: false,
      isEdit:false,
      currentPage: 1,
      total: 1,
      
      qualificationPartiesList: [
        {sn:1234,unEnableTime:'2018-09-09',enableTime:'2019-08-08',thisMonthPayment:'1000', nextMonthPayment:'1000'}
      ],
      multipleSelection: [],
      formSearch: {
        
      },
      resetFormSearch: {
        
      }
    }
  },
  created() {},
  methods: {
    handleSearch() {
      this.handlegetQualificationPartyList(this.currentPage);
    },
    handleAdd() {
      this.$router.push("/home/addqualifypart")
    },
    
    handleEdit() {
      let multipleSelection = this.multipleSelection
      if (!this.judgeRight(multipleSelection)) {
        return false
      }
      this.$router.push({name:'EditQualifypart',params:multipleSelection[0]})
    },
    handleShowDetail(row) {
      this.$router.push({ name: 'QualifypartDetail', params: row })
    },
    handleDelet() {
      let multipleSelection = this.multipleSelection
      if (!this.judgeRight(multipleSelection)) {
        return false;
      }
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUser({ id })
            .then(res => {
              if (res.success) {
                this.getQualificationPartyList(this.currentPage);
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
              }
            })
            .catch(err => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handlegetQualificationPartyList(currentPage) {
      let params =Object.assign({}, this.formSearch, {
        page: currentPage,
        rows: 10
      })
      getQualificationPartyList(params)
        .then(res => {
          if (res.success) {
            this.qualificationPartiesList = res.result.qualificationParties
            this.total = res.result.total
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSelectionChange(selection, row) {
      this.multipleSelection = selection
    },
    handleSelectAll(selection) {
      this.multipleSelection = selection
    },
    handleResetSearchForm() {
      Object.assign(this.formSearch, this.resetFormSearch)
    },
    judgeRight(multipleSelection) {
      if (!multipleSelection.length) {
        this.$message({
          type: "error",
          message: "请从列表中选择需要操作的行"
        });
        return false;
      } else if (multipleSelection.length > 1) {
        this.$message({
          type: "error",
          message: "只能选择一行进行操作"
        });
        return false;
      }
      return true;
    }
  },
  computed: {},
  mounted() {
    this.handlegetQualificationPartyList(this.currentPage);
  },
  components: {},
  beforeDestroy() {}
};
</script>
<style scoped>
.operate {
  padding: 0 3%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.operate .el-button--small {
  padding: 9px 12px;
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
  width: 230px;
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
  width: 40%;
}
</style>