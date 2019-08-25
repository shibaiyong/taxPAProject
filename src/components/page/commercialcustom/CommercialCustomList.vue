<template>
  <div class="commercialList">
    <div class="operate">
      <el-form :model="formSearch" size="small" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="商户编号">
              <el-input v-model="formSearch.code" placeholder="商户编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业名称">
              <el-input v-model="formSearch.name" placeholder="企业名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业银行账号">
              <el-input v-model="formSearch.bankaccount" placeholder="企业银行账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="纳税人识别号">
          <el-input v-model="formSearch.taxpayercode" placeholder="纳税人识别号"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="8">
        <el-form-item label="当前状态">
          <el-select v-model="formSearch.status" placeholder="当前状态">
            <el-option v-for="option in statusOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入网日期">
          <el-date-picker
            v-model="formSearch.datespan"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="operate">
      <div class="operateBtn">
        <el-button type="primary" size="small">
          <i class="el-icon-search"></i>&nbsp;查询
        </el-button>
        <el-button type="primary" size="small">
          <i class="el-icon-search"></i>&nbsp;清空
        </el-button>
        <el-button type="primary" size="small">
          <i class="el-icon-search"></i>&nbsp;录入
        </el-button>
        <el-button type="primary" size="small">
          <i class="el-icon-search"></i>&nbsp;编辑
        </el-button>
        <el-button type="primary" size="small">
          <i class="el-icon-search"></i>&nbsp;删除
        </el-button>
        <el-button type="primary" size="small">
          <i class="el-icon-search"></i>&nbsp;加入黑名单
        </el-button>
        <el-button type="primary" size="small">
          <i class="el-icon-search"></i>&nbsp;调账
        </el-button>
      </div>
    </div>
    <div class="paddingcontainer">
      <el-table :data="userList" style="width: 100%">
        <el-table-column label="日期" prop="date"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="昵称" prop="nick"></el-table-column>
        <el-table-column label="手机号" prop="mobile"></el-table-column>
        <el-table-column label="邮箱" width="180" prop="email"></el-table-column>
        <el-table-column label="注册时间" prop="registerdate"></el-table-column>
        <el-table-column label="操作" width="210">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleRole(scope.$index, scope.row)">
              <i class="el-icon-setting"></i>&nbsp;设置管理
            </el-button>
            <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">
              <i class="el-icon-edit"></i>&nbsp;编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paddingcontainer pagecontainer">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        @current-change="getUserList"
      ></el-pagination>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogEditVisible">
      <el-form :model="formEdit" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="商户编号">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其他编号">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纳税人识别号">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="法人姓名">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纳税人类型">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人姓名">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人手机号">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人姓名">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人手机号">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人邮箱">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实际经营地址">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户行名称">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业账户">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户行地域">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户行信息">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户行联行号">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业电子账户">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="资质方关联">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开票信息">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商户服务费">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
          <!-- 商户服务费有问题 -->
          <el-col :span="12">
            <el-form-item label="商户服务费">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="销售经理">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogEditVisible = false" size="small">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="设置角色" :visible.sync="dialogRoleVisible">
      <el-form>
      <el-row>
        <el-col :span="12">
          <el-form-item label="商户名称">
          <el-select v-model="formEdit.region" placeholder="请选择活动区域" size="small">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商户编号">
            <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="调账类型">
          <el-select v-model="formEdit.region" placeholder="请选择活动区域" size="small">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="调账金额">
            <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelRole" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmRole" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      value6: "",
      dialogTitle: "编辑",
      dialogEditVisible: false,
      dialogRoleVisible: false,
      statusOptions: [
        { label: "全部", value: "0" },
        { label: "生效中", value: "1" },
        { label: "停用中", value: "2" }
      ],
      userList: [
        {
          date: "2014/02/06",
          name: "赵佳浩",
          nick: "过往云烟",
          mobile: "13716420520",
          email: "1850418899@qq.com",
          registerdate: "2011/09/09"
        }
      ],
      formSearch: {
        code: "",
        status: "",
        name: "",
        bankaccount: "",
        taxpayercode: "",
        datespan: ""
      },
      formEdit: {},
      resetFormEdit: {}
    };
  },
  created() {},
  methods: {
    addUser() {
      this.dialogTitle = "添加用户";
      this.dialogEditVisible = true;
    },
    getUserList(currentPage) {
      console.log(currentPage);
    },
    onSubmit() {
      console.log("submit!");
    },

    handleRole(index, row) {
      this.dialogRoleVisible = true;
    },
    handleEdit(index, row) {
      this.dialogTitle = "编辑";
      this.dialogEditVisible = true;
    },
    cancelEidt() {},
    confirmEdit() {},
    confirmRole() {
      console.log(this.roleList);
    },
    cancelRole() {
      this.dialogRoleVisible = false;
    }
  },
  computed: {},
  mounted() {},
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
  margin-top: 20px;
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
</style>