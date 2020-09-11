<template>
  <div>
    <el-card class="box-card">
      <div id="myChart" :style="{width: '86%', height: '380px'}"></div>
    </el-card>
  </div>
</template>

<script>
//如果vuex有提交mutations,固定写法
import { createNamespacedHelpers } from "vuex";
const reportsModule = createNamespacedHelpers("reports"); //user是模块名（store/index/modules/user）
const { mapState: reportsState, mapActions: reportsActions } = reportsModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {
    //展开vuex的请求
    ...reportsActions(["getReports"]),
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: this.legend,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.xAxis,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: this.series,
      });
    },
  },
  mounted() {
    this.getReports();
    //图表的方法
    this.drawLine();
  },
  watch: {
    reports() {
      this.drawLine();
    },
  },
  computed: {
    //展开vuex的数组（数据）
    ...reportsState(["reports", "legend", "series", "xAxis"]),
  },
};
</script>

<style scoped lang='scss'>
</style>