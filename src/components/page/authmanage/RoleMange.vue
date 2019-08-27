<template>
  <div class="rolelist">
    <div class="operate">
      <div></div>
      <el-button type="success" size="small" @click="handleAddRole">
        <i class="el-icon-circle-plus-outline"></i>&nbsp;添加用户
      </el-button>
    </div>
    <div class="paddingcontainer">
      <el-table :data="userList" style="width: 100%">
        <el-table-column label="日期" prop="date"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="昵称" prop="nick"></el-table-column>
        <el-table-column label="手机号" prop="mobile"></el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleRole(scope.$index, scope.row)">
              <i class="el-icon-setting"></i>&nbsp;设置管理
            </el-button>
            <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">
              <i class="el-icon-edit"></i>&nbsp;编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
              <i class="el-icon-delete"></i>&nbsp;删除
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
        @current-change="handleGetRoleList"
        :current-page="currenPage"
      ></el-pagination>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogEditVisible">
      <el-form :model="formEdit">
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动名称">
              <el-input v-model="formEdit.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动区域">
              <el-select v-model="formEdit.region" placeholder="请选择活动区域" size="small">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm" size="small">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="设置角色" :visible.sync="dialogRoleVisible">
      <el-checkbox-group v-model="roleList">
        <el-checkbox label="复选框 A"></el-checkbox>
        <el-checkbox label="复选框 B"></el-checkbox>
        <el-checkbox label="复选框 C"></el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelRole" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmRole" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { getRoleList, addRole, editRole } from "@/requestDataInterface"

export default {
  props: {},
  data() {
    return {
      dialogTitle: "编辑",
      currenPage:1,
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
      roleList: [],
      dialogEditVisible: false,
      dialogRoleVisible: false,
      formEdit: {

      },
      resetFormEdit: {}
    };
  },
  created() {},
  methods: {
    handleAddRole() {
      this.dialogTitle = "添加角色"
      this.dialogEditVisible = true
    },
    handleGetRoleList(currentPage) {
      let params = {page:currentPage,rows:10}
      getRoleList(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },

    handleRole(index, row) {
      this.dialogRoleVisible = true
    },
    handleEdit(index, row) {
      this.dialogTitle = "编辑"
      this.dialogEditVisible = true
      Object.assign(this.formEdit,row)
    },
    handleDelete() {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if(res.success){
          this.handleGetRoleList(this.currentPage)
          this.$message({
            type: "success",
            message: "删除成功!"
          })
        }else{
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        }
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        })
      })
    },
    submitForm(){
      if(this.dialogTitle == "添加角色"){
        let params = this.formEdit
        addRole( params ).then(res => {
          if(res.success){
            this.handleGetRoleList(this.currentPage)
          }
        }).catch(err => {
          console.log(err)
        })
      }else{
        
        editRole( this.formEdit ).then( res => {
          if(res.success){
            this.handleGetRoleList(this.currentPage)
          }
        }).catch( err => {
          console.log( err )
        })
      }
      this.dialogEditVisible = false
    },
    cancelEidt() {},
    confirmEdit() {},
    confirmRole() {
      console.log(this.roleList)
    },
    cancelRole() {
      this.dialogRoleVisible = false
    }
  },
  computed: {},
  mounted() {},
  components: {
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
  width: 200px;
}

.el-form-item__content > .el-select {
  width: 200px;
}
.cell .el-button--mini{
  padding:7px 7px;
}
</style>