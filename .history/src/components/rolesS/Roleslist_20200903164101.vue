<template>
  <div>角色列表</div>
</template>

<script>
//如果vuex有提交mutations,固定写法
import { createNamespacedHelpers } from "vuex";
const roleModule = createNamespacedHelpers("role"); //user是模块名（store/index/modules/user）
const { mapState: roleState, mapActions: roleActions } = roleModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {
    //展开vuex的请求
    ...roleActions(["getRole"]),
  },
  mounted() {
    this.getRole()
  },
  watch: {},
  computed: {
      ...roleState(["Role"]),
  },
};
</script>

<style scoped lang='scss'>
</style>