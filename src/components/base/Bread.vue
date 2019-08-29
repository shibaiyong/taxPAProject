<template>
  <div class="bread">
    <div class="navigator-tilte">
      <div class="title-info">{{bread[1]}}</div>
    </div>
    <div class="breadcontent">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in bread" :key="item">{{item}}</el-breadcrumb-item>
            <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
    </div>
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
    bread(){
      return this.$store.state.bread
    }
  },
  mounted() {

  },
  beforeDestroy() {}
};
</script>
<style scoped>

.navigator-tilte{
    padding:12px 0;
    background:white;
    margin-left:3%;
}

.breadcontent{
    padding:12px 0;
    box-sizing: border-box;
    margin-left:3%;
}

.title-info{
    font-size: 18px;
    color:black;
    display: inline-block;
    vertical-align: middle;
    padding:0 10px;
    border-left:4px solid #5b6fb3;
    box-sizing: border-box;
}
.bread{
    display: flex;
    align-items: center;
    width:100%;
}
</style>