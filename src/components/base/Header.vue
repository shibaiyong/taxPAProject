<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/img/logoandword.png" />
    </div>

    <div class="dropdown" v-if="errorpage">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎&nbsp;{{username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { logOut } from '@/requestDataInterface'
export default {
  props: {
    errorpage:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      username:''
    }
  },
  created() {
    this.username = localStorage.getItem('username')
  },
  methods: {
    handleCommand(command) {
      if(command == 'logout'){
        logOut().then(res => {
          if(res.code==2000){
            sessionStorage.removeItem('RyxToken')
            this.$router.push('/login')
          }
        }).catch(err => {console.log(err)})
      }
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