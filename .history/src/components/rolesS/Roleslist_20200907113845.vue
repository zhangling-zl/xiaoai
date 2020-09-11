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

    <ai-from
      :visible.sync="Visible"
      :showClose="showClose"
      @cancel="cancel"
      @ok="ok"
      :title="title"
      :fromData="fromData"
    ></ai-from>
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
      //编辑
      title: "编辑角色",
      //表单的配置项
      fromData: [
        {
          type: "input", //表单的类型
          value: "", //v-model绑定的值
          label: "角色名", //label名称
          labelWidth: "80px", //label宽度
          prop:'roleName',//绑定验证
          //验证规则
          rules:[
            {
              required: true, message: '角色名不能为空', trigger: 'blur'
            }
          ],
          attrs: {
            // placeholder: "请输入用户名",//占位符
            clearable: true, //显示取消按钮
          },
        },
        {
          type: "input", //表单的类型
          value: "", //v-model绑定的值
          label: "角色描述", //label名称
          labelWidth: "80px", //label宽度
          attrs: {
            // placeholder: "请输入密码",//占位符
            clearable: true, //显示取消按钮
            // 'show-password':true,//密码框
          },
        },
        {
          type: "select", //表单的类型
          value: "", //v-model绑定的值
          label: "分配角色", //label名称
          labelWidth: "80px", //label宽度
          children: [
            {
              type: "option",
              value: "选项1",
              label: "黄金糕",
            },
            {
              type: "option",
              value: "选项2",
              label: "双皮奶",
            },
            {
              type: "option",
              value: "选项3",
              label: "蚵仔煎",
            },
            {
              type: "option",
              value: "选项4",
              label: "龙须面",
            },
            {
              type: "option",
              value: "选项5",
              label: "北京烤鸭",
            },
          ],
        },
      ],
    };
  },
  methods: {
    //展开vuex的请求
    ...rolesActions(["getRole", "deleteRoles", "putRoles"]),
    //点击编辑按钮拿到当前这一行的数据
    edit(scope) {
      console.log(scope.row, "编辑");
      this.fromData[0].value = scope.row.roleName;
      console.log(this.fromData[0].value);
      this.Visible = true;
    },
    //点击编辑弹框取消
    cancel(val) {
      this.Visible = false;
      this.$message.success("点击了取消");
    },
    //点击编辑确定
    ok(val) {
      this.Visible = false;
      this.$message.success("点击了确定");
      // this.$refs.form.resetFields();清空输入框内容
      // this.putRoles({
      //   // id:this.Edit.id,
      //   // roleName:this.Edit.roleName,
      //   // roleDesc:this.Edit.roleDesc,
      // })
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