<template>
  <div class="addqualifypart">
    
      <el-form
        :model="formEdit"
        label-width="120px"
        :rules="rules"
        auto-complete="off"
        ref="formEdit"
      >
        <el-row>
            <el-col :span="12">
                <el-form-item label="银行名称" prop="bankName">
                <el-input v-model="formEdit.bankName"></el-input>
                </el-form-item>
            </el-col>
            
            <el-col :span="12">
                <el-form-item label="开户行支行" prop="bankBranchName">
                <el-input v-model="formEdit.bankBranchName" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="联行号" prop="bankLinkSn">
                  <el-input v-model="formEdit.bankLinkSn"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="生效日期" prop="effectiveDate">
                <el-date-picker
                  v-model="formEdit.effectiveDate"
                  type="date"
                  format="yyyy - MM - dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="失效日期" prop="expirationDate">
                <el-date-picker
                  v-model="formEdit.expirationDate"
                  type="date"
                  format="yyyy - MM - dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <div class="dialog-footer">
            <el-form-item>
              <el-button size="small" @click="resetForm('formEdit')">取 消</el-button>
              <el-button type="primary" @click="submitForm('formEdit')" size="small">保 存</el-button>
            </el-form-item>
          </div>
        </el-row>
      </el-form>

  </div>
</template>

<script>
import {
  editBankLinkSn
} from "@/requestDataInterface"
export default {
  props: {},
  data() {
    let checkNum = (rule, value, callback) => {
      let reg = /^\d+(\.\d{1,4})?$/
      if (!reg.test(value)) {
        return callback(new Error("输入的额度格式不正确"))
      } else {
        callback()
      }
    }
    return {
      rules: {
        bankName: [{ required: true, message: "必填", trigger: "blur" }],
        
        bankBranchName: [{required: true, message: "必填", trigger: "blur" }],
        
        effectiveDate: [{required: true, message: "必填", trigger: "blur"}],

        bankLinkSn: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        expirationDate: [
          {required: true, message: "必填", trigger: "blur"}
        ],
        
        batchSinglePayment: [
          { validator: checkNum, trigger: "blur" },
          {required: true, message: "必填", trigger: "blur"}
        ]
      },
      formEdit: {
        bankName:'',
        bankBranchName:'',
        bankLinkSn:'',
        effectiveDate:'',
        expirationDate:''
      }
    }
  },
  created() {
  },
  methods: {
    handleEdit() {
      let row = this.$route.query
      Object.assign(this.formEdit,row)
    },
    submitForm(ref) {
      this.$refs[ref].validate(valid => {
        if (valid) {
            let params = this.formEdit;
            editBankLinkSn(params).then(res => {
            if (res.success) {
                
                this.$message({
                type: "success",
                message: "联行号录入成功"
                });
                this.resetForm()
            } else {
                this.$message({
                type: "error",
                message: "新增失败," + res.msg
                })
            }
            }).catch(err => {console.log(err);})
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(){
      // let form = formEdit || 'formEdit'
      // Object.assign(this.formEdit, this.resetFormEdit)
      // this.$refs[form].resetFields()
      this.$router.go(-1)
    }
  },
  computed: {},
  mounted() {
    this.handleEdit()
  },
  components: {},
  beforeDestroy() {}
};
</script>
<style scoped>
.addqualifypart{
    padding: 20px 0;
    padding-left:3%;
    box-sizing: border-box;
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

.dialog-footer{
    text-align: center;
    margin-top:20px;
}

</style>