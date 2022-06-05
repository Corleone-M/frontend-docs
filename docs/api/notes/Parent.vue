<template>
  <div>
    <div class="p1">
      <button @click="reactData" style="margin: 20px">父组件修改数组</button>
      <p v-for="(p, idx) in demoData.list" :key="p.id">
        <span>第{{ idx + 1 }}行：</span>
        <label>name: </label>
        <span>{{ p.info.name }}</span>
        <label>age: </label>
        <span>{{ p.info.age }}</span>
      </p>
    </div>
    <div>
      <Children :demoData="demoData" />
    </div>
  </div>
</template>

<script>
import { Children } from './Children.vue';

export default {
  components: { Children },
  data() {
    return {
      demoData: {
        list: [
          {
            id: 1,
            info: {
              name: 'allen',
              age: 18,
            },
            type: 'person',
          },
          {
            id: 2,
            info: {
              name: 'jason',
              age: 22,
            },
            type: 'person',
          },
        ],
        className: ['layout', 'menu', 'tree', 'page'],
      },
    };
  },
  methods: {
    reactData() {
      this.demoData.list.push({
        id: 777,
        info: {
          name: 'Amy',
          age: 99,
        },
        type: 'person',
      });
    },
  }
};
</script>

<style>
</style>
