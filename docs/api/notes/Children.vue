<template>
  <div>
    <div>
      <header>-------------- comList 数组响应式---------------------</header>
      <p v-for="(p, idx) in comList" :key="p.id">
        <span>第{{ idx + 1 }}行：</span>
        <label>name: </label>
        <span>{{ p.info.name }}</span>
        <label>age: </label>
        <span>{{ p.info.age }}</span>
      </p>
      <header>-------------- demoData 数组响应式---------------------</header>
      <div>
        <p v-for="(p, idx) in localList" :key="p.id">
          <span>第{{ idx + 1 }}行：</span>
          <label>name: </label>
          <span>{{ p.info.name }}</span>
          <label>age: </label>
          <span>{{ p.info.age }}</span>
        </p>
      </div>
    </div>
    <header>-------------- 分割线 对象响应式---------------------</header>
    <div>
      <p>type: {{ obj.type }}</p>
      <p>name: {{ obj.name }}</p>
      <p>comName: {{ comName }}</p>
      <p>localName: {{ localName }}</p>
    </div>
    <header>-------------- 分割线 ---------------------</header>

    <button @click="reactData">修改数据</button>
  </div>
</template>

<script>
export default {
  props: {
    demoData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      localList: this.demoData.list,
      localName: this.demoData.list[0].info.name,
      obj: {
        type: 'reactive',
      },
    };
  },
  computed: {
    comName() {
      console.log('comName change');
      return this.localList[0].info.name;
    },
    comList() {
      console.log('comList change');
      return this.demoData.list;
    },
  },
  methods: {
    reactData() {
      this.react4();
      this.react1();
    },
    react1() {
      this.demoData.list[0].info.name = 'jinsheng';
    },
    react2() {
      this.localList[0].info.name = 'jinsheng';
    },
    react3() {
      this.localList[0] = {
        id: 666,
        info: {
          name: 'rose',
          age: 34,
        },
        type: 'person',
      };
    },
    react4() {
      this.localList[0] = {
        id: 666,
        info: {
          name: 'rose',
          age: 34,
        },
        type: 'person',
      };
    },
    react5() {
      this.localList.push({
        id: 666,
        info: {
          name: 'rose',
          age: 34,
        },
        type: 'person',
      });
    },
    react6() {
      this.obj.name = 'allen';
      this.obj.type = 'vue';
    },
    react7() {
      this.obj.name = 'allen';
      setTimeout(() => {
        this.obj.type = 'vue';
      }, 0);
    },
    react8() {
      Object.assign(this.obj, {
        name: 'allen',
        type: 'vue',
      });
    },
  },
};
</script>
<style>
header {
  margin-top: 30px;
}
label {
  display: inline-block;
  padding: 10px;
  border-radius: 5px;
  color: #333;
}
</style>
