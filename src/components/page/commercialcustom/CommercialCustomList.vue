<template>
  <div class="rolelist">
    <div class="operate">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="商户编号">
              <el-input v-model="formSearch.sn" placeholder="商户编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业名称">
              <el-input v-model="formSearch.enterpriseName" placeholder="企业名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业账户">
              <el-input v-model="formSearch.enterpriseAccounts" placeholder="企业账户"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="纳税人识别号">
              <el-input v-model="formSearch.taxpayerIdentificationSn" placeholder="纳税人识别号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当前状态">
              <el-select v-model="formSearch.status" placeholder>
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
            <el-form-item label="入网开始日期">
              <el-date-picker
                v-model="formSearch.beginDate"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
                placeholder="开始日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入网结束日期">
              <el-date-picker
                v-model="formSearch.endDate"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
                placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <div class="operate">
              <div class="operateBtn">
                <el-button type="primary" size="small" @click="handleSearch">
                  <i class="el-icon-search"></i>&nbsp;查询
                </el-button>
                <el-button type="primary" size="small" @click="handleResetSearchForm">
                  <i class="el-icon-search"></i>&nbsp;清空
                </el-button>
                <el-button type="primary" size="small" @click="handleAdd">
                  <i class="el-icon-search"></i>&nbsp;录入
                </el-button>
                <el-button type="primary" size="small" @click="handleEdit">
                  <i class="el-icon-search"></i>&nbsp;修改
                </el-button>
                <!-- <el-button type="primary" size="small" @click="handleBlackList">
                  <i class="el-icon-search"></i>&nbsp;加入黑名单
                </el-button> -->
                <!-- <el-button type="primary" size="small" @click="handleAdjust">
                  <i class="el-icon-search"></i>&nbsp;调账
                </el-button> -->
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
        @cell-click="handleShowDetail"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="商户编号" prop="sn" width="160"></el-table-column>
        <el-table-column label="企业名称" prop="enterpriseName"></el-table-column>
        <el-table-column label="联系人姓名" prop="contactsName"></el-table-column>
        <el-table-column label="账户余额" prop="mobile"></el-table-column>
        <el-table-column label="入网日期" prop="createdTime" width="160"></el-table-column>
        <el-table-column label="关闭日期" prop="closedTime" width="160"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <button class="statusbtn" v-status="scope.row">启用</button>
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
        @current-change="handleGetMerchantList"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
    <el-dialog title="调账" :visible.sync="dialogChangeAccount">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="当前状态">
              <el-select v-model="formSearch.status" placeholder>
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
            <el-form-item label="企业名称">
              <el-input v-model="formSearch.enterpriseName" placeholder="企业名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="当前状态">
              <el-select v-model="formSearch.status" placeholder>
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
            <el-form-item label="企业名称">
              <el-input v-model="formSearch.enterpriseName" placeholder="企业名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="当前状态">
              <el-select v-model="formSearch.status" placeholder>
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
            <el-form-item label="企业名称">
              <el-input v-model="formSearch.enterpriseName" placeholder="企业名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogChangeAccount = false">取 消</el-button>
        <el-button type="primary" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <div class="dialogblack">
      <el-dialog title="黑名单" :visible.sync="dialogBlackList">
        <p>确定要将该商户加入黑名单吗？</p>
        <el-form size="small" :model="formSearch">
          <el-form-item label="备注：">
            <el-input v-model="remark" placeholder=""></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogBlackList = false">取 消</el-button>
          <el-button type="primary" size="small" @click="handleInsertBlanklist">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  changeMerchantStatus,
  insertBlanklist,
  getMerchantList
} from "@/requestDataInterface";
export default {
  props: {},
  data() {
    return {
      dialogChangeAccount: false,
      dialogBlackList: false,
      currentPage: 1,
      total: 1,
      remark:'',
      statusOptions: [
        { label: "生效中", value: 1 },
        { label: "停用中", value: 0 }
      ],
      merchantList: [],
      multipleSelection: [],
      formSearch: {
        sn: "",
        enterpriseName: "",
        enterpriseAccounts: "",
        taxpayerIdentificationSn: "",
        status: "",
        beginDate: "",
        endDate: ""
      },
      resetFormSearch: {
        sn: "",
        enterpriseName: "",
        enterpriseAccounts: "",
        taxpayerIdentificationSn: "",
        status: "",
        beginDate: "",
        endDate: ""
      }
    };
  },
  created() {},
  methods: {
    handleEffect(id, status) {
      return changeMerchantStatus({ id: id, status: status }).then(res => {
        if (res.success) {
          this.handleGetMerchantList(this.currentPage);
        } else {
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      });
    },
    handleSearch() {
      this.handleGetMerchantList(this.currentPage);
    },
    handleAdd() {
      this.$router.push("/home/addcommercialcustom");
    },
    handleAdjust() {
      let multipleSelection = this.multipleSelection;
      if (!this.judgeRight(multipleSelection)) {
        return false;
      }
      this.dialogChangeAccount = true;
    },
    handleBlackList() {
      let multipleSelection = this.multipleSelection;
      if (!this.judgeRight(multipleSelection)) {
        return false;
      }
      this.dialogBlackList = true;
    },
    handleInsertBlanklist() {
      let id = this.multipleSelection[0].id;
      let remark = this.remark;
      insertBlanklist({ id, remark })
        .then(res => {
          if (res.success) {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.handleGetMerchantList(this.currentPage);
            this.dialogBlackList = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      let multipleSelection = this.multipleSelection;
      if (!this.judgeRight(multipleSelection)) {
        return false;
      }
      this.$router.push({
        name: "EditCommercialCustom",
        params: multipleSelection[0]
      });
    },
    handleShowDetail(row, column, cell, event) {
      if(column.label == '企业名称'){
        this.$router.push({ name: 'DetailCommercialCustom', params: row })
      }
    },
    handleGetMerchantList(currentPage) {
      let params = Object.assign({}, this.formSearch, {
        page: currentPage,
        rows: 20
      });
      getMerchantList(params)
        .then(res => {
          if (res.success) {
            this.merchantList = res.result.merchants;
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
    handleResetSearchForm() {
      Object.assign(this.formSearch, this.resetFormSearch);
    },

    judgeRight(multipleSelection) {
      if (!multipleSelection.length) {
        this.$message({
          type: "error",
          message: "请选择商户"
        });
        return false;
      } else if (multipleSelection.length > 1) {
        this.$message({
          type: "error",
          message: "请选择一个商户"
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
    this.handleGetMerchantList(this.currentPage);
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
.dialogblack >>> .el-dialog {
  width: 40%;
}
</style>