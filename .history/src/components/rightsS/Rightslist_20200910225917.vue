<template>
  <div>
    <el-card class="box-card" shadow="always">
      <el-table
        :data="rightsSS.slice((pagenum-1)*pagesize,pagenum*pagesize)"
        stripe
        style="width: 100%"
        border
      >
        <el-table-column type="index" label="#" width="200" align="center"></el-table-column>
        <el-table-column prop="authName" label="权限名称" align="center"></el-table-column>
        <el-table-column label="权限等级" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.type">{{scope.row.text}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt15">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[10, 20, 30, 30]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="rightsSS.length"
        ></el-pagination>
      </div>
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
      pagenum: 1, //当前页数
      pagesize: 10, //每页条数
    };
  },
  methods: {
    //展开vuex的请求
    ...rightsActions(["getRights"]),
    //分页 （每页多少条）
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
    //分页 （当前页）
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val;
    },
  },
  mounted() {
    this.getRights({
      type: this.type,
    });
  },
  watch: {},
  computed: {
    //展开vuex的数组（数据）
    ...rightsState(["rightsSS"]),
  },
};
</script>

<style scoped lang='scss'>
.el-card {
  padding: 0;
  width: 100%;
  box-shadow: 1px 1px 15px #ccc;
}
</style>