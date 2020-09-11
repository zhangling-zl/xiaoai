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
        <template slot="sort" scope="$expand">
          <el-tag v-if="$expand.row.cat_level===0">一级</el-tag>
          <el-tag type="success" v-if="$expand.row.cat_level===1">二级</el-tag>
          <el-tag type="info" v-if="$expand.row.cat_level===2">三级</el-tag>
        </template>
        <template slot="Effective" scope="$expand">
          <i v-if="$expand.row.cat_deleted===false" class="el-icon-success ff"></i>
          <i v-if="$expand.row.cat_deleted===true" class="el-icon-close ff"></i>
        </template>
        <template slot="operation" scope="$expand">
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
            type="warning"
            size="mini"
            @click="gotoDel($expand.row)"
          >删除</el-button>
        </template>
      </zk-table>
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
      type: 3,
      pagenum: 1,
      pagesize: 10,
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
    };
  },
  methods: {
    //展开vuex的请求
    ...goodsActions(["getCategories", "delete"]),

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

    //编辑
    gotoEdit(row) {
      console.log(row, "编辑");
    },
    //添加
    add() {
      console.log("添加");
    },
    //删除
    gotoDel(row) {
      // console.log(row.cat_id, "删除");
      this.id = row.cat_id
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