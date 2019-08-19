<template>
  <div class="transactionlist">
    <MyHeader title="交易明细" />
    <div class="tablecontainer">
      <table class="table">
        <thead>
          <tr>
            <td style="width:60%;">时间</td>
            <td style="width:30%;">金额</td>
            <td style="width:10%;"><img src="@/assets/img/filter@2x.png" /></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2019.5.16 15:01</td>
            <td style="color:black;">+10.00元</td>
            <td></td>
          </tr>
          <tr>
            <td>2019.5.16 15:01</td>
            <td style="color:black;">+10.00元</td>
            <td></td>
          </tr>
          <tr>
            <td>2019.5.16 15:01</td>
            <td style="color:black;">+10.00元</td>
            <td></td>
          </tr>
          <tr>
            <td>2019.5.16 15:01</td>
            <td style="color:black;">+10.00元</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="service">
      <Service />
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/base/MyHeader.vue";
import MyFooter from "@/components/base/MyFooter.vue";
import Service from "@/components/base/Service.vue";
export default {

  name: "IncomeList",
  props: {},
  data() {
    return {
      visible: true,
      isshow: ""
    };
  },
  created() {},
  methods: {
    changeStatus() {
      this.visible = !this.visible;
    }
  },
  computed: {},
  mounted() {},
  components: {
    MyHeader,
    Service
  },
  beforeDestroy() {}
};
</script>
<style scoped>
.service {
  position: fixed;
  bottom: 10px;
  left: 0;
  width: 100%;
}
.tablecontainer{
    padding-top:0.2rem;
    background:white;
}
.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}
.table thead {
  font-size: 0.15rem;
  text-align: center;
  color: #666;
}
.table tbody {
  font-size: 0.12rem;
  text-align: center;
  color: #010101;
}

.table tbody tr {
  height: 0.6rem;
  font-size: 0.12rem;
}
.table tbody tr td {
  border: 1px solid transparent;
}
.table tbody tr:nth-child(even) {
  background: #f5fafe;
}

.table tbody tr td img {
  width: 0.08rem;
  height: 0.14rem;
}

.table thead tr td img {
  width: 0.23rem;
  height: 0.17rem;
}
</style>