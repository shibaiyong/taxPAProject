<template>
  <div class="mytip">
    <div class="header">
      <i class="mui-icon mui-icon-arrowleft" />
      <span>信息验证</span>
      <span class="close">关闭</span>
    </div>
    <img src="/static/img/right@2x.png" />
    <div class="tipcontent">
      <ul>
        <li>
          <span>身份证信息上传成功</span>
        </li>
      </ul>
    </div>
    <div class="message">根据国家反洗钱局监管要求，请完善您的个人信息</div>

    <div class="password mui-input-group">
      <div class="mui-input-row">
        <label>住址</label>
        <input
          type="text"
          class="mui-input-clear addre"
          placeholder="请输入住址"
          v-model="personinfosucc.addre"
          @focus="regionVisible=true"
        />
      </div>
      <div class="mui-input-row">
        <label>街道</label>
        <input
          type="text"
          class="mui-input-clear road"
          placeholder="请输入街道"
          v-model="personinfosucc.Street"
        />
      </div>
      <div class="mui-input-row">
        <label>公司</label>
        <input
          type="text"
          class="mui-input-clear company"
          placeholder="请输入公司"
          v-model="personinfosucc.Company"
        />
      </div>
      <div class="mui-input-row">
        <label>职业</label>
        <input
          type="text"
          class="mui-input-clear occupation"
          placeholder="请输入职业"
          v-model="personinfosucc.Occupation"
          @focus="popupVisible=true"
        />
      </div>
    </div>
    <div class="complete">
      <MyButton content="确认" :btnStyle="btnStyle" @click.native="gotoSite" />
    </div>

    <div class="service">
      <Service />
    </div>
    <mt-popup v-model="popupVisible" position="bottom" :closeOnClickModal="false" :key="1">
      <div class="btn">
        <span @click="popupVisible=false">取消</span>
        <span @click="assignVal">确定</span>
      </div>
      <mt-picker :slots="slots" @change="onValuesChange" value-key="Occupation"></mt-picker>
    </mt-popup>

    <mt-popup v-model="regionVisible" position="bottom" :closeOnClickModal="false" :key="2">
      <div class="btn">
        <span @click="regionVisible=false">取消</span>
        <span @click="assignRegion">确定</span>
      </div>
      <mt-picker :slots="slots1" @change="onRegionChange" value-key="AddrName"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import Service from "@/components/base/Service.vue";
import MyButton from "@/components/base/MyButton";
import MyHeader from "@/components/base/MyHeader";
import { OccupationListQuery, regionListQuery } from "@/requestDataInterface";
import { Toast } from "mint-ui";

