<template>
  <div class="userlist">
    <el-row>
      <el-col :span="24">
        <Header />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <NavBar />
      </el-col>
      <el-col :span="20">
        <Bread />
        <div class="operate">
          <el-form :inline="true" :model="formSearch" size="small">
            <el-form-item label="审批人">
              <el-input v-model="formSearch.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-select v-model="formSearch.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" size="small">
                <i class="el-icon-search"></i>&nbsp;查询
              </el-button>
            </el-form-item>
          </el-form>
          <el-button type="success" size="small">
            <i class="el-icon-circle-plus-outline"></i>&nbsp;添加用户
          </el-button>
        </div>
        <div class="paddingcontainer">
          <el-table :data="userList" style="width: 100%">
            <el-table-column label="日期" prop="date"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="昵称" prop="nick"></el-table-column>
            <el-table-column label="手机号" prop="mobile"></el-table-column>
            <el-table-column label="邮箱" width="180" prop="email"></el-table-column>
            <el-table-column label="注册时间" prop="registerdate"></el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleRole(scope.$index, scope.row)">设置管理</el-button>
                <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="编辑" :visible.sync="dialogEditVisible">
      <el-form :model="formEdit">
        <el-row>
        <el-col :span="12">
          <el-form-item label="活动名称">
            <el-input v-model="formEdit.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="活动区域">
          <el-select v-model="formEdit.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogEditVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="设置角色" :visible.sync="dialogRoleVisible">
      <el-checkbox-group v-model="roleList">
        <el-checkbox label="复选框 A"></el-checkbox>
        <el-checkbox label="复选框 B"></el-checkbox>
        <el-checkbox label="复选框 C"></el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelRole">取 消</el-button>
        <el-button type="primary" @click="confirmRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Header from "@/components/base/Header"
import NavBar from "@/components/base/NavBar"
import Bread from "@/components/base/Bread"

export default {
  props: {},
  data() {
    return {
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
      roleList:[],
      formSearch: {
        user: "",
        region: ""
      },
      dialogEditVisible: false,
      dialogRoleVisible: false,
      formEdit: {

      },
      resetFormEdit:{

      }
    };
  },
  created() {},
  methods: {
    onSubmit() {
      console.log("submit!")
    },

    handleRole(index, row) {
      this.dialogRoleVisible = true
    },
    handleEdit(index, row) {
      this.dialogEditVisible = true
    },
    cancelEidt(){

    },
    confirmEdit(){

    },
    confirmRole(){
      console.log(this.roleList)
    },
    cancelRole(){

    }
  },
  computed: {},
  mounted() {},
  components: {
    Header,
    NavBar,
    Bread
  },
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
</style>