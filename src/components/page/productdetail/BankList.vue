<template>
  <div class="banklistcontainer">
    <MyHeader title="银行列表" url="/enterrealinfo"/>
    <div class="banklist">
      <div class="bankitem">
        <img src="@/assets/img/banklist/zhongguo@2x.png" />
        <span>中国银行</span>
      </div>
      
      
      <div class="bankitem">
        <img src="@/assets/img/banklist/jianshe@2x.png" />
        <span>中国建设银行</span>
      </div>
      <div class="bankitem">
        <img src="@/assets/img/banklist/guangda@2x.png" />
        <span>中国光大银行</span>
      </div>
      <div class="bankitem">
        <img src="@/assets/img/banklist/youchu@2x.png" />
        <span>邮政储蓄银行</span>
      </div>
      <div class="bankitem">
        <img src="@/assets/img/banklist/huaxia@2x.png" />
        <span>华夏银行</span>
      </div>
    </div>

    <div class="service">
      <Service />
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/base/MyHeader.vue"
import Service from "@/components/base/Service.vue"

export default {
  name: "BankList",
  props: {},
  data() {
    return {}
  },
  created() {},
  methods: {
    OccupationListQuery(){
      OccupationListQuery().then(
        res => {
          console.log(res)
        }
      ).catch(
        err => {console.log(err)}
      )
    }
  },

  mounted() {
    this.OccupationListQuery()
  },
  components: {
    MyHeader,
    Service
  },
  beforeDestroy() {}
};
</script>
<style scoped>
.banklistcontainer{
  background:white;
  height:100vh;
  position:relative;
}
.banklist{
  padding:0.1rem 0.2rem 0;
  box-sizing: border-box;
  border-top:1px solid #e1dddd;
}
.banklistcontainer .banklist .bankitem{
  display:flex;
  align-items: center;
  padding:0.17rem 0rem;
  box-sizing: border-box;
  border-bottom:1px solid #c7d9fd;
}
.banklistcontainer .banklist .bankitem img{
  width:0.38rem;
  margin-right:0.22rem;
}

.service{
  position:absolute;
  width:100%;
  left:0;
  bottom: 0.1rem;
}
</style>