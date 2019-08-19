<template>
  <div class="resetpass">
    <MyHeader title="重置交易密码" />
    <div class="bgrect"></div>
    <div class="password mui-input-group">
      <div class="mui-input-row">
        <input type="password" class="mui-input-clear newpass" placeholder="请输入新的交易密码" />
      </div>

      <div class="mui-input-row">
        <input type="password" class="mui-input-clear comfirmpass" placeholder="请确认新的交易密码" />
      </div>

      <div class="mui-input-row">
        <input type="text" class="mui-input-clear mobile" placeholder="请输入新的手机号" />
      </div>

      <div class="mui-input-row">
        <input type="text" class="mui-input-clear messagecode" placeholder="请输入短信验证码" />
        <span id="messagecode">获取验证码</span>
      </div>
    </div>
    <div class="tip">
      <span>注意:</span>
      <span>密码不能为连续、倒连续或重复数字，如123456、654321等。</span>
    </div>
    <div class="complete">
      <MyButton content="下一步" :btnStyle="btnStyle" @click.native="submitData" />
    </div>
    <div class="service">
      <Service />
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/base/MyHeader.vue";
import MyButton from "@/components/base/MyButton";
import Service from "@/components/base/Service.vue";
export default {
  name: "ResetPassword",
  props: {},
  data() {
    return {
      btnStyle: {
        width: "100%",
        height: "0.4rem",
        background: "#3965ff", //输入状态根据短息验证码是否获取到
        borderRadius: "0.2rem",
        color: "white"
      }
    };
  },
  created() {},
  methods: {
    submitData() {}
  },
  computed: {},
  mounted() {},
  components: {
    MyHeader,
    MyButton,
    Service
  },
  beforeDestroy() {}
};
</script>
<style scoped>
.bgrect{
    height:0.08rem;
    background:#e4ecfd;
}
.resetpass {
  height: 100vh;
  position: relative;
  background: white;
}
.password {
  margin-top: 0.1rem;
  padding: 0 0.16rem;
  box-sizing: border-box;
}
.password .mui-input-row {
  margin-top: 0.1rem;
}
.password .mui-input-clear {
  padding-left: 0.36rem;
}
.mui-input-group .mui-input-row:after {
  left: 0;
}
.password .newpass {
  background: url(../../../../assets/img/resetpassword/password@2x.png) no-repeat
    0.04rem center;
  background-size: 0.22rem 0.22rem;
}

.password .comfirmpass {
  background: url(../../../../assets/img/resetpassword/password@2x.png) no-repeat
    0.04rem center;
  background-size: 0.22rem 0.22rem;
}

.password .mobile {
  background: url(../../../../assets/img/resetpassword/mobile@2x.png) no-repeat
    0.04rem center;
  background-size: 0.22rem 0.22rem;
}

.password .messagecode {
  background: url(../../../../assets/img/resetpassword/verticode@2x.png) no-repeat
    0.04rem center;
  background-size: 0.22rem 0.22rem;
}

.password .mui-input-row input::placeholder {
  color: #d5d5d5;
  font-size: 0.15rem;
}

.complete {
  padding: 0 0.16rem;
  margin-top: 0.3rem;
}
#messagecode {
  display: inline-block;
  width: 0.96rem;
  height: 0.25rem;
  background: white;
  position: absolute;
  border: 1px solid #3d48e3;
  border-radius: 10px;
  text-align: center;
  line-height: 0.25rem;
  color: #3d48e3;
  top: 6px;
  right: 6px;
  font-size: 0.14rem;
}
.service {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0.3rem;
}
.tip {
  padding: 0 0.16rem;
  margin-top: 0.16rem;
}
.tip span:nth-child(1) {
  color: #ff6000;
  font-size: 0.12rem;
}
.tip span:nth-child(2) {
  color: #7e838f;
  font-size: 0.12rem;
}
</style>