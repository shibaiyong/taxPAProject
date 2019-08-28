<template>
  <div class="rolelist">
    <div class="operate">
      <div></div>
      <el-button type="success" size="small" @click="handleAddPermission">
        <i class="el-icon-circle-plus-outline"></i>&nbsp;添加权限
      </el-button>
    </div>
    <div class="paddingcontainer">
      <el-table :data="roleList" style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="name"></el-table-column>
        <el-table-column label="创建时间" prop="createdTime"></el-table-column>
        <el-table-column label="权限链接" prop="url"></el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">
              <i class="el-icon-edit"></i>&nbsp;编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
              <i class="el-icon-delete"></i>&nbsp;删除
            </el-button>
            <el-button size="mini" v-show="scope.row.isButton==0" type="primary" @click="handleSubAddPermission(scope.$index, scope.row)">
              <i class="el-icon-circle-plus-outline"></i>&nbsp;添加子节点
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
        @current-change="handleGetPermissionList"
        :current-page.sync="nowPage"
      ></el-pagination>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogEditVisible">
      <el-form :model="formEdit" size="small" auto-complete="off" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="权限名称">
              <el-input v-model="formEdit.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="权限链接">
              <el-input v-model="formEdit.url" :disabled="ispath"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, addPermission, editPermission, deletePermission } from "@/requestDataInterface"
export default {
  props: {},
  data() {
    return {
      dialogTitle: "编辑",
      nowPage:1,
      total:1,
      ispath:false,
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
        name:'',
        url:'',
        parentId:'0'
      },
      resetFormEdit: {
        name:'',
        url:'',
        parentId:'0'
      }
    }
  },
  created() {},
  methods: {
    handleAddPermission() {
      this.dialogTitle = "添加权限"
      this.dialogEditVisible = true
      this.ispath = true
      Object.assign(this.formEdit,this.resetFormEdit,{isButton:'0',url:'/'})
    },
    handleSubAddPermission(index,row) {
      this.dialogTitle = "添加子节点"
      this.dialogEditVisible = true
      this.ispath = false
      let isButton = 0
      if( row.parentId != '0'){
        isButton = 1
      }
      Object.assign(this.formEdit,this.resetFormEdit,{parentId:row.id,isButton})
    },
    handleGetPermissionList(currentPage) {
      // this.currenPage = currentPage
      console.log(this.nowPage)
      let params = {page:currentPage,rows:10}
      getPermissionList(params).then(res => {
        if(res.success){
          this.roleList = res.result.roles
          this.total = res.result.total
        }
      }).catch(err => {
        console.log(err)
      })
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
        deletePermission({permissionId:id}).then(
          res => {
            console.log(res)
            if(res.success){
              this.handleGetPermissionList(this.currentPage)
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
      if(this.dialogTitle == "添加权限" || this.dialogTitle == "添加子节点"){
        let params = this.formEdit
        addPermission( params ).then(res => {
          if(res.success){
            this.handleGetPermissionList(this.nowPage)
          }
        }).catch(err => {
          console.log(err)
        })
      }else{
        editPermission( this.formEdit ).then( res => {
          if(res.success){
            console.log( 'edit' + this.nowPage )
            this.handleGetPermissionList(this.nowPage)
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
  mounted() {
    this.handleGetPermissionList(this.currenPage)
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