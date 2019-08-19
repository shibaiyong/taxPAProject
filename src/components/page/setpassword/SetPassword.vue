<template>
  <div class="setpassword">
    <MyHeader title="设置交易密码" />
    <h3>请您设置交易密码</h3>
    <div class="password mui-input-group">
      <div class="mui-input-row">
        <label>交易密码</label>
        <input
          type="text"
          id="SIPBox1"
          class="mui-input-password"
          @focus="showKeyBoard('SIPBox1')"
          placeholder="请输入交易密码"
          readonly
        />
      </div>
      <div class="mui-input-row">
        <label>再次确认</label>
        <input
          type="text"
          id="SIPBox2"
          class="mui-input-password"
          @focus="showKeyBoard('SIPBox2')"
          placeholder="请再次输入交易密码"
          readonly
        />
      </div>
      <div class="mui-input-row">
        <label>验证码</label>
          <input type="text" class="mui-input-clear messagecode" placeholder="请输入短信验证码" v-model="passwords.MessageCode"/>
          <span id="messagecode" v-if="ifFetchCode" @click="getPhoneCode">获取验证码</span>
          <span id="countdown" v-else>{{'剩余' + numberStart + 's'}}</span>
        </div>
    </div>
    <div class="tip">
      <span>注意:</span>
      <span>密码不能为连续、倒连续或重复数字，如123456、654321、00000等。</span>
    </div>

    <div class="complete">
      <MyButton content="完成" :btnStyle="btnStyle" @click.native="submitData" />
    </div>
    <div id="NumberKeyboard1"></div>
    <div id="NumberKeyboard2"></div>
  </div>
</template>

