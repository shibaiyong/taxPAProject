<template>
  <div class="rolelist">
    <div class="operate">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="导入日期">
              <el-date-picker
                v-model="formSearch.beginDate"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
                placeholder="开始日期"
              ></el-date-picker>
              -
              <el-date-picker
                v-model="formSearch.endDate"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
                placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <div class="operate">
              <div class="operateBtn">
                <el-button type="primary" size="small" @click="handleSearch">
                  <i class="el-icon-search"></i>&nbsp;查询
                </el-button>
                <el-button type="primary" size="small">
                  <i class="el-icon-edit-outline"></i>&nbsp;重置
                </el-button>
               
                <el-button type="primary" size="small" @click="handleExportUser">
                  <i class="el-icon-download"></i>&nbsp;导出
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="paddingcontainer">
    <el-table :data="tableData3" style="width: 100%">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="date" label="交易日期" width="150"></el-table-column>
        <el-table-column label="我司">
            <el-table-column prop="name" label="笔数" width="120"></el-table-column>
            <el-table-column label="金额" prop="city" width="140"></el-table-column>
        </el-table-column>
        <el-table-column label="渠道">
            <el-table-column prop="name" label="笔数" width="120"></el-table-column>
            <el-table-column label="金额" prop="city" width="140"></el-table-column>
        </el-table-column>
        <el-table-column label="对平">
            <el-table-column prop="name" label="笔数" width="120"></el-table-column>
            <el-table-column label="金额" prop="city" width="140"></el-table-column>
        </el-table-column>
        <el-table-column label="通路多">
            <el-table-column prop="name" label="笔数" width="120"></el-table-column>
            <el-table-column label="金额" prop="city" width="140"></el-table-column>
        </el-table-column>
        <el-table-column label="平台多">
            <el-table-column prop="name" label="笔数" width="120"></el-table-column>
            <el-table-column label="金额" prop="city" width="140"></el-table-column>
        </el-table-column>
    </el-table>
    </div>
    <div class="paddingcontainer pagecontainer">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
        @current-change="handlegetUserInfoList"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
</div> 
</template>

<script>
import { getUserInfoList, exportUser } from "@/requestDataInterface";
export default {
  props: {},
  data() {
    return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
      dialogBlackList: false,
      currentPage: 1,
      total: 1,
      remark:'',
      statusOptions: [
        { label: "生效中", value: 1 },
        { label: "停用中", value: 0 }
      ],
      qualificationList:[],
      merchantList: [],
      multipleSelection: [],
      formSearch: {
        enterpriseName: "",
        idCard: "",
        beginDate: "",
        endDate: "",
        phone:""
      }
    };
  },
  created() {},
  methods: {
    handleSearch() {
      this.handlegetUserInfoList(this.currentPage);
    },
    handleAdd() {
      this.$router.push("/home/addcommercialcustom");
    },

    handleExportUser(){
      let idsStr = ''
      let ids = []
      if(this.multipleSelection.length){
        ids = this.multipleSelection.map((item,index)=>item.id)
      }
      idsStr = ids.join(',')
      window.open('http://localhost:8088/export/userInfoList?ids='+idsStr)
    },
    
    
    
    handlegetUserInfoList(currentPage) {
      let params = Object.assign({}, this.formSearch, {
        page: currentPage,
        rows: 20
      });
      getUserInfoList(params)
        .then(res => {
          if (res.success) {
            this.merchantList = res.result.userInfos;
            this.total = res.result.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleSelectionChange(selection, row) {
      this.multipleSelection = selection;
    },
    handleSelectAll(selection) {
      this.multipleSelection = selection;
    },
    judgeRight(multipleSelection) {
      if (!multipleSelection.length) {
        this.$message({
          type: "error",
          message: "请选择用户"
        });
        return false;
      } else if (multipleSelection.length > 1) {
        this.$message({
          type: "error",
          message: "请选择一个用户"
        });
        return false;
      }
      return true;
    }
  },
  computed: {},
  mounted() {
    this.handlegetUserInfoList(this.currentPage);
  },
  components: {},
  beforeDestroy() {}
};
</script>
<style scoped>
.operate {
  padding: 0 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.operate .el-button--small {
  padding: 9px 12px;
  margin-left:4px;
}
.pagecontainer {
  text-align: right;
  margin-top: 20px;
}
.el-pagination {
  display: inline-block;
}

.el-form-item__content > .el-input {
  width: 230px;
}

.el-form-item__content > .el-select {
  width: 230px;
}
.el-form-item__content > .el-date-editor {
  width: 180px;
}
.el-form {
  width: 100%;
}
.el-row h4 {
  padding-bottom: 6px;
}
>>> .el-dialog {
  width: 62%;
}
.dialogblack >>> .el-dialog {
  width: 30%;
}

.dialogblack >>> .el-button--small{
  width:40%;
}
.dialogblack >>> .el-dialog__body{
  padding-top:15px;
  padding-bottom: 15px;
}
.dialog-footer{
  
  display:flex;
  justify-content: space-between;
}
>>>.el-table__header-wrapper thead th{
    text-align: center;
}
>>>.el-table__body-wrapper tbody tr td {
    text-align: center;
}
</style>