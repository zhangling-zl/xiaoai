<template>
  <div>
    <!--<div v-for="(item,index) in goods" :key="index">
      <div>{{item}}</div>
    </div>
    {{total}}-->

    
  </div>
</template>

<script>
// 如果vuex有提交mutations,固定写法
import { createNamespacedHelpers } from "vuex";
const goodsModule = createNamespacedHelpers("goods"); //user是模块名（store/index/modules/user）
const { mapState: goodsState, mapActions: goodsActions } = goodsModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      type: 1, //[1,2,3]
      pagenum: 1, //当前页码值
      pagesize: 10, //每页显示多少条数据


        //表格
      //表格的配置项 布尔类型的值不显示
      columns: [
        {
          label: "职位",
          prop: "roleName",
          align: "center",
          width: "350",
        },
        {
          label: "描述",
          prop: "roleDesc",
          align: "center",
          width: "350",
        },
        {
          label: "操作",
          align: "center",
        },
      ],
      //下标(1、2、3、4)
      indexOptions: {
        showIndex: true,
        label: "#",
        align: "center",
        width: "60",
        indexMethod(index) {
          return index + 1;
        },
      },
      //加载中效果
      loadingOptions: {
        text: "加载中...",
        bgColor: "rgba(0, 0, 0, 0.8)",
      },
      currentPage: 1, //分页(当前页)
      pageSize: 3, //分页(当前页有多少条)
      border: true, //表单是否带边框
      //对话框嵌套表单
      Visible: false, //控制对话框的显示与隐藏
      VisibleAll: false, //控制添加
      showClose: false, //是否显示关闭按钮

      //编辑

      //表单的配置项
      fromData: [
        {
          type: "input", //表单的类型
          value: "", //v-model绑定的值
          label: "角色名", //label名称
          labelWidth: "80px", //label宽度
          prop: "roleName", //绑定验证
          id: "",
          //验证规则
          rules: [
            {
              required: true,
              message: "角色名不能为空",
              trigger: "blur",
            },
          ],
          attrs: {
            // placeholder: "请输入用户名",//占位符
            clearable: true, //显示取消按钮
          },
        },
        {
          type: "input", //表单的类型
          value: "", //v-model绑定的值
          prop: "roleDesc", //绑定验证
          label: "角色描述", //label名称
          labelWidth: "80px", //label宽度
          id: "",
          attrs: {
            // placeholder: "请输入密码",//占位符
            clearable: true, //显示取消按钮
            // 'show-password':true,//密码框
          },
        },
        // {
        //   type: "select", //表单的类型
        //   value: "", //v-model绑定的值
        //   prop:'rules',//绑定验证
        //   label: "分配角色", //label名称
        //   labelWidth: "80px", //label宽度
        //   children: [
        //     {
        //       type: "option",
        //       value: "选项1",
        //       label: "黄金糕",
        //     },
        //     {
        //       type: "option",
        //       value: "选项2",
        //       label: "双皮奶",
        //     },
        //     {
        //       type: "option",
        //       value: "选项3",
        //       label: "蚵仔煎",
        //     },
        //     {
        //       type: "option",
        //       value: "选项4",
        //       label: "龙须面",
        //     },
        //     {
        //       type: "option",
        //       value: "选项5",
        //       label: "北京烤鸭",
        //     },
        //   ],
        // },
      ],
      //表单的配置项
      fromDataAll: [
        {
          type: "input", //表单的类型
          value: "", //v-model绑定的值
          label: "角色名", //label名称
          labelWidth: "80px", //label宽度
          prop: "roleName", //绑定验证
          id: "",
          //验证规则
          rules: [
            {
              required: true,
              message: "角色名不能为空",
              trigger: "blur",
            },
          ],
          attrs: {
            // placeholder: "请输入用户名",//占位符
            clearable: true, //显示取消按钮
          },
        },
        {
          type: "input", //表单的类型
          value: "", //v-model绑定的值
          prop: "roleDesc", //绑定验证
          label: "角色描述", //label名称
          labelWidth: "80px", //label宽度
          id: "",
          attrs: {
            // placeholder: "请输入密码",//占位符
            clearable: true, //显示取消按钮
            // 'show-password':true,//密码框
          },
        },
      ],

    };
  },
  methods: {
    //展开vuex的请求
    ...goodsActions(["categories"]),
  },
  mounted() {
    this.categories({
      type: this.type,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    ...goodsState(["goods", "total"]),
  },
};
</script>

<style scoped lang='scss'>
</style>