<template>
  <div class="home">

  </div>
</template>

<script>


export default {
  props: {},
  data() {
    return {
    }
  },
  created() {},
  methods: {
    
  },
  computed: {

  },
  mounted() {
   this.queryAnnualRate()
  },
  components: {
    
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