
<template>
  <div class="enterrealinfo">
    <div class="realinfocontainer">
      <h3>请填写实名制信息</h3>
      <span>以保障您的资金账户安全</span>
      <p @click="gotoSite">查看支持银行</p>
    </div>

    <div class="memeberregister">
      <div class="bankitem memeberinfo">
        <div class="mui-input-row">
          <input type="text" class="mui-input-clear agentnumber" placeholder="请输入真实姓名" v-model="personinfo.CifName"/>
        </div>
        <div class="mui-input-row">
          <input type="text" class="mui-input-clear realname" placeholder="请输入身份证号码" v-model="personinfo.IdNo"/>
        </div>
        <div class="mui-input-row">
          <input type="text" class="mui-input-clear mobile" placeholder="请输入本人银行卡号码" @blur="queryBank" v-model="personinfo.TAcNo"/>
          <span id="verifycode">
            <img src="@/assets/img/chinabank.png" />
          </span>
        </div>

        <div class="mui-input-row">
          <input type="text" class="mui-input-clear idcard" placeholder="请输入银行预留手机号" v-model="personinfo.MobilePhone"/>
        </div>

        
      </div>

      <div class="agreee">
        <div class="mui-input-row mui-radio mui-left">
          <label for="name1">已阅读并同意</label>
          <input id="name1" name="radio1" type="radio" :checked="selected" />
          <a href="www.baidu.com" style="color:#3e47e0">“相关协议”</a>
        </div>
      </div>

      <div class="complete">
        <MyButton content="下一步" :btnStyle="btnStyle" @click.native="submitData" />
      </div>
    </div>

    <div class="service">
      <Service />
    </div>
  </div>
</template>

<script>
import Service from "@/components/base/Service.vue"
import MyButton from "@/components/base/MyButton"

import { DebitCardQuery } from "@/requestDataInterface"

export default {
  name: "ProductInfo",
  props: {},
  data() {
    return {
      btnStyle: {
        width: "100%",
        height: "0.4rem",
        //background: "#ddd",
        background: "#3965ff",//输入状态根据短息验证码是否获取到
        borderRadius: "0.2rem",
        color: "white"
      },
      selected: true,
      toastinstance:null,
      personinfo:{
        CifName:'',
        IdNo:'',
        TAcNo:'',
        MobilePhone:'',
        IsAgreeProtocol:true,
        MessageCode:''

      }
    };
  },
  created() {},
  methods: {
    gotoSite() {
      this.$router.push({ name: "BankList" })
    },
    submitData() {
      //存储实名制信息，在开户页面获取，一并提交
      localStorage.setItem('personinfo',JSON.stringify(this.personinfo))
      //上传身份证照片，需要的两个字段值
      this.$router.push({name:'UploadIdPhotos', params:{ CifName:this.personinfo.CifName, IdNo:this.personinfo.IdNo}})
    },
    queryBank(){
      let TAcNo = this.personinfo.TAcNo
      DebitCardQuery({ TAcNo }).then(res=>{
        console.log(res)
      }).catch(err=>{console.log(err)})
    }
  },
  computed: {},
  mounted() {},
  components: {
    Service,
    MyButton
  },
  watch: {},
  beforeDestroy() {}
};
</script>
<style scoped>
.realinfocontainer {
  padding: 0.34rem 0.14rem 0;
  border-top: 1px solid #e1dddd;
}
.realinfocontainer h3 {
  font-size: 0.24rem;
  padding-bottom: 0.06rem;
  letter-spacing: 1px;
}
.realinfocontainer span {
  font-size: 0.14rem;
  color: #8c8c8c;
  letter-spacing: 1px;
}
.realinfocontainer p {
  text-align: right;
  font-size: 0.16rem;
  color: #3c67ff;
  margin-top: 0.08rem;
}
.enterrealinfo {
  height: 100vh;
  background: white;
}
.memeberregister .banner {
  width: 100%;
}
.memeberregister .banner img {
  width: 100%;
}
.memeberregister .memeberinfo {
  background: white;
  padding: 0 0.14rem;
}
.memeberregister .memeberinfo .mui-input-clear {
  border: none;
  border-bottom: 1px solid #c7d9fd;
  margin-bottom: 0;
  font-size: 0.14rem;
  padding-left: 0.36rem;
  border-radius: none;
  border-radius: 0;
}

.memeberregister .memeberinfo .mui-input-clear::placeholder {
  color: #cdd3dd;
}

.memeberregister .memeberinfo .agentnumber {
  background: url(../../../assets/img/realnameicon@2x.png) no-repeat 0.04rem
    center;
  background-size: 0.2rem 0.2rem;
}

.memeberregister .memeberinfo .realname {
  background: url(../../../assets/img/idcardicon@2x.png) no-repeat 0.04rem
    center;
  background-size: 0.26rem 0.2rem;
}

.memeberregister .memeberinfo .mobile {
  background: url(../../../assets/img/bankcardicon@2x.png) no-repeat 0.04rem
    center;
  background-size: 0.24rem 0.18rem;
}

.memeberregister .memeberinfo .idcard {
  background: url(../../../assets/img/mobileicon@2x.png) no-repeat 0.04rem
    center;
  background-size: 0.15rem 0.23rem;
}

.memeberregister .memeberinfo .messagecode {
  background: url(../../../assets/img/messageicon@2x.png) no-repeat 0.04rem
    center;
  background-size: 0.23rem 0.17rem;
}

.memeberregister .memeberinfo .mui-input-row {
  margin-top: 0.2rem;
  position: relative;
}
.complete {
  padding: 0 0.14rem;
  box-sizing: border-box;
  margin-top: 0.2rem;
}

#verifycode {
  width: 0.34rem;
  height: 0.34rem;
  position: absolute;
  top: 0px;
  right: 0px;
}

#verifycode img {
  width: 100%;
}

#messagecode {
  display: inline-block;
  width: 0.96rem;
  height: 0.32rem;
  background: white;
  position: absolute;
  border: 1px solid #3d48e3;
  border-radius: 10px;
  text-align: center;
  line-height: 0.32rem;
  color: #3d48e3;
  top: 0px;
  right: 0px;
  font-size: 0.14rem;
}

.mui-radio label {
  font-size: 14px;
}
.mui-radio a {
  position: absolute;
  right: 1.6rem;
  top: 0.07rem;
  font-size: 14px;
}

.agreee {
  margin-top: 0.26rem;
}
</style>