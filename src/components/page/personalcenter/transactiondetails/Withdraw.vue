<template>
  <div class="withdrawfail">
    <MyHeader title="筛选" />
    <div class="amountmoney">
      <ul>
        <li>{{statusText}}</li>
        <li>
          <span>￥</span>
          <span>1,000.00</span>
        </li>
      </ul>
    </div>
    <div class="process">
      <div class="process-item submit">
        <dl>
          <dt>提交取出申请</dt>
          <dd>2019年9月4日 17:00</dd>
        </dl>
        <img src="@/assets/img/dotactive@2x.png" class="dotactive" />
        <img src="@/assets/img/line@2x.png" class="line" v-show="!processing" />
        <img src="@/assets/img/lineactive@2x.png" class="lineactive" v-show="processing" />
      </div>
      <div class="process-item processing">
        <span>银行处理中</span>
        <img src="@/assets/img/dotactive@2x.png" class="dotactive" v-show="processing" />
        <img src="@/assets/img/lineactive@2x.png" class="lineactive" v-show="finnal" />
        <img src="@/assets/img/dot@2x.png" class="dot" v-show="!processing" />
        <img src="@/assets/img/line@2x.png" class="line" v-show="!finnal" />
      </div>
      <div class="process-item finnal">
        <span :class="{'finnaltime':true,'time':!finnal}">{{buyStatusText}}</span>
        <span class="time">2019年9月4日 17:00</span>
        <span class="error" v-show="false">账户余额不足</span>
        <img src="@/assets/img/dotactive@2x.png" class="dotactive" v-show="finnal" />
        <img src="@/assets/img/dot@2x.png" class="dot" v-show="!finnal" />
      </div>
    </div>
    <div class="gooddetails">
      <ul>
        <li>
          <span>取出产品</span>
          <span>如意宝</span>
        </li>
        <li>
          <span>取出方式</span>
          <span>中信银行（9151）</span>
        </li>
        <li>
          <span>交易单号</span>
          <span>3444556677899999</span>
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
import MyFooter from "@/components/base/MyFooter.vue";
import Service from "@/components/base/Service.vue";
export default {
  name: "Widthdraw",
  props: {},
  data() {
    return {
      statusText: "取出处理中",
      buyStatusText: "已完成",
      processing: false,
      finnal: false
    };
  },
  created() {},
  methods: {
    changeStatus() {
      let status = "0"
      if (status == "1") {
        this.processing = true
      } else if (status == "2") {
        this.processing = true
        this.finnal = true
      }
    }
  },
  computed: {},
  mounted() {
    this.changeStatus();
  },
  components: {
    MyHeader,
    MyFooter,
    Service
  },
  beforeDestroy() {}
};
</script>
<style scoped>
.amountmoney {
  font-size: 0.15rem;
  text-align: center;
  padding: 0.23rem 0 0.17rem;
  background: white;
  margin-top: 0.1rem;
}
.amountmoney ul li {
  font-size: 0.15rem;
  color: #333;
}
.amountmoney ul li:nth-child(1) {
  margin-bottom: 0.17rem;
}
.amountmoney ul li:nth-child(2) span:nth-child(1) {
  font-size: 0.21rem;
  color: #333;
}
.amountmoney ul li:nth-child(2) span:nth-child(2) {
  font-size: 0.35rem;
  color: #333;
}
.gooddetails {
  font-size: 0.16rem;
  padding: 0.18rem 0.26rem;
  box-sizing: border-box;
  background: white;
}
.gooddetails ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.14rem;
  padding-bottom: 0.18rem;
}
.gooddetails ul li span:nth-child(1) {
  color: #999;
}
.process {
  padding: 0 0.26rem;
  box-sizing: border-box;
  background: white;
}

.process-item {
  height: 0.72rem;
  font-size: 0.16rem;
  color: black;
  position: relative;
}
.process-item img {
  position: absolute;
}

.process-item .dotactive {
  width: 0.24rem;
  top: 0;
  left: 0;
}
.process-item .dot {
  width: 0.18rem;
  top: 0.03rem;
  left: 0.03rem;
}

.process-item .lineactive,
.process-item .line {
  height: 0.42rem;
  top: 0.27rem;
  left: 0.12rem;
}

.process-item.submit .dotactive {
  top: 0.3rem;
}

.process-item.submit .line,
.process-item.submit .lineactive {
  top: 0.57rem;
}

.process-item.submit {
  border-top: 1px solid #d3d4ff;
  padding-top: 0.3rem;
}
.process-item dl,
.process-item span {
  display: block;
  margin-left: 0.3rem;
}

.process-item dl dt {
  font-size: 0.16rem;
}
.process-item dl dd {
  font-size: 0.14rem;
  color: #999;
}
.service {
  margin-top: 0.2rem;
}
.error {
  color: #f91515;
  font-size: 0.14rem;
  margin-top: 0.02rem;
}
.time {
  color: #999;
  font-size: 0.14rem;
}
.finnaltime {
  font-size: 0.16rem;
}
</style>