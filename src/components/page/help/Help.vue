<template>
  <div class="help">
    <MyHeader title="帮助中心" />
    <div class="mui-card">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-collapse">
          <a class="mui-navigate-right" href="#">
            <img src="@/assets/img/question@2x.png" />投资目标
          </a>
          <div class="mui-collapse-content">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;注册成为卡小邦信用卡推广员之后，关注微信公众号“卡小邦”，点击“威客中心”-“生成推广码”，员工可通过分享办卡二维码或办卡链接的方式，邀请好友办卡。</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="mui-card">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-collapse">
          <a class="mui-navigate-right" href="#">
            <img src="@/assets/img/question@2x.png" />资产配置
          </a>
          <div class="mui-collapse-content">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;A、办卡记录的查询：点击“威客中心”--“邀请记录”-可查看所有邀请用户的办卡记录。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;B、已建档：是指用户点击银行的办卡链接的时间，不代表已经办卡成功。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;C、成功核卡的查询：“邀请记录”中“办卡状态”点击“筛选”--选择“已完成”，查询核卡成功的数据。</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="mui-card">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-collapse">
          <a class="mui-navigate-right" href="#">
            <img src="@/assets/img/question@2x.png" />风险提示
          </a>
          <div class="mui-collapse-content">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;A、办卡记录的查询：点击“威客中心”--“邀请记录”-可查看所有邀请用户的办卡记录。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;B、已建档：是指用户点击银行的办卡链接的时间，不代表已经办卡成功。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;C、成功核卡的查询：“邀请记录”中“办卡状态”点击“筛选”--选择“已完成”，查询核卡成功的数据。</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="service">
      <Service/>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/base/MyHeader.vue";
import Service from "@/components/base/Service.vue";
export default {
  name: "Help",
  props: {},

  data() {
    return {};
  },
  updated() {},
  created() {},
  methods: {},
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
.help{
  position:relative;
  height:100vh;
}
.help .mui-card a img {
  margin-right: 0.1rem;
  width: 0.4rem;
  height: 0.4rem;
}

.service {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0.3rem;
}


</style>