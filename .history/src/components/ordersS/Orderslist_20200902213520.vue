<template>
  <div>
    <el-card class="box-card">
      <div class="input mr10 mb20" style="width: 300px;">
        <el-input placeholder="请输入搜索内容" v-model="query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
      <el-table :data="goods" stripe style="width: 100%" border>
        <el-table-column type="index" label="#" width="50" align="center"></el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="250" align="center"></el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="180" align="center"></el-table-column>
        <el-table-column prop="pay_status" label="是否付款" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.type">{{scope.row.text}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" align="center"></el-table-column>
        <el-table-column prop="update_time" label="下单时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑地址" placement="top">
              <el-button size="mini" type="primary" @click="Editaddress">
                <i class="el-icon-edit"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="物流信息" placement="top">
              <el-button
                size="mini"
                type="success"
                @click="handleDistribution(scope.$index, scope.row)"
              >
                <i class="el-icon-location"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt15">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[10, 15, 20, 25]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>

    <el-dialog title="编辑地址" :visible.sync="dialogFormVisibleSLl" width="40%" :show-close="true">
      <el-cascader :options="options" clearable class="w100%"></el-cascader>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleSLl = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleSLl = false">确 定</el-button>
      </div>-->
    </el-dialog>
  </div>
</template>

<script>
import areaList from "../../../area";
// import city from "../../../city";
//如果vuex有提交mutations,固定写法
import { createNamespacedHelpers } from "vuex";
const ordersModule = createNamespacedHelpers("orders"); //user是模块名（store/index/modules/user）
const { mapState: ordersState, mapActions: ordersActions } = ordersModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      //订单列表的请求 参数初始值
      query: "", //查询参数
      pagenum: 1, //当前页码
      pagesize: 10, //每页显示条数
      user_id: "", //用户id
      pay_status: "", //支付状态
      is_send: "", //是否发货
      order_fapiao_title: "", //个人或者公司
      order_fapiao_company: "", //公司名称
      order_fapiao_content: "", //发票内容
      consignee_addr: "", //发货地址

      dialogFormVisibleSLl: false, //控制编辑地址弹框的显示与隐藏
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航",
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航",
                },
              ],
            },
          ],
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局",
                },
                {
                  value: "color",
                  label: "Color 色彩",
                },
                {
                  value: "typography",
                  label: "Typography 字体",
                },
                {
                  value: "icon",
                  label: "Icon 图标",
                },
                {
                  value: "button",
                  label: "Button 按钮",
                },
              ],
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框",
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框",
                },
                {
                  value: "input",
                  label: "Input 输入框",
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器",
                },
                {
                  value: "select",
                  label: "Select 选择器",
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器",
                },
                {
                  value: "switch",
                  label: "Switch 开关",
                },
                {
                  value: "slider",
                  label: "Slider 滑块",
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器",
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器",
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器",
                },
                {
                  value: "upload",
                  label: "Upload 上传",
                },
                {
                  value: "rate",
                  label: "Rate 评分",
                },
                {
                  value: "form",
                  label: "Form 表单",
                },
              ],
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格",
                },
                {
                  value: "tag",
                  label: "Tag 标签",
                },
                {
                  value: "progress",
                  label: "Progress 进度条",
                },
                {
                  value: "tree",
                  label: "Tree 树形控件",
                },
                {
                  value: "pagination",
                  label: "Pagination 分页",
                },
                {
                  value: "badge",
                  label: "Badge 标记",
                },
              ],
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告",
                },
                {
                  value: "loading",
                  label: "Loading 加载",
                },
                {
                  value: "message",
                  label: "Message 消息提示",
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框",
                },
                {
                  value: "notification",
                  label: "Notification 通知",
                },
              ],
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单",
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页",
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑",
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单",
                },
                {
                  value: "steps",
                  label: "Steps 步骤条",
                },
              ],
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框",
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示",
                },
                {
                  value: "popover",
                  label: "Popover 弹出框",
                },
                {
                  value: "card",
                  label: "Card 卡片",
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯",
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板",
                },
              ],
            },
          ],
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components",
            },
            {
              value: "sketch",
              label: "Sketch Templates",
            },
            {
              value: "jiaohu",
              label: "组件交互文档",
            },
          ],
        },
      ],
      province_list: {},
      city_list: {},
      county_list: {},
      areaList: {},
    };
  },
  methods: {
    //展开vuex的请求
    ...ordersActions(["getOrders"]),
    //点击搜索
    search() {
      console.log(this.query);
      this.getOrders({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        user_id: this.user_id,
        pay_status: this.pay_status,
        is_send: this.is_send,
        order_fapiao_title: this.order_fapiao_title,
        order_fapiao_company: this.order_fapiao_company,
        order_fapiao_content: this.order_fapiao_content,
        consignee_addr: this.consignee_addr,
      });
    },
    //分页 （每页多少条）
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      //点击每一页之后再发一次请求
      this.getOrders({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        user_id: this.user_id,
        pay_status: this.pay_status,
        is_send: this.is_send,
        order_fapiao_title: this.order_fapiao_title,
        order_fapiao_company: this.order_fapiao_company,
        order_fapiao_content: this.order_fapiao_content,
        consignee_addr: this.consignee_addr,
      });
    },
    //分页 （当前页）
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getOrders({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        user_id: this.user_id,
        pay_status: this.pay_status,
        is_send: this.is_send,
        order_fapiao_title: this.order_fapiao_title,
        order_fapiao_company: this.order_fapiao_company,
        order_fapiao_content: this.order_fapiao_content,
        consignee_addr: this.consignee_addr,
      });
    },
    //点击显示编辑地址弹框
    Editaddress() {
      this.dialogFormVisibleSLl = true;
    },
  },
  mounted() {
    //订单列表（请求调用）
    this.getOrders({
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
      user_id: this.user_id,
      pay_status: this.pay_status,
      is_send: this.is_send,
      order_fapiao_title: this.order_fapiao_title,
      order_fapiao_company: this.order_fapiao_company,
      order_fapiao_content: this.order_fapiao_content,
      consignee_addr: this.consignee_addr,
    });
    // this.city = city.data;
    // console.log(this.city, "城市手动定位");
    this.province_list = areaList.province_list;
    this.city_list = areaList.city_list;
    this.county_list = areaList.county_list;

    this.areaList = areaList;

    console.log(this.province_list, "省");
    console.log(this.city_list, "市");
    console.log(this.county_list, "区");
    console.log(this.areaList);
    let list = Object.values(this.province_list);
    let list1 = Object.keys(this.province_list);
    // let list1 = Object.values(this.province_list);
    // let list2 = Object.values(this.province_list);
    console.log(list);
    console.log(list1);
    // console.log(list2);
    // for(let i in this.province_list){
    //   console.log(i);
    //   console.log(this.province_list[i]);
    // }
  },
  watch: {},
  computed: {
    //展开vuex的数组（数据）
    ...ordersState(["goods", "total"]),
  },
};
</script>

<style scoped lang='scss'>
.el-cascader {
  padding-left: 0;
  padding-right: 0;
  padding-top: 15px;
  padding-bottom: 30px;
}
.el-cascader {
  width: 100%;
}
</style>