<template>
  <div class="assessreport">
    <MyHeader title="评估报告" />
    <dl v-for="(item, index) in QuestionList" :key="item.Question">
      <dt>{{ item.Question }}</dt>
      <dd>
        <div class="mui-input-row mui-radio mui-left" v-for="subitem in item.AnswersList" :key="subitem.ansGuid">
          <label>{{subitem.AnswerContent}}</label>
          <input :name="item.Question" type="radio" @change="getValue(index+1,subitem.Selection)"/>
        </div>
      </dd>
    </dl>
    <div class="btncontainer">
      <MyButton :btnStyle="btnStyle" @click.native="gotoSite" content="提交" />
    </div>
    <div class="service">
      <Service />
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/base/MyHeader.vue"
import Service from "@/components/base/Service.vue"
import MyButton from "@/components/base/MyButton"
import { RiskQuestionQry, RiskResultCommit, LERybOpenAccount, RiskForOpenCommit } from "@/requestDataInterface"
import { sortArr } from "@/assets/utils"
export default {
  name: "AssessReport",
  props: {},
  data() {
    return {
      btnStyle: {
        width: "100%",
        height: "0.48rem",
        background: "#3a65ff",
        borderRadius: "0.24rem",
        color: "white"
      },
      cacheArr: [],
      QueGuid: "",
      QuestionList: [],
      anwserList: [],
      PerInfoAnswer: ""
    };
  },
  created() {},
  methods: {
    gotoSite() {
      this.RiskResultCommit()
    },
    RiskQuestionQry() {
      RiskQuestionQry()
        .then(res => {
          if (res.code == 2000 && res.result.QuestionsList) {
            this.QuestionList = res.result.QuestionsList
          }
        })
        .catch(err => {
          console.log(err)
        });
    },
    RiskResultCommit(){
        let personinfo = JSON.parse(localStorage.getItem('personinfo'))

        let IdNo = personinfo.IdNo

        let sortAr = sortArr(this.anwserList, 'issGuid')

        let RiskResult = sortAr.map((item)=>item.ansGuid).join("|")

        RiskForOpenCommit({ RiskResult, IdNo }).then(
            res => {
              this.$router.push("/extraquestion")
            }
        ).catch(
            err => {

            }
        )
    },
    LERybOpenAccount(){
        let PwdResult = localStorage.getItem('PwdResult')
        let RandJnlNo = localStorage.getItem('RandJnlNo')
        let Random = localStorage.getItem('Random')
        LERybOpenAccount({ PwdResult,RandJnlNo,Random}).then(
            res => {
              console.log(res)
            }
        ).catch(err=>{console.log(err)})
    },
    getValue(issGuid, ansGuid) {
        console.log(issGuid, ansGuid)
      let index = this.cacheArr.indexOf(issGuid)
      if (index > -1) {
        this.anwserList.splice(index, 1, { issGuid, ansGuid })
        return false
      }
      this.cacheArr.push(issGuid)
      this.anwserList.push({ issGuid, ansGuid })
    }
  },
  mounted() {
    this.RiskQuestionQry()
  },
  components: {
    MyHeader,
    Service,
    MyButton
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
.assessreport {
  background: white;
}
.assessreport dl {
  padding: 0 0.14rem;
  box-sizing: border-box;
}
.assessreport dl dt {
  font-size: 0.17rem;
  color: #3e3e3e;
  margin: 0.2rem 0;
  font-weight: bold;
}
.assessreport .mui-radio label {
  color: #242424;
}
.service {
  margin-top: 0.3rem;
}
.btncontainer {
  padding: 0 0.16rem;
  box-sizing: border-box;
  margin-top: 0.33rem;
}
</style>