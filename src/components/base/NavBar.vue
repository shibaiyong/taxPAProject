<template>
  <div class="navbar" ref="navbar">
    <!-- :default-active="checkedItem" -->
    <el-menu
      class="el-menu-vertical-demo"
      @select="handleSelect"
      router
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/home/rolemanage" :route="{path: '/home/operatemanage', query: { plan: '你好' }}">权限管理</el-menu-item>
        <el-menu-item index="/home/rolemanage" :route="{path: '/home/rolemanage', query: { plan: 'good' }}">角色管理</el-menu-item>
        <el-menu-item index="/home/usermanage" :route="{path: '/home/usermanage', query: { plan: 'very good' }}">用户管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>商户管理</span>
        </template>
        <el-menu-item index="/home/commercialcustom">商户列表</el-menu-item>
        <el-menu-item index="1-2">选项22</el-menu-item>
        <el-menu-item index="1-3">选项23</el-menu-item>
      </el-submenu> -->
      <el-submenu :index="item.id" v-for="item in permissions" :key="item.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.name}}</span>
        </template>
        <!-- <el-menu-item v-for="(subitem,subindex) in item.childrens" :ref="(index==0&&subindex==0) && 'changeActive'" @click.native="changeActive" :index="subitem.url" :route="{path: subitem.url, query: { delete: subitem.childrens[0] == 1 ? 1 : 0, edit : subitem.childrens[1] == 1 ? 1 : 0, add : subitem.childrens[2] == 1 ? 1 : 0}}" :key="subitem.id">{{subitem.name}}</el-menu-item>  -->
        <el-menu-item v-for="subitem in item.childrens" :index="subitem.vueUrl" :route="{path: subitem.vueUrl, query: { add: subitem.childrens[0]?(subitem.childrens[0].isButton == 1 ? 1 : 0):0, edit : subitem.childrens[1]?(subitem.childrens[1].isButton == 1 ? 1 : 0):0, remove : subitem.childrens[2]?(subitem.childrens[2].isButton == 1 ? 1 : 0):0}}" :key="subitem.id">{{subitem.name}}</el-menu-item> 
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>

import { getMenuList } from "@/requestDataInterface"

export default {
  props: {},
  data() {
    this.ajustHeightTimeout = null
    return {
      checkedItem: "",
      permissions:[]
    };
  },
  created() {
    //this.checkedItem = sessionStorage.getItem("path")
  },
  methods: {
    changeActive(){
      alert('hahah')
    },
    handleGetMenuList(){
      let userId = localStorage.getItem('userid')
      getMenuList({userId}).then( res => {
        if(res.success){
          this.permissions = res.result.permissions
          localStorage.setItem('navlist',JSON.stringify(res.result.permissions))
        }
      }).catch( err => {
        console.log(err)
      })
    },
    handleSelect(index) {

    },
    ajustHeight() {
      return new Promise((resolve, reject) => {
        this.ajustHeightTimeout = setTimeout(() => {
          let documentH = document.body.scrollHeight
          let windowH = window.innerHeight
          let height
          if (windowH > documentH) {
            height = windowH
          } else {
            height = documentH
          }
          this.$refs.navbar.style.height = height - 60 - 1 + "px"
          resolve()
        }, 500)
      })
    }
  },
  computed: {},
  mounted() {
    this.ajustHeight().then(res => {
      clearTimeout(this.ajustHeightTimeout)
    })
    let navlist = localStorage.getItem('navlist')

    if( false ){
      this.permissions = JSON.parse(navlist)
    }else{
      this.handleGetMenuList()
    }
  },
  beforeDestroy() {},
  watch: {
    $route(to, from) {
      this.ajustHeight().then(res => {
        clearTimeout(this.ajustHeightTimeout)
      })
    }
  }
};
</script>
<style scoped>
.navbar {
  background: rgb(84, 92, 100);
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