<template>
  <div>
    <div class="box1">
      <draggable v-model="list" class="list flex mb15">
        <div v-for="(item,index) in list" :key="item.path" draggable="true">
          <span
            class="text mr5"
            @click="clickone(item)"
            @contextmenu.prevent="contextmenu"
            :class="{'text-bs':item.path === $route.path}"
          >
            <div class="yuanquan"></div>
            <div class="mlr10">{{item.title}}</div>
            <i class="el-icon-close dli" @click="del(item,index)"></i>
          </span>
        </div>
      </draggable>
    </div>
    <div v-clickoutside="close" class="menu" v-if="show" :style="{top: y + 'px', left: x + 'px'}">
      <div class="you_one">关闭其他</div>
      <div class="you_one">关闭左边</div>
      <div class="you_one">关闭右边</div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Clickoutside from "element-ui/src/utils/clickoutside";
export default {
  name: "",
  props: {},
  components: {
    draggable,
  },
  data() {
    return {
      list: [{ path: "/home", title: "首页" },{ path: "/home", title: "用户列表" }],
      title: "",
      path: "/home",
      dragging: null,
      x: "",
      y: "",
      show: false,
    };
  },
  methods: {
    //点击谁谁变色 跳转到响相应的路由
    clickone(item) {
      this.title = item.title;
      this.$router.push(item.path);
    },
    close() {
      this.show = false;
    },
    contextmenu(e) {
      this.show = true;
      this.x = e.pageX;
      this.y = e.pageY;
      console.log(e);
    },
    //点击删除
    del(item, index) {
      let num = index;
      if (index !== this.list.length - 1 && this.list.length !== 0) {
        this.list.splice(index, 1);
        localStorage.setItem("historyPath", JSON.stringify(this.list));
        this.list = JSON.parse(localStorage.getItem("historyPath"));
        this.title = this.list[num].title;
        this.$router.push(this.list[num].path);
        console.log(this.list[num].path);
        console.log(this.list[num].title);
      }
    },
  },
  mounted() {
    if (localStorage.historyPath) {
      this.list = JSON.parse(localStorage.historyPath);
    }
    this.$bus.$on("send", (data) => {
      this.list = data;
    });
    this.$bus.$on("sendTitle", (data) => {
      this.title = data;
    });
    console.log(this.title);
    this.list.map((item) => {
      this.$set(item, "show", false);
      if (this.$route.path === item.path) {
        this.title = item.title;
      }
    });
  },
  directives: {
    Clickoutside,
  },
  watch: {
    $route: {
      handler(val) {
        console.log(val);
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {},
};
</script>

<style scoped lang='scss'>
.text {
  font-size: 12px;
  padding: 4px 10px;
  border: 1px solid #eee;

  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
}
.line {
  width: 100%;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}
.dli {
  color: #fff;
  font-size: 12px;
  display: none;
}
.text-bs {
  background-color: rgb(64, 158, 255);
  color: #fff;
  cursor: pointer;
  .yuanquan {
    width: 6px;
    height: 6px;
    background-color: #fff;
    border-radius: 50%;
  }
  .dli {
    display: block;
  }
}
.menu {
  background-color: #fff;
  box-shadow: 1px 1px 5px #ccc;
  border-radius: 4px;
  z-index: 99999;
  width: 100px;
}
.you_one {
  font-size: 12px;
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  align-content: center;
  &:hover {
    background-color: rgb(250, 250, 250);
    cursor: pointer;
  }
}
</style>