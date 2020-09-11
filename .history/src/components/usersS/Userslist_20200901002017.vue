<template>
  <div>
    <el-card class="box-card">
      <el-table :data="users" stripe style="width: 100%" border>
        <el-table-column type="index" label="#" width="50" align="center"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180" align="center"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="180" align="center"></el-table-column>
        <el-table-column prop="create_time" label="电话" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="mg_state" label="状态" width="80" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            ><i class="el-icon-delete"></i></el-button>
            <el-button size="mini" type="warning"><i class="el-icon-setting"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
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
      pagenum: 1,
      pagesize: 5,
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
</style>