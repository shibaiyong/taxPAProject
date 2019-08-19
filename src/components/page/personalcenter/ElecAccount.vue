<template>
  <div class="elecaccount">
    <MyHeader title="电子账户信息" />
    <div class="accountdes">
      <ul>
        <li>
          <img src="@/assets/img/elecaccount/minshenglogo@2x.png" />
          <span>民生银行电子账户</span>
        </li>
        <li>6150 1922 4130 1099</li>
        <li>
          <span>绑定的银行卡</span>&nbsp;
          <span>中信银行</span>&nbsp;
          <span>（9151）</span>
        </li>
      </ul>
    </div>
    <div class="decoraterect"></div>
    <div class="decorateline">
      <img src="@/assets/img/elecaccount/decorateleft@2x.png" />
      <span>提示</span>
      <img src="@/assets/img/elecaccount/decorateright@2x.png" />
    </div>
    <div class="explain">
        <img src="@/assets/img/elecaccount/itemsign@2x.png"/>
        绑定的银行卡是指你在购买如意宝时在民生银行申请开立电子账户时关联绑定的银行卡。
    </div>
    <div class="service">
      <Service />
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/base/MyHeader.vue";

import Service from "@/components/base/Service.vue";
export default {
  name: "ElecAccount",
  props: {},
  data() {
    return {
      btnStyle: {
        width: "100%",
        height: "0.4rem",
        background: "#ddd",
        // background: "#3965ff",//输入状态根据短息验证码是否获取到
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
    Service
  },
  beforeDestroy() {}
};
</script>
<style scoped>
.decoraterect {
  background: #e4ecfd;
  height:0.1rem;
}
.elecaccount {
  height: 100vh;
  background: white;
  position: relative;
}
.accountdes {
  width: 100%;
  height: 2rem;
  margin-top: 0.18rem;
  background: url(../../../assets/img/elecaccount/cardbanner@2x.png) no-repeat
    0.04rem center;
  background-size: 100%;
  color: white;
  padding: 0.25rem 0 0 0.4rem;
  box-sizing: border-box;
  letter-spacing: 2px;
}
.accountdes li:nth-child(1) {
  margin-bottom: 0.36rem;
}
.accountdes li:nth-child(1) img {
  width: 0.25rem;
  margin-right: 0.12rem;
}
.accountdes li:nth-child(1) span {
  font-size: 0.16rem;
}

.accountdes li:nth-child(2) {
  font-size: 0.24rem;
  margin-bottom: 0.36rem;
}

.accountdes li:nth-child(3) {
  font-size: 0.14rem;
}

.decorateline {
  text-align: center;
  font-size: 0.16rem;
  color: #3965ff;
  margin:0.46rem 0 0.2rem;
}

.decorateline img {
  width: 1.22rem;
  vertical-align: middle;
}
.decorateline span {
  display: inline-block;
  vertical-align: middle;
  margin: 0 0.12rem;
}
.explain{
    padding-left: 0.5rem;
    padding-right: 0.38rem;
    box-sizing: border-box;
    font-size:0.12rem;
    color:#6c7382;
    letter-spacing: 1px;
    position:relative;
}
.explain img{
    width:0.12rem;
    position:absolute;
    left:0.3rem;
    top:0.03rem;
}
.service {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0.3rem;
}
</style>