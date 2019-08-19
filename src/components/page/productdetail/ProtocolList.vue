<template>
  <div class="personalcenter">
    <MyHeader title="相关协议" />

    <div class="permenulist">
      <ul>
        <li>
          <span>“如意宝”货币基金业务服务协议</span>
          <img src="@/assets/img/rightarow@2x.png" />
        </li>
        <li>
          <span>《中国民生银行个人人民币银行结算账户管理协议》</span>
          <img src="@/assets/img/rightarow@2x.png" />
        </li>
        <li>
          <span>《跨行通协议》</span>
          <img src="@/assets/img/rightarow@2x.png" />
        </li>
      </ul>
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
  name: "PersonalCenter",
  props: {},
  data() {
    return {
      visible: true,
      isshow: ""
    };
  },
  created() {},
  methods: {
    changeStatus() {
      this.visible = !this.visible;
    }
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

.permenulist {
  margin-top: 0.15rem;
  padding:0 0.16rem;
  box-sizing:border-box;
  background:white;
}

.permenulist ul li {
  font-size: 0.16rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.33rem 0;
  box-sizing: border-box;
}

.permenulist ul li+li{
  
  border-top:1px solid #c7d9fd
  
}

.permenulist ul li img {
  width: 0.08rem;
  height: 0.14rem;
}

.service {
  position:fixed;
  bottom:10px;
  left:0;
  width:100%;
}

</style>