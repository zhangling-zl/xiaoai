<template>
  <div>
     <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
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
     drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
  },
  mounted() {
    this.getReports()
    //图表的方法
    this.drawLine();
  },
  watch: {},
  computed: {
    //展开vuex的数组（数据）
    ...reportsState(["reports"]),
  },
};
</script>

<style scoped lang='scss'>
</style>