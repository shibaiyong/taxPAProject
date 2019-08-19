<template>
  <div class="assessreport">
    <MyHeader title="个人信息补充问题" />

    <dl v-for="(item, index) in QuestionList" :key="item.issGuid">
      <dt>{{ 1+index + '、' + item.issTitle }}</dt>
      <dd>
        <div class="mui-input-row mui-radio mui-left" v-for="subitem in item.answerList" :key="subitem.ansGuid">
          <label>{{subitem.ansContent}}</label>
          <input :name="item.issGuid" type="radio" :value="subitem.ansGuid" @change="getValue(item.issGuid,subitem.ansGuid)"/>
        </div>
      </dd>
    </dl>
    <div class="btncontainer">
      <MyButton :btnStyle="btnStyle" @click.native="gotoSite" content="提交"/>
    </div>

    <div class="service">
      <Service />
    </div>
    <MyTip :tipvisible="configMessage.tipvisible" :configMessage="configMessage" :tipStyle="tipStyle"/>
  </div>
</template>

<script>
import MyHeader from "@/components/base/MyHeader.vue"
import Service from "@/components/base/Service.vue"
import MyButton from "@/components/base/MyButton"
import MyTip from "@/components/base/MyTip"
import { RiskQuestionQuery } from "@/requestDataInterface"

export default {
  name: "AssessReport",
  props: {},
  data() {
    let that = this
    return {
      btnStyle: {
        width: "100%",
        height: "0.48rem",
        background: "#3a65ff",
        borderRadius: "0.24rem",
        color: "white"
      },
      cacheArr : [],
      QueGuid:'',
      QuestionList:[],
      anwserList:[],
      PerInfoAnswer:'',
      
      configMessage:{
        tipvisible:false,
        imgsrc:'/static/img/assess@2x.png',
        header:'评估完成',
        title:'您的测评结果：稳健型',
        des:'适合购买产品等级为中风险及以下产品',
        btnText:'设置交易密码',
        btnStyle:{
          height: "0.4rem",
          background: "#3a65ff",
          borderRadius: "0.19rem",
          color: "white",
          width: "2rem"
        },
        callback:function(){
          
          that.$router.push({name:'SetPassword'})
        }
      },
      tipStyle:{
        width:"1.83rem"
      }
    }
  },
  created() {},
  methods: {
    gotoSite(){
      //将数组按指定分隔符转成字符串
      let anwserStr = this.QueGuid + ':' + this.anwserList.join(',')
      //设置交易密码页面获取答案
      this.$store.dispatch('storeAnswer',anwserStr)
      localStorage.setItem('PerInfoAnswer',anwserStr)
      this.$router.push('/setpassword')
    },
    RiskQuestionQuery(){
      RiskQuestionQuery().then(res => {

        console.log(res)
        if(res.code == 2000 && res.result.List){
          this.QuestionList = res.result.List
          this.QueGuid = res.result.QueGuid
        }
      }).catch(err => {console.log( err )})
    },
    showStatusTip(){
      this.configMessage.tipvisible = true
    },
    getValue( issGuid, ansGuid ){
      let index = this.cacheArr.indexOf(issGuid)
      if(index > -1){
        this.anwserList.splice(index,1,issGuid + '|' + ansGuid)
        return false
      }
      this.cacheArr.push(issGuid)
      this.anwserList.push(issGuid + '|' + ansGuid)
    }
  },
  mounted() {
    this.RiskQuestionQuery()
    this.showStatusTip()
  },
  components: {
    MyHeader,
    Service,
    MyButton,
    MyTip
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
.assessreport{
    background:white;
}
.assessreport dl{
    padding:0 0.14rem;
    box-sizing: border-box;
}
.assessreport dl dt{
    font-size: 0.17rem;
    color:#3e3e3e;
    margin: 0.2rem 0;
    font-weight: bold;
}
.assessreport .mui-radio label{
    color:#242424;
}
.service {
    margin-top:0.3rem;
}
.btncontainer {
  padding: 0 0.16rem;
  box-sizing: border-box;
  margin-top: 0.33rem;
}
</style>