<template>
  <div>数据报表</div>
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
  methods: {},
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>