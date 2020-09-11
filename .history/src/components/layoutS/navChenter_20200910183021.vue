<template>
  <div>
    <draggable @start="start" @end="end" v-model="$store.state.NAV_LIST">
      <el-tag
        class="tags"
        @close="close(tag)"
        @click="gotoRouter(tag)"
        v-for="tag in getNavList"
        :key="tag.name"
        :closable="`/${tag.path}`!==$route.path ? false : true"
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
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>