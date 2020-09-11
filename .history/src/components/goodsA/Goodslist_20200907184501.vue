<template>
  <div>
    <div>
      <el-card class="box-card">
        <div class="mb15" @click="add">
          <el-button type="primary">添加角色</el-button>
        </div>
        <!--表格 -->
        <ai-table
          v-if="goodslist.length"
          :border="border"
          :Role="goodslist"
          :columns="columns"
          :total="total"
          :expand-options="false"
          :index-options="indexOptions"
          :loadingOptions="loadingOptions"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        >
          <template v-slot:action="scope">
            <el-button size="mini" type="primary" @click="edit(scope.scope)">编辑</el-button>
            <el-button size="mini" type="danger" @click="dli(scope.scope)">删除</el-button>
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
    
    </div>
  </div>
</template>

<script>
// 如果vuex有提交mutations,固定写法
import { createNamespacedHelpers } from "vuex";
const goodsModule = createNamespacedHelpers("goods"); //user是模块名（store/index/modules/user）
const { mapState: goodsState, mapActions: goodsActions } = goodsModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      query: '', //搜索
      pagenum: 1, //当前页码值
      pagesize: 10, //每页显示多少条数据

      //表格
      //表格的配置项 布尔类型的值不显示
      columns: [
        {
          label: "商品名称",
          prop: "goods_name",
          align: "center",
          width: "500",
        },
        {
          label: "商品价格(元)",
          prop: "goods_price",
          align: "center",
          width: "150",
        },
         {
          label: "商品重量",
          prop: "goods_weight",
          align: "center",
          width: "100",
        },
         {
          label: "创建时间",
          prop: "add_time",
          align: "center",
          width: "200",
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
      ],
    };
  },
  methods: {
    //展开vuex的请求
    ...goodsActions(["getGoods"]),

    //关闭
    close(val) {
      // console.log("关闭",val.isVisible);
      this.Visible = val.isVisible;
    },
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
    //点击添加
    add(){
       console.log('add');
    }

  },
  mounted() {
    this.getGoods({
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    ...goodsState(["goodslist", "total"]),
  },
};
</script>

<style scoped lang='scss'>
</style>