<template>
  <div>
    <div class="left">
      <div v-for="item in menus" :key="item.id">
        <div>{{item.authName}}</div>
      </div>
    </div>
  </div>
</template>

<script>
//如果vuex有提交mutations,固定写法
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user"); //user是模块名（store/index/modules/user）
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {
    ...userActions(["getMenus"]),
  },
  mounted() {
    this.getMenus();
  },
  watch: {},
  computed: {
    ...userState(["menus"]),
  },
};
</script>

<style scoped lang='scss'>
.left {
  height: calc(100vh - 60px);
  background-color: #eee;
  margin-top: 60px;
}
</style>