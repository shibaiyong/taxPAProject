<template>
  <div class="rolelist">
    <div class="operate">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="资质方名称">
              <el-input v-model="formSearch.enterpriseName" placeholder="资质方名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <div class="operate">
              <div class="operateBtn">
                <el-button type="primary" size="small" @click="handleSearch">
                  <i class="el-icon-search"></i>&nbsp;查询
                </el-button>
                <el-button type="primary" size="small" @click="handleAdd">
                  <i class="el-icon-circle-plus-outline"></i>&nbsp;录入
                </el-button>
                <el-button type="primary" size="small" @click="handleEdit">
                  <i class="el-icon-edit-outline"></i>&nbsp;修改
                </el-button>
                <el-button type="primary" size="small" @click="handleExport">
                  <i class="el-icon-download"></i>&nbsp;导出
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="paddingcontainer">
      <el-table
        :data="qualificationPartiesList"
        style="width: 100%"
        @select="handleSelectionChange"
        @select-all="handleSelectAll"
        @row-click="handleShowDetail"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="编号" prop="sn" width="120"></el-table-column>
        <el-table-column label="企业名称" width="150">
          <template slot-scope="scope">
            <span class="myblue">{{scope.row.enterpriseName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系人" prop="contacts"></el-table-column>
        <el-table-column label="手机号" prop="contactsTel" width="120"></el-table-column>
        <el-table-column label="当月全部额度" width="120">
          <template slot-scope="scope">
            {{scope.row.thisMonthAllPayment | fMoney}}
          </template>
        </el-table-column>
        <el-table-column label="当月可用额度" width="120">
          <template slot-scope="scope">
            {{scope.row.thisMonthPayment | fMoney}}
          </template>
        </el-table-column>
        <el-table-column label="当月已用额度" width="120">
          <template slot-scope="scope">
            {{scope.row.monthUsablePayment | fMoney}}
          </template>
        </el-table-column>
        <el-table-column label="当前占用额度" width="120">
          <template slot-scope="scope">
            {{scope.row.monthOccupyPayment | fMoney}}
          </template>
        </el-table-column>
        
        <el-table-column label="余额" width="120" v-if="hiddenBalance">
          <template slot-scope="scope">
            {{scope.row.accountBalance | fMoney}}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <button class="statusbtn" v-status="scope.row" :key="scope.row.id">启用</button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paddingcontainer pagecontainer">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
        @current-change="handlegetQualificationPartyList"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getQualificationPartyList,changeQualificationStatus
} from "@/requestDataInterface";
export default {
  props: {},
  data() {
    
    return {
      value6: "",
      dialogTitle: "编辑",
      dialogEditVisible: false,
      isEdit:false,
      hiddenBalance:false,
      currentPage: 1,
      total: 1,
      qualificationPartiesList:[],
      multipleSelection: [],
      formSearch: {
        enterpriseName:''
      },
      resetFormSearch: {
        enterpriseName:''
      }
    }
  },
  created() {},
  methods: {
    handleEffect(id,status){
      return changeQualificationStatus({id:id,status:status}).then(res=>{
        if(res.success){
          this.handlegetQualificationPartyList(this.currentPage)
        }else{
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    handleSearch() {
      this.handlegetQualificationPartyList(this.currentPage);
    },
    handleExport(){
      let idsStr = ''
      let ids = []
      if(this.multipleSelection.length){
        ids = this.multipleSelection.map((item,index)=>item.id)
      }
      idsStr = ids.join(',')
      if(idsStr){
        window.open('http://localhost:8088/export/qualificationPartyList?ids='+idsStr,'_self')
      }else{
        window.open('http://localhost:8088/export/qualificationPartyList','_self')
      }
    },
    handleAdd() {
      this.$router.push("/home/addqualifypart")
    },
    
    handleEdit() {
      let multipleSelection = this.multipleSelection
      if (!this.judgeRight(multipleSelection)) {
        return false
      }
      this.$router.push({name:'EditQualifypart',query:{ id:multipleSelection[0].id }})
    },
    handleShowDetail(row, column, cell, event) {
      if( column.label == '企业名称'){
        this.$router.push({ name: 'QualifypartDetail', query: { id: row.id } })
      }
    },
    handlegetQualificationPartyList(currentPage) {
      let params =Object.assign({}, this.formSearch, {
        page: currentPage,
        rows: 20
      })
      getQualificationPartyList(params)
        .then(res => {
          if (res.success) {
            this.qualificationPartiesList = res.result.qualificationParties
            this.total = res.result.total,
            this.hiddenBalance = res.result.hiddenBalance
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSelectionChange(selection, row) {
      this.multipleSelection = selection
    },
    handleSelectAll(selection) {
      this.multipleSelection = selection
    },
    handleResetSearchForm() {
      Object.assign(this.formSearch, this.resetFormSearch)
    },
    judgeRight(multipleSelection) {
      if (!multipleSelection.length) {
        this.$message({
          type: "error",
          message: "请选择资质方"
        });
        return false;
      } else if (multipleSelection.length > 1) {
        this.$message({
          type: "error",
          message: "请选择一个资质方"
        });
        return false;
      }
      return true;
    }
  },
  computed: {
  },
  mounted() {
    this.handlegetQualificationPartyList(this.currentPage);
  },
  components: {},
  beforeDestroy() {}
};
</script>
<style scoped>
.operate {
  padding: 0 3%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.operate .el-button--small {
  padding: 9px 12px;
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
  width: 230px;
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
  width: 40%;
}
</style>