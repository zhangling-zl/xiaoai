<template>
  <div>
    <div class="from">
      <ai-table
        :currentPage="currentPage"
        :pageSize="pageSize"
        :pageSizes="[3,6,9,12]"
        :Role="Role"
        :columns="columns"
        :total="total"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      >
        <template v-slot:action="scope">
          <el-button size="mini" type="primary" @click="edit(scope.scope)">编辑</el-button>
          <el-button size="mini" type="danger" @click="dli(scope.scope)">删除</el-button>
          <el-button size="mini" type="warning" @click="Authority(scope.scope)">分配权限</el-button>
        </template>
      </ai-table>
    </div>

    <ai-from :visible.sync="Visible" :showClose="showClose" @cancel="cancel" @ok="ok" :title='title'></ai-from>
  </div>
</template>

<script>
//如果vuex有提交mutations,固定写法
import { createNamespacedHelpers } from "vuex";
const rolesModule = createNamespacedHelpers("roles"); //user是模块名（store/index/modules/user）
const { mapState: rolesState, mapActions: rolesActions } = rolesModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      //表格
      //表格的配置项 布尔类型的值不显示
      columns: [
        {
          label: "职位",
          prop: "roleName",
          align: "center",
          width: "200",
        },
        {
          label: "描述",
          prop: "roleDesc",
          align: "center",
          width: "200",
        },
        {
          label: "操作",
          align: "center",
        },
      ],
      currentPage: 1, //分页(当前页)
      pageSize: 3, //分页(当前页有多少条)
      //对话框嵌套表单
      Visible: false, //控制对话框的显示与隐藏
      showClose: false, //是否显示关闭按钮
      //
      title:'编辑角色'
    };
  },
  methods: {
    //展开vuex的请求
    ...rolesActions(["getRole", "deleteRoles"]),
    //点击编辑按钮拿到当前这一行的数据
    edit(scope) {
      console.log(scope.row, "编辑");
      this.Visible = true;
    },
    //点击编辑弹框取消
    cancel() {
      this.Visible = false;
      this.$message.success("点击了取消");
    },
    //点击编辑确定
    ok() {
      this.Visible = false;
      this.$message.success("点击了确定");
    },

    //点击分配权限
    Authority(scope) {
      console.log(scope.row, "分配权限");
    },
    //每页多少条
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    //当前页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    //点击删除
    dli(scope) {
      // console.log(scope.row, "删除");
      // console.log(scope.row.id, "删除");
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteRoles(scope.row.id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.getRole();
  },
  watch: {},
  computed: {
    ...rolesState(["Role", "total"]),
  },
};
</script>

<style scoped lang='scss'>
.from {
  margin-top: 20px;
  padding: 20px;
  background-color: palegreen;
}
</style>