<template>
  <div>
    <div class="login j-c a-c flex">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h2 class="text">欢迎来到小爱后台管理系统</h2>
        </div>
        <el-form
          :model="form"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="请输入用户名" prop="username">
            <el-input v-model="form.username" clearable></el-input>
          </el-form-item>
          <el-form-item label="请输入密码" prop="password">
            <el-input v-model="form.password" show-password clearable></el-input>
          </el-form-item>
          <div class="f14">特别提醒，如果你是管理员,请使用管理员身份登录，如果不知道账号，请联系公司人事.</div>
          <div class="button">
            <el-button type="primary" @click="submit">立即登录</el-button>
          </div>
        </el-form>
      </el-card>
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
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
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
.login {
  width: 100wh;
  height: 100vh;
  background-color: #eee;
  background-size: cover;
}
.box-card {
  width: 600px;
  background-color: #fff;
}

.button {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 20px;
}

.clearfix{
   width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>