<template>
  <div class="rolelist">
    <div class="operate">
      <div></div>
      <el-button type="success" size="small" @click="handleAddRole">
        <i class="el-icon-circle-plus-outline"></i>&nbsp;添加角色
      </el-button>
    </div>
    <div class="paddingcontainer">
      <el-table :data="roleList" style="width: 100%">
        <el-table-column label="角色名称" prop="name"></el-table-column>
        <el-table-column label="创建时间" prop="createdTime"></el-table-column>
        <el-table-column label="角色描述" prop="description"></el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleGetPermissionList(scope.$index, scope.row)">
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
        :total="total"
        @current-change="handleGetRoleList"
        :current-page="currenPage"
      ></el-pagination>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogEditVisible">
      <el-form :model="formEdit" size="small" auto-complete="off" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色名称">
              <el-input v-model="formEdit.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="角色描述">
              <el-input v-model="formEdit.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm" size="small">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="设置权限" :visible.sync="dialogRoleVisible">
      <el-checkbox-group v-model="permissionList.permissionIds">
        <el-checkbox :label="item.id" v-for="item in allPermissionList" :key="item.id">{{item.name}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelRole" size="small">取 消</el-button>
        <el-button type="primary" @click="submitPermission" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { getRoleList, addRole, editRole, deleteRole, getALLPermissionList, configPermission } from "@/requestDataInterface"

export default {
  props: {},
  data() {
    return {
      dialogTitle: "编辑",
      currenPage:1,
      total:1,
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
      permissionList: {
        permissionIds:[],
        roleId:''
      },
      roleList:[],
      allPermissionList:[],
      dialogEditVisible: false,
      dialogRoleVisible: false,
      formEdit: {
        description:'',
        name:''
      },
      resetFormEdit: {
        description:'',
        name:''
      }
    }
  },
  created() {},
  methods: {
    handleAddRole() {
      this.dialogTitle = "添加角色"
      this.dialogEditVisible = true
      Object.assign(this.formEdit,this.resetFormEdit)
    },
    handleGetRoleList(currentPage) {
      let params = {page:currentPage,rows:10}
      getRoleList(params).then(res => {
        if(res.success){
          this.roleList = res.result.roles
          this.total = res.result.total
        }
      }).catch(err => {
        console.log(err)
      })
    },

    handleGetPermissionList(index,row) {

      this.permissionList.roleId = row.id

      getALLPermissionList({roleId:row.id}).then(res => {
        if(res.success){
          this.allPermissionList = res.result.permissions
          this.permissionList.permissionIds = res.result.permissionsCheck
        }
      }).catch(err => {
        console.log(err)
      })
      this.dialogRoleVisible = true
    },
    handleEdit(index, row) {
      this.dialogTitle = "编辑"
      this.dialogEditVisible = true
      Object.assign(this.formEdit,row)
    },
    handleDelete(index, row) {
      let id = row.id
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteRole({roleId:id}).then(
          res => {
            console.log(res)
            if(res.success){
              this.handleGetRoleList(this.currentPage)
              this.$message({
                type: "success",
                message: "删除成功!"
              })
            }else{
              this.$message({
                type: "danger",
                message: res.msg
              })
            }
          }
        ).catch(err=>{console.log(err)})
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
          }else{
            this.$message({
              type:'error',
              message:'新增失败,'+res.msg
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }else{
        
        editRole( this.formEdit ).then( res => {
          if(res.success){
            this.handleGetRoleList(this.currentPage)
          }else{
            this.$message({
              type:'error',
              message:'编辑失败,'+res.msg
            })
          }
        }).catch( err => {
          console.log( err )
        })
      }
      this.dialogEditVisible = false
    },
    submitPermission() {
      let params = this.permissionList
      let arrtostring = params.permissionIds.join(',')
      params.permissionIds = arrtostring
      configPermission(params).then(res => {
        if(res.success){
          this.dialogRoleVisible = false
        }
      }).catch(err => {
        console.log(err)
      })
    },
    cancelEidt() {},
    confirmEdit() {},
    cancelRole() {
      this.dialogRoleVisible = false
    }
  },
  computed: {},
  mounted() {
    this.handleGetRoleList()
  },
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
.cell .el-button--mini{
  padding:7px 7px;
}
</style>