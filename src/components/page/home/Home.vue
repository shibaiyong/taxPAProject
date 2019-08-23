<template>
  <div class="home">
    <el-row>
      <el-col :span="24">
        <Header />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <NavBar />
      </el-col>
      <el-col :span="20">

        <Bread />

        <router-view></router-view>

      </el-col>
    </el-row>

    
  </div>
</template>

<script>

import Header from "@/components/base/Header";
import NavBar from "@/components/base/NavBar";
import Bread from "@/components/base/Bread";
export default {
  props: {},
  data() {
    return {
      
    }
  },
  created() {},
  methods: {
    
  },
  computed: {},
  mounted() {},
  components: {
    Header,
    NavBar,
    Bread
  }
};
</script>
<style scoped>

</style>