<template>
  <div class="noticedetail">
    <MyHeader title="公告详情" />
    <div class="noticecontainer">
      <h3>针对信息贩子利用平台进行诈骗采取措施</h3>

      <div class="content">
        <p>基金管理人声明：基金管理人是中华人民共和国境内依据《证券投资基金法》规定所设立的，证券投资基金管理公司或取得公开募集基金资格的机构。基金管理人委托民生银行代理销售相关基金并进行销售资金支付结算。</p>
        <p>基金管理人遵守有关法律法规、规章制度，并按本协议的约定为投资者提供相关服务。</p>
      </div>
      <div class="bottomtime">此公告发布于2019.2.15</div>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/base/MyHeader.vue";
export default {
  name: "NoticeDetail",
  props: {},
  data() {
    return {
      visible: true,
      isshow: ""
    };
  },
  created() {},
  methods: {
    
  },
  computed: {},
  mounted() {},
  components: {
    MyHeader
  },
  beforeDestroy() {}
};
</script>
<style scoped>
.noticecontainer{
    padding:0.38rem 0.16rem 0.25rem;
    box-sizing:border-box;
    background:white;
}

   .noticedetail h3{
       font-size:0.18rem;
       color:#202020;
       padding-bottom:0.2rem;
   }
   .noticedetail .bottomtime{
       text-align: right;
       font-size: 0.14rem;
       color:#202020;
   }
   .noticedetail .content p{
       padding-bottom:0.2rem;
       color:#202020;
       font-size:0.14rem;
   }
</style>