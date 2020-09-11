<template>
  <div>
    <el-dialog :title="title" :visible.sync="Visible" width="30%" :show-close="showClose">
      <el-form>
        <el-form-item
         :required='item.required'
          :label-width="item.labelWidth"
          :label="item.label"
          v-for="(item,index) in fromData"
          :key="index"
        >
          <!-- 动态渲染组件 -->
          <component :is="`el-${item.type}`"></component>
        </el-form-item>
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
    return {};
  },
  methods: {
    //点击弹框取消 把事件传给父组件
    cancel() {
      this.$emit("cancel");
      //  this.$emit('update:visible',false)
    },
    //点击弹框确定 把事件传给父组件
    ok() {
      this.$emit("ok");
    },
  },
  mounted() {
    console.log(this.Edit);
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>