<script>
import MyHeader from "@/components/base/MyHeader.vue"
import MyButton from "@/components/base/MyButton"
import Service from "@/components/base/Service.vue"
import { getRandom, accountOpen, getPhoneCode } from "@/requestDataInterface"
import { mapState } from "vuex"
import { Toast } from "mint-ui"
export default {
  name: "SetPassword",
  props: {},
  data() {
    this.RSA_PUBLIC_KEY =
      "30818702818100B9800F6965ECCDD3621E2DF1974FEDF8B8BFCD5ECF58155DCB279CAA8F8838480B6DFC973752CC678C2A291A799927C08CCD7CB31218DB8B3A5A675C4E83B997F7D0479C3692DD53D52B52C61ECEE4708B1C0F2199001DD298A52BBF5750EDED9F03CA05B19E295D84CFB1798E084458E972A506F6629C4B22509713B9C72F5F020103";
    this.RSA_PUBLIC_KEY_SIG =
      "0821AFBC831EA062B9BEC0F0D10EAC5CB53FF6D608DFF1783C24BB6A6A1E650EA6F98ED29DEAC94D436A122AB40514A6985E4130C2115562A9DE0896F612E85ACB9DA5CB49A30BF2653E9CA542BE4B287B5EB37CBD97B045ECD1621E90E542FBA8F394CDA8E752F7AE0F2C83F589F46B3F2121F4D010090FB898514DCB8A5F90";
    
    this.keyboard = {
      SIPBox1: null,
      SIPBox2: null
    }
    this.toastinstance = null
    this.setIntervalCache = null
    return {
      Random :"0123456789012345",
      RandJnlNo:'',
      MobilePhone:'',
      ifFetchCode:true,
      numberEnd:0,
      numberStart:120,
      btnStyle: {
        width: "100%",
        height: "0.4rem",
        background: "#3965ff", //输入状态根据短息验证码是否获取到
        borderRadius: "0.2rem",
        color: "white"
      },
      rule: {
        t: {
          //总长度
          min: 6,
          max: 6
        },
        d: {
          // 数字
          min: 6,
          max: 6
        }
      },
      passwords:{
        PwdResult:'',
        PwdResultConfirm:'',
        MessageCode:'',
        MessageTaskId:''
      }
    };
  },
  created() {},
  methods: {
    submitData() {
      if (!this.checkPwd("SIPBox1")) {
        return
      }
      this.accountOpen()
    },
    getPhoneCode(){
      this.ifFetchCode = false
      //启动倒计时
      this.changeNumber(1000,120000)
      let TemplateId = 'C01'
      let personinfo = JSON.parse(localStorage.getItem('personinfo'))
      getPhoneCode({TemplateId, MobilePhone:personinfo.MobilePhone}).then(
        res => {
          this.passwords.MessageTaskId = res.result.MessageTaskId
          //清除倒计时
          clearInterval(this.setIntervalCache)
        }
      ).catch(
        err => {
          //清除倒计时
          clearInterval(this.setIntervalCache)
          console.log(err)
        }
      )
    },
    getRandom(){
      getRandom({RandType:'1'}).then(res => {
        this.Random = res.result.Random
        this.RandJnlNo = res.result.RandJnlNo
        this.addKeyBoard("SIPBox1")
        this.addKeyBoard("SIPBox2")
      }).catch(
        err => {
          console.log(err)
        }
      )
    },
    showKeyBoard(inputname) {
      this.hideAllKeyBoard().then(
        res => {
          this.keyboard[inputname].showKeyboard()
        }
      )
    },
    hideAllKeyBoard(inputname) {
      return new Promise( (resolve,reject) => {
        try{
          let keyboards = Object.values(this.keyboard)
          for(let item of keyboards){
            item.hideKeyboard()
          }
          resolve('success')
        }catch(err){
          reject(err)
        }
      })
    },
    addKeyBoard(inputname) {
      this.keyboard[inputname].bindInputBox(inputname)
      if (
        CFCA_OK !=
        this.keyboard[inputname].setServerRandom(this.Random, inputname)
      ) {
        alert("SetServerRandom error")
      }
      if (
        CFCA_OK !=
        this.keyboard[inputname].setPublicKey(
          this.RSA_PUBLIC_KEY,
          this.RSA_PUBLIC_KEY_SIG,
          inputname
        )
      ) {
        alert("SetPublicKey error")
      }
    },
    initKeyBoard() {
      this.keyboard.SIPBox1 = new CFCAKeyboard("NumberKeyboard1", 1)
      this.keyboard.SIPBox2 = new CFCAKeyboard("NumberKeyboard2", 1)
      this.keyboard.SIPBox1.hideKeyboard()
      this.keyboard.SIPBox2.hideKeyboard()
    },
    checkPwd(inputname) {
      let t = new CFCAKeyboard.Range(this.rule.t.min, this.rule.t.max);
      let d = new CFCAKeyboard.Range(this.rule.d.min, this.rule.d.max);
      let res = this.keyboard[inputname].checkPasswordStrength(inputname, t, d);
      if (res) {
        let encryptedInputValue = this.keyboard[
          inputname
        ].getEncryptedInputValue(inputname);
        let errorCode = this.keyboard[inputname]
          .getErrorCode(inputname)
          .toString(16);
        if (errorCode != CFCA_OK) {
          this.toastinstance = Toast({
            message: errorCode,
            position: "center",
            duration: 2000
          });
          return false;
        } else {

          this.passwords.PwdResult = encryptedInputValue
          this.passwords.PwdResultConfirm = encryptedInputValue

          // this.toastinstance = Toast({
          //   message: encryptedInputValue,
          //   position: "center",
          //   duration: 2000
          // })
          return true
        }
      } else {
        this.toastinstance = Toast({
          message: "密码不符合规范",
          position: "center",
          duration: 2000
        });
        return false;
      }
    },
    accountOpen(){
      //17014327360
      //签约如意宝的时候使用这三个参数
      localStorage.setItem('RandJnlNo', this.RandJnlNo)
      localStorage.setItem('Random', this.Random)
      localStorage.setItem('PwdResult', this.passwords.PwdResult)

      let IdPNo = localStorage.getItem('IdPNo')
      let personinfo = JSON.parse(localStorage.getItem('personinfo'))
      let personinfosucc = JSON.parse(localStorage.getItem('personinfosucc'))
      //personinfosucc.Occupation = personinfosucc.OctId
      personinfosucc.Occupation = '23'
      let PerInfoAnswer = localStorage.getItem('PerInfoAnswer')
      let params = Object.assign({},personinfo,personinfosucc,this.passwords,{
        IdPNo,
        PerInfoAnswer,
        RandJnlNo:this.RandJnlNo,
        Random:this.Random
      })
      console.log(params)
      accountOpen( params ).then(
        res => {
          console.log(res)
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    changeNumber(keepTime, cycleTime) {
      //数字滚动叠加

      let span = this.numberEnd - this.numberStart
      let translateTime = cycleTime
      let changeTime = Math.ceil(translateTime / keepTime)
      let step = Math.ceil(span / changeTime)
      this.setIntervalCache = setInterval(() => {
        this.numberStart = this.numberStart + step
        if (this.numberStart >= this.numberEnd && span >= 0) {
          clearInterval(this.setIntervalCache)
          this.numberStart = this.numberEnd
        } else if (this.numberStart <= this.numberEnd && span < 0) {
          clearInterval(this.setIntervalCache)
          this.numberStart = this.numberEnd
          this.ifFetchCode = true
        }
      }, keepTime)
    }
  },
  computed: {
    ...mapState(["PerInfoAnswer"])
  },
  mounted() {
    this.getRandom()
    this.initKeyBoard()
    
  },
  components: {
    MyHeader,
    MyButton
  },
  beforeDestroy() {
    clearInterval(this.setIntervalCache)
  }
};
</script>
<style scoped>
h3 {
  margin: 0.36rem 0 0.21rem;
  font-size: 0.16rem;
  color: #6c7382;
  text-align: center;
  font-weight: normal;
}
.password .mui-input-row label {
  color: #181818;
  font-size: 0.17rem;
}

.password .mui-input-row input::placeholder {
  color: #d5d5d5;
  font-size: 0.15rem;
}
.tip {
  padding: 0 0.16rem;
  margin-top: 0.16rem;
}
.tip span:nth-child(1) {
  color: #ff6000;
  font-size: 0.12rem;
}
.tip span:nth-child(2) {
  color: #7e838f;
  font-size: 0.12rem;
}
.complete {
  padding: 0 0.16rem;
  margin-top: 0.3rem;
}

#messagecode {
  display: inline-block;
  width: 0.96rem;
  height: 0.25rem;
  background: white;
  position: absolute;
  border: 1px solid #3d48e3;
  border-radius: 10px;
  text-align: center;
  line-height: 0.25rem;
  color: #3d48e3;
  top: 7px;
  right: 4px;
  font-size: 0.14rem;
}

#countdown{
display: inline-block;
  width: 0.96rem;
  height: 0.25rem;
  background: white;
  position: absolute;
  text-align: center;
  line-height: 0.25rem;
  color: #3d48e3;
  top: 6px;
  right: 6px;
  font-size: 0.14rem;
}
</style>