<template>
  <div>
    <el-card class="box-card">
      <div class="flex" style="margin-bottom: 15px;">
        <input type="text" class="input" placeholder="请输入搜索内容" />
        <div class="icon flex a-c j-c mr15">
          <i class="el-icon-search"></i>
        </div>
        <el-button type="primary" size="small">添加用户</el-button>
      </div>
      <el-table :data="users.slice((pagenum-1)*pagesize,pagenum*pagesize)" stripe style="width: 100%" border>
        <el-table-column prop="index" label="#" width="50" align="center"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180" align="center"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="180" align="center"></el-table-column>
        <el-table-column prop="create_time" label="电话" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="mg_state" label="状态" width="80" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#eee"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
              <i class="el-icon-delete"></i>
            </el-button>
            <el-button size="mini" type="warning">
              <i class="el-icon-setting"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt15">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="users.length"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
//如果vuex有提交mutations,固定写法
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user"); //user是模块名（store/index/modules/user）
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      pagenum: 1,//当前页数
      pagesize: 5,//每页条数
    };
  },
  methods: {
    ...userActions(["getUsers"]),
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val
    },
  },
  mounted() {
    this.getUsers({ pagenum: this.pagenum, pagesize: this.pagesize });
  },
  watch: {},
  computed: {
    ...userState(["users"]),
  },
};
</script>

<style scoped lang='scss'>
.input {
  width: 270px;
  height: 38px;
  border: none;
  border: 1px solid rgb(240, 243, 242);
  padding: 0 10px;
  outline: none;
  font-size: #555;
}

.icon {
  width: 60px;
  height: 40px;
  border-radius: 0 3px 3px 0;
  background-color: rgb(240, 243, 242);
  color: #999;
}
</style>