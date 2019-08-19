<template>
  <div class="personalcenter">
    <MyHeader title="个人中心" />
    <div class="assetscontainer">
        <div class="assetscard">
            <ul>
                <li>
                    <div>
                        <span>总资产（元）</span>
                        <img src="@/assets/img/visible@2x.png" alt="" @click="changeStatus" v-show="visible">
                        <img src="@/assets/img/unvisible@2x.png" alt="" @click="changeStatus" v-show="!visible">
                    </div>
                    <div class="withdrawl">提现</div>
                </li>
                <li><span v-show="visible">2,000.00</span><span v-show="!visible">&#x2A;&#x2A;&#x2A;&#x2A;</span></li>
                <li>
                    <div><span>昨日收益</span><span v-show="visible">+666</span><span v-show="!visible">&#x2A;&#x2A;&#x2A;&#x2A;</span></div>
                    <div><span>累计收益</span><span v-show="visible">+666</span><span v-show="!visible">&#x2A;&#x2A;&#x2A;&#x2A;</span></div>
                </li>
            </ul>
        </div>
    </div>

    <div class="permenulist">
        <ul>
            <li><span>交易明细</span><img src="@/assets/img/rightarow@2x.png"></li>
            <li><span>收益明细</span><img src="@/assets/img/rightarow@2x.png"></li>
            <li><span>电子账户</span><img src="@/assets/img/rightarow@2x.png"></li>
            <li><span>设置</span><img src="@/assets/img/rightarow@2x.png"></li>
        </ul>
    </div>
    <div class="service">
        <Service/>
    </div>
    
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyHeader from "@/components/base/MyHeader.vue";
import MyFooter from "@/components/base/MyFooter.vue";
import Service from "@/components/base/Service.vue"
export default {
  name: "PersonalCenter",
  props: {},
  data() {
    return {
        visible:true,
        isshow:''
    };
  },
  created() {},
  methods: {
      changeStatus(){
        this.visible = !this.visible
      }
  },
  computed: {},
  mounted() {},
  components: {
    MyHeader,
    MyFooter,
    Service
  },
  beforeDestroy() {}
};
</script>
<style scoped>



.personalcenter .assetscontainer{

    padding:0.2rem 0.15rem 0.3rem;
    box-sizing: border-box;
    background:white;

}

.personalcenter .assetscard{
    font-size:0.14rem;
    padding:0.2rem 0 0.24rem;
    border-radius: 0.10rem;
} 
.personalcenter .assetscard{
    font-size:0.14rem;
    background:#3964fe;
    color:white;
}
.personalcenter .assetscard li:nth-child(1){
    
    display: flex;
    justify-content: space-between;
    padding:0 0.24rem;
    box-sizing: border-box;

}  
.personalcenter .assetscard li:nth-child(1) img{
    width:0.21rem;
    margin-left:0.1rem;
}

.personalcenter .assetscard li:nth-child(2){
    text-align: center;
    font-size:0.3rem;
    padding:0.22rem 0 0.27rem;
}

.personalcenter .assetscard li:nth-child(3){
    display:flex;
    justify-content: space-between;
    padding:0 0.28rem;
    box-sizing: border-box;
}

.personalcenter .assetscard .withdrawl{
    font-size:0.14rem;
    color:#e5effe;
    padding:0.04rem 0.12rem;
    border-radius: 0.12rem;
    background:rgba(255,255,255,0.2);
}

.permenulist{
    margin-top:0.15rem;
}

.permenulist ul li{
    font-size:0.16rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0.12rem 0.2rem 0.12rem 0.4rem;
    box-sizing: border-box;
    margin-bottom: 0.1rem;
    
}
.permenulist ul li img{
    width:0.08rem;
    height: 0.14rem;
}

.permenulist ul li:nth-child(1){
    background:white url(../../../assets/img/transacdetail@2x.png) no-repeat 0.15rem center;
    background-size:0.16rem;
}
.permenulist ul li:nth-child(2){
    background:white url(../../../assets/img/incomedetail@2x.png) no-repeat 0.15rem center;
    background-size:0.16rem;
}
.permenulist ul li:nth-child(3){
    background:white url(../../../assets/img/electronic@2x.png) no-repeat 0.15rem center;
    background-size:0.16rem;
}
.permenulist ul li:nth-child(4){
    background:white url(../../../assets/img/setting@2x.png) no-repeat 0.15rem center;
    background-size:0.16rem;
}

.service{
    margin-top:0.5rem;
}
</style>