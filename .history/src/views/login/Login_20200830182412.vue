<template>
  <div>
    登录页面
    <el-form>
      <el-form-item label="用户名">
        <el-input v-model="username" clearable placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" show-password clearable placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-buttom type="primary">登录</el-buttom>
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
    };
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>