<template>
  <div>
   <div v-for="(item,index) in totalAll" :key="index">{{item}}</div>
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
    return {};
  },
  methods: {
      //展开vuex的请求
    ...goodsActions([ "Categories" ]),
  },
  mounted() {},
  watch: {},
  computed: {
       //     //展开vuex的数组（数据）
    ...goodsState(["categor", "totalAll"]),
  },
};
</script>

<style scoped lang='scss'>
</style>