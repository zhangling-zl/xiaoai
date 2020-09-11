<template>
  <div>
    <el-card class="box-card">
      <el-alert title="注意!只允许为第三级分类设置相关参数!" type="warning" show-icon :closable="false"></el-alert>
      <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
    </el-card>
  </div>
</template>

<script>
// //如果vuex有提交mutations,固定写法
// import { createNamespacedHelpers } from "vuex";
// const rightsModule = createNamespacedHelpers("rights"); //user是模块名（store/index/modules/user）
// const { mapState: rightsState, mapActions: rightsActions } = rightsModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {
    //    //展开vuex的请求
    // ...rightsActions(["getRights"]),
  },
  mounted() {},
  watch: {},
  computed: {
    //     //展开vuex的数组（数据）
    // ...rightsState(["rights"]),
  },
};
</script>

<style scoped lang='scss'>
</style>