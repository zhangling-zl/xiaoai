<template>
  <div>
    <el-card class="box-card">
      <div class="button mb15">
        <el-button type="primary" @click="add">添加分类</el-button>
      </div>
      <zk-table
        ref="table"
        v-loading="!categories.length"
        :data="categories.slice((pagenum-1)*pagesize,pagenum*pagesize)"
        :columns="columns"
        :stripe="props.stripe"
        :border="props.border"
        :show-header="props.showHeader"
        :show-summary="props.showSummary"
        :show-row-hover="props.showRowHover"
        :show-index="props.showIndex"
        :tree-type="props.treeType"
        :is-fold="props.isFold"
        :expand-type="props.expandType"
        :selection-type="props.selectionType"
        sum-text="sum"
        index-text="#"
      >
        <template slot="sort" slot-scope="$expand">
          <el-tag v-if="$expand.row.cat_level===0">一级</el-tag>
          <el-tag type="success" v-if="$expand.row.cat_level===1">二级</el-tag>
          <el-tag type="info" v-if="$expand.row.cat_level===2">三级</el-tag>
        </template>
        <template slot="Effective" slot-scope="$expand">
          <i v-if="$expand.row.cat_deleted===false" class="el-icon-success ff"></i>
          <i v-if="$expand.row.cat_deleted===true" class="el-icon-close ff"></i>
        </template>
        <template slot="operation" slot-scope="$expand">
          <el-button
            v-if="$expand"
            icon="el-icon-edit"
            type="primary"
            size="mini"
            @click="gotoEdit($expand.row)"
          >编辑</el-button>
          <el-button
            v-if="$expand"
            icon="el-icon-delete"
            type="danger"
            size="mini"
            @click="gotoDel($expand.row)"
          >删除</el-button>
        </template>
      </zk-table>

      <!--表单添加-->
      <ai-from
        :visible.sync="VisibleAll"
        :showClose="showClose"
        @cancel="cancelAdd"
        @ok="okAdd"
        @close="closeAll"
        @handleChange="handleChange"
        :title="'添加分类'"
        :fromData="fromDataAll"
        :options="categories"
      ></ai-from>

      <!-- 表单编辑 -->
      <ai-from
        :visible.sync="Visible"
        :showClose="showClose"
        @cancel="cancel"
        @ok="ok"
        @close="close"
        :title="'编辑分类'"
        :fromData="fromData"
      ></ai-from>
      <div class="pagination mt10">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="categoriesAll"
        ></el-pagination>
      </div>
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
      id: "",
      ids: "",

      cat_pid: 1, //默认添加一级分类
      cat_name: "", //名称
      cat_level: 2, //一级分类

      type: 3,
      pagenum: 1,
      pagesize: 10,
      //
      props: {
        stripe: false,
        border: true,
        showHeader: true,
        showSummary: false,
        showRowHover: true,
        showIndex: true,
        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: false,
      },
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
          width: "200px",
          // align: "center",
          // headerAlign: "center",
        },
        {
          label: "是否有效",
          type: "template",
          width: "200px",
          prop: "cat_deleted",
          template: "Effective",
          align: "center",
          headerAlign: "center",
        },
        {
          label: "排序",
          width: "200px",
          prop: "cat_level",
          type: "template",
          template: "sort",
          align: "center",
          headerAlign: "center",
        },
        {
          label: "操作",
          width: "200px",
          type: "template",
          template: "operation",
          align: "center",
          headerAlign: "center",
        },
      ],

      Visible: false, //控制编辑弹框的显示与隐藏
      showClose: true, //控制右上角的取消按钮显示与隐藏
      //表单的配置项
      fromData: [
        {
          type: "input", //表单的类型
          value: "", //v-model绑定的值
          label: "分类名称", //label名称
          labelWidth: "80px", //label宽度
          prop: "cat_name", //绑定验证
          id: "",
          //验证规则
          rules: [
            {
              required: true,
              message: "分类名称不能为空",
              trigger: "blur",
            },
          ],
          attrs: {
            // placeholder: "请输入用户名",//占位符
            clearable: true, //显示取消按钮
          },
        },
      ],
      VisibleAll: false, ////控制添加弹框的显示与隐藏

      fromDataAll: [
        {
          type: "input", //表单的类型
          value: "", //v-model绑定的值
          label: "分类名称", //label名称
          labelWidth: "80px", //label宽度
          prop: "one", //绑定验证
          //验证规则
          rules: [
            {
              required: true,
              message: "分类名称不能为空",
              trigger: "blur",
            },
            {
              min: 2,
              max: 5,
              message: "分类名称在2-10个字符之间",
              trigger: "blur",
            },
          ],
          attrs: {
            // placeholder: "请输入用户名",//占位符
            clearable: true, //显示取消按钮
          },
        },
        {
          type: "cascader", //表单的类型
          value: "", //v-model绑定的值
          label: "父级分类", //label名称
          labelWidth: "80px", //label宽度
          prop: "tow", //绑定验证
          attrs: {
            // placeholder: "请输入用户名",//占位符
            clearable: true, //显示取消按钮
          },
        },
      ],
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "yizhi",
              label: "一致",
            },
            {
              value: "yizhi",
              label: "一致",
            },
            {
              value: "yizhi",
              label: "一致",
            },
            {
              value: "yizhi",
              label: "一致",
            },
          ],
        },
      ],
    };
  },
  methods: {
    //展开vuex的请求
    ...goodsActions([
      "getCategories",
      "delete",
      "putCategoriesId",
      "putGories",
    ]),

    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
    //分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
    },

    //删除
    gotoDel(row) {
      console.log(row, "删除");
      this.id = row.cat_id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delete({
            id: this.id,
            type: this.type,
            pagenum: this.pagenum,
            pagesize: this.pagesize,
          });
          this.$message({
            type: "success",
            message: "删除成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //点击编辑 弹框显示
    gotoEdit(row) {
      console.log(row, "编辑");
      this.Visible = true;
      this.fromData[0].value = row.cat_name;
      this.id = row.cat_id;
      // console.log(this.fromData[0].cat_name, "编辑id");
    },
    //点击编辑弹框的取消按钮
    cancel(val) {
      this.Visible = false;
      this.$message.success("点击了取消");
      console.log(val);
      val.fromRef.resetFields(); //清空输入框内容
    },
    //点击编辑确定
    ok(val) {
      this.Visible = false;
      console.log(val);
      this.$message.success("编辑成功");
      this.putCategoriesId({
        id: this.id,
        cat_name: val.options.cat_name,
        type: this.type,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
      //提交编辑的请求
      val.fromRef.resetFields(); //清空输入框内容
    },
    //关闭（动态参数）
    close(val) {
      // console.log("关闭",val.isVisible);
      this.Visible = val.isVisible;
    },

    //添加
    add() {
      console.log("添加");
      (this.type = 2), (this.VisibleAll = true);
      this.getCategories({
        type: this.type,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
    //点击添加(动态参数)的取消
    cancelAdd(val) {
      this.VisibleAll = false;
      this.$message.success("点击了取消");
      // console.log(val);
      val.fromRef.resetFields(); //清空输入框内容
    },
    //点击添加(动态参数)的确定
    okAdd(val) {
      console.log(val, "确定");
      if (this.ids !== "") {
        this.type = 3;
        this.putGories({
          cat_pid: this.ids,
          cat_name: this.cat_name,
          cat_level: this.cat_level,
          type: this.type,
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        });
      } if(this.ids === "") {
        this.type = 3;
        this.cat_pid = 0;
        this.cat_level = 0;
        this.putGories({
          cat_pid: this.cat_pid,
          cat_name: this.cat_name,
          cat_level: this.cat_level,
          type: this.type,
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        });
      }

      this.VisibleAll = false;
      // this.$message.success("添加成功");
    },
    //关闭（动态参数）
    closeAll(val) {
      this.VisibleAll = val.isVisible;
    },
    handleChange(val) {
      console.log(val, "确定1");
      // this.fromDataAll.values =val.options.tow[1]
      this.ids = val.options.tow[1];
      this.cat_name = val.options.one;
    },
  },
  mounted() {
    //调用请求
    this.getCategories({
      type: this.type,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    //     //展开vuex的数组（数据）
    ...goodsState(["categories", "categoriesAll"]),
  },
};
</script>

<style scoped lang='scss'>
.ff {
  color: rgb(102, 177, 255);
}
</style>