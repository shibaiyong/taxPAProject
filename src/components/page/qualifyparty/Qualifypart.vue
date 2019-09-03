<template>
  <div class="commercialList">
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
                <el-button type="primary" size="small" @click="handleDelet">
                  <i class="el-icon-search"></i>&nbsp;删除
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
        @current-change="handlegetQualificationPartyList"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogEditVisible">
      <el-form
        :model="formEdit"
        label-width="120px"
        :rules="rules"
        auto-complete="off"
        size="small"
        ref="formEdit"
      >
        <h4>企业信息</h4>
        <el-row>
          <el-col :span="12">
            <el-form-item label="编码" prop="sn">
              <el-input v-model="formEdit.sn" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" prop="enterpriseName">
            <el-form-item label="企业名称">
              <el-input v-model="formEdit.enterpriseName" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
        
          <el-col :span="12">
            <el-form-item label="税号" prop="enterpriseTaxSn">
              <el-input v-model="formEdit.enterpriseTaxSn" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          <el-form-item label="启用日期" prop="enableTime">
            <el-date-picker
              v-model="formEdit.enableTime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="启用日期"
            ></el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="停用日期" prop="unEnableTime">
            <el-date-picker
              v-model="formEdit.unEnableTime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="停用日期"
            ></el-date-picker>
        </el-form-item>
        </el-col>
          <el-col :span="12">
            <el-form-item label="全年缴税额度" prop="yearPayment">
              <el-input v-model="formEdit.yearPayment" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="当月可用额度" prop="thisMonthPayment">
              <el-input v-model="formEdit.thisMonthPayment" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="次月可用额度" prop="nextMonthPayment">
              <el-input v-model="formEdit.nextMonthPayment"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单月可用额度" prop="singleMonthPayment">
              <el-input v-model="formEdit.singleMonthPayment" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="isEdit">
            <el-form-item label="全年可用额度" prop="singleMonthPayment">
              <el-input v-model="formEdit.singleMonthPayment" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位地址">
              <el-input v-model="formEdit.address" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话号码">
              <el-input v-model="formEdit.tel" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>账户信息</h4>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户银行名称" prop="openingBankName">
              <el-input v-model="formEdit.openingBankName" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户行支行信息" prop="openingBankBranchInfo">
              <el-input v-model="formEdit.openingBankBranchInfo" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业银行账号" prop="enterpriseBankAccount">
              <el-input v-model="formEdit.enterpriseBankAccount" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>其他信息</h4>
        <el-row>
            <el-col :span="12">
            <el-form-item label="资质方联系人" prop="contacts">
              <el-input v-model="formEdit.contacts"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="contactsTel">
              <el-input v-model="formEdit.contactsTel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm('formEdit')" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addQualificationParty,
  editQualificationParty,
  getQualificationPartyList,

} from "@/requestDataInterface";
export default {
  props: {},
  data() {
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("电话不能为空"));
      } else if (!Number.isInteger(value * 1)) {
        callback(new Error("请输入11位数字"));
      } else {
        callback();
      }
    }
    
    let checkServiceCharge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("服务费不能为空"));
      } else if (value >= 100) {
        callback(new Error("服务费不能超过100%"));
      } else {
        callback();
      }
    }
    return {
      value6: "",
      dialogTitle: "编辑",
      dialogEditVisible: false,
      isEdit:false,
      currentPage: 1,
      total: 1,
      rules: {
        sn: [{ required: true, message: "必填", trigger: "blur" }],
        enterpriseName: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        enterpriseTaxSn: [{ required: true, message: "必填", trigger: "blur" }],
        enableTime: [{required: true, message: "必填", trigger: "blur" }],
        unEnableTime: [{required: true, message: "必填", trigger: "blur" }],
        yearPayment: [
          {required: true, message: "必填", trigger: "blur"}
        ],
        singleMonthPayment: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        thisMonthPayment: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        nextMonthPayment: [{ required: true, message: "必填", trigger: "blur" }],
        
        openingBankName: [{ required: true, message: "必填", trigger: "blur" }],
        openingBankBranchInfo: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        enterpriseBankAccount: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        contacts: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        contactsTel: [
          { validator: checkPhone, trigger: "blur" },
          {
            required: true,
            min: 11,
            max: 11,
            message: "请输入11位数字",
            trigger: "blur"
          }
        ]
        
      },
      qualificationPartiesList: [
        {sn:1234}
      ],
      multipleSelection: [],
      formSearch: {
        
      },
      resetFormSearch: {
        
      },
      formEdit: {
        sn:'',
        enterpriseName:'',
        enterpriseTaxSn:'',
        enableTime:'',
        unEnableTime:'',
        yearPayment:'',
        singleMonthPayment:'',
        thisMonthPayment:'',
        nextMonthPayment:'',
        address:'',
        tel:'',
        openingBankName:'',
        openingBankBranchInfo:'',
        enterpriseBankAccount:'',
        contacts:'',
        contactsTel:''
      },
      resetFormEdit: {
        sn:'',
        enterpriseName:'',
        enterpriseTaxSn:'',
        enableTime:'',
        unEnableTime:'',
        yearPayment:'',
        singleMonthPayment:'',
        thisMonthPayment:'',
        nextMonthPayment:'',
        address:'',
        tel:'',
        openingBankName:'',
        openingBankBranchInfo:'',
        enterpriseBankAccount:'',
        contacts:'',
        contactsTel:''
      }
    };
  },
  created() {},
  methods: {
    handleSearch() {
      this.handlegetQualificationPartyList(this.currentPage);
    },
    handleAdd() {
      this.dialogTitle = "录入资质方"
      this.dialogEditVisible = true
      this.isEdit = false
     this.resetForm('formEdit')
    },
    handleAdjust() {
      let multipleSelection = this.multipleSelection
      if (!this.judgeRight(multipleSelection)) {
        return false;
      }
    },
    handleEdit(index, row) {
      this.resetForm('formEdit')
      let multipleSelection = this.multipleSelection
      if (!this.judgeRight(multipleSelection)) {
        return false
      }
      Object.assign(this.formEdit,multipleSelection[0])
      this.isEdit = true
      this.dialogTitle = "编辑资质方"
      this.dialogEditVisible = true
    },
    handleShowDetail(row) {
      
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
    submitForm(ref) {
      this.$refs[ref].validate(valid => {
        if (valid) {
          if (this.dialogTitle == "录入资质方") {
            let params = this.formEdit;

            addQualificationParty(params)
              .then(res => {
                if (res.success) {
                  this.handlegetQualificationPartyList(this.currentPage);
                  this.dialogEditVisible = false;
                } else {
                  this.$message({
                    type: "error",
                    message: "新增失败," + res.msg
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            editQualificationParty(this.formEdit)
              .then(res => {
                if (res.success) {
                  this.handlegetQualificationPartyList(this.currentPage);
                  this.dialogEditVisible = false;
                } else {
                  this.$message({
                    type: "error",
                    message: "编辑失败," + res.msg
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm( formEdit ){
      let form = formEdit || 'formEdit'
      Object.assign(this.formEdit, this.resetFormEdit)
      this.$refs[form].resetFields()
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