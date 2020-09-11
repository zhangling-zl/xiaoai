<template>
  <div>
    <div class="list flex a-c ">
      <div v-for="item in list" :key="item.name">
        <div class="text">{{item.name}}</div>
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      list: [
        {
          name: "首页",
        },
        {
          name: "用户列表",
        },
        {
          name: "角色列表",
        },
        {
          name: "权限列表",
        },
        {
          name: "商品列表",
        },
        {
          name: "分类参数",
        },
        {
          name: "商品分类",
        },
        {
          name: "订单列表",
        },
        {
          name: "数据报表",
        },
      ],
    };
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.text{
  font-size: 12px;
  padding:2px 10px ;
  border: 1px solid #eee;
  margin-bottom:10px;
}
.line{
  width: 100%;
  border:1px solid #eee;
}
</style>