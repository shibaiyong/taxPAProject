<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/img/logoandword.png" />
    </div>

    <div class="dropdown">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          下拉菜单
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">黄金糕</el-dropdown-item>
          <el-dropdown-item command="b">狮子头</el-dropdown-item>
          <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled command="d">双皮奶</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
    }
  },
  computed: {},
  mounted() {},
  beforeDestroy() {}
};
</script>
<style scoped>
.header .logo {
  color: white;
}
.header {
  padding: 20px 30px;
  background: #4259a7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}
.el-dropdown-link {
    cursor: pointer;
    color:white;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>