<template>
  <div>
    <div class="from">
      <ai-table :users="users" :columns="columns"></ai-table>
    </div>
  </div>
</template>

<script>
// 拿到数据
//如果vuex有提交mutations,固定写法
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user"); //user是模块名（store/index/modules/user）
const { mapState: mapState, mapActions: mapActions } = userModule;
export default {
  name: "Package",
  props: {},
  components: {},
  data() {
    return {
      //表格的配置项
      columns: [
        {
          label: "姓名",
          prop: "username",
          align: "center",
          width: "200",
          border: true,
        },
        {
          label: "角色",
          prop: "role_name",
          align: "center",
          width: "200",
          border: true,
        },
        {
          label: "电话",
          prop: "mobile",
          align: "center",
          width: "200",
          border: true,
        },
        {
          label: "邮箱",
          prop: "email",
          align: "center",
          width: "200",
          border: 'true',
        },
        {
          label: "状态",
          prop: "mg_state",
          align: "center",
          border: true,
        },
      ],
      //
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
    ...mapState(["users", "userstotal"]),
  },
};
</script>

<style scoped lang='scss'>
.from{
    margin-top: 20px;
    padding: 20px;
    background-color: palegreen;
}
</style>