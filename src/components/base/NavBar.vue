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
      myTitleColor="#fff"
      myItemColor="#b4bcc8"
    >
    <el-submenu :index="item.id" v-for="item in permissions" :key="item.id">
      <template slot="title">
        <i :class="[item.icon?item.icon:'el-icon-user']"></i>
        <span>{{item.name}}</span>
      </template>
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
    this.checkedItem = sessionStorage.getItem("path")
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
    handleSelect(index, indexPath, item) {
      // const {path, query} = item.route
      // window.open(`http://192.168.129.42:14541/#${path}?add=${query.add}&edit=${query.edit}&remove=${query.remove}`,'')
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