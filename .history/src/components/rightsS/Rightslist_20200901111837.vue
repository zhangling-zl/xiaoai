<template>
  <div>
    <el-card class="box-card" shadow="always">
      <el-table :data="rights" stripe style="width: 100%" border>
        <el-table-column type="index" label="#" align="center"></el-table-column>
        <el-table-column prop="authName" label="权限名称" align="center"></el-table-column>
        <el-table-column label="权限等级" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#eee"></el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
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
      type: "list",
    };
  },
  methods: {
    //展开vuex的请求
    ...rightsActions(["getRights"]),
  },
  mounted() {
    this.getRights({ type: this.type });
  },
  watch: {},
  computed: {
    //展开vuex的数组（数据）
    ...rightsState(["rights"]),
  },
};
</script>

<style scoped lang='scss'>
.el-card{
  padding: 0;
  width: 100%;
  border: none;
  background-color: palegreen;
}
</style>