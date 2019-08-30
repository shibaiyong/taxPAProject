<template>
  <div id="login">


    <div class="loginleft">

      <div class="shownumber font28"><p class="font58">{{toThousands(numberStart)}}</p>今日数据总量</div>
      <ul class="companyInfo">
        <li>
          <span class="font14">北京荣之联科技股份有限公司</span>
          <span class="font14">技术咨询: 座机 010-62602000-2032</span>
          <span class="font14">地址: 北京市朝阳区酒仙桥北路甲10号院106号楼荣之联大厦</span>
        </li>
        <li class="font14">Copyright©1692018.UEC Group Co.,Ltd.京ICP备14049550号-7</li>
      </ul>
    </div>
    <div class="loginright">
      <div class="logo">
        <img src=""/>
      </div>
      <h3 class="font44">欢迎登录</h3>
      <ul>
        <li class="bottom16" :class="{ 'verify': errorUserNameShow }">用户名</li>
        <li class="input bottom46" :class="{ 'verify': errorUserNameShow }">
          <input :class="{ 'verify': errorUserNameShow,'verifylan': errorUserNameShowAcive }" type="text" v-model="userInfo.username" placeholder="请输入用户名" @focus="changeStatusActive('username')" @blur="changeStatusBlur('username')"/>
          <span v-show="errorUserNameShow"><img src=""/>&nbsp;{{ errorUserNameMessage }}</span>
        </li>
        <li class="bottom16" :class="{ 'verify': errorPassWordShow }">密码</li>
        <li class="input bottom24" :class="{ 'verify': errorPassWordShow }">
          <input :class="{ 'verify': errorPassWordShow, 'verifylan': errorPassWordShowAcive }" type="password" autocomplete="off" v-model="userInfo.password" @keyup.enter="gotoLogin" placeholder="请输入密码" @focus="changeStatusActive('password')" @blur="changeStatusBlur('password')"/>
          <span v-show="errorPassWordShow"><img src=""/>&nbsp;{{ errorPassWordMessage }}</span>
        </li>
        <li class="remeberme">
          <!-- <CheckBox :label="'选中'" :dataArr="dataArr" :all="isChecked"><a href="javascript:void(0)" class="font14">记住密码</a></CheckBox> -->
          <el-checkbox v-model="rememberP">记住密码</el-checkbox>
        </li>
        <li><button class="font16" @click="gotoLogin($event)">登录</button></li>
      </ul>
    </div>
    
  </div>
</template>

<script>

import messageBox from "@/components/base/MessageBox"
import CheckBox from "@/components/base/CheckBox"
import { Login } from "@/requestDataInterface"
import { setCookie, getCookie, deleteCookie} from "@/assets/utils"

export default {
  name: "login",
  data() {
    return {
      //弹窗组件的配置项
      rememberP:false,
      isVisible: -1,
      email: "",
      userInfo: {
        username: "",
        password: ""
      },
      numberStart: 0,
      numberEnd: 0,
      errorUserNameShow: false,
      errorPassWordShow: false,
      errorUserNameShowAcive:false,
      errorPassWordShowAcive:false,
      errorUserNameMessage: "",
      errorPassWordMessage: "",
      totalTimer:''
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
      let params = this.userInfo
      Login( params ).then( res => {
        
        if(res.success){
          localStorage.setItem('username',params.username)
          this.$router.push('/home/commercialcustom')
          this.$store.dispatch('setLogin',1)
        }else{
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      }).catch(err => {

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

    showMessageBox(textOptions) {
      
    },

    formValidation() {
      //用户名支持数字，字母，区分大小写；密码支持数字，字母，区分大小写。
      let userName = this.userInfo.username
      let passWord = this.userInfo.password

      let userReg = /^[a-zA-Z\d]{3,20}$/
      let passwordReg = /^[a-zA-Z\d]{6,20}$/

      if (!userReg.test(userName)) {
        this.errorUserNameMessage = "用户名错误";
        this.errorUserNameShow = true;
        this.errorUserNameShowAcive = false;
        return false;
      }  else {
        this.errorUserNameShow = false;
      }
      if (!passwordReg.test(passWord)) {
        this.errorPassWordMessage = "密码错误";
        this.errorPassWordShow = true;
        this.errorPassWordShowAcive = false;
        return false
      } else {
        this.errorPassWordShow = false;
      }

      return true
    },

    getTotalData() {
      
    },

    changeStatusActive( data ){
      
    },
    changeStatusBlur(data){
      
    },
    toThousands(num){
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
  components: {
    messageBox,
    CheckBox
  }
};
</script>

<style scoped>

#login{
  width:100%;
  height: 100%;
  overflow:hidden;
}
.loginleft{
  width:62%;
  height:100%;
  /* background: url("../../assets/login_bg.jpg") no-repeat center center; */
  float:left;
  background-size:100% 100%;
  position: relative;
}
.loginleft .shownumber{
  width:100%;
  position:absolute;
  bottom:10%;
  left:0;
  color:white;
  line-height: 40px;
  padding-left:6%;
  font-weight: bold;
}
.loginleft .shownumber p{

  line-height: 67px;
  font-weight: bold;
}
.loginleft .companyInfo{
  width:100%;
  position:absolute;
  bottom:3%;
  left:0;
  color:white;
  line-height: 21px;
  padding-left:6%;
}
.loginleft .companyInfo span+span{
  display:inline-block;
  margin-left:3%;
}
.loginright{
  width:38%;
  height:100%;
  float:left;
  background:white;
}
.loginright .logo{
  width:60%;
  margin:20% auto 17% auto;
}
.loginright .logo img{
  width:73%;
}
.loginright h3{
  width:60%;
  height:62px;
  font-family:'PingFangSC-Medium';
  font-weight:500;
  color:rgba(68,68,68,1);
  line-height:62px;
  margin:0 auto;
  margin-bottom:7%;
}
.loginright ul{
  width:60%;
  margin:0 auto;
}

.loginright li.input{
  border:1px solid rgba(204,204,204,1);
  border-radius:4px;
  overflow: hidden;
}

.loginright li.input span{
  height: auto;
}


.loginright li input {
  width: 54%;
  outline: none;
  padding-left: 40px;
  height:56px;
  border:none;
  box-sizing: border-box;
}
/* .loginright li.bottom46 input{
  background:rgba(255,255,255,1) url(../../assets/username-ico.png) no-repeat 12px center;
}
.loginright li.bottom24 input{
  background:rgba(255,255,255,1) url(../../assets/password-ico.png) no-repeat 12px center;
} */
.loginright li.verify {
  border-color: red;
  color:red;
}
.loginright li.bottom46 input.verify {
  color:red;
  /* background:rgba(255,255,255,1) url(../../assets/username-error.png) no-repeat 12px center; */
}
.loginright li.bottom24 input.verify {
  color:red;
  /* background:rgba(255,255,255,1) url(../../assets/password-error.png) no-repeat 12px center; */
}
/* .loginright li.bottom46 input.verifylan {
  background:rgba(255,255,255,1) url(../../assets/username-active.png) no-repeat 12px center;
} */
/*.loginright li.bottom24 input.verifylan {
   background:rgba(255,255,255,1) url(../../assets/password-active.png) no-repeat 12px center; 
}*/
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
  height:56px;
  background:rgba(29,32,136,1);
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
