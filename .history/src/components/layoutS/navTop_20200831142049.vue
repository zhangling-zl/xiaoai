<template>
  <div>
    <div class="top flex j-b a-c">
      <div>欢迎来到小爱后台管理系统</div>
      <div class="flex a-c">
        <div>亲爱的，{{adminUser.username}}</div>
        <div class="text1" @click="onLogin">退出</div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
// import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      adminUser: {},
    };
  },
  methods: {
    //点击退出登录
    onLogin() {},
    //获取当前时间
    getTime() {
      let d = new Date(); //new一个实例
      console.log(d);
      var year = d.getFullYear(); //获取当前年
      var mon = d.getMonth() + 1; //获取当前月
      var date = d.getDate(); //获取当前日
      var h = d.getHours(); //获取当前小时数(0-23)
      var m = d.getMinutes(); //获取当前分钟数(0-59)
      var s = d.getSeconds(); //获取当前秒
      console.log(year, mon, date, h, m,s);
    },
  },
  mounted() {
    this.getTime()
    this.adminUser = JSON.parse(localStorage.getItem("adminUser"));
    console.log(this.adminUser);
    
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
</style>