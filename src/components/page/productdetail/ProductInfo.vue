<template>
  <div class="productinfo">
    <MyHeader title="个人中心" />

    <mt-navbar v-model="selected">
      <mt-tab-item id="1">万份收益（元）</mt-tab-item>
      <mt-tab-item id="2">七日年化收益率（%）</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="echartcontainer" id="income"></div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="echartcontainer" id="incomerate"></div>
      </mt-tab-container-item>
    </mt-tab-container>

    <div class="product productrecord">
      <h3>产品介绍</h3>
      <ul>
        <li>
          <span>交易规则</span>
          <span>随时可买</span>
        </li>
        <li>
          <span>收益方式</span>
          <span>T日15:00前买入，T+1日计算收益，T+2显示首日收益；T日15:00后买入，T+2日计算收益，T+3日显示首日收益（T为工作日）</span>
        </li>
        <li>
          <span>快速取出</span>
          <span>随时可取实时到账</span>
        </li>
        <li>
          <span>普通取出</span>
          <span>随时可取实时到账随时可取实时到账</span>
        </li>
      </ul>
    </div>

    <div class="product productdes">
      <h3>产品档案</h3>
      <ul>
        <li>
          <span>基金名称</span>
          <span>民生加银现金宝货币市场基金</span>
        </li>
        <li>
          <span>基金代码</span>
          <span>000371</span>
        </li>
        <li>
          <span>基金管理人员</span>
          <span>民生加银基金管理有限公司</span>
        </li>
      </ul>
    </div>

    <div class="mui-card">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-collapse">
          <a class="mui-navigate-right" href="#">投资目标</a>
          <div class="mui-collapse-content">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;注册成为卡小邦信用卡推广员之后，关注微信公众号“卡小邦”，点击“威客中心”-“生成推广码”，员工可通过分享办卡二维码或办卡链接的方式，邀请好友办卡。</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="mui-card">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-collapse">
          <a class="mui-navigate-right" href="#">资产配置</a>
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
          <a class="mui-navigate-right" href="#">风险提示</a>
          <div class="mui-collapse-content">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;A、办卡记录的查询：点击“威客中心”--“邀请记录”-可查看所有邀请用户的办卡记录。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;B、已建档：是指用户点击银行的办卡链接的时间，不代表已经办卡成功。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;C、成功核卡的查询：“邀请记录”中“办卡状态”点击“筛选”--选择“已完成”，查询核卡成功的数据。</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="permenulist">
      <ul>
        <li>
          <span>常见问题</span>
          <div>
            更多
            <img src="@/assets/img/rightarow@2x.png" />
          </div>
        </li>
      </ul>
    </div>

    <div class="btncontainer">
      <MyButton :btnStyle="btnStyle" @click.native="gotoSite" />
    </div>

    <div class="service">
      <Service />
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/base/MyHeader.vue"
import Service from "@/components/base/Service.vue"
import MyButton from "@/components/base/MyButton"
import { ProdInfoHisQuery } from "@/requestDataInterface"

export default {
  name: "ProductInfo",
  props: {},
  data() {
    return {
      selected: "1",
      serisedataRate: [],
      serisedataProfit: [],
      xaxisdata: [],
      btnStyle: {
        width: "92%",
        height: "0.48rem",
        background: "#3a65ff",
        borderRadius: "0.24rem",
        color: "white"
      }
    };
  },
  created() {
    
  },
  methods: {
    changeStatus() {
      this.visible = !this.visible
    },
    gotoSite() {
      this.$router.push({ name: "EnterRealInfo", params: { userid: "123" } })
    },
    setSerise( data ) {
      let arr = []
      let brr = []
      let crr = []
      
      for(var i = 0; i < data.length; i++){
        let item = data[i]
        arr.push( 100 * item.AnnualReturnBy7 )
        brr.push( item.ProfitPerAcc )
        crr.push( item.NavDate.slice(6)+'/'+item.NavDate.slice(4,6) )
      }
      this.serisedataRate = [
        {
          name: "",
          type: "line",
          data: arr
        }
      ]
      this.serisedataProfit = [
        {
          name: "",
          type: "line",
          data: brr
        }
      ]

      this.initeEcharts("incomerate",crr,this.serisedataRate)
      this.initeEcharts("income",crr,this.serisedataProfit)
    },

    setXaxisData() {
      return ["06/11", "06/12", "05/14", "09/17", "10/19", "13/17", "13/17"]
    },
    setOption(xdata, serisedata) {
      return {
        title: {
          text: "收益趋势%"
        },
        tooltip: {},
        legend: {
          // data: ["销量"]
        },
        xAxis: {
          type: "category",
          data: xdata
        },
        yAxis: {
          type: "value"
        },
        series: serisedata
      };
    },
    initeEcharts(id,xdata,serisedata) {
      let myChart = echarts.init(document.getElementById(id))
      myChart.setOption(this.setOption(xdata,serisedata))
    },
    queryProdInfoHis() {
      ProdInfoHisQuery()
        .then(res => {
          console.log(res)
          if(res.success){
            this.setSerise(res.result.List)
          }
        })
        .catch()
    }
  },
  computed: {},
  mounted() {
    
    this.queryProdInfoHis()
    
  },
  components: {
    MyHeader,
    Service,
    MyButton
  },
  watch: {
    selected(val) {
      console.log(val);
    }
  },
  beforeDestroy() {}
};
</script>
<style scoped>
.service {
}
.echartcontainer {
  width: 4rem;
  height: 2.2rem;
  margin: 0 auto;
  background: white;
  padding-top: 0.2rem;
}
.mui-card {
  margin: 0;
}
.product {
  background: white;
  padding: 0.2rem 0.16rem;
  box-sizing: border-box;
}
.product ul li {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 0.24rem;
}
.product ul li span:nth-child(2) {
  margin-left: 0.18rem;
  display: inline-block;
  color: #656565;
  font-size: 0.15rem;
}
.product ul li span:nth-child(1) {
  display: inline-block;
  font-size: 0.17rem;
  color: #181818;
}
.product.productrecord ul li:nth-child(2) span:nth-child(1) {
  width: 0.7rem;
}
.product.productrecord ul li:nth-child(2) span:nth-child(2) {
  width: 2.5rem;
}
.product h3 {
  font-size: 0.2rem;
  color: #181818;
  margin-bottom: 0.4rem;
  border-left: 3px solid #3964fe;
  padding-left: 0.07rem;
}

.product.productdes ul li {
  margin-bottom: 0px;
  justify-content: space-between;
  padding: 0.12rem 0;
  /* border-bottom:1px solid #c7d9fd; */
}

.mui-card .mui-navigate-right {
  font-size: 0.17rem;
}

.permenulist {
  position: relative;
  background: white;
  z-index: 9999;
  padding-bottom: 0.3rem;
}

.permenulist ul {
  border-bottom: 1px solid #c7d9fd;
}

.permenulist ul li {
  font-size: 0.16rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.12rem 0.2rem 0.12rem 0.16rem;
  box-sizing: border-box;
  margin-bottom: 0.1rem;
}
.permenulist ul li img {
  width: 0.08rem;
  height: 0.14rem;
  vertical-align: middle;
  margin-left: 0.08rem;
}

.btncontainer {
  padding: 0 0.16rem;
  box-sizing: border-box;
  margin-top: 0.33rem;
}
</style>