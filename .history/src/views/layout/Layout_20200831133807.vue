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
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import navTop from "../../components/layoutS/navTop";
import navLeft from "../../components/layoutS/navLeft";
export default {
  name: "",
  props: {},
  components: {
    navTop, //公共顶部
    navLeft, //公共侧边导航栏
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
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  position: fixed;
  top: 0;
  width: 100%;
}
.el-main{
  padding: 0;
  background-color:#999;
  width: calc(100wh - 200px);
  height: calc(100vh - 60px);
  margin-top:60px ;
}
</style>