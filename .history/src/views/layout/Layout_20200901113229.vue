<template>
  <div>
    <el-container>
      <el-header>
        <navTop></navTop>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <navLeft></navLeft>
        </el-aside>
        <el-container class="container">
          <el-footer>
            <navChenter></navChenter>
          </el-footer>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import navTop from "../../components/layoutS/navTop";
import navLeft from "../../components/layoutS/navLeft";
import navChenter from "../../components//layoutS/navChenter";
export default {
  name: "",
  props: {},
  components: {
    navTop, //公共顶部
    navLeft, //公共侧边导航栏
    navChenter, //公共顶部导航栏
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.el-header {
  padding: 0;
  color: #333;
}
.el-footer{
  padding: 0;
  height: 0;
}
.el-main {
  padding: 0;
}
.el-container{
  border-top:1px solid #eee;
  height: calc(100vh - 60px);
  padding: 20px;
}
</style>