<template>
  <div class="navbar" ref="navbar">
    
        <el-menu
          :default-active="checkedItem"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/home/operatemanage">权限管理</el-menu-item>
            <el-menu-item index="/home/rolemanage">角色管理</el-menu-item>
            <el-menu-item index="/home/usermanage">用户管理</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>导航二</span>
            </template>
            <el-menu-item index="1-1">选项21</el-menu-item>
            <el-menu-item index="1-2">选项22</el-menu-item>
            <el-menu-item index="1-3">选项23</el-menu-item>
          </el-submenu>
        </el-menu>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      checkedItem:''
    }
  },
  created() {
    this.checkedItem = sessionStorage.getItem('path')
  },
  methods: {
    handleSelect(index) {
    },
    ajustHeight(){
        let windowH = window.innerHeight
        this.$refs.navbar.style.height = (windowH - 60 - 1 ) + 'px' 
    }
  },
  computed: {},
  mounted() {
      this.ajustHeight()
  },
  beforeDestroy() {}
};
</script>
<style scoped>
.navbar{
    background:rgb(84, 92, 100)
}
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
  color: white;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>