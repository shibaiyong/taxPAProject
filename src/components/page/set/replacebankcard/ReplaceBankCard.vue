<template>
  <div class="elecaccount">
    <div class="flex1">
    <MyHeader title="银行卡" />
    <p class="bankhead">当前银行卡</p>
    <div class="content">
      <div class="accountdes">
        <ul>
          <li>
            <span>浦发银行</span>
            <img src="@/assets/img/replacebankcard/pufabank@2x.png" />
          </li>
          <li>储蓄卡</li>
          <li>
            <span class="sign">****</span>&nbsp;
            <span class="sign">****</span>&nbsp;
            <span class="sign">****</span>&nbsp;
            <span>9151</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="addbanklist">
      <ul>
        <li v-for="item in banklist" :key="item.id">
          <span>
            <img src="@/assets/img/replacebankcard/zhongxinbank@2x.png" />
            <span>{{item.name}}</span>
          </span>
          <img
            src="@/assets/img/replacebankcard/selected@2x.png"
            v-show="item.id==id"
            @click="changImg(item.id)"
          />
          <img
            src="@/assets/img/replacebankcard/unselected@2x.png"
            v-show="item.id!=id"
            @click="changImg(item.id)"
          />
        </li>
      </ul>
    </div>

    <div class="addcontainer">
      <div class="addmorecard">+&nbsp;更换其他银行卡</div>
    </div>

    <div class="notice">
      <ul>
        <li>
          <span>1、</span>
          <span>为保障您的账户资金安全，您每次只能绑定一张银行卡</span>
        </li>
        <li>
          <span>2、</span>
          <span>银行卡与电子账户绑定，资金只能取出到绑定卡中，他人无法盗用您的资金</span>
        </li>
        <li>
          <span>3、</span>
          <span>如遇到银行卡丢失、注销等特殊情况，可申请更换银行卡</span>
        </li>
      </ul>
    </div>

    <div class="btncontainer">
      <MyButton content="确认更换" :btnStyle="btnStyle" @click.native="confirmChange"></MyButton>
    </div>
    </div>
    <div class="service">
      <Service />
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/base/MyHeader.vue";
import Service from "@/components/base/Service.vue";
import MyButton from "@/components/base/MyButton";
export default {
  name: "ReplaceBankCard",
  props: {},
  data() {
    return {
      id: "1",
      btnStyle: {
        width: "100%",
        height: "0.4rem",
        background: "#ddd",
        // background: "#3965ff",//输入状态根据短息验证码是否获取到
        borderRadius: "0.2rem",
        color: "white"
      },
      banklist: [
        {
          id: 1,
          name: "中信银行",
          selected: true
        }
      ]
    };
  },
  created() {},
  methods: {
    submitData() {},
    confirmChange() {},
    changImg(id) {
      if (this.id == id) {
        this.id = "";
      } else {
        this.id = id;
      }
    }
  },
  computed: {},
  mounted() {},
  components: {
    MyHeader,
    Service,
    MyButton
  },
  beforeDestroy() {}
};
</script>
<style scoped>

.elecaccount{
    display:flex;
    flex-direction: column;
    justify-content: center;
    background: white;
    position: relative;
}
.flex1{
    flex:1;
}
.addbanklist {
  padding: 0 0.3rem;
  box-sizing: border-box;
  margin: 0.25rem 0;
}
.addbanklist li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.16rem;
  margin: 0.1rem 0;
}
.addbanklist li img {
  width: 0.2rem;
}
.addbanklist li span img {
  width: 0.25rem;
  vertical-align: middle;
  margin-right: 0.08rem;
}

.addbanklist li span span {
  display: inline-block;
  vertical-align: middle;
}

.btncontainer {
  margin-top: 0.34rem;
  padding: 0 0.2rem;
  box-sizing: border-box;
}
.addcontainer {
  padding: 0 0.2rem;
  box-sizing: border-box;
  margin: 0.2rem 0 0.2rem;
}
.addcontainer .addmorecard {
  padding: 0.12rem 0;
  box-sizing: border-box;
  border-top: 1px solid #c7d9fd;
  border-bottom: 1px solid #c7d9fd;
  text-align: center;
  color: #3965ff;
  font-size: 0.16rem;
}
.content {
  padding: 0 0.1rem;
}
.decoraterect {
  background: #e4ecfd;
  height: 0.1rem;
}

.accountdes {
  width: 100%;
  height: 1.8rem;
  margin-top: 0.18rem;
  background: url(../../../../assets/img/elecaccount/cardbanner@2x.png)
    no-repeat 0.04rem center;
  background-size: 100% 100%;
  color: white;
  padding: 0.3rem 0.25rem 0 0.4rem;
  box-sizing: border-box;
  letter-spacing: 2px;
}
.bankhead {
  color: #3e3e3e;
  font-size: 0.16rem;
  padding-left: 0.3rem;
  box-sizing: border-box;
  margin-top: 0.2rem;
}
.notice {
  font-size: 0.12rem;
  color: #6c7382;
  padding: 0 0.4rem;
  box-sizing: border-box;
}
.sign {
  display: inline-block;
  height: 0.14rem;
  vertical-align: middle;
}
.accountdes li:nth-child(1) {
  margin-bottom: 0.14rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.accountdes li:nth-child(1) img {
  width: 0.32rem;
}
.accountdes li:nth-child(1) span {
  font-size: 0.16rem;
}

.accountdes li:nth-child(2) {
  font-size: 0.14rem;
  margin-bottom: 0.17rem;
}

.accountdes li:nth-child(3) {
  font-size: 0.18rem;
}

.service {
    margin-top:0.2rem;
}
</style>