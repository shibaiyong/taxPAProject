<template>
  <div class="tansactionfilter">
    <MyHeader title="筛选"/>
    <div class="datascreen">
      <div class="bankitem bankname">
        <h3>银行名称</h3>
        <ul>
          <li>
            <span
              v-for="item in transactionstatus"
              :key="item.id"
              :class="{ 'backnameactive': idStatusActive == item.id }"
              @click="changeTranStatus(item.id)"
            >{{item.text}}</span>
          </li>
        </ul>
      </div>

      <div class="bankitem transactiontime">
        <h3>交易时间</h3>
        <ul>
          <li>
            <span
              v-for="item in transactionTimeList"
              :key="item.id"
              :class="{ 'backnameactive': idTimeActive == item.id }"
              @click="changeTranTime(item.id)"
            >{{item.text}}</span>
          </li>
        </ul>
      </div>

      <div class="bankitem changedate">
        <h3>选择时间</h3>

        <div class="time">
          <input
            id="starttime"
            class="timeinput"
            type="text"
            placeholder="请选择时间"
            v-model="starttime"
            @focus="openTimePicker('start')"
            readonly
          />
          <span>至</span>
          <input
            id="endtime"
            class="timeinput"
            type="text"
            placeholder="请选择时间"
            v-model="endtime"
            @focus="openTimePicker('end')"
            readonly
          />
        </div>
      </div>

      <mt-datetime-picker
        ref="picker"
        type="date"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        v-model="pickerTimeValue"
        @confirm="handleConfirm"
      ></mt-datetime-picker>
      <div class="complete">
        
      </div>

      <div class="customerervice1">
        <Service/>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/base/MyHeader.vue"
import MyButton from "@/components/base/MyButton.vue"
import Service from "@/components/base/Service.vue"
import { formatDate } from "@/assets/utils/dateformat.js"

export default {
  props: {},
  data() {
    return {
      close: "关闭",
      starttime: "",
      endtime: "",
      pickerTimeValue: "",
      whichtimepicker: "start",
      btnStyle: {
        height: "0.38rem",
        background: "#3a65ff",
        borderRadius: "0.19rem",
        color: "white",
        width: "100%",
        display: "inline-block"
      },
      transactionstatus: [
        { id: 1, text: "买入成功" },
        { id: 2, text: "买入失败" },
        { id: 3, text: "买入处理中" },
        { id: 4, text: "取出成功" },
        { id: 5, text: "取出失败" },
        { id: 6, text: "取出处理中" }
      ],
      transactionTimeList: [
        { id: 1, text: "近两周" },
        { id: 2, text: "近一个月" },
        { id: 3, text: "近三个月" }
      ],
      idStatusActive: 1,
      idTimeActive: 1
    };
  },
  created() {},
  methods: {
    openTimePicker(val) {
      this.$refs.picker.open();
      this.whichtimepicker = val;
    },
    handleConfirm(val) {
      let newdate = formatDate(val, "yyyy-MM-dd");
      if (this.whichtimepicker == "start") {
        this.starttime = newdate;
      } else {
        this.endtime = newdate;
      }
    },
    changeTranStatus(id) {
      this.idStatusActive = id;
    },
    changeTranTime(id) {
      this.idTimeActive = id;
    }
  },
  computed: {},
  mounted() {},
  components: {
    MyHeader,
    MyButton,
    Service
  },
  beforeDestroy() {}
};
</script>
<style scoped>
.tansactionfilter {
  background: white;
  height: 100vh;
}
.datascreen .bankname {
  margin-top: 0.25rem;
}

.datascreen h3 {
  font-size: 0.18rem;
}

.datascreen {
  padding: 0 0.21rem;
  box-sizing: border-box;
}

.datascreen .bankitem ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.14rem;
  -webkit-flex-wrap: wrap;
}

.datascreen .bankitem ul li span {
  display: inline-block;
  width: 0.95rem;
  height: 26px;
  font-size: 14px;
  text-align: center;
  background: rgba(243, 244, 245, 1);
  border-radius: 10px;
  line-height: 26px;
  color: #101d37;
  margin-bottom: 0.12rem;
}

.datascreen .bankitem ul li span.backnameactive {
  background: rgb(58, 101, 255);
  color: white;
}

.datascreen .bankitem input {
  display: inline-block;
  width: 30%;
  height: 30px;
  margin: 0;
  padding: 0;
  padding-left: 0.1rem;
  border: 1px solid #c7d9fd;
  font-size: 16px;
  padding-right: 0.25rem;
  
  background:url(../../../assets/img/timeicon@2x.png) no-repeat 95% center;
  background-size: 0.2rem 0.2rem;
  line-height: 21px;
  border-radius: 3px;
  outline: 0;
}

.datascreen .bankitem .time {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.35rem;
}

.changedate {
  margin-top: 0.32rem;
}

.datascreen .bankitem .time span {
  font-size: 0.14rem;
}
.complete {
  text-align: center;
  height:1.15rem;
}

.customerervice1 {
  
  margin-top: 0.9rem;
}
/* .customerervice dl dt {
  font-size: 0.14rem;
  color: rgb(130, 145, 176);
  margin-bottom: 0.09rem;
}
.customerervice dl dt img {
  width: 0.15rem;
  vertical-align: middle;
  margin-right: 3px;
}
.customerervice dl dd {
  font-size: 0.12rem;
  color: rgb(183, 194, 218);
} */

</style>