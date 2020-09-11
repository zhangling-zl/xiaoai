<template>
  <div>
    <div class="top flex j-b a-c">
      <div class="text2">欢迎来到小爱后台管理系统</div>
      <div class="flex a-c">
        <div class="text2 mr10">{{time}}</div>
        <div class="text2">{{times}}</div>
        <div class="text2">亲爱的，{{adminUser.username}}</div>
        <div class="text1" @click="onLogin">退出</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      adminUser: {}, //侧边栏数据
      time: "", //年月日
      times:'',//小时分
    };
  },
  methods: {
    //点击退出登录
    onLogin() {},
    //获取当前时间
    getTime() {
      let d = new Date(); //new一个实例
      // console.log(d);
      let time = d.getTime();
      //拿到当前的时间戳
      this.time = dayjs(time).format("YYYY/MM/DD"); //转格式
      //  console.log(this.time);
      var h = d.getHours(); //获取当前小时数(0-23)
      var m = d.getMinutes(); //获取当前分钟数(0-59)
      var s = d.getSeconds(); //获取当前秒
      // console.log(h, m,s);
      this.times = `${h}:${m}:${s}`
      console.log(this.times);
    },
  },
  mounted() {
    this.getTime();
    this.adminUser = JSON.parse(localStorage.getItem("adminUser"));
    // console.log(this.adminUser);
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.top {
  height: 60px;
  padding: 0 40px;
}
.text1 {
  color: rgb(64, 158, 255);
  margin-left: 20px;
}
.text2 {
  color: rgb(46, 94, 133);
}
</style>