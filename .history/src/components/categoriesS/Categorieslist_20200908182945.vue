<template>
  <div>
     <zk-table
        ref="table"
        :data="categories"
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
          <i v-if="$expand.row.cat_deleted===false" class="el-icon-success"></i>
          <i v-if="$expand.row.cat_deleted===true" class="el-icon-close"></i>
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
      type: 3,
      pagenum: 1,
      pagesize: 10,

      props: {
        stripe: false,
        border: true,
        showHeader: true,
        showSummary: false,
        showRowHover: true,
        showIndex: false,
        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: false
      },
       columns: [
        {
          label: "分类名称",
          prop: "cat_name",
          width: "200px",
          align:'center'
        },
        {
          label: "是否有效",
          type: "template",
          width: "200px",
          prop: "cat_deleted",
          template: "Effective"
        },
        {
          label: "排序",
          width: "200px",
          prop: "cat_level",
          type: "template",
          template: "sort"
        },
        {
          label: "操作",
          width: "200px",
          type: "template",
          template: "operation"
        }
      ]
    };
  },
  methods: {
    //展开vuex的请求
    ...goodsActions(["getCategories"]),
    //
    gotoEdit(row){
     console.log(row);
    }
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
    ...goodsState(["categories", "total"]),
  },
};
</script>

<style scoped lang='scss'>
</style>