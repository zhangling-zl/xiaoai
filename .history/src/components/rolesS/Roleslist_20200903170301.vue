<template>
  <div>
    <div class="from">
      <ai-table :Role="Role" :columns="columns">
        <template v-slot:action="scope">
          <el-button size="mini" type="primary" @click="edit(scope.scope)">编辑</el-button>
        </template>
      </ai-table>
    </div>
  </div>
</template>

<script>
//如果vuex有提交mutations,固定写法
import { createNamespacedHelpers } from "vuex";
const rolesModule = createNamespacedHelpers("roles"); //user是模块名（store/index/modules/user）
const { mapState: rolesState, mapActions: rolesActions } = rolesModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      //表格的配置项 布尔类型的值不显示
      columns: [
        {
          label: "职位",
          prop: "roleName",
          align: "center",
          width: "200",
        },
        {
          label: "描述",
          prop: "roleDesc",
          align: "center",
          width: "200",
        },
        {
          label: "操作",
          align: "center",
        },
      ],
    };
  },
  methods: {
    //展开vuex的请求
    ...rolesActions(["getRole"]),
  },
  mounted() {
    this.getRole();
  },
  watch: {},
  computed: {
    ...rolesState(["Role"]),
  },
};
</script>

<style scoped lang='scss'>
.from {
  margin-top: 20px;
  padding: 20px;
  background-color: palegreen;
}
</style>