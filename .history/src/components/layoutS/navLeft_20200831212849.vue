<template>
  <div>
    <div class="left">
      <el-menu
        router
        :default-active="$route.meta.parentpath"
        class="el-menu-demo"
        collapse-transition
        unique-opened
        active-text-color="#409EFF"
      >
        <template v-for="item in menus">
          <el-submenu
            :key="item.id"
            :index="item.path"
            v-if="item.children && item.children.length"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="item1 in item.children" :key="item1.id" :index="item1.path">
                <span slot="title">{{item1.authName}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item :index="item.path" :key="item.path" v-else>
            <span slot="title">{{item.authName}}</span>
          </el-menu-item>
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
}
</style>