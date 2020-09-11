<template>
  <div>
    <el-card class="box-card">
      <div v-for="item in users" :key="item.id">
        <div>{{item.role_name}}</div>
      </div>

      <el-table :data="users" stripe style="width: 100%" border>
        <el-table-column type="index" label="#" width="50" align="center"></el-table-column>
        <el-table-column prop="date" label="日期" width="180" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
        <el-table-column prop="address" label="地址" align="center"></el-table-column>
      </el-table>
    </el-card>
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
      pagenum: 1,
      pagesize: 5,
    };
  },
  methods: {
    ...userActions(["getUsers"]),
  },
  mounted() {
    this.getUsers({ pagenum: this.pagenum, pagesize: this.pagesize });
  },
  watch: {},
  computed: {
    ...userState(["users"]),
  },
};
</script>

<style scoped lang='scss'>
</style>