
<template>
  <div>
    <draggable
      class="syllable_ul"
      element="ul"
      :list="list"
      :options="{group:'title', animation:150}"
      :no-transition-on-drag="true"
      @change="change"
      @start="start"
      @end="end"
      :move="move"
    >
      <transition-group type="transition" class="flex">
        <div v-for="(item,index) in list" :key="item.authName" class="flex">
          <div
            class="text mr5"
            @click="clickone(item)"
            :class="{'text-bs':path===item.path}"
            @contextmenu.prevent.stop="rightClick(item,$event)"
          >
            <div class="yuanquan"></div>
            <div class="mlr5">{{item.authName}}</div>
            <i class="el-icon-close dli" @click="del(item,index)"></i>
            <div v-if="show" :style="{left:tranLeft,top:tranTop}" class="absolute you">
              <div class="you_one">关闭其他</div>
              <div class="you_one">关闭左侧</div>
              <div class="you_one">关闭右侧</div>
            </div>
          </div>
        </div>
      </transition-group>
    </draggable>
    <div class="line"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import draggable from "vuedraggable"; //引入
export default {
  name: "",
  props: {},
  components: { draggable },
  data() {
    return {
      list: [{ authName: "首页", path: "/home" }],
      path: "/home",
      show: false,
      flag: "",
    };
  },
  methods: {
    //点击谁谁变色 跳转到响相应的路由
    clickone(item) {
      this.path = item.path;
      // console.log(this.flag);
      // console.log(item);
      this.$router.push({ path: item.path });
    },
    //点击删除
    del(item) {
      //先定义一个空变量接收原数组过滤出来的数据
      //把他存在本地，然后再取出来，进行二次渲染
      if (localStorage.getItem("tabList")) {
        let i = this.list.filter((item1) => {
          return item.id !== item1.id;
        });
        localStorage.setItem("tabList", JSON.stringify(i));
        this.list = JSON.parse(localStorage.getItem("tabList"));
      }
    },
    //鼠标右键（出现弹框）
    rightClick(item, $event) {
      this.show = true;
      document.addEventListener("click", () => {
        this.show = false;
      });
      this.tranLeft = $event.pageX + "px";
      this.tranTop = $event.pageY + "px";
      //ESC事件
      // document.addEventListener("keydown", (e) => {
      //   if (e.keyCode === 27) {
      //     this.show = false;
      //   }
      // });
    },
    //evt里面有两个值，一个evt.added 和evt.removed  可以分别知道移动元素的ID和删除元素的ID
    change(evt) {
      console.log(evt, "change...");
    },
    //start ,end ,add,update, sort, remove 得到的都差不多
    start(evt) {
      this.drag = true;
      console.log(evt, "start...");
    },
    end(evt) {
      // console.log(evt, "end....");
      this.drag = true;
      evt.item; //可以知道拖动的本身
      evt.to; // 可以知道拖动的目标列表
      evt.from; // 可以知道之前的列表
      evt.oldIndex; // 可以知道拖动前的位置
      evt.newIndex; // 可以知道拖动后的位置
    },
    move(evt, originalEvent) {
      console.log(evt, "move");
      console.log(originalEvent); //鼠标位置
    },
  },
  mounted() {
      if (localStorage.getItem("tabList")) {
      this.list = JSON.parse(localStorage.getItem("tabList"));
      this.$bus.$on("sends", (data) => {
        this.list = data;
      });
    }
    this.$bus.$on("send", (data) => {
      this.path = data;
    });
    this.list.map((item) => {
      if (this.$route.path === item.path) {
        this.path = item.path;
      }
    });
 
  },
  watch: {
    $route: {
      handler(val, oldval) {
        console.log(val); //新路由信息
        console.log(oldval); //老路由信息
      },
      // 深度观察监听
      deep: true,
    },
  },
  computed: {
    ...mapGetters(['getNavlist'])
  },
};
</script>

<style scoped lang='scss'>
.text {
  font-size: 12px;
  padding: 2px 10px;
  border: 1px solid #eee;
  margin-bottom: 15px;
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
.you {
  background-color: #fff;
  box-shadow: 1px 1px 5px #ccc;
  border-radius: 4px;
  z-index: 99999;
}
.you_one {
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  align-content: center;
  &:hover {
    background-color: rgb(250, 250, 250);
  }
}
</style> 