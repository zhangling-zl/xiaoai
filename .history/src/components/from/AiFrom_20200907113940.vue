<template>
  <div>
    <el-dialog :title="title" :visible.sync="Visible" width="30%" :show-close="showClose">
      <el-form :model="fromoptions" :rules="rules">
        <template v-for="(item,index) in fromData">
          <el-form-item
            :key="index"
            :label="item.label"
            :label-width="item.labelWidth"
            :prop="item.prop"
            v-if="!item.children"
          >
            <!-- 动态渲染组件 -->
            <component :is="`el-${item.type}`" v-bind="item.attrs" v-model="fromoptions[item.prop]"></component>
          </el-form-item>
          <el-form-item v-else :key="index" :label="item.label" :label-width="item.labelWidth">
            <component :is="`el-${item.type}`" v-bind="item.attrs" v-model="item.value">
              <component
                v-for="(item1,index1) in item.children"
                :key="index1"
                :is="`el-${item1.type}`"
                :label="item1.label"
                :value="item1.value"
              ></component>
            </component>
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
  },
  components: {},
  data() {
    return {
      fromoptions: {},
      rules: {},
    };
  },
  methods: {
    //点击弹框取消 把事件传给父组件
    cancel() {
      this.$emit("cancel",this.fromoptions);
      //  this.$emit('update:visible',false)
    },
    //点击弹框确定 把事件传给父组件
    ok() {
      this.$emit("ok",this.fromoptions);
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
    },
  },
  mounted() {
    //调用这个方法
    this.setInitValue()
  },
  watch: {
    //如果传过来的数据改变了
    fromData() {
       this.setInitValue()
    },
  },
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>