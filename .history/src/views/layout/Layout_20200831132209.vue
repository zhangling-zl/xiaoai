<template>
  <div>
  <navTop></navTop>
  <navLeft></navLeft>
    <router-view></router-view>
  </div>
</template>

<script>
import navTop from '../../components/layoutS/navTop'
import navLeft from '../../components/layoutS/navLeft'
export default {
  name: "",
  props: {},
  components: {
      navTop,//公共顶部
      navLeft,//公共侧边导航栏
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
</style>