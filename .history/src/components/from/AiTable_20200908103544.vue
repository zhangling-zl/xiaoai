<template>
  <div>
    <!-- 表格 -->
    <div v-if="lalala===false">
      <!-- prop代表绑定的数据  columns表格的配置项-->
      <el-table
        :data="Role.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        :element-loading-text="loadingOptions.text"
        :element-loading-spinner="loadingOptions.icon"
        :element-loading-background="loadingOptions.bgColor"
        v-loading="!Role.length"
        :border="border"
        @cell-click="cellClick"
      >
        <el-table-column type="expand" v-if="expandOptions">
          <template slot-scope="scope">
            <slot name="expand" :scope="scope"></slot>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          :label="indexOptions.label"
          :align="indexOptions.align"
          :width="indexOptions.width"
          :index="indexOptions.indexMethod"
          v-if="indexOptions && indexOptions.showIndex"
        ></el-table-column>

        <template v-for="(item,index) in columns">
          <!-- 如果有这个数据的话，就把数据渲染出来 -->
          <el-table-column
            v-if="item.prop"
            :label="item.label"
            :prop="item.prop"
            :align="item.align"
            :width="item.width"
            :key="index"
          >
            <template slot-scope="scope">
              <slot v-if="item.slots" :name="item.slots" :scope="scope"></slot>
              <template v-else>
                <el-input
                  v-model="scope.row[item.prop]"
                  v-if="scope.row.clickFlag === 1 && text ===item.label"
                  :autofocus="flag"
                ></el-input>
                <span v-else>{{scope.row[item.prop]}}</span>
              </template>
            </template>
          </el-table-column>
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
    <div v-else>
      <!-- prop代表绑定的数据  columns表格的配置项-->
      <el-table
        :data="Role"
        :element-loading-text="loadingOptions.text"
        :element-loading-spinner="loadingOptions.icon"
        :element-loading-background="loadingOptions.bgColor"
        v-loading="!Role.length || Role.length!==0"
        :border="border"
        @cell-click="cellClick"
      >
        <el-table-column type="expand" v-if="expandOptions">
          <template slot-scope="scope">
            <slot name="expand" :scope="scope"></slot>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          :label="indexOptions.label"
          :align="indexOptions.align"
          :width="indexOptions.width"
          :index="indexOptions.indexMethod"
          v-if="indexOptions && indexOptions.showIndex"
        ></el-table-column>

        <template v-for="(item,index) in columns">
          <!-- 如果有这个数据的话，就把数据渲染出来 -->
          <el-table-column
            v-if="item.prop"
            :label="item.label"
            :prop="item.prop"
            :align="item.align"
            :width="item.width"
            :key="index"
          >
            <template slot-scope="scope">
              <slot v-if="item.slots" :name="item.slots" :scope="scope"></slot>
              <template v-else>
                <el-input
                  v-model="scope.row[item.prop]"
                  v-if="scope.row.clickFlag === 1 && text ===item.label"
                  :autofocus="flag"
                ></el-input>
                <span v-else>{{scope.row[item.prop]}}</span>
              </template>
            </template>
          </el-table-column>
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
        :page-size="pageSize"
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
    //数据的总数
    total: {
      type: [Number, String],
      default: 1,
    },
    //带不带边框
    border: {
      type: Boolean,
      default: false,
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
    pageSize: {
      type: Number,
      default: 10,
    },
    //传过来的下标
    indexOptions: {
      type: Object,
    },
    //下拉属性
    expandOptions: {
      type: Boolean,
      default: false,
    },
    //加载中效果
    loadingOptions: {
      type: Object,
      default: () => {
        return {
          text: "",
          icon: "el-icon-loading",
          bgColor: "hsla(0,0%,100%,.9)",
        };
      },
    },
    lalala: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {
      text: "",
      flag: false,
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
    //下拉事件
    cellClick(row, coluumn) {
      if (this.lalala) {
        row.clickFlag = 1;
        this.text = coluumn.label;
        this.flag = true;
      }
      // console.log(this.text ,'表头');
      // console.log(this.tableData,'初始值');
    },
  },
  mounted() {
    this.Role.map((item) => {
      this.$set(item, "clickFlag", 0);
    });
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