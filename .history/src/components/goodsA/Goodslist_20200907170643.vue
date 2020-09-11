<template>
  <div>商品列表</div>
</template>

<script>
//如果vuex有提交mutations,固定写法
// import { createNamespacedHelpers } from "vuex";
// const rolesModule = createNamespacedHelpers("roles"); //user是模块名（store/index/modules/user）
// const { mapState: rolesState, mapActions: rolesActions } = rolesModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {
    //      //展开vuex的请求
    // ...rolesActions(["getRole", "deleteRoles", "putRoles", "postRoles"]),
  },
  mounted() {},
  watch: {},
  computed: {
    // ...rolesState(["Role", "total"]),
  },
};
</script>

<style scoped lang='scss'>
</style>