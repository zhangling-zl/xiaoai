<template>
  <div>
    <div class="left">
      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-demo"
        collapse-transition
        unique-opened
        active-text-color="#409EFF"
      >
        <template v-for="item in menus">
          <el-submenu :key="item.id" :index="item.path">
            <template slot="title">
              <div>{{item.authName}}</div>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="item1 in item.children" :key="item1.id" :index="item1.path">
                <span slot="title">{{item1.authName}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
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
  margin-top: 60px;
}
</style>