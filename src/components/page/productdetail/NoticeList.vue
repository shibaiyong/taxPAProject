<template>
  <div class="personalcenter">
    <MyHeader title="相关协议" />
    <div class="permenulistcontainer">
      <div class="permenulist">
        <ul>
          <li>
            <span>春节清算时间调整通知</span>
            <span>2018-02-07</span>
          </li>
          <li>
            <p>
              定义：中国民生银行股份有限公司（下称“乙方”）“跨行通”业务是指利
              用乙方资金结算系统与第三方机构跨行网上批量代扣系统，将甲方本人在他行开
              立的人民币结算账户中的资金，代扣至其开立在乙方的结算账户中。“跨行通”
              扣款可由甲方本人实时发起，也可授权乙方通过“跨行通”系统发起代扣款指
              令，实现甲方资金转入。
            </p>
          </li>
        </ul>
      </div>
      <div class="permenulist">
        <ul>
          <li>
            <span>春节清算时间调整通知</span>
            <span>2018-02-07</span>
          </li>
          <li>
            <p>
              定义：中国民生银行股份有限公司（下称“乙方”）“跨行通”业务是指利
              用乙方资金结算系统与第三方机构跨行网上批量代扣系统，将甲方本人在他行开
              立的人民币结算账户中的资金，代扣至其开立在乙方的结算账户中。“跨行通”
              扣款可由甲方本人实时发起，也可授权乙方通过“跨行通”系统发起代扣款指
              令，实现甲方资金转入。
            </p>
          </li>
        </ul>
      </div>
      <div class="permenulist">
        <ul>
          <li>
            <span>春节清算时间调整通知</span>
            <span>2018-02-07</span>
          </li>
          <li>
            <p>
              定义：中国民生银行股份有限公司（下称“乙方”）“跨行通”业务是指利
              用乙方资金结算系统与第三方机构跨行网上批量代扣系统，将甲方本人在他行开
              立的人民币结算账户中的资金，代扣至其开立在乙方的结算账户中。“跨行通”
              扣款可由甲方本人实时发起，也可授权乙方通过“跨行通”系统发起代扣款指
              令，实现甲方资金转入。
            </p>
          </li>
        </ul>
      </div>
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
  name: "NoticeList",
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
.permenulistcontainer{
  
}
.permenulist {
  margin-top: 0.15rem;
  background: white;
  padding: 0.2rem 0.25rem;
  box-sizing: border-box;
}

.permenulist ul li {
  font-size: 0.16rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 0.1rem;
}

.permenulist ul li p {
  font-size: 0.12rem;
  color: #9eaac2;
}

.permenulist ul li span:nth-child(1) {
  font-size: 0.14rem;
  color: #9eaac2;
}

.permenulist ul li span:nth-child(2) {
  font-size: 0.11rem;
  color: #324563;
}

.service {
  
  width: 100%;
}
</style>