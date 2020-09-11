<template>
  <div>
    <div class="list flex a-c">
      <div v-for="item in list" :key="item.name">
        <div class="text mr5" @click="clickone(index)" :class="{'text-bs':num===index}">
          <div class="yuanquan" ></div>
          <div class="mlr5">{{item.name}}</div>
          <div class="dli"  >X</div>
        </div>
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
      num: 0,
    };
  },
  methods: {
    clickone(index) {
      this.num = index;
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.text {
  font-size: 12px;
  padding: 2px 10px;
  border: 1px solid #eee;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line {
  width: 100%;
  border-bottom: 1px solid #eee;
}

.text-bs {
  background-color: rgb(64, 158, 255);
  color: #fff;
  .yuanquan {
    width: 6px;
    height: 6px;
    background-color: #fff;
    border-radius: 50%;
  }
  .dli {
    color: #fff;
    font-size: 12px;
  }
}
</style>