<template>
  <div>权限列表</div>
</template>

<script>
//如果vuex有提交mutations,固定写法
import { createNamespacedHelpers } from "vuex";
const rightsModule = createNamespacedHelpers("rights"); //user是模块名（store/index/modules/user）
const { mapState: rightsState, mapActions: rightsActions } = rightsModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      type:'list'
    };
  },
  methods: {
      //展开vuex的请求
    ...rightsActions(["getRights"]),
  },
  mounted() {
    this.getRights({type:this.type})
  },
  watch: {},
  computed: {
     //展开vuex的数组（数据）
    ...rightsState(["rights"]),
  },
};
</script>

<style scoped lang='scss'>
</style>