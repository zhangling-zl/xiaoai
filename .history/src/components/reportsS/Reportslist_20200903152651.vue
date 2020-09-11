<template>
  <div>
     <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
  </div>
</template>

<script>
//如果vuex有提交mutations,固定写法
import { createNamespacedHelpers } from "vuex";
const reportsModule = createNamespacedHelpers("reports"); //user是模块名（store/index/modules/user）
const { mapState: reportsState, mapActions: reportsActions } = reportsModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {
     //展开vuex的请求
    ...reportsActions(["getReports"]),
  },
  mounted() {
    this.getReports()
  },
  watch: {},
  computed: {
    //展开vuex的数组（数据）
    ...reportsState(["reports"]),
  },
};
</script>

<style scoped lang='scss'>
</style>