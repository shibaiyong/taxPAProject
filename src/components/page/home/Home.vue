<template>
  <div class="home">

    <div class="banner">
      <swiper :options="horizontalSwiperOption" ref="horizontalSwiper" @someSwiperEvent="callback">
        <swiper-slide>
          <img src="@/assets/img/banner@2x.png" />
        </swiper-slide>
      </swiper>
    </div>
    <div class="noticeContainer">
      <div class="noticeIco">
        <img src="@/assets/img/notice@2x.png" />
      </div>
      <div class="notice">
        <swiper :options="verticalSwiperOption" ref="verticalSwiper" @someSwiperEvent="callback">
          <swiper-slide>I'm Slide 1I'm Slide 1</swiper-slide>
          <swiper-slide>好好好好好好好好好好好好好</swiper-slide>
        </swiper>
      </div>
      <div class="goIntoDet">
        <i class="mintui mintui-back" />
      </div>
    </div>

    <div class="goodsSummary">
      <h3>如意宝</h3>
      <ul>
        <li>
          <span class="percent">{{annualrate}}</span>
          <span class="percentico">%</span>
        </li>
        <li class="incomerate">近七日年化收益率</li>
        <li class="feature">
          <span>存取灵活</span>
          <span>快速到账</span>
          <span>低风险</span>
        </li>
        <li>
          <MyButton @click.native="gotoPage('ProductInfo')"></MyButton>
        </li>
      </ul>
    </div>

    <div class="advertising">
      <div class="advertising_item" v-for="item in advertising" :key="item.id">
        <img :src="item.img" />
        <dl>
          <dt>{{item.slogan}}</dt>
          <dd>{{item.explain}}</dd>
        </dl>
      </div>
    </div>
    <div class="service">
        <Service/>
    </div>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import Service from "@/components/base/Service.vue"
import MyFooter from "@/components/base/MyFooter"
import MyButton from "@/components/base/MyButton"
import "swiper/dist/css/swiper.css"
import MyHeader from "@/components/base/MyHeader"
import { swiper, swiperSlide } from "vue-awesome-swiper"
import { ProdInfoQuery } from "@/requestDataInterface"

export default {
  props: {},
  data() {
    return {
      horizontalSwiperOption: {
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        speed: 300
      },

      verticalSwiperOption: {
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        direction: "vertical",
        speed: 300,
        height: 40
      },
      advertising:[
        { id: 1, img: '/static/img/lowthreshold@2x.png', slogan: '低门槛', explain:'1分钱即可购买'},
        { id: 2, img: '/static/img/lowrisk@2x.png', slogan: '低风险', explain:'资金随存随取'},
        { id: 3, img: '/static/img/morestable@2x.png', slogan: '更稳定', explain:'民生银行代销'},
        { id: 4, img: '/static/img/moresafe@2x.png', slogan: '更安全', explain:'资金直进银行'}
      ],
      annualrate:'-'
    }
  },
  created() {},
  methods: {
    callback() {},
    destroySwiper() {
      let instance = this.$refs.horizontalSwiper.swiper;
      if (instance.slides.length == 1) {
        instance.destroy();
      }
    },
    gotoPage( url ){
      this.$router.push({ name: url, params: { userid: "123" } });
    },
    queryAnnualRate(){
      ProdInfoQuery().then(res => {

        console.log(res)
        
      }
      ).catch(err => console.log(err))
    }
  },
  computed: {

  },
  mounted() {
   this.queryAnnualRate()
  },
  components: {
    MyHeader,
    swiper,
    swiperSlide,
    MyButton,
    Service,
    MyFooter
  },
  beforeDestroy() {

  }
};
</script>
<style scoped>
.notice {
  height: 40px;
  overflow: hidden;
  margin-left: 0.18rem;
  width: 100%;
}

.banner {
  padding: 0 0.07rem;
  box-sizing: border-box;
  background: white;
}
.banner img {
  width: 100%;
}

.noticeContainer {
  padding: 0 0.3rem;
  display: flex;
  align-items: center;
  font-size: 0.12rem;
  justify-content: space-between;
  background: white;
}
.noticeContainer .noticeIco img {
  width: 0.17rem;
}
.goIntoDet {
  transform: rotateZ(180deg);
}
.goodsSummary {
  width: 92%;
  background: white;
  border-radius: 6px;
  margin: 0 auto;
  margin-top: 0.11rem;
  margin-bottom: 0.11rem;
  padding: 0.21rem 0 0.19rem;
  box-sizing: border-box;
}
.goodsSummary h3 {
  font-size: 0.17rem;
  margin-left: 0.31rem;
  border-left: 4px solid rgb(57, 101, 255);
  padding-left: 0.08rem;
  box-sizing: border-box;
}

.goodsSummary .incomerate {
  font-size: 0.12rem;
  margin-bottom: 0.19rem;
}
.goodsSummary .feature span:nth-child(1) {
  padding-right: 0.3rem;
}
.goodsSummary .feature span:nth-child(3) {
  padding-left: 0.3rem;
}
.goodsSummary .feature {
  font-size: 0.13rem;
  color: rgb(57, 101, 255);
  margin-bottom: 0.19rem;
}
.goodsSummary .feature span:nth-child(2) {
  padding: 0 0.3rem;
  border-left: 1px solid rgba(57, 101, 255, 0.6);
  border-right: 1px solid rgba(57, 101, 255, 0.6);
}
.goodsSummary .percent {
  font-size: 0.32rem;
  color: rgb(255, 96, 0);
}
.goodsSummary .percentico {
  font-size: 0.18rem;
  color: rgb(255, 96, 0);
}
.goodsSummary ul {
  font-size: 0px;
  text-align: center;
}
.goodsSummary ul li:nth-child(1) {
  margin-bottom: 0.1rem;
}

.advertising{
  background:white;
  display:flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  padding:0.3rem 0;
}
.advertising img{
  width:0.27rem;
}
.advertising .advertising_item{
  font-size:12px;
  width:40%;
}
.advertising .advertising_item:nth-child(n+3){
  margin-top:0.32rem;
}

.advertising dl{
  display:inline-block;
  vertical-align: middle;
  margin-left:0.08rem;
}

.advertising dl dt{
  font-size:0.14rem;
  color:black;
  margin-bottom: 0.08rem;
}
.advertising dl dd{
  font-size:0.12rem;
  color:rgb(73,73,73)
}

.service{
  margin-bottom: 0.7rem;
}

</style>