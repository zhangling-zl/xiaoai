<template>
  <div>
    <el-dialog title="提示" :visible.sync="Visible" width="30%" :show-close="showClose">
      <el-form :model="Edit">
        <el-form-item label="活动名称" >
          <el-input v-model="Edit.roleName" autocomplete="off"></el-input>
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
    Visible: {
      type: Boolean,
      default: false,
    },
    showClose: {
      type: Boolean,
      default: false,
    },
    Edit:{
        type:Object
    }
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
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>