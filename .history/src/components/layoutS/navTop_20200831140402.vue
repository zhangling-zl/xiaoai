<template>
  <div>
    <div class="top flex j-b a-c">
      <div>欢迎来到小爱后台管理系统</div>
      <div class="flex a-c">
        <div>亲爱的，{{adminUser.username}}</div>
        <div class="text1" @click="onLogin">退出</div>
      </div>
    </div>
  </div>
</template>

<script>
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
    onLogin(){
      
    }
  },
  mounted() {
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
.text1{
  color: rgb(64,158,255);
  margin-left: 20px;
}
</style>