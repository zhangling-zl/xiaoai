<template>
  <div>
    <div>
      <el-card class="box-card">
        <div class="flex a-c mb15">
          <div class="input mr10">
            <el-input placeholder="请输入搜索内容" v-model="query" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </div>
          <div @click="add">
            <el-button type="primary">添加角色</el-button>
          </div>
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
            <el-button size="mini" type="primary" @click="edit(scope.scope)">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button size="mini" type="danger" @click="dli(scope.scope)">
              <i class="el-icon-delete"></i>
            </el-button>
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
      query: "", //搜索
      pagenum: 1, //当前页码值
      pagesize: 10, //每页显示多少条数据
      id: "", //当前一行的id

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
      showClose: true, //是否显示关闭按钮

      //编辑
      //表单的配置项
      fromData: [
        {
          type: "input", //表单的类型
          value: "", //v-model绑定的值
          label: "商品名称", //label名称
          labelWidth: "80px", //label宽度
          prop: "goods_name", //绑定验证
          id: "",
          //验证规则
          rules: [
            {
              required: true,
              message: "商品名称不能为空",
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
          prop: "goods_price", //绑定验证
          label: "商品价格", //label名称
          labelWidth: "80px", //label宽度
          id: "",
          //验证规则
          rules: [
            {
              required: true,
              message: "商品价格不能为空",
              trigger: "blur",
            },
          ],
          attrs: {
            // placeholder: "请输入密码",//占位符
            clearable: true, //显示取消按钮
            // 'show-password':true,//密码框
          },
        },
        {
          type: "input", //表单的类型
          value: "", //v-model绑定的值
          prop: "goods_number", //绑定验证
          label: "商品数量", //label名称
          labelWidth: "80px", //label宽度
          id: "",
          //验证规则
          rules: [
            {
              required: true,
              message: "商品数量不能为空",
              trigger: "blur",
            },
          ],
          attrs: {
            // placeholder: "请输入密码",//占位符
            clearable: true, //显示取消按钮
            // 'show-password':true,//密码框
          },
        },
        {
          type: "input", //表单的类型
          value: "", //v-model绑定的值
          prop: "goods_weight", //绑定验证
          label: "商品重量", //label名称
          labelWidth: "80px", //label宽度
          id: "",
          //验证规则
          rules: [
            {
              required: true,
              message: "商品重量不能为空",
              trigger: "blur",
            },
          ],
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
    ...goodsActions(["getGoods", "deleteGoods"]),

    //关闭
    close(val) {
      // console.log("关闭",val.isVisible);
      this.Visible = val.isVisible;
    },
    //点击编辑按钮拿到当前这一行的数据
    edit(scope) {
      console.log(scope.row, "编辑");
      this.fromData.id = scope.row.id;
      this.fromData[0].value = scope.row.goods_name;
      this.fromData[1].value = scope.row.goods_price;
      this.fromData[2].value = scope.row.goods_number;
      this.fromData[3].value = scope.row.goods_weight;
      // // this.fromData[1].value = scope.row.roleDesc;
      // console.log(this.fromData.id);
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
      this.$message.success("修改成功");
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
      this.getGoods({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
    //当前页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getGoods({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
    //点击删除
    dli(scope) {
      // console.log(scope.row, "删除");
      this.id = scope.row.goods_id;
      console.log(this.id, "删除");
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteGoods({
            id: this.id,
            query: this.query,
            pagenum: this.pagenum,
            pagesize: this.pagesize,
          });
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
    add() {
      console.log("点击跳转路由");
    },
    //点击搜索
    search() {
      console.log(this.query);
      this.getGoods({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
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
.input {
  width: 300px;
}
</style>