<template>
  <div>
    
  </div>
</template>

<script>
//如果vuex有提交mutations,固定写法
import { createNamespacedHelpers } from "vuex";
const ordersModule = createNamespacedHelpers("orders"); //user是模块名（store/index/modules/user）
const { mapState: ordersState, mapActions: ordersActions } = ordersModule;
export default {
  name: "",
  props: {},
  components: {
   
  },
  data() {
    return {};
  },
  methods: {
       //展开vuex的请求
    ...ordersActions(["getOrders"]),
  },
  mounted() {
   this.getOrders({})

  },
  watch: {},
  computed: {
     //展开vuex的数组（数据）
    ...ordersState(["goods,total"]),
  },
};
</script>

<style scoped lang='scss'>
</style>