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
        <el-row><h4>企业信息</h4></el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业编码" prop="sn">
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
              :picker-options="startPicker"
              @change="resetEndPicker"
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
              :picker-options="endPicker"
            ></el-date-picker>
        </el-form-item>
        </el-col>
          <el-col :span="12">
            <el-form-item label="全年缴税额度" prop="yearPayment">
              <el-input v-model="formEdit.yearPayment"></el-input>
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
              <el-input v-model="formEdit.nextMonthPayment" :disabled="isEdit"></el-input>
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
          <el-col :span="12">
            <el-form-item label="用户短号" prop="userShortId">
              <el-input v-model="formEdit.userShortId"></el-input>
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
              <el-select v-model="formEdit.openingBankBranchInfo" filterable remote :remote-method="remoteMethod">
                <el-option
                  v-for="item in unionPayNumList"
                  :key="item.id"
                  :label="item.bankBranchName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业银行账号" prop="enterpriseBankAccount">
              <el-input v-model="formEdit.enterpriseBankAccount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="代付合约编号" >
              <el-input v-model="formEdit.paymentContractSn"></el-input>
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
        <el-row>
          <div class="dialog-footer">
            <el-form-item>
              <el-button size="small" @click="resetForm('formEdit')">取 消</el-button>
              <el-button type="primary" @click="submitForm('formEdit')" size="small">确 定</el-button>
            </el-form-item>
          </div>
        </el-row>
      </el-form>
      
  </div>
</template>

<script>
import {
  addQualificationParty,getSingleMonthPayment,getBankLinkSnList
} from "@/requestDataInterface"
export default {
  props: {},
  data() {
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("电话不能为空"))
      } else if (!Number.isInteger(value * 1)) {
        callback(new Error("请输入11位数字"))
      } else {
        callback();
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

    let checkNum = (rule, value, callback) => {
      let reg = /^\d+(\.\d{1,4})?$/
      if (!reg.test(value)) {
        return callback(new Error("输入的额度格式不正确"))
      } else {
        this.handleGetSingleMonthPayment(value)
        callback()
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
          { validator: checkNum, trigger: "blur" },
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
        ],
        userShortId:[
          { required: true, message: "必填", trigger: "blur" }
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
        paymentContractSn:'',
        userShortId:''
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
        contactsTel:'',
        paymentContractSn:'',
        userShortId:''
      },
      startPicker: {
        disabledDate(time) {
          return time.getTime() < Date.now()-24*60*60*1000
        }
      },
      endPicker: {
        disabledDate(time) {}
      },
      unionPayNumList:[]
    }
  },
  created() {
  },
  methods: {
    resetEndPicker(val){
      this.endPicker.disabledDate = function(time){
        return time.getTime() < new Date(val).getTime()
      }
    },
    remoteMethod(val){
      this.handlegetBankLinkSnList(val);
    },
    handlegetBankLinkSnList(bankBranchName) {
      getBankLinkSnList({ page: 1, rows: 20, bankBranchName})
        .then(res => {
          if (res.success) {
            this.unionPayNumList = res.result.bankLinks
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleGetSingleMonthPayment( val ){
      let yearPayment = val
      getSingleMonthPayment({yearPayment}).then( res => {
        this.formEdit.singleMonthPayment = res.result
        this.formEdit.thisMonthPayment = res.result
        this.formEdit.nextMonthPayment = res.result
      }).catch(err=>{})
    },
    submitForm(ref) {
      this.$refs[ref].validate(valid => {
        if (valid) {
            let params = this.formEdit;
            addQualificationParty(params).then(res => {
            if (res.success) {
                
                this.$message({
                type: "success",
                message: "资质方录入成功"
                });
                this.$router.push('/home/qualifypart')
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
    resetForm( formEdit ){
      // let form = formEdit || 'formEdit'
      // Object.assign(this.formEdit, this.resetFormEdit)
      // this.$refs[form].resetFields()
      this.$router.go(-1)
    },
  },
  computed: {},
  mounted() {},
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