<template>
  <div>
    <!-- 表格 -->
    <div>
      <!-- prop代表绑定的数据  columns表格的配置项-->
      <el-table :data="Role" v-loading="!Role.length" border>
        <template v-for="(item,index) in columns">
          <!-- 如果有这个数据的话，就把数据渲染出来 -->
          <el-table-column
            v-if="item.prop"
            :label="item.label"
            :prop="item.prop"
            :align="item.align"
            :width="item.width"
            :key="index"
          ></el-table-column>
          <!-- 如果没有这个数据的话，就不渲染这个数据 使用插槽 插入按钮等等其他效果 -->
          <el-table-column
            :label="item.label"
            :align="item.align"
            :width="item.width"
            :key="index"
            v-else
          >
            <template slot-scope="scope">
              <!-- scope.row代表当前点击这一项的所有数据  用作用域插槽传值（将整个插槽传过去）-->
              <!-- 留出一个插槽的位置 -->
              <slot name="action" :scope="scope"></slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <!-- 分页 -->
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pagesizes"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="Role.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: "AiTable",
  props: {
    Role: {
      type: Array,
      required: true, //必填项
    },
    columns: {
      type: Array,
      required: true, //必填项
    },
  },
  components: {},
  data() {
    return {
      currentPage:1,//当前页
      pagesize:10,//每页多少条
      pagesizes:[100, 200, 300, 400],//页码
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  mounted() {
    // console.log(this.users);
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>