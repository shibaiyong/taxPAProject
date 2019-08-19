<template>
  <div class="buy">
    <MyHeader title="购买" />
    <div class="inputcontainer">
      <MyInput v-model="moneyvalue" />
    </div>

    <h3>支付方式</h3>
    <div class="bank">
      <img src="@/assets/img/chinabank.png" />
      <span>中信银行（9151）</span>
    </div>
    <div class="btncontainer">
      <MyButton content="确认购买" :btnStyle="btnStyle" @click.native="confirmBuy"></MyButton>
    </div>
    <div class="service">
      <Service />
    </div>
    <MyTip :configMessage="configMessage"/>
  </div>
</template>

<script>
import MyHeader from "@/components/base/MyHeader.vue"
import MyInput from "@/components/base/MyInput.vue"
import Service from "@/components/base/Service.vue"
import MyButton from "@/components/base/MyButton"
import MyTip from "@/components/base/MyTip"
import { Toast } from "mint-ui";
export default {
  name: "Buy",
  props: {},

  data() {
    return {
      moneyvalue: "",
      btnStyle: {
        height: "0.48rem",
        background: "#3a65ff",
        borderRadius: "0.24rem",
        color: "white",
        width: "92%"
      },
      toastinstance: {
        toast: null
      },
      
      configMessage:{
        tipvisible:true,
        imgsrc:'/static/img/right@2x.png',
        title:'购买成功',
        subtitle:'10,000.00',
        des:'预计5月10日开始计息，5月11日首笔收益到账',
        btnText:'查看账单',
        callback:null
      }
    };
  },
  updated() {
    
  },
  created() {},
  methods: {
    confirmBuy() {
      let val = this.moneyvalue;
      let reg = /^([0-9]{1,}[.]*[0-9]*)$/;
      if (!reg.test(val)) {
        this.toastinstance.toast = Toast({
          message: "购买金额需大于等于0.01元",
          position: "center",
          duration: 2000
        })
        return false
      }
    },
    showStatusTip(){
      let that = this
      this.tipvisible = true
      this.configMessage = {
        imgsrc:'/static/img/right@2x.png',
        header:'购买完成',
        title:'购买成功',
        subtitle:'10,000.00',
        des:'预计5月10日开始计息，5月11日首笔收益到账',
        btnText:'查看账单',
        callback:function(){
          that.tipvisible = false
        }
      }
    }
  },
  computed: {},
  mounted() {
    //this.showStatusTip();
  },
  components: {
    MyHeader,
    Service,
    MyInput,
    MyButton,
    MyTip
  },
  beforeDestroy() {}
};
</script>
<style scoped>
.buy {
  height: 100vh;
  background: white;
  position: relative;
}
.inputcontainer {
  padding: 0.58rem 0.18rem 0rem;
  background: white;
  box-sizing: border-box;
}
.bank {
  background: white;
  padding: 0 0.18rem 0.3rem;
  border-bottom: 1px solid #c7d9fd;
}
.bank img {
  width: 0.22rem;
  vertical-align: middle;
}
.bank span {
  display: inline-block;
  font-size: 0.2rem;
  color: #4a4a4a;
  vertical-align: middle;
}
.buy h3 {
  font-size: 0.16rem;
  color: #48484a;
  padding: 0.66rem 0.18rem 0.3rem;
  background: white;
  box-sizing: border-box;
}
.btncontainer {
  text-align: center;
  padding-top: 0.68rem;
}
.service {
  position: absolute;
  bottom: 0.46rem;
  left: 0;
  width: 100%;
}
</style>