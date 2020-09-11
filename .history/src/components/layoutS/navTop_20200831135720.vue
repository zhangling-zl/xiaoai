<template>
  <div>
    <div class="top flex j-b a-c">
      <div>欢迎来到小爱后台管理系统</div>
      <div>亲爱的，{{adminUser.username}}</div>
      <div>退出</div>
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
  methods: {},
  mounted() {
    this.adminUser = JSON.parse(localStorage.getItem("adminUser"));
    console.log(this.adminUser);
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.top{
  height: 60px;
  padding:0 40px;
}
</style>