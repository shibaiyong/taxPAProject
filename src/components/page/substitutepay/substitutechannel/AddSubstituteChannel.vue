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
                <el-form-item label="打款通道编号" prop="channelSn">
                <el-input v-model="formEdit.channelSn"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="打款通道类型" prop="accountType">
                <el-select v-model="formEdit.accountType" @change="changeIsEdit">
                    <el-option
                    v-for="option in accountType"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                    ></el-option>
                </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="对公单笔限额">
                <el-input v-model="formEdit.publicSinglePayment" :disabled='isEdit'></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="对私单笔限额">
                <el-input v-model="formEdit.privateSinglePayment" :disabled='!isEdit'></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="单批限量" prop="batchSingleNum">
                <el-input v-model="formEdit.batchSingleNum"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="支持垫资出款">
                <el-input v-model="formEdit.supportingAdvances"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="打款通道名称" prop="channelName">
                <el-input v-model="formEdit.channelName"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="所属银行" prop="bankName">
                <el-input v-model="formEdit.bankName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="单日限额" prop="dayPayment">
                <el-input v-model="formEdit.dayPayment"></el-input>
                </el-form-item>
            </el-col>
            
            <el-col :span="12">
                <el-form-item label="单笔最小限额" prop="minSinglePayment">
                <el-input v-model="formEdit.minSinglePayment"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="单批限额" prop="batchSinglePayment">
                <el-input v-model="formEdit.batchSinglePayment"></el-input>
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
  addPaymentChannel
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
      isEdit:false,
      rules: {
        channelSn: [{ required: true, message: "必填", trigger: "blur" }],
        accountType: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        publicSinglePayment: [
          { validator: checkNum, trigger: "blur" },
          {required: true, message: "必填", trigger: "blur"}
        ],
        privateSinglePayment: [
          { validator: checkNum, trigger: "blur" },
          {required: true, message: "必填", trigger: "blur"}
        ],
        batchSingleNum: [{required: true, message: "必填", trigger: "blur" }],
        
        channelName: [
          {required: true, message: "必填", trigger: "blur"}
        ],

        bankName: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        dayPayment: [
          { validator: checkNum, trigger: "blur" },
          {required: true, message: "必填", trigger: "blur"}
        ],
        minSinglePayment: [
          { validator: checkNum, trigger: "blur" },
          {required: true, message: "必填", trigger: "blur"}
        ],
        
        batchSinglePayment: [
          { validator: checkNum, trigger: "blur" },
          {required: true, message: "必填", trigger: "blur"}
        ]
      },
      accountType: [
        { label: "对公", value: 1 },
        { label: "对私", value: 2 }
      ],
      formEdit: {
        channelSn:'',
        accountType:'',
        publicSinglePayment:'',
        privateSinglePayment:'',
        batchSingleNum:'',
        supportingAdvances:'',
        channelName:'',
        bankName:'',
        dayPayment:'',
        minSinglePayment:'',
        batchSinglePayment:''
      },
      resetFormEdit: {
        channelSn:'',
        accountType:'',
        publicSinglePayment:'',
        privateSinglePayment:'',
        batchSingleNum:'',
        supportingAdvances:'',
        channelName:'',
        bankName:'',
        dayPayment:'',
        minSinglePayment:'',
        batchSinglePayment:''
      }
    }
  },
  created() {
  },
  methods: {
    
    submitForm(ref) {
      this.$refs[ref].validate(valid => {
        if (valid) {
            let params = this.formEdit;
            addPaymentChannel(params).then(res => {
            if (res.success) {
                
                this.$message({
                type: "success",
                message: "渠道录入成功"
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
    },
    changeIsEdit( val ){
      if(val == 1){
        this.isEdit = false
        this.formEdit.privateSinglePayment = ''
      }else if(val == 2){
        this.isEdit = true
        this.formEdit.publicSinglePayment = ''
      }
    }
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