<template>
  <div>
    <div class="top">
      <div>欢迎来到小爱后台管理系统</div>
      <div>亲爱的,{{adminUser.username}}</div>
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
  width: 100%;
  height: 100%;
  padding:0 20px;
}
</style>