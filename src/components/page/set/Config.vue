<template>
  <div class="personalcenter">
    <MyHeader title="设置" />

    <div class="permenulist">
      <ul>
        <li>
          <span>更换银行卡</span>
          <span>
          <span>(中国银行1476)</span>
          <img src="@/assets/img/rightarow@2x.png" />
          </span>
          
        </li>
        <li>
          <span>修改手机号码</span>
          <span><span>185****1234</span><img src="@/assets/img/rightarow@2x.png" /></span>
          
        </li>
        <li>
          <span>重置交易密吗</span>
          <img src="@/assets/img/rightarow@2x.png" />
        </li>
        <li>
          <span>退出登录</span>
          
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
  name: "Set",
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
  margin-top: 0.12rem;
  padding:0 0.16rem;
  box-sizing:border-box;
  background:white;
}

.permenulist ul li {
  font-size: 0.16rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color:black;
  box-sizing: border-box;
  padding:0.14rem 0;
}
.permenulist ul li span span{
  display:inline-block;
  vertical-align: middle;
  margin-right: 0.2rem;
}

.permenulist ul li+li{
  border-top:1px solid #c7d9fd;
}

.permenulist ul li img {
  width: 0.08rem;
  height: 0.14rem;
  vertical-align: middle;
}

.service {
  position:fixed;
  bottom:10px;
  left:0;
  width:100%;
}

</style>