<template>
  <div>
    <!--<div v-for="(item,index) in goods" :key="index">
      <div>{{item}}</div>
    </div>
    {{total}}-->
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
      type: 1, //[1,2,3]
      pagenum: 1, //当前页码值
      pagesize: 10, //每页显示多少条数据
    };
  },
  methods: {
    //展开vuex的请求
    ...goodsActions(["categories"]),
  },
  mounted() {
    this.categories({
      type: this.type,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    ...goodsState(["goods", "total"]),
  },
};
</script>

<style scoped lang='scss'>
</style>