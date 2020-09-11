<template>
  <div>
    <!-- 表格 -->
    <div>
      <!-- prop代表绑定的数据  columns表格的配置项-->
      <el-table :data="Role.slice((currentPage-1)*pagesize,currentPage*pagesize)" v-loading="!Role.length" border>
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
    <div class="pagination" v-if="showPagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: "AiTable",
  props: {
    //渲染的数据
    Role: {
      type: Array,
      required: true, //必填项
    },
    //表格的配置项
    columns: {
      type: Array,
      required: true, //必填项
    },
    //默认有无分页效果
    showPagination: {
      type: Boolean,
      default: true,
    },
    //当前页
    currentPage: {
      type: Number,
      default: 1,
    },
    //页码
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40],
    },
    //当前页有多少条数据
    pagesize: {
      type: Number,
      default: 10,
    },
    //数据的总数
    total: {
      type: [Number,String],
      default: 1,
    },
  },
  components: {},
  data() {
    return {
      // currentPage: 1, //当前页
      // pagesize: 5, //每页多少条
      // pagesizes: [5, 10, 15, 20], //页码
    };
  },
  methods: {
    handleSizeChange(val) {
      //把当前点击事件分发出去
      // console.log(`每页 ${val} 条`);
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      //把当前点击事件分发出去
      // console.log(`当前页: ${val}`);
      this.$emit("handleCurrentChange", val);
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
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>