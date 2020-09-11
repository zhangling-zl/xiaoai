<template>
  <div>
  </div>
</template>

<script>
//如果vuex有提交mutations,固定写法
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user"); //user是模块名（store/index/modules/user）
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      pagenum:'',
      pagesize:''
    };
  },
  methods: {
    ...userActions(["getUsers"]),
  },
  mounted() {
    this.getUsers(this.pagenum,this.pagesize)
  },
  watch: {},
  computed: {
    ...userState(["users"]),
  },
};
</script>

<style scoped lang='scss'>
</style>