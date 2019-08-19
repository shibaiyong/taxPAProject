<template>
  <div class="setpassword">
    <MyHeader title="身份验证" />
    <div class="content">
      <div class="password mui-input-group">
        <div class="mui-input-row">
          <label>验证码</label>
          <input type="text" class="mui-input-password" placeholder="请输入验证码" />
        </div>
      </div>
      <div class="tip">
        <span>注意:</span>
        <span>请填写由民生银行下发的验证码，字母大小写需区分</span>
      </div>

      <div class="complete">
        <MyButton content="确定" :btnStyle="btnStyle" @click.native="submitData" />
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/base/MyHeader.vue"
import MyButton from "@/components/base/MyButton"
import Service from "@/components/base/Service.vue"
export default {
  name: "EnterVerfiCode",
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
    MyButton
  },
  beforeDestroy() {}
};
</script>
<style scoped>
.content{
    background:white;
    padding:0.24rem 0;
}
h3 {
  margin: 0.36rem 0 0.21rem;
  font-size: 0.16rem;
  color: #6c7382;
  text-align: center;
  font-weight: normal;
}
.password .mui-input-row label {
  color: #181818;
  font-size: 0.17rem;
}

.password .mui-input-row input::placeholder {
  color: #d5d5d5;
  font-size: 0.15rem;
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
.complete {
  padding: 0 0.16rem;
  margin-top: 0.3rem;
}
</style>