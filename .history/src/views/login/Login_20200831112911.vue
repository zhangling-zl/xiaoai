<template>
  <div>
    <div class="text5 mb20 j-c a-c flex">欢迎来到小爱后台管理系统</div>
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
      <el-form-item label="用户名">
        <el-input v-model="form.username" clearable placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" show-password clearable placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 10, message: "用户名在2~10位之间", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 15, message: "密码在6~15位之间", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //点击事件不能和vuex里面定义的方法名重名
    //登录请求
    submit() {
      //如果vuex没有提交mutations，则直接点击事件里面写
      this.$store.dispatch("user/login", {
        username: this.form.username,
        password: this.form.password,
      });
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>