<template>
  <div>
    <draggable @start="start" @end="end" v-model="$store.state.NAV_LIST">
      <el-tag
        class="tags"

        @close="close(tag)"
        @click="gotoRouter(tag)"
        v-for="tag in getNavList"
        :key="tag.name"
        :closable='true'
     
        :type="`/${tag.path}` === $route.path ? '' : 'info'"
        @contextmenu.native="contextmenu"
      >{{tag.authName}}</el-tag>
    </draggable>
    <div></div>
    <vue-context-menu
      :contextMenuData="contextMenuData"
      @delRight="delRight"
      @delLeft="delLeft"
      @delOhter="delOhter"
      @closeAll="closeAll"
    ></vue-context-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import draggable from "vuedraggable";
export default {
  name: "",
  props: {
    name: {
      type: String,
    },
  },
  components: { draggable },
  data() {
    return {
      nowtime: "",
      innerText: "",
      currentTagName: "",
      // contextmenu data (菜单数据)
      contextMenuData: {
        // the contextmenu name(@1.4.1 updated)
        menuName: "demo",
        // The coordinates of the display(菜单显示的位置)
        axis: {
          x: null,
          y: null,
        },
      },
      // Menu options (菜单选项)
      menulists: [
        {
          fnHandler: "delRight", // Binding events(绑定事件)
          icoName: "fa fa-home fa-fw", // icon (icon图标 )
          btnName: "关闭右侧", // The name of the menu option (菜单名称)
        },
        {
          fnHandler: "delLeft",
          icoName: "fa fa-home fa-fw",
          btnName: "关闭左侧",
        },
        {
          fnHandler: "delOhter",
          icoName: "fa fa-home fa-fw",
          btnName: "关闭其他",
        },
        {
          fnHandler: "closeAll",
          icoName: "fa fa-home fa-fw",
          btnName: "关闭全部",
        },
      ],
    };
  },
  methods: {
    contextmenu(e) {
      this.innerText = e.target.innerText;
      e.preventDefault();
      var x = e.clientX;
      var y = e.clientY;
      // Get the current location
      this.contextMenuData.axis = {
        x,
        y,
      };
      console.log(this.innerText);
    },

    gotoRouter(tag) {
      if (this.currentTagName !== tag.path) {
        this.$router.push({
          path: tag.path,
        });
      }
      console.log(tag.path);
    },

    close(tag) {
      //关闭当前标签
      let arr = [...this.$store.state.NAV_LIST];
      let index = arr.indexOf(tag);
      arr.splice(index, 1);
      this.$store.commit("setNavList", arr);
    },

    showMenu() {
      event.preventDefault();
      var x = event.clientX;
      var y = event.clientY;
      // Get the current location
      this.contextMenuData.axis = {
        x,
        y,
      };
    },

    start() {
      this.drag = true;
    },

    end(evt) {
      this.drag = true;
      evt.newIndex; // 可以知道拖动后的位置
      console.log(evt);
    },

    //关闭右侧
    delRight() {
      let arr = [...this.$store.state.NAV_LIST];
      let i = arr.findIndex((item) => item.authName === this.innerText);
      arr.splice(i + 1, arr.length - i);
      console.log(arr);
      this.$store.commit("setNavList", arr);
    },

    //关闭左侧
    delLeft() {
      let arr = [...this.$store.state.NAV_LIST];
      let i = arr.findIndex((item) => item.authName === this.innerText);
      arr.splice(0, i);
      console.log(arr);
      this.$store.commit("setNavList", arr);
    },

    //关闭所有
    closeAll() {
      let arr = [...this.$store.state.NAV_LIST];
      arr = [];
      this.$store.commit("setNavList", arr);
    },

    //关闭其他
    delOhter() {
      let arr = [...this.$store.state.NAV_LIST];
      let b = {};
      arr.map((item) => {
        if (item.authName === this.innerText) {
          b = item;
        }
      });
      arr = [];
      arr.push(b);

      this.$store.commit("setNavList", arr);
    },
  },
  mounted() {},
  watch: {
    // $route: function(newV) {
    //   this.currentTagName = newV.name;
    // }
  },
  computed: {
    ...mapGetters(["getNavList"]),
  },
};
</script>

<style scoped lang='scss'>
.all {
  display: flex;
  justify-content: space-between;
}
.tags {
  cursor: pointer;
}
</style>