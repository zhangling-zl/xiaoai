<template>
  <div>
    <!-- <div>
      <div class="list flex a-c">
        <div v-for="item in list" :key="item.name">
          <div class="text mr5" @click="clickone(item)" :class="{'text-bs':num===item.authName}">
            <div class="yuanquan"></div>
            <div class="mlr5">{{item.authName}}</div>
            <i class="el-icon-close dli" @click="dli"></i>
          </div>
        </div>
      </div>
      <div class="line"></div>
    </div>-->

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
      <transition-group type="transition"  >
        <div v-for="(item , index) in list" :key="index" class="flex mr5">
          <div
            class="text m-r-5"
            @click="clickone(item)"
            :class="{'text-bs':num===item.authName}"
            @contextmenu.prevent.stop="rightClick(item,$event)"
          >
            <div class="yuanquan"></div>
            <div class="mlr5">{{item.authName}}</div>
            <i class="el-icon-close dli" @click="del(item,index)"></i>
            <div v-if="show" :style="{left:tranLeft,top:tranTop}" class="absolute MouseRights">
              <div class="p-5">关闭其他</div>
              <div class="p-5">关闭左侧</div>
              <div class="p-5">关闭右侧</div>
            </div>
          </div>
        </div>
      </transition-group>
    </draggable>
    <div class="line"></div>
  </div>
</template>

<script>
import draggable from "vuedraggable"; //引入
export default {
  name: "",
  props: {},
  components: { draggable },
  data() {
    return {
      list: [],
      num: "首页",
    };
  },
  methods: {
    //点击谁谁变色 跳转到响相应的路由
    clickone(item) {
      this.num = item.authName;
      this.$router.push({ path: item.path });
    },
    //点击删除
    del(item, index) {
      this.list.splice(index, 1);
    },
    // rightClick(item, $event) {
    //   this.show = true;
    //   document.addEventListener("click", () => {
    //     this.show = false;
    //   });
    //   this.tranLeft = $event.pageX + "px";
    //   this.tranTop = $event.pageY + "px";
    //   //ESC事件
    //   // document.addEventListener("keydown", (e) => {
    //   //   if (e.keyCode === 27) {
    //   //     this.show = false;
    //   //   }
    //   // });
    // },
    // // //evt里面有两个值，一个evt.added 和evt.removed  可以分别知道移动元素的ID和删除元素的ID
    // change(evt) {
    //   console.log(evt, "change...");
    // },
    // //start ,end ,add,update, sort, remove 得到的都差不多
    // start(evt) {
    //   this.drag = true;
    //   console.log(evt, "start...");
    // },
    // end(evt) {
    //   // console.log(evt, "end....");
    //   this.drag = true;
    //   evt.item; //可以知道拖动的本身
    //   evt.to; // 可以知道拖动的目标列表
    //   evt.from; // 可以知道之前的列表
    //   evt.oldIndex; // 可以知道拖动前的位置
    //   evt.newIndex; // 可以知道拖动后的位置
    // },
    // move(evt, originalEvent) {
    //   console.log(evt, "move");
    //   console.log(originalEvent); //鼠标位置
    // },
  },
  mounted() {
    // this.list = JSON.parse(localStorage.getItem('tabList'))
    // console.log(this.list);
    if (localStorage.getItem("tabList")) {
      this.list[0] = [{ authName: "首页", path: "/home" }];
      this.list = JSON.parse(localStorage.getItem("tabList"));
    } else {
      this.list = [{ authName: "首页", path: "/home" }];
    }
  },
  watch: {},
  computed: {},
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
/*被拖拽对象的样式*/
.item {
  padding: 6px;
  background-color: #fdfdfd;
  border: solid 1px #eee;
  margin-bottom: 10px;
  cursor: move;
}
/*选中样式*/
.chosen {
  border: solid 2px #3089dc !important;
}
</style>