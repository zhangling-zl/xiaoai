<template>
  <div>
    <el-card class="box-card">
      <div class="mb15" @click="add">
        <el-button type="primary">添加角色</el-button>
      </div>
      <!--表格 -->
      <ai-table
        v-if="Role.length"
        :border="border"
        :currentPage="currentPage"
        :pageSize="pageSize"
        :pageSizes="[3,6,9,12]"
        :Role="Role"
        :columns="columns"
        :total="total"
        :expand-options="true"
        :index-options="indexOptions"
        :loadingOptions="loadingOptions"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      >
        <template v-slot:action="scope">
          <el-button size="mini" type="primary" @click="edit(scope.scope)">编辑</el-button>
          <el-button size="mini" type="danger" @click="dli(scope.scope)">删除</el-button>
          <el-button size="mini" type="warning" @click="Authority(scope.scope)">分配权限</el-button>
        </template>
        <template v-slot:expand="scope">
          <div v-for="item in scope.scope.row.children" :key="item.authName" class="flex">
            <div class="from flex">
              <span class="mr40 flex a-c">
                <el-tag closable @close="handleClose(item,scope.scope.row)">
                  <span>{{item.authName}}</span>
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </span>
              <div class="flex column">
                <div v-for="item1 in item.children" :key="item1.authName">
                  <div class="flex mtb15 a-c">
                    <div class="mr40 flex a-c">
                      <el-tag type="success" size="small" closable @close="handleClose(item1,scope.scope.row)">
                        <span>{{item1.authName}}</span>
                      </el-tag>
                      <i class="el-icon-caret-right"></i>
                    </div>
                    <div class="one">
                      <el-tag
                        v-for="item2 in item1.children"
                        :key="item2.authName"
                        type="warning"
                        size="small"
                        closable
                        @close="handleClose(item2,scope.scope.row)"
                      >{{item2.authName}}</el-tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ai-table>
    </el-card>

    <!--表单编辑-->
    <ai-from
      :visible.sync="Visible"
      :showClose="showClose"
      @cancel="cancel"
      @ok="ok"
      @close="close"
      :title="'编辑角色'"
      :fromData="fromData"
    ></ai-from>
    <!--表单添加-->
    <ai-from
      :visible.sync="VisibleAll"
      :showClose="showClose"
      @cancel="cancelAdd"
      @ok="okAdd"
      @close="closeAll"
      :title="'添加角色'"
      :fromData="fromDataAll"
    ></ai-from>

    <!-- 表单权限分配 -->
    <el-dialog title="分配权限" :visible.sync="dialogFormVisible">
      <el-tree
        :data="rights"
        highlight-current
        show-checkbox
        node-key="id"
        ref="tree"
        :default-expand-all="true"
        :default-expanded-keys="idd"
        :default-checked-keys="idd"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </div>
    </el-dialog>
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
    //  roleId:'',//当前的角色id
     rightId:'',//当前点击的权限id

      roleId: "",//当前这一行的id（点击角色分配的时候）
      idd: [], //当前点击这一项的所有id（数组）
      type: "tree", //树状图参数
      dialogFormVisible: false, //控制分配角色弹框的显示与隐藏
      // formLabelWidth: "120px",
      //树状图的配置项
      defaultProps: {
        children: "children",
        label: "label",
      },

      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: "",
      //表格
      //表格的配置项 布尔类型的值不显示
      columns: [
        {
          label: "职位",
          prop: "roleName",
          align: "center",
          width: "350",
        },
        {
          label: "描述",
          prop: "roleDesc",
          align: "center",
          width: "350",
        },
        {
          label: "操作",
          align: "center",
        },
      ],
      //下标(1、2、3、4)
      indexOptions: {
        showIndex: true,
        label: "#",
        align: "center",
        width: "60",
        indexMethod(index) {
          return index + 1;
        },
      },
      //加载中效果
      loadingOptions: {
        text: "加载中...",
        bgColor: "rgba(0, 0, 0, 0.8)",
      },
      currentPage: 1, //分页(当前页)
      pageSize: 3, //分页(当前页有多少条)
      border: true, //表单是否带边框
      //对话框嵌套表单
      Visible: false, //控制对话框的显示与隐藏
      VisibleAll: false, //控制添加
      showClose: false, //是否显示关闭按钮

      //编辑

      //表单的配置项
      fromData: [
        {
          type: "input", //表单的类型
          value: "", //v-model绑定的值
          label: "角色名", //label名称
          labelWidth: "80px", //label宽度
          prop: "roleName", //绑定验证
          id: "",
          //验证规则
          rules: [
            {
              required: true,
              message: "角色名不能为空",
              trigger: "blur",
            },
          ],
          attrs: {
            // placeholder: "请输入用户名",//占位符
            clearable: true, //显示取消按钮
          },
        },
        {
          type: "input", //表单的类型
          value: "", //v-model绑定的值
          prop: "roleDesc", //绑定验证
          label: "角色描述", //label名称
          labelWidth: "80px", //label宽度
          id: "",
          attrs: {
            // placeholder: "请输入密码",//占位符
            clearable: true, //显示取消按钮
            // 'show-password':true,//密码框
          },
        },
        // {
        //   type: "select", //表单的类型
        //   value: "", //v-model绑定的值
        //   prop:'rules',//绑定验证
        //   label: "分配角色", //label名称
        //   labelWidth: "80px", //label宽度
        //   children: [
        //     {
        //       type: "option",
        //       value: "选项1",
        //       label: "黄金糕",
        //     },
        //     {
        //       type: "option",
        //       value: "选项2",
        //       label: "双皮奶",
        //     },
        //     {
        //       type: "option",
        //       value: "选项3",
        //       label: "蚵仔煎",
        //     },
        //     {
        //       type: "option",
        //       value: "选项4",
        //       label: "龙须面",
        //     },
        //     {
        //       type: "option",
        //       value: "选项5",
        //       label: "北京烤鸭",
        //     },
        //   ],
        // },
      ],
      //表单的配置项
      fromDataAll: [
        {
          type: "input", //表单的类型
          value: "", //v-model绑定的值
          label: "角色名", //label名称
          labelWidth: "80px", //label宽度
          prop: "roleName", //绑定验证
          id: "",
          //验证规则
          rules: [
            {
              required: true,
              message: "角色名不能为空",
              trigger: "blur",
            },
          ],
          attrs: {
            // placeholder: "请输入用户名",//占位符
            clearable: true, //显示取消按钮
          },
        },
        {
          type: "input", //表单的类型
          value: "", //v-model绑定的值
          prop: "roleDesc", //绑定验证
          label: "角色描述", //label名称
          labelWidth: "80px", //label宽度
          id: "",
          attrs: {
            // placeholder: "请输入密码",//占位符
            clearable: true, //显示取消按钮
            // 'show-password':true,//密码框
          },
        },
      ],
    };
  },
  methods: {
    //关闭
    close(val) {
      // console.log("关闭",val.isVisible);
      this.Visible = val.isVisible;
    },
    //关闭
    closeAll(val) {
      // console.log("关闭",val.isVisible);
      this.VisibleAll = val.isVisible;
    },

    //展开vuex的请求
    ...rolesActions([
      "getRole",
      "deleteRoles",
      "putRoles",
      "postRoles",
      "getRights",
      "postRolesId",
      "deleteRolesId"
    ]),
    //点击编辑按钮拿到当前这一行的数据
    edit(scope) {
      console.log(scope.row, "编辑");
      this.fromData.id = scope.row.id;
      this.fromData[0].value = scope.row.roleName;
      // this.fromData[1].value = scope.row.roleDesc;
      console.log(this.fromData.id);
      this.Visible = true;
    },
    //点击编辑弹框取消
    cancel(val) {
      this.Visible = false;
      this.$message.success("点击了取消");
      console.log(val);
      val.fromRef.resetFields(); //清空输入框内容
    },
    //点击编辑确定
    ok(val) {
      this.Visible = false;
      // this.$message.success("点击了确定");
      console.log(val);

      //提交编辑的请求
      this.putRoles({
        id: this.fromData.id,
        roleName: val.options.roleName,
        roleDesc: val.options.roleDesc,
      });
      val.fromRef.resetFields(); //清空输入框内容
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
    //点击添加角色弹框
    add() {
      this.VisibleAll = true;
    },
    //点击添加角色的取消
    cancelAdd(val) {
      this.VisibleAll = false;
      this.$message.success("点击了取消");
      // console.log(val);
      val.fromRef.resetFields(); //清空输入框内容
    },
    //点击添加角色的确定
    okAdd(val) {
      // this.$message.success("点击了确定");
      console.log(val);
      this.postRoles({
        roleName: val.options.roleName,
        roleDesc: val.options.roleDesc,
      });
      this.VisibleAll = false;
    },
    //点击分配权限
    Authority(scope) {
      // console.log(scope.row, "分配权限");
      this.roleId = scope.row.id;
      this.dialogFormVisible = true;
      //定义一个空数组 拿到这一行所有的id
      this.idd = [];
      scope.row.children.map((item) => {
        item.children.map((item1) => {
          item1.children.map((item2) => {
            this.idd.push(item2.id);
          });
        });
      });
      // console.log(this.idd,'11');
    },
    //分配角色的确定
    determine() {
      this.dialogFormVisible = false;
      //通过 node 获取
      console.log(this.$refs.tree.getCheckedKeys(), "通过 key 获取");
      console.log(this.$refs.tree.getHalfCheckedKeys(), "半选");
      //把两个数组拼接起来 变成字符串
      let a = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys())
        .join(",");
      // console.log(a);
      //发请求
      this.postRolesId({
        roleId: this.roleId,
        rids: a,
      });
      // //通过 key 获取
      // console.log(this.$refs.tree.getCheckedKeys(), "通过 key 获取");
      // //通过 node 设置
      // this.$refs.tree.setCheckedNodes(this.idd);
      // console.log("通过 node 设置");
      // //通过 key 设置
      // this.$refs.tree.setCheckedKeys(this.idd);
      // console.log("通过 key 设置");
      // //清空
      // this.$refs.tree.setCheckedKeys([]);
      // console.log("清空");
    },

    //点击小标签的每一项（事件）
    handleClose(item,scope) {
      console.log(item,'权限id');
      console.log(scope,'角色id');
      // this.deleteRolesId({
          // this.roleId = item.id
          // this.rightId = scope.id
      // })
    },
  },

  mounted() {
    this.getRole();
    this.getRights({
      type: this.type,
    });
  },
  watch: {},
  computed: {
    ...rolesState(["Role", "total", "rights"]),
    // rights 所有角色列表
    //Role 单个角色
  },
};
</script>

<style scoped lang='scss'>
.from {
  margin-top: 20px;
  padding: 20px;
}
.el-tag  {
  margin-right: 10px;
  margin-bottom: 5px;
   margin-top: 5px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.from {
  margin: 15px 0;
  border-bottom: 1px solid #eee;
}
</style>