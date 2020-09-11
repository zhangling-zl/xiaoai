<template>
  <div>
    <div v-for="item in users" :key="item.id">
       {{item.username}}
    </div>
  </div>
</template>

<script>
//如果vuex有提交mutations,固定写法
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user"); //user是模块名（store/index/modules/user）
const { mapState: mapState, mapActions: mapActions } = userModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      query: "", //输入框绑定的值
      pagenum: 1, //当前页数
      pagesize: 5, //每页条数
    };
  },
  methods: {
    //展开vuex的请求
    ...mapActions(["getUsers"]),
  },
  mounted() {
    //调用请求 里面传参
    this.getUsers({
      pagenum: this.pagenum,
      pagesize: this.pagesize,
      query: this.query,
    });
  },
  watch: {},
  computed: {
    //展开vuex的数组（数据）
    ...mapState(["users","userstotal"]),
  },
};
</script>

<style scoped lang='scss'>
</style>