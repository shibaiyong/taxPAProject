<template>
  <div class="protocoldetail">
    <Header :errorpage="false"/>
    <el-row>
      <ul>
        <li>哎呀，出错了！您访问的页面不存在......</li>
        <li><img src="@/assets/img/404.png"/></li>
        <li>你可以通过以下方式继续访问</li>
        <li><el-button size="small" @click="goHome">访问首页</el-button><el-button size="small" @click="goBack">返回上一页</el-button></li>
      </ul>
    </el-row>
  </div>
</template>

<script>

import Header from "@/components/base/Header"
export default {
  name: "nofound",
  data() {
    return {
      
    }
  },
  created() {},
  methods: {
    goBack(){
      this.$router.go(-1)
    },
    goHome(){
      this.$router.push('/home/commercialcustom')
    }
  },
  mounted() {},
  components: {
    Header
  }
}
</script>
<style scoped>
  ul{
    margin-top:40px;
  }
  ul li{
    text-align: center;
    color:#679efc;
    font-size:22px;
  }
  ul li:nth-child(2){
    margin:55px 0 80px 0;
  }
  ul li:nth-child(3){
    margin-bottom:30px;
  }
  ul li:nth-child(4) >>> .el-button{
    margin:0 56px;
    background:#5e8ddb;
    color:white;
  }
</style>