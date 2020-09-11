<template>
  <div>
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

    <!--<template>
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
          <transition-group type="transition" class="flex pop">
            <div v-for="(item , index) in list" :key="index" class="flex">
              <div
                class="text m-r-5"
                @click="clickone(item)"
                :class="{'text-bs':num===item.authName}"
                @contextmenu.prevent.stop="rightClick(item,$event)"
              >
                <div class="yuanquan"></div>
                <div class="m-lr-5">{{item.authName}}</div>
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
    </template>-->
  </div>
</template>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
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
    dli() {},
  },
  mounted() {
    this.list = JSON.parse(localStorage.getItem('tabList'))
    console.log(this.list);
    // if (localStorage.getItem("tabList")) {
    //   this.list[0] = [{ authName: "首页", path: "/home" }];
    //   this.list = JSON.parse(localStorage.getItem("tabList"));
    // } else {
    //   this.list = [{ authName: "首页", path: "/home" }];
    // }
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
</style>