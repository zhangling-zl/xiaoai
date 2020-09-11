<template>
  <div>
    <el-form>
      <el-form-item label="用户名">
        <el-input v-model="form.username" clearable placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" show-password clearable placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" @click="submit">登录</el-button>
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
        username:'',
        password:''
      },
    };
  },
  methods: {
    //点击事件不能和vuex里面定义的方法名重名
    submit(){
      //如果vuex没有提交mutations，则直接
      this.$store.dispatch('user/login',{
        username:this.form.username,
        password:this.form.password
      })
      
      

    }
  },
  mounted() {
    console.log(password);
    console.log(username);
    console.log(this.$store);
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>