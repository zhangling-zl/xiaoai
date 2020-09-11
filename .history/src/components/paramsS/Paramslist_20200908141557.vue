<template>
  <div>
    <el-card class="box-card">
      <el-alert title="注意!只允许为第三级分类设置相关参数!" type="warning" show-icon :closable="false"></el-alert>
      <div class="flex a-c mt20">
        <div class="f18 mr20">选择商品分类:</div>
        <el-cascader
          v-model="value"
          :options="categories"
          :props="{value:'cat_id',label:'cat_name'}"
          clearable
          @change="handleChange"
        ></el-cascader>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="first">
          <el-button type="primary" size="mini" v-if="categor.length" @click="add">添加参数</el-button>
          <el-button type="primary" size="mini" disabled v-else>添加参数</el-button>
          <!--表格 -->
          <ai-table
            :border="border"
            :Role="categor"
            :columns="columns"
            :total="totalAll"
            :expand-options="true"
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
          <!--表单编辑-->
          <ai-from
            :visible.sync="Visible"
            :showClose="showClose"
            @cancel="cancel"
            @ok="ok"
            @close="close"
            :title="'修改动态参数'"
            :fromData="fromData"
          ></ai-from>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="second">静态属性</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// //如果vuex有提交mutations,固定写法
import { createNamespacedHelpers } from "vuex";
const goodsModule = createNamespacedHelpers("goods"); //user是模块名（store/index/modules/user）
const { mapState: goodsState, mapActions: goodsActions } = goodsModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      //参数
      type: 3,
      pagenum: 1,
      pagesize: 10,
      //
      activeName: "first", //默认选中第一个标签
      //
      value: "", //下拉框绑定的值
      sel: "only", //请求的参数
      id:'',
      attrId:'',
      attr_vals:'',


      //表格
      //表格的配置项 布尔类型的值不显示
      columns: [
        {
          label: "参数名称",
          prop: "attr_name",
          align: "center",
          width: "600",
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
        width: "100",
        indexMethod(index) {
          return index + 1;
        },
      },
      //加载中效果
      loadingOptions: {
        text: "加载中...",
        bgColor: "rgba(0, 0, 0, 0.8)",
      },
      border: false, //表单是否带边框
      //对话框嵌套表单
      Visible: false, //控制对话框的显示与隐藏
      showClose: true, //是否显示关闭按钮

      //编辑
      //表单的配置项
      fromData: [
        {
          type: "input", //表单的类型
          value: "", //v-model绑定的值
          label: "动态参数", //label名称
          labelWidth: "80px", //label宽度
          prop: "attr_name", //绑定验证
          id: "",
          //验证规则
          rules: [
            {
              required: true,
              message: "参数名不能为空",
              trigger: "blur",
            },
          ],
          attrs: {
            // placeholder: "请输入用户名",//占位符
            clearable: true, //显示取消按钮
          },
        },
   
       
      ],
    };
  },
  methods: {
    //展开vuex的请求
    ...goodsActions(["getGoods", "getCategories","Categories","putCategories"]),
    //当选中节点变化时触发的事件
    handleChange(value) {
      console.log(value, "value");
      this.Categories({
        id: this.value[this.value.length - 1],
        sel: this.sel,
      });
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },

    //关闭
    close(val) {
      // console.log("关闭",val.isVisible);
      this.Visible = val.isVisible;
    },
    //点击编辑按钮拿到当前这一行的数据
    edit(scope) {
      console.log(scope.row, "编辑");
      this.fromData[0].value = scope.row.attr_name
      this.id = scope.row.cat_id
      this.attrId = scope.row.attr_id
      this.attr_vals  = scope.row.attr_vals
      console.log(this.id, this.attrId);
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
      this.putCategories({
        id:this.id,
        attrId:this.attrId,
        sel:this.sel,
        attr_name:val.options.attr_name,
        attr_sel:this.sel,
        attr_vals:this.attr_vals
      })
      //提交编辑的请求
      val.fromRef.resetFields(); //清空输入框内容
    },
    //每页多少条
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
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
      // console.log("点击跳转路由");
      // this.$router.push("/goods/addgoods");
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
    this.getCategories({
      type: this.type,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    //     //展开vuex的数组（数据）
    ...goodsState(["goodslist", "total", "categories", "categor","totalAll"]),
  },
};
</script>

<style scoped lang='scss'>
</style>