<template>
  <div class="modifymobile">
    <MyHeader title="修改手机号码" />

    <div class="password mui-input-group">
      <div class="mui-input-row">
        <label>手机号码</label>
        <input type="text" class="mui-input-password" placeholder="请输入新的手机号" />
      </div>
      

      <div class="mui-input-row">
        <label>验证码</label>
        <input type="text" class="mui-input-clear messagecode" placeholder="请输入短信验证码" />
        <span id="messagecode">获取验证码</span>
      </div>
    </div>
    <div class="complete">
      <MyButton content="完成" :btnStyle="btnStyle" @click.native="submitData" />
    </div>
    <div class="service">
      <Service/>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/base/MyHeader.vue";
import MyButton from "@/components/base/MyButton";
import Service from "@/components/base/Service.vue";
export default {
  name: "ModifyMbile",
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
.modifymobile{
  height: 100vh;
  position:relative;
}
.password {
  margin-top: 0.1rem;
}
.password .mui-input-row{
  margin-top:0.1rem
}

.password .mui-input-row label {
  color: #181818;
  font-size: 0.17rem;
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
.service{
  width:100%;
  position:absolute;
  left:0;
  bottom:0.3rem;
}
</style>