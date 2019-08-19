<template>
  <div class="setpassword">
    <MyHeader title="银行卡" />
    <h3>请绑定持卡人本人银行卡</h3>
    <div class="password mui-input-group">
      <div class="mui-input-row">
        <label>持卡人</label>
        <input type="password" class="mui-input-clear" placeholder="请输入持卡人姓名" />
      </div>
      <div class="mui-input-row">
        <label>手机号码</label>
        <input type="password" class="mui-input-clear" placeholder="请输入手机号码" />
      </div>
      <div class="mui-input-row">
        <label>卡号</label>
        <input type="password" class="mui-input-clear" placeholder="请输入卡号" />
      </div>
      <div class="mui-input-row">
        <label>验证码</label>
        <input type="password" class="mui-input-clear" placeholder="请输入验证码" />
        <span id="messagecode" v-if="ifFetchCode" @click="getCode">获取验证码</span>
        <span id="countdown" v-else>{{'剩余' + numberStart + 's'}}</span>
      </div>
    </div>

    <div class="complete">
      <MyButton content="下一步" :btnStyle="btnStyle" @click.native="submitData" />
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
  name: "AddBankCard",
  props: {},
  data() {
    return {
      btnStyle: {
        width: "100%",
        height: "0.4rem",
        background: "#3965ff",//输入状态根据短息验证码是否获取到
        borderRadius: "0.2rem",
        color: "white"
      },
      numberEnd:0,
      numberStart:60,
      ifFetchCode:true
    }
  },
  created() {},
  methods: {
    submitData() {},
    changeNumber(keepTime, cycleTime) {
      //数字滚动叠加

      let span = this.numberEnd - this.numberStart
      let translateTime = cycleTime
      let changeTime = Math.ceil(translateTime / keepTime)
      let step = Math.ceil(span / changeTime)
      let changeNumberInterval = setInterval(() => {
        this.numberStart = this.numberStart + step
        if (this.numberStart >= this.numberEnd && span >= 0) {
          clearInterval(changeNumberInterval)
          this.numberStart = this.numberEnd
        } else if (this.numberStart <= this.numberEnd && span < 0) {
          clearInterval(changeNumberInterval)
          this.numberStart = this.numberEnd
          this.ifFetchCode = true
        }
      }, keepTime)
    },
    getCode(){
        this.ifFetchCode = false
        this.changeNumber(1000,60000)
    }
  },
  computed: {},
  mounted() {
      
  },
  components: {
    MyHeader,
    MyButton,
    Service
  },
  beforeDestroy() {}
};
</script>
<style scoped>
h3 {
  margin: 0.36rem 0 0.21rem;
  font-size: 0.16rem;
  color: #6c7382;
  font-weight: normal;
  padding-left:0.15rem;
}
.password .mui-input-row label {
  color: #181818;
  font-size: 0.17rem;
}

.password .mui-input-row input::placeholder {
  color: #d5d5d5;
  font-size: 0.15rem;
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
#countdown{
display: inline-block;
  width: 0.96rem;
  height: 0.25rem;
  background: white;
  position: absolute;
  text-align: center;
  line-height: 0.25rem;
  color: #3d48e3;
  top: 6px;
  right: 6px;
  font-size: 0.14rem;
}
.complete {
  padding: 0 0.16rem;
  margin-top: 0.7rem;
}

.service {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0.3rem;
}
</style>