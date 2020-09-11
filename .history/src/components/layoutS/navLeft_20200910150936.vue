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
              <el-menu-item
                v-for="item1 in item.children"
                :key="item1.id"
                :index="item1.path"
                @click="cs(item1)"
              >
                <span slot="title">
                  <i :class="item1.icon"></i>
                  <span>{{item1.authName}}</span>
                </span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item :index="item.path" :key="item.path" v-else>
            <span slot="title">
              <i :class="item.icon"></i>
              <span>{{item.authName}}</span>
            </span>
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
    //点击侧边导航栏拿到路由的路径
    cs(item1) {
      console.log(item1);
      // let psthAll = [];
      // // console.log(item1.path, "侧导航的路径");
      // this.menus.map(item=>{
      //   if(item.children){
      //     item.children(item1=>{
      //       psthAll.push(item1.path)
      //     })
      //   }
      //   console.log(psthAll,'id数组');
        
      // })
      
    },
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
  border-right: 1px solid #eee;
  top: 60px;
}
.el-menu-demo {
  border: none;
}
</style>