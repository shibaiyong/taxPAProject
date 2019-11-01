<template>
  <div class="home">
    <el-row>
      <el-col :span="24">
        <Header @changePassword="handleChangePassword"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <NavBar />
      </el-col>
      <el-col :span="20">

        <Bread/>

        <router-view></router-view>

      </el-col>
    </el-row>

    <div class="dialogblack dialogchange">
    <el-dialog title="修改密码" :visible.sync="dialogChangeAccount">
      <el-form :model="formChangeAccount" size="small" label-width="80px" ref="ruleForm" :rules="rules">
        <el-row>
            <el-col :span="24">
              <el-form-item label="旧密码">
                <el-input type="password" v-model="formChangeAccount.oldPassword" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="新密码"  prop="newPassword">
                <el-input type="password" v-model="formChangeAccount.newPassword"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="确认密码"  prop="confirmPassword">
                <el-input type="password" v-model="formChangeAccount.confirmPassword"></el-input>
              </el-form-item>
            </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogChangeAccount = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitPassword">确 定</el-button>
      </div>
    </el-dialog>
    </div>
    
    
  </div>
</template>

<script>

import Header from "@/components/base/Header";
import NavBar from "@/components/base/NavBar";
import Bread from "@/components/base/Bread";
import { changePassword } from "@/requestDataInterface";

export default {
  props: {},
  data() {

    var validatePass = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        console.log()
        if (value == '') {
          callback(new Error('请再次输入密码'));
        } else if (value != this.formChangeAccount.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      dialogChangeAccount:false,
      formChangeAccount:{
        oldPassword:'',
        newPassword:'',
        confirmPassword:''
      },
      resetFormChangeAccount:{
        oldPassword:'',
        newPassword:'',
        confirmPassword:''
      },
      rules: {
          newPassword: [
            { validator: validatePass, trigger: 'blur' }
          ],
          confirmPassword: [
            { validator: validatePass2, trigger: 'blur' }
          ]
      }
    }
  },
  created() {},
  methods: {
    handleChangePassword(){
      Object.assign(this.formChangeAccount,this.resetFormChangeAccount)
      this.dialogChangeAccount = true;
    },
    submitPassword(){
      changePassword(this.formChangeAccount).then(res => {
        if(res.success){
          this.$message({
            type: "success",
            message: res.msg
          })
        }else{
          this.$message({
            type: "error",
            message: res.msg
          })
        }
        this.dialogChangeAccount = false
      })
    }
  },
  computed: {},
  mounted() {},
  components: {
    Header,
    NavBar,
    Bread
  }
};
</script>
<style scoped>

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
.dialogchange >>> .el-dialog {
  width: 30%;
}
.dialogchange hr{
  color:#DCDFE6
}
.dialogchange >>> .el-dialog__body{
  padding-top:15px;
  padding-bottom:15px;
}

</style>