export default {
  name: "UploadSucc",
  props: {},
  data() {
    this.Occupation = null;
    this.OctId = null;

    return {
      region: [],
      province: "",
      city: "",
      value: "",
      personinfosucc: {
        addre: "",
        Street: "",
        Company: "",
        Occupation: "",
        OctId: "",
        provenceId: "",
        DistrictCode: "",
        provencename: "",
        cityname: ""
      },
      btnStyle: {
        width: "100%",
        height: "0.4rem",
        background: "#3965ff",
        borderRadius: "0.2rem",
        color: "white"
      },
      popupVisible: false,
      regionVisible: false,

      slots: [
        {
          flex: 1,
          values: [
            { OctId: 1, Occupation: "司法专业人员" },
            { OctId: 2, Occupation: "经济、金融专业人员" },
            { OctId: 3, Occupation: "教学专业人员" },
            { OctId: 4, Occupation: "警察、保安、消防专业人员" },
            { OctId: 5, Occupation: "运输、快递、邮政从业人员" }
          ],
          className: "slot1",
          textAlign: "center"
        }
      ],

      slots1: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "",
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          defaultIndex: 1,
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "",
          className: "slot4"
        },
        {
          flex: 1,
          values: [],
          defaultIndex: 1,
          className: "slot5",
          textAlign: "center"
        }
      ]
    };
  },
  created() {},
  methods: {
    gotoSite() {
      if (this.personinfosucc.addre == "") {
        this.toastinstance = Toast({
          message: "地址不能为空",
          position: "center",
          duration: 2000
        });
        return false;
      }
      if (this.personinfosucc.Street == "") {
        this.toastinstance = Toast({
          message: "街道不能为空",
          position: "center",
          duration: 2000
        });
        return false;
      }
      if (this.personinfosucc.Occupation == "") {
        this.toastinstance = Toast({
          message: "职业不能为空",
          position: "center",
          duration: 2000
        });
        return false;
      }

      localStorage.setItem(
        "personinfosucc",
        JSON.stringify(this.personinfosucc)
      );
      //this.$router.push("/extraquestion")
      this.$router.push("/assessreport")
      
    },
    onValuesChange(picker, values) {
      this.Occupation = values[0].Occupation
      this.OctId = values[0].OctId
    },
    onRegionChange(picker, values) {
      let cityArr = [];
      let countryArr = [];
      let cacheRegion = JSON.parse(localStorage.getItem("region"));
      if (this.personinfosucc.cityId != values[1].AddrCode) {
        for (let i = 0; i < cacheRegion.length; i++) {
          if (
            cacheRegion[i].AddrLevel == 4 &&
            cacheRegion[i].ParentAddrCode==
              values[1].AddrCode
          ) {
            countryArr.push(cacheRegion[i])
          }
          picker.setSlotValues(2, countryArr)
        }
      }

      if (this.personinfosucc.provenceId != values[0].AddrCode) {
        for (let i = 0; i < cacheRegion.length; i++) {
          if (
            cacheRegion[i].AddrLevel == 3 &&
            cacheRegion[i].ParentAddrCode.slice(0, 2) == values[0].AddrCode
          ) {
            cityArr.push(cacheRegion[i]);
          }
        }
        picker.setSlotValues(1, cityArr);
      }

      this.personinfosucc.provenceId = values[0].AddrCode
      this.personinfosucc.DistrictCode = values[1].AddrCode
      this.personinfosucc.provencename = values[0].AddrName
      this.personinfosucc.cityname = values[1].AddrName
      
    },
    assignVal() {
      this.personinfosucc.Occupation = this.Occupation
      this.personinfosucc.OctId = this.OctId
      this.popupVisible = false;
    },
    assignRegion() {
      this.regionVisible = false
      this.personinfosucc.addre =
      this.personinfosucc.provencename + this.personinfosucc.cityname;
    },
    showPopUp() {
      this.popupVisible = true;
    },
    OccupationListQuery() {
      //查职业列表
      OccupationListQuery()
        .then(res => {
          if (res.code == 2000) {
            this.setOccupationList(res.result.List);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    regionListQuery() {
      //查地区列表
      let address = JSON.parse(localStorage.getItem("region"));
      // regionListQuery().then(
      //   res => {
      //let address = res.result.List

      let provinceArr = [];
      let cityArr = [];
      // for(let i = 0; i < address.length; i++){
      //   if(address[i].ParentAddrCode == "100000"){
      //     provinceArr.push(address[i])
      //   }
      //   if(address[i].AddrName=='市辖区'){
      //     address.splice(i,1)
      //   }
      //   if(address[i].AddrCode.slice(0,2) == "11"&&address[i].AddrLevel==4){
      //     address[i].AddrLevel = 3
      //     cityArr.push(address[i])
      //   }
      //   else if(address[i].AddrCode.slice(0,2) == "12"&&address[i].AddrLevel==4){
      //     address[i].AddrLevel = 3
      //   }
      //   else if(address[i].AddrCode.slice(0,2) == "31"&&address[i].AddrLevel==4){
      //     address[i].AddrLevel = 3
      //   }
      //   else if(address[i].AddrCode.slice(0,2) == "50"&&address[i].AddrLevel==4){
      //     address[i].AddrLevel = 3
      //   }
      // }
      for (let i = 0; i < address.length; i++) {
        if (address[i].ParentAddrCode == "100000") {
          provinceArr.push(address[i]);
        }
        if (address[i].AddrName == "市辖区") {
          address.splice(i, 1);
        }
        if (address[i].AddrCode.slice(0, 2) == "11") {
          address[i].AddrLevel = 3;
          cityArr.push(address[i]);
        }
      }
      //localStorage.setItem('region',JSON.stringify(address))
      this.slots1[0].values = provinceArr;
      this.slots1[2].values = cityArr;
      //   }
      // ).catch(
      //   err => {
      //     console.log(err)
      //   }
      // )
    },
    setOccupationList(data) {
      this.slots = [
        {
          flex: 1,
          values: data,
          className: "slot1",
          textAlign: "center"
        }
      ];
    },

    setRegionList(data) {}
  },
  computed: {},
  mounted() {
    this.OccupationListQuery();
    this.regionListQuery();
  },
  components: {
    MyButton,
    Service,
    MyButton,
    MyHeader
  },
  beforeDestroy() {}
};
</script>
<style scoped>
.btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0.14rem 0 0.14rem;
  font-size: 0.16rem;
}
.btn span:nth-child(1) {
  color: #999;
}
.btn span:nth-child(2) {
  color: #3965ff;
}
.password {
  padding: 0 0.1rem;
  box-sizing: border-box;
  margin-top: 0.2rem;
}
.password .mui-input-row label {
  color: #181818;
  font-size: 0.17rem;
  text-align: left;
  width: 30%;
}

.password .mui-input-row .addre,
.password .mui-input-row .occupation {
  background: url(../../../assets/img/rightarow@2x.png) no-repeat right center;
  background-size: 0.08rem 0.15rem;
}

.password .mui-input-row .road,
.password .mui-input-row .company {
  background: url(../../../assets/img/edit@2x.png) no-repeat right center;
  background-size: 0.12rem 0.12rem;
}

.password .mui-input-row input {
  width: 70%;
  text-align: right;
  padding-right: 0.24rem;
}

.password .mui-input-row input::placeholder {
  color: #d5d5d5;
  font-size: 0.15rem;
  text-align: left;
}

.message {
  color: #8c8c8c;
  font-size: 0.14rem;
  text-align: left;
  padding-left: 0.14rem;
  box-sizing: border-box;
}
.mytip {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
}
.mytip .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.1rem 0.16rem;
  box-sizing: border-box;
  font-size: 0.18rem;
  background: white;
}

.mytip .header .close {
  font-size: 0.14rem;
}
.mytip .header img {
  height: 0.12rem;
  width: 0.07rem;
  margin: 0;
}
.mytip img {
  width: 0.65rem;
  margin: 0.62rem 0 0.17rem;
}

.tipcontent {
  text-align: center;
}

.tipcontent ul li:nth-child(1) {
  font-size: 0.2rem;
  color: black;
  margin-bottom: 0.2rem;
}
.tipcontent ul li:nth-child(1) span {
  margin-left: 0.05rem;
}
.tipcontent ul li:nth-child(2) {
  font-size: 0.24rem;
  color: black;
}
.tipcontent ul li:nth-child(3) {
  font-size: 0.14rem;
  color: #a5a5a5;
  padding: 0.28rem 0 0.62rem;
}
.service {
  width: 100%;
  position: absolute;
  bottom: 0.2rem;
  left: 0;
}
.complete {
  padding: 0 0.1rem;
  box-sizing: border-box;
  margin-top: 0.28rem;
}
</style>