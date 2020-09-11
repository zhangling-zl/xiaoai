<template>
  <div>
    <el-alert title="添加商品信息" show-icon type="info" :closable="false"></el-alert>
    <el-steps :active="active" finish-status="success" style="marign-left:120px !important;">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <el-tabs :tab-position="tabPosition" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="ruleForm.goods_name" @input="InputName" @change="changeName"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input
              v-model="ruleForm.goods_price"
              :disabled="disabled1"
              @input="InputPrice"
              @change="changePrice"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input
              v-model="ruleForm.goods_weight"
              :disabled="disabled2"
              @input="InputWeight"
              @change="changeWeight"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input
              v-model="ruleForm.goods_number"
              :disabled="disabled3"
              @input="InputNumber"
              @change="changeNumber"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="goods_cat">
            <el-cascader
              v-model="ruleForm.goods_cat"
              :disabled="disabled4"
              :options="categories"
              @change="handleChange"
              :props="props"
            ></el-cascader>
          </el-form-item>
        </el-form>
        <el-button style="margin-left:50px" type="success" v-if="flag===true" @click="nextOne">下一步</el-button>
      </el-tab-pane>

      <el-tab-pane label="商品参数" name="second" :disabled="disabledPane1">
        <el-button style="margin-left:50px" type="success" @click="nextSecond">下一步</el-button>
      </el-tab-pane>

      <el-tab-pane label="商品属性" name="third" :disabled="disabledPane2">
        <div style="margin-left:60px" class="m-tb-10">暂无属性</div>
        <el-button style="margin-left:50px" type="success" @click="nextThird">下一步</el-button>
      </el-tab-pane>

      <el-tab-pane label="商品图片" name="forth" :disabled="disabledPane3">
        <el-upload class="upload-demo" drag action="/api/upload" :auto-upload="true" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-button style="margin-top:20px;" type="success" @click="nextFouth">下一步</el-button>
      </el-tab-pane>

      <el-tab-pane label="商品内容" name="fifth" :disabled="disabledPane4">
        <mavon-editor v-model="value" />
        <el-button style="margin-left:50px;margin-top:20px;" type="success" @click="nextFifth">提交</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const goodsModel = createNamespacedHelpers("goods");
const { mapState: goodsState, mapActions: goodsActions } = goodsModel;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      active: 0,
      tabPosition: "left",
      value: "", //提交
      goods_introduce: "",
      pics: [],
      attrs: [],
      goods_cat: "",
      activeName: "first",
      ruleForm: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
      },
      //验证规则
      rules: {
        goods_name: [{ required: true, message: "请输入商品名称" }],
        goods_price: [{ required: true, message: "请输入商品价格" }],
        goods_number: [{ required: true, message: "请输入商品重量" }],
        goods_weight: [{ required: true, message: "请输入商品数量" }],
      },
      //输入框禁用
      disabled1: true,
      disabled2: true,
      disabled3: true,
      disabled4: true,
      query: "", //请求参数
      pagenum: "", //请求参数
      pagesize: "", //请求参数
      props: { value: "cat_id", label: "cat_name" },
      flag: false,
      //左侧禁用
      disabledPane1: true,
      disabledPane2: true,
      disabledPane3: true,
      disabledPane4: true,
    };
  },

  methods: {
    ...goodsActions(["getCategories", "getGoods"]),
    //input框
    InputName(val) {
      if (val) {
        this.disabled1 = false;
      } else {
        this.disabled1 = true;
        this.disabled2 = true;
        this.disabled3 = true;
        this.disabled4 = true;
      }
    },
    InputPrice(val) {
      if (val) {
        this.disabled2 = false;
      }
    },
    InputWeight(val) {
      if (val) {
        this.disabled3 = false;
      }
    },
    InputNumber(val) {
      if (val) {
        this.disabled4 = false;
      }
    },
    handleChange(val) {
      if (val) {
        this.flag = true;
        this.goods_cat = val;
      } else {
        this.flag = false;
      }
    },
    handleClick(tab, event) {
      console.log(tab);
      console.log(event);
    },
    changeName(val) {
      if (val) {
        this.ruleForm.goods_name = val;
      }
    },
    changePrice(val) {
      if (val) {
        this.ruleForm.goods_price = val;
      }
    },
    changeWeight(val) {
      // console.log(val);
      if (val) {
        this.ruleForm.goods_weight = val;
      }
    },
    changeNumber(val) {
      // console.log(val);
      if (val) {
        this.ruleForm.goods_number = val;
      }
    },
    //第一步
    nextOne() {
      this.disabledPane1 = false;
      this.activeName = "second";
      this.disabledPane2 = true;
      this.disabledPane3 = true;
      this.disabledPane4 = true;
      if (this.active++ > 6) this.active = 6;
    },
    //第二步
    nextSecond() {
      this.disabledPane1 = false;
      this.disabledPane2 = false;
      this.activeName = "third";
      this.disabledPane3 = true;
      this.disabledPane4 = true;
      if (this.active++ > 6) this.active = 6;
    },
    //第三步
    nextThird() {
      this.disabledPane1 = false;
      this.disabledPane2 = false;
      this.disabledPane3 = false;
      this.activeName = "forth";
      this.disabledPane4 = true;
      if (this.active++ > 6) this.active = 6;
    },
    //第四步
    nextFouth() {
      this.disabledPane1 = false;
      this.disabledPane2 = false;
      this.disabledPane3 = false;
      this.disabledPane4 = false;
      this.activeName = "fifth";
      if (this.active++ > 6) this.active = 6;
    },
    //第五步
    nextFifth() {
      this.disabledPane1 = false;
      this.disabledPane2 = false;
      this.disabledPane3 = false;
      this.disabledPane4 = false;
      if (this.active++ > 6) this.active = 6;
      this.getGoods({
        goods_name: this.ruleForm.goods_name,
        goods_cat: this.goods_cat.toString(),
        goods_price: this.ruleForm.goods_price,
        goods_number: this.ruleForm.goods_number,
        goods_weight: this.ruleForm.goods_weight,
        goods_introduce: this.value,
        pics: this.pics,
        attrs: this.attrs,
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
      this.$router.push("/goods/goods");
    },
  },
  mounted() {
    this.getCategories({
      type: this.type,
      pagenum: this.pagenum,
      pagesize: this.pagenum,
    });
  },
  watch: {},
  computed: {
    ...goodsState(["categories"]),
  },
};
</script>

<style scoped lang='scss'>
.el-steps {
  margin: 20px 0px 40px 150px !important;
}
</style>