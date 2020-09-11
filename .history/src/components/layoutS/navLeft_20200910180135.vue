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
      // //如果本地存储里面没有这个数据
      // if (localStorage.getItem("tabList")) {
      //   //定义一个变量arr接收本地储存的数据
      //   let arr = JSON.parse(localStorage.getItem("tabList"));
      //   //定义一个变量 （接收）
      //   //findIndex检测数组里面有没有这个数据 返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
      //   let i = arr.findIndex((value) => value.authName == item1.authName);
      //   // console.log(i);
      //   if (i === -1) {
      //     arr.push(item1);
      //     localStorage.setItem("tabList", JSON.stringify(arr));
      //   }
      // } else {
      //   let arr = [];
      //   arr.push(item1);
      //   localStorage.setItem("tabList", JSON.stringify(arr));
      //   this.$bus.$emit("sends", arr);
      // }
      // //把点击的侧导航数据整个（item1）存在本地


      let arr = [...this.$store.state.NAV_list]
      let b = arr.filter(item=>{
        return item.id === item1.id
      })
      if(b.length > 0){
        console.log('1');
      }else{
        arr.push(item1)
      }
      this.$store.commit('setNavlist',arr)
      console.log(item1);
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