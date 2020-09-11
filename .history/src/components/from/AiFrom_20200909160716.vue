<template>
  <div>
    <el-dialog
      :title="title"
      :visible="Visible"
      width="30%"
      :show-close="showClose"
      v-if="Visible"
      @close="close"
    >
      <!--  没有下拉和级联选择器的时候 -->
      <el-form :model="fromoptions" :rules="rules" ref="from">
        <template v-for="(item,index) in fromData">
          <el-form-item
            :key="index"
            :label="item.label"
            :label-width="item.labelWidth"
            :prop="item.prop"
            v-if="!item.children && item.type==='input'"
          >
            <!-- 动态渲染组件 -->
            <component
              :is="`el-${item.type}`"
              v-bind="item.attrs"
              v-model="fromoptions[item.prop]"
              @input="input"
            ></component>
          </el-form-item>

          <el-form-item
            v-if="item.children && item.type==='select'"
            :key="index"
            :label="item.label"
            :label-width="item.labelWidth"
            :prop="item.prop"
          >
            <component :is="`el-${item.type}`" v-bind="item.attrs" v-model="fromoptions[item.prop]">
              <component
                v-for="(item1,index1) in item.children"
                :key="index1"
                :is="`el-${item1.type}`"
                :label="item1.label"
                :value="item1.value"
              ></component>
            </component>
          </el-form-item>

          <el-form-item
            v-if="!item.children && item.type==='cascader'"
            :key="index"
            :label="item.label"
            :label-width="item.labelWidth"
            :prop="item.prop"
          >
            <component
              v-if="lala===false"
              :lala="lala"
              @change="handleChange"
              :is="`el-${item.type}`"
              :options="options"
              v-bind="item.attrs"
              v-model="fromoptions[item.prop]"
            ></component>
            <component
              v-if="lala===true"
              :lala="lala"
              @change="handleChange"
              :is="`el-${item.type}`"
              :options="options"
              :disabled="item.disabled"
              :props="{ checkStrictly: true }"
              v-bind="item.attrs"
              v-model="fromoptions[item.prop]"
            ></component>
          </el-form-item>
        </template>
      </el-form>
      <!-- 做判断，如果父组件有footer这个插槽，则用父组件传过来的东西，否则用自带的插槽 -->
      <slot name="footer" v-if="$slots.footer"></slot>
      <span slot="footer" v-else>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    //控制弹框的显示与隐藏
    Visible: {
      type: Boolean,
      default: false,
    },
    //控制是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: false,
    },
    //弹框标题
    title: {
      type: String,
    },
    //弹框里面嵌套的表单内容
    fromData: {
      type: Array,
      required: true,
    },
    options: {
      type: Array,
    },
    lala: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {
      fromoptions: {},
      rules: {},
    };
  },
  methods: {
    close() {
      console.log("关闭");
      this.$emit("close", { isVisible: false });
    },
    //点击弹框取消 把事件传给父组件
    cancel() {
      this.$emit("cancel", {
        options: this.fromoptions,
        fromRef: this.$refs.from,
      });
      //  this.$emit('update:visible',false)
      this.fromData.map((item) => {
        if (item.children) {
          this.fromoptions[item.prop] = "";
        }
      });
    },
    //点击弹框确定 把事件传给父组件
    ok() {
      this.$emit("ok", {
        options: this.fromoptions,
        fromRef: this.$refs.from,
      });
      this.fromData.map((item) => {
        if (item.children) {
          this.fromoptions[item.prop] = "";
        }
      });
    },
    //把点击事件传给父组件
    handleChange() {
      this.$emit("handleChange", {
        options: this.fromoptions,
        fromRef: this.$refs.from,
      });
    },
    //点击事件传给父组件 判断这个输入框是否有值
    input(ipt) {
      this.$emit("input", { ipt });
      // console.log(1111);
    },
    //初始化的value
    setInitValue() {
      let options = {};
      let rules = {};
      this.fromData.map((item) => {
        // console.log(item);
        rules[item.prop] = item.rules;
        options[item.prop] = item.value;
      });
      this.fromoptions = JSON.parse(JSON.stringify(options));
      this.rules = JSON.parse(JSON.stringify(rules));
      // console.log(this.fromoptions);
    },
  },
  mounted() {
    //调用这个方法
    this.setInitValue();
  },
  watch: {
    //如果传过来的数据改变了
    fromData: {
      //深度监听
      handler() {
        this.setInitValue();
      },
      deep: true,
    },
  },
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>