<template>
  <div>
    <el-card class="box-card">
      <el-alert title="注意!只允许为第三级分类设置相关参数!" type="warning" show-icon :closable="false"></el-alert>
      <div class="flex a-c mt20">
        <div class="f18 mr20">选择商品分类:</div>
        <el-cascader :options="categories" :props="{value:'cat_id',label:'cat_name'}" clearable></el-cascader>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="first">动态参数</el-tab-pane>
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
      type: 3,
      pagenum: 1,
      pagesize: 10,
      activeName: "first",
    };
  },
  methods: {
    //展开vuex的请求
    ...goodsActions(["getGoods", "getCategories"]),

    handleClick(tab, event) {
      console.log(tab, event);
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
    ...goodsState(["goodslist", "total", "categories"]),
  },
};
</script>

<style scoped lang='scss'>
</style>