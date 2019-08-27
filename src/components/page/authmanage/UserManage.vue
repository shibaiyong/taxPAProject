<template>
  <div class="userlist">
    <div class="operate">
      <el-form :inline="true" :model="formSearch" size="small">
        <!-- <el-form-item label="审批人">
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
        </el-form-item> -->
      </el-form>
      <el-button type="success" size="small" @click="handleAddUser">
        <i class="el-icon-circle-plus-outline"></i>&nbsp;添加用户
      </el-button>
    </div>
    <div class="paddingcontainer">
      <el-table :data="userList" style="width: 100%">
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="出生日期" prop="birthday"></el-table-column>
        <el-table-column label="地址" prop="address"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="邮箱" width="180" prop="email"></el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleRole(scope.$index, scope.row)">
              <i class="el-icon-setting"></i>&nbsp;设置管理
            </el-button>
            <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">
              <i class="el-icon-edit"></i>&nbsp;编辑
            </el-button>
            <el-button size="mini" type="warning" @click="handleDelete(scope.$index, scope.row)">
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
        @current-change="handleGetUserList"
        :current-page="currentPage"
      ></el-pagination>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogEditVisible">
      <el-form :model="formEdit" label-width="100px" size="small" auto-complete="off">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名">
              <el-input v-model="formEdit.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码">
              <el-input v-model="formEdit.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="出生日期">
              <el-date-picker
                v-model="formEdit.birthday"
                type="date"
                format="yyyy - MM - dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址">
              <el-input v-model="formEdit.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱">
              <el-input v-model="formEdit.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="formEdit.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电话">
              <el-input v-model="formEdit.phone"></el-input>
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
      <el-checkbox-group v-model="checkedRoleList">
        <el-checkbox v-for="item in roleList" :label="item.label" :key="item.label">{{item.name}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelRole" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmRole" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { addUser, getUserList, editUser, deleteUser } from "@/requestDataInterface"

export default {
  props: {},
  data() {
    return {
      dialogTitle: "编辑",
      total:1,
      dialogEditVisible: false,
      dialogRoleVisible: false,
      currentPage:1,
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
      checkedRoleList: [],
      roleList:[
        {name:'角色一', label:'1'},
        {name:'角色二', label:'2'},
        {name:'角色三', label:'3'}
      ],
      formSearch: {
        page:1,
        rows:10
      },
      formEdit: {
        username: "",
        password: "",
        birthday: "",
        address: "",
        email: "",
        name: "",
        phone: ""
      },
      resetFormEdit: {
        username: "",
        password: "",
        birthday: "",
        address: "",
        email: "",
        name: "",
        phone: ""
      }
    };
  },
  created() {},
  methods: {
    handleAddUser() {
      this.dialogTitle = "添加用户"
      this.dialogEditVisible = true
    },
    submitForm(){
      if(this.dialogTitle == "添加用户"){
        let params = this.formEdit
        addUser( params ).then(res => {
          if(res.success){
            this.handleGetUserList(this.currentPage)
          }
        }).catch(err => {
          console.log(err)
        })
      }else{
        
        editUser( this.formEdit ).then( res => {
          if(res.success){
            this.handleGetUserList(this.currentPage)
          }
        }).catch( err => {
          console.log( err )
        })
      }
      this.dialogEditVisible = false
    },
    handleGetUserList(currentPage) {
      let params = Object( {}, this.formSearch, { page:currentPage } )
      getUserList( params ).then(res => {
        if(res.success){
          this.userList = res.result.users
          this.total = res.result.total
        }
      }).catch( err => {
        console.log(err)
      })
    },

    handleEdit(index, row) {
      this.dialogTitle = "编辑"
      this.dialogEditVisible = true
      let params = Object.assign( this.formEdit, row)
    },

    handleDelete( index, row ){
      let id = row.id
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          deleteUser( { id } ).then(res => {
          if(res.success){
              this.handleGetUserList(this.currentPage)
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            }
          }).catch( err => {
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })         
        });
      
    },

    handleRole(index, row) {
      this.dialogRoleVisible = true
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
  mounted() {
    this.handleGetUserList()
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