<template>
  <div class="addqualifypart">

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
              <el-input v-model="formEdit.sn"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" prop="enterpriseName">
            <el-form-item label="企业名称" prop="enterpriseName">
              <el-input v-model="formEdit.enterpriseName"></el-input>
            </el-form-item>
          </el-col>
        
          <el-col :span="12">
            <el-form-item label="税号" prop="enterpriseTaxSn">
              <el-input v-model="formEdit.enterpriseTaxSn"></el-input>
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
               :disabled="isEdit"
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
               :disabled="isEdit"
            ></el-date-picker>
        </el-form-item>
        </el-col>
          <el-col :span="12">
            <el-form-item label="全年缴税额度" prop="yearPayment">
              <el-input v-model="formEdit.yearPayment"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="全年可用额度">
              <el-input v-model="formEdit.singleMonthPayment" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单月可用额度">
              <el-input v-model="formEdit.singleMonthPayment" :disabled="isEdit"></el-input>
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
            <el-form-item label="单位地址">
              <el-input v-model="formEdit.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话号码">
              <el-input v-model="formEdit.tel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>账户信息</h4>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户银行名称" prop="openingBankName">
              <el-input v-model="formEdit.openingBankName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户行支行信息" prop="openingBankBranchInfo">
              <el-input v-model="formEdit.openingBankBranchInfo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业银行账号" prop="enterpriseBankAccount">
              <el-input v-model="formEdit.enterpriseBankAccount"></el-input>
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
      <div class="dialog-footer">
        <el-button size="small" @click="resetForm('formEdit')">取 消</el-button>
        <el-button type="primary" @click="submitForm('formEdit')" size="small">保 存</el-button>
      </div>
  </div>
</template>

<script>
import {editQualificationParty} from "@/requestDataInterface"
export default {
  props: {},
  data() {
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("电话不能为空"))
      } else if (!Number.isInteger(value * 1)) {
        callback(new Error("请输入11位数字"))
      } else {
        callback()
      }
    }
    
    let checkServiceCharge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("服务费不能为空"))
      } else if (value >= 100) {
        callback(new Error("服务费不能超过100%"))
      } else {
        callback();
      }
    }
    return {
      isEdit:true,
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
        contactsTel:'',
        allYearPayment:''
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
    handleEdit() {
      let row = this.$route.params
      Object.assign(this.formEdit,row)
    },
    submitForm(ref) {
      this.$refs[ref].validate(valid => {
        if (valid) {
          let params = this.formEdit
          editQualificationParty(params)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: "error",
                  message: "资质方编辑成功"
                })
              } else {
                this.$message({
                  type: "error",
                  message: "编辑失败," + res.msg
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm( formEdit ){
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