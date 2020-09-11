<template>
  <div>
    <div style="width: 100%; position: fixed;top: 0;background-color: #fff;z-index: 9999999999;box-shadow: 1px 1px 10px #ccc;">
      <div class="top flex j-b a-c">
        <div class="text2">欢迎来到小爱后台管理系统</div>
        <div class="flex a-c">
          <div class="text2 mr5 f14">{{time}}</div>
          <div class="f14">{{hello}}</div>
          <div class="text2 mr10 f14">{{times}}</div>
          <div class="text2 f14">亲爱的，{{adminUser.username}}</div>
          <div class="text1 f14" @click="onLogin">退出</div>
        </div>
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
      times: "", //小时分
      hello: "", //判断上午下午
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
      let h = d.getHours(); //获取当前小时数(0-23)
      let m = d.getMinutes(); //获取当前分钟数(0-59)
      let s = d.getSeconds(); //获取当前秒
      // console.log(h, m,s);
      if (s < 10) {
        s = "0" + s;
      }
      if (m < 10) {
        m = "0" + m;
      }
      // console.log(this.times);
      if (h > 12) {
        h -= 12;
        this.hello = "下午";
      } else {
        this.hello = "上午";
      }
      if (h < 10) {
        h = "0" + h;
      }
      this.times = `${h}:${m}:${s}`;
    },
  },
  mounted() {
    this.getTime();
    setInterval(() => {
      this.getTime();
    }, 1000);
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