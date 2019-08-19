<template>
  <div class="setpassword">
    <MyHeader title="身份验证" />
    <div class="content">
      <div class="password mui-input-group">
        <div class="mui-input-row">
          <label>交易密码</label>
          <input type="text" id="SIPBox1" class="mui-input-password" placeholder="请输入交易密码" @focus="showKeyBoard('SIPBox1')"/>
        </div>
      </div>
      <div class="tip">
        <span>注意:</span>
        <span>请填写由民生银行下发的验证码，字母大小写需区分</span>
      </div>

      <div class="complete">
        <MyButton content="确定" :btnStyle="btnStyle" @click.native="submitData" />
      </div>
    </div>
    <div id="NumberKeyboard1"></div>
  </div>
</template>

<script>
import MyHeader from "@/components/base/MyHeader.vue"
import MyButton from "@/components/base/MyButton"
import Service from "@/components/base/Service.vue"
import { getRandom } from "@/requestDataInterface"

export default {
  name: "EnterPassword",
  props: {},
  data() {
    this.keyboard = {
      SIPBox1: null
    }
    this.toastinstance = null
    this.Random = "0123456789012345"
    this.password = ""
    return {
      btnStyle: {
        width: "100%",
        height: "0.4rem",
        background: "#3965ff", //输入状态根据短息验证码是否获取到
        borderRadius: "0.2rem",
        color: "white"
      }
    }
  },
  created() {},
  methods: {
    submitData() {
        if (!this.checkPwd("SIPBox1")) {
            return
        }
    },
    getRandom(){
      getRandom({RandType:'1'}).then(res => {
        this.Random = res.result.Random
        this.RandJnlNo = res.result.RandJnlNo
        this.addKeyBoard("SIPBox1")
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
      console.log(this.Random)
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
      this.keyboard.SIPBox1.hideKeyboard()
    },
    checkPwd(inputname) {
      let t = new CFCAKeyboard.Range(this.rule.t.min, this.rule.t.max);
      let d = new CFCAKeyboard.Range(this.rule.d.min, this.rule.d.max);
      let res = this.keyboard[inputname].checkPasswordStrength(inputname, t, d)
      if (res) {
        let encryptedInputValue = this.keyboard[inputname].getEncryptedInputValue(inputname)
        let errorCode = this.keyboard[inputname].getErrorCode(inputname).toString(16)
        if (errorCode != CFCA_OK) {
          this.toastinstance = Toast({
            message: errorCode,
            position: "center",
            duration: 2000
          });
          return false;
        } else {
          //获取加密后的密文
          this.password = encryptedInputValue
          this.toastinstance = Toast({
            message: encryptedInputValue,
            position: "center",
            duration: 2000
          })
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
    }
  },
  computed: {},
  mounted() {
    this.getRandom()
    this.initKeyBoard()
  },
  components: {
    MyHeader,
    MyButton
  },
  beforeDestroy() {}
};
</script>
<style scoped>
.content{
    background:white;
    padding:0.24rem 0;
}
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
</style>