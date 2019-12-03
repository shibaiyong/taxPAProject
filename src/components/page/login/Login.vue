<template>
  <div id="login">
    <div class="loginleft">
      <img src="@/assets/img/loginbanner.png" class="loginbanner"/>
      <img src="@/assets/img/loginlogo.png" class="loginlogo"/>
    </div>
    <div class="loginright">
      <h3 class="font44">登录</h3>
      <ul>
        <li class="bottom16" :class="{ 'verify': errorUserNameShow }">用户名</li>
        <li class="input bottom46" :class="{ 'verify': errorUserNameShow }">
          <input :class="{ 'verify': errorUserNameShow,'verifylan': errorUserNameShowAcive }" type="text" v-model="userInfo.username" placeholder="请输入用户名"/>
          <span v-show="errorUserNameShow"><img src=""/>&nbsp;{{ errorUserNameMessage }}</span>
        </li>
        <li class="bottom16" :class="{ 'verify': errorPassWordShow }">密码</li>
        <li class="input bottom24" :class="{ 'verify': errorPassWordShow }">
          <input :class="{ 'verify': errorPassWordShow, 'verifylan': errorPassWordShowAcive }" type="password" v-model="userInfo.password" @keyup.enter="gotoLogin" placeholder="请输入密码"/>
          <span v-show="errorPassWordShow"><img src=""/>&nbsp;{{ errorPassWordMessage }}</span>
        </li>
        <li class="remeberme">
          <el-checkbox v-model="rememberP">记住密码</el-checkbox>
        </li>
        <li><button class="font16" @click="gotoLogin($event)">登录</button></li>
      </ul>
    </div>
    
  </div>
</template>

<script>
import { Login, getMenuList } from "@/requestDataInterface"
import { setCookie, getCookie, deleteCookie} from "@/assets/utils"

export default {
  name: "login",
  data() {
    return {
      //弹窗组件的配置项
      rememberP:false,
      userInfo: {
        username: "",
        password: ""
      },
      errorUserNameShow: false,
      errorPassWordShow: false,
      errorUserNameShowAcive:false,
      errorPassWordShowAcive:false,
      errorUserNameMessage: "",
      errorPassWordMessage: "",
    }
  },
  created() {
    
  },
  mounted() {
    this.initUser()
  },
  methods: {
    initUser() {
      //初始化用户名和密码,从cookie中获取。
      let rlUserInfo = getCookie("rlUserInfo")
      if (rlUserInfo.password) {
        Object.assign(this.userInfo, rlUserInfo)
        this.rememberP = true
      }
    },
    gotoLogin(e) {
      if (!this.formValidation()) {
        //如果验证没有通过，中断登录操作
        return false
      }
      if(this.rememberP){
        this.rememberMe()
      }
      let params = this.userInfo
      Login( params ).then( res => {
        
        if(res.success){
          localStorage.setItem('username',params.username)
          //sessionStorage.setItem('RyxToken',res.result.token)
          this.$store.dispatch('setLogin',1)
          getMenuList().then( res => {
            if(res.success){
              let url = res.result.permissions[0].childrens[0].vueUrl
              this.$router.push(url)
            }
          })
        }else{
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    },
    rememberMe() {
      //记住密码
      let userInfo = this.userInfo
      if (userInfo.username == "" || userInfo.password == "") {
        this.$message({
            type: "error",
            message: '用户名或密码不能为空'
          })
        return false
      }
      setCookie("rlUserInfo", 7, userInfo)
    },

    forgotPassWord() {
      //忘记密码
      deleteCookie("rlUserInfo")
    },

    formValidation() {
      //用户名支持数字，字母，区分大小写；密码支持数字，字母，区分大小写。
      let userName = this.userInfo.username
      let passWord = this.userInfo.password

      let userReg = /^[a-zA-Z\d]{3,20}$/
      let passwordReg = /^[a-zA-Z\d]{6,20}$/

      if (!userReg.test(userName)) {
        this.errorUserNameMessage = "用户名格式不正确";
        this.errorUserNameShow = true;
        this.errorUserNameShowAcive = false;
        return false;
      }  else {
        this.errorUserNameShow = false;
      }
      if (!passwordReg.test(passWord)) {
        this.errorPassWordMessage = "密码格式不正确";
        this.errorPassWordShow = true;
        this.errorPassWordShowAcive = false;
        return false
      } else {
        this.errorPassWordShow = false;
      }

      return true
    }
  },
  beforeDestroy(){
    
  },
  watch: {
    rememberP(val) {
      if (val) {
        this.rememberMe()
      } else {
        this.forgotPassWord()
      }
    }
  },
  components: {}
};
</script>

<style scoped>

#login{
  width:100%;
  height: 100%;
  overflow:hidden;
  position: absolute;
  top:0;
  left:0;
  bottom:0;
}
.loginleft{
  width:50%;
  height:100%;
  float:left;
  position: relative;
}
.loginleft .loginlogo{
  position:absolute;
  left:50%;
  margin-left:-195px;
  top:50%;
  margin-top:-53px;
  z-index:222;
}
.loginleft .loginbanner{
  width:100%;
  height:100%;
}
.loginright{
  width:50%;
  height:100%;
  float:left;
  background:white;
}

.loginright h3{
  width:60%;
  height:62px;
  font-family:'PingFangSC-Medium';
  font-weight:500;
  color:#333;
  margin:0 auto;
  margin-bottom:7%;
  font-size:40px;
  margin-top:18%;
}
.loginright ul{
  width:60%;
  margin:0 auto;
}

.loginright li.input{
  border:1px solid #e7e7e7;
  border-radius:4px;
  overflow: hidden;
}

.loginright li.input::placeholder{
  color:#c2c2c2;
}

.loginright li.input span{
  height: auto;
}
.loginright li input {
  width: 54%;
  outline: none;
  padding-left: 10px;
  height:50px;
  border:none;
  box-sizing: border-box;
  color:#333;
}
.loginright li input:-webkit-autofill {
  -webkit-text-fill-color: #333 !important;
  transition: background-color 5000s ease-in-out 0s;
}
.loginright li.verify {
  border-color: red;
  color:red;
}
.loginright li.bottom46 input.verify {
  color:red;
}
.loginright li.bottom24 input.verify {
  color:red;
}
.loginright li span{
  display: inline-block;
  width:42%;
  height: 10px;
  text-align: right
}
.remeberme{
  text-align:right;
  margin-bottom:12%;
}
.remeberme a{
  color:#333;
}
.loginright li:last-child button {
  width: 100%;
  border: none;
  color: white;
  cursor: pointer;
  height:50px;
  background:#5e8ddb;
  border-radius:4px;
  font-size:16px;
  font-family:'PingFangSC-Medium';
  font-weight:500;
  color:rgba(255,255,255,1);
}
.bottom16{
  margin-bottom:2%;
}


.bottom46{
  margin-bottom:6%;
}
.bottom24{
  margin-bottom:3%;
}


</style>
