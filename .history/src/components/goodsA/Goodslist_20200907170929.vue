<template>
  <div>商品列表
   <div v-for="(item,index) in goods" :key="index">
    <div>{{item}}</div>
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
    return {};
  },
  methods: {
         //展开vuex的请求
    ...goodsActions(["categories"]),
  },
  mounted() {},
  watch: {},
  computed: {
    ...goodsState(["goods"]),
  },
};
</script>

<style scoped lang='scss'>
</style>