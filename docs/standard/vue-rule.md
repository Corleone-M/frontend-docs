# Vue编码规范

## 风格指南

Vue的开源文档中，附带了一份[风格指南](https://cn.vuejs.org/v2/style-guide/)，里面对Vue的一些使用规范和策略做了比较详细的讲解和推荐。
风格指南中如果有和本文档冲突的地方，以本文档的标准为准，本文档没有列出的约定，以风格指南为准。
## Template

这里的部分内容，应该是html规范里面的，但现代开发模式很少直接写html文件了，结合目前团队主要使用 Vue 框架的实际情况，将这一部分内容放在Template里面。

1. <font color=#f5222d>【强制】</font>对于属性的定义，使用双引号，不要使用单引号

   ``` html

   <!-- bad -->
   <input class='a' type=text>
   
   <!-- good -->
   <input class="a" type="text">

   ```

2. <font color=#f5222d>【强制】</font>不要省略可选的结束标签（closing tag）（如`</li>` 或 `</body>`）

    >省略可选的结束标签，虽不会违反 H5 规范；但可能会造成层级上的困扰，导致代码出现无法预料的问题

      ```html
        <!-- bad -->
        <h1>h1 text
        <h2>h2 text
      
        <!-- good -->
        <h1>h1 text</h1>
        <h2>h2 text</h2>
      ```

3. <font color=#f5222d>【强制】</font>特殊符号使用 [HTML 字符实体](http://www.w3school.com.cn/html/html_entities.asp)（实体名称对大小写敏感），常用如下：

      | 符号 | 实体编码 | 符号 | 实体编码 |
      | :--: | :------: |:--: | :------:|
      | 空格 | \&nbsp;  |  &   |  \&amp; |
      |  ©   | \&copy;  |  <   |  \&lt;  |
      |  ¥   |  \&yen;  |  >   |  \&gt;  |
      |  ®   |  \&reg;  |  ¥   |  \&yen; |

4. <font color=#f5222d>【强制】</font>行内元素里面不可使用块级元素

    a 标签是一个行内元素，行内元素里面套了一个 div 的标签，这样可能会导致 a 标签无法正常点击

    ```html
      <!-- bad -->
      <a href="../test">
        <div></div>
      </a>
    ```

    可以使用如下代码进行修复：

    ```html
      <a href="../test" style="display: block">
        <div></div>
      </a>
    ```

5. <font color=#f5222d>【强制】</font>vue中不使用自定义标签，会与Vue组件系统的自定义组件冲突

6. <font color=#f5222d>【强制】</font>不使用重复属性，重复的属性只会取第一个

    ```html
    <!-- error -->
    <input class="a" type="text" class="b">
       
    <!-- good -->
    <input class="a b" type="text">
    ```

7. <font color=#1890ff>【推荐】</font>图片等静态资源协议不要写死

    >只要https的网页请求了一张http的图片，就会导致浏览器地址栏左边的小锁没有了，一般不要写死，写成根据当前域名的协议去加载，用//开头：

    ```html
    <img src="//static.chimeroi.com/hello-world.jpg">

    ```

8. <font color=#1890ff>【推荐】</font>不使用属性设置样式（`img`, `table`等元素）

    ```html
    <!-- bad -->
    <img src="test.jpg" alt width="400" height="300">
    
    <!-- good -->
    <img src="test.jpg" style="width:400px;height:300px;">

    ```

9. <font color=#1890ff>【推荐】</font>自定义属性要以data-开头
  自己添加的非标准的属性要以data-开头，否则[w3c validator](https://link.juejin.im/?target=https%3A%2F%2Fvalidator.w3.org%2F)会认为是不规范的

    ```html
    <!-- bad -->
    <div count="5"></div>
    
    <!-- good -->
    <div data-count="5"></div>
    ```

10. <font color=#1890ff>【推荐】</font>编写 HTML 代码时，尽量避免多余的层级，减少标签的数量

    ```html
      <!-- bad -->
      <div>
        <span class="avatar">
          <img src="...">
        </span>
      </div>

      <!-- good -->
      <img class="avatar" src="...">

    ```

11. <font color=#1890ff>【推荐】</font>标签或组件属性应该按照特定的顺序出现以保证易读性

    为了代码便于阅读，避免出现如下面这样不统一的写法，影响阅读体验,应该对标签或组件属性的顺序做个简单的约定。

    ```html

      <el-table
        id="table"
        style="width: 100%"
        :data="formData"
        class="project-table"
        :summary-method="getSummaries"
        :span-method="objectSpanMethod"
        show-summary
        @row-click="rowClick"
        :max-height="this.tableHeight"
        :cell-class-name="cellMeshStyle"
        v-loading="tableLoading"
        @select="seletChange"
        :row-style="{ height: 23 + 'px' }"
        height="100%"
        ref="table"
        empty-text=" "
        :class="{ show_empty: showEmpty && !tableLoading }"
        :row-class-name="tableRowClassName"
        border
        v-loadmore="loadMore"
        v-loading="tableLoading"
      >

    ```
  
    [风格指南 顺序推荐](https://cn.vuejs.org/v2/style-guide/#元素-attribute-的顺序推荐)中对该部分内容有过约定，但比较庞杂。html原生属性和Vue可选的绑定合起来数量庞大，一一枚举约定不符合我们的初衷，因此这里列出出现频率较高的一些属性（动态删减和补充）列出，简单分类和排序，形成约定。

    按约定，原生静态属性写在前，动态属性写在后，其他属性按下面（从上到下，从左到右）顺序排列：
      > - 渲染相关：`v-for`、`v-if/v-else/v-show`、`v-pre/v-once`、...
      > - 原生静态属性：`id`、`class`、`name`、...
      > - vue静态属性
      > - 原生动态属性：`id`、`class`、`name`、...
      > - 自定义的绑定属性
      > - 事件绑定
      > - 不带值标签指令：`required`, `readonly`, `disabled`、...

    上面的属性顺序，应该修改为：

    ```html

      <el-table
        id="table"
        class="project-table"
        style="width: 100%"
        height="100%"
        ref="table"
        empty-text=" "
        v-loading="tableLoading"
        v-loadmore="loadMore"
        :class="{ show_empty: showEmpty && !tableLoading }"
        :row-class-name="tableRowClassName"
        :row-style="{ height: 23 + 'px' }"
        :data="formData"
        :max-height="tableHeight"
        :summary-method="getSummaries"
        :span-method="objectSpanMethod"
        :cell-class-name="cellMeshStyle"
        @row-click="rowClick"
        @select="seletChange"
        show-summary
        border
      >

    ```

## 组件实例

12. <font color=#f5222d>【强制】</font>import语句之后，与其他类型语句之间，有一个空行（newline-after-import）

    ``` vue

      <script>
      // good
      import { Children } from './Children.vue';
      import { TableMenu } from './TableMenu.vue';

      let timer = null;
      let count = 0;

      export default {
        components: { Children },
        data() {},
        methods: {}，
      };
      </script>

      <script>
      // bad
      import { Children } from './Children.vue';
      import { TableMenu } from './TableMenu.vue';
      export default {
        components: { Children },
        data() {},
        methods: {}，
      };
      </script>

    ```


13. <font color=#1890ff>【推荐】</font>组件实例选项的顺序规范

    与标签或组件属性顺序规范类似，[风格指南 顺序推荐](https://cn.vuejs.org/v2/style-guide/#元素-attribute-的顺序推荐)中对该部分内容有详细的约定，但不够简明扼要。
    这里对常用的选项做简单的顺序推荐，其他选项以风格指南的推荐为准。

      组件实例选项推荐按下面顺序书写：

      > - `name`
      > - `components`
      > - `filters`
      > - `mixins`
      > - `props`/`propsData`
      > - `data`
      > - `computed`
      > - `watch`
      > - `created 等生命周期钩子`
      > - `methods`
## 组件通信

14. <font color=#1890ff>【推荐】</font>组件通信应遵循单项数据流的原则

15. <font color=#f5222d>【强制】</font>不要直接修改 props 的值

  ``` vue
    <script>
      // bad
      export default {
        props: {
          userName: {
            type: String,
            default: '',
          },
        },
        data() {
          return {},
        },
        methods: {
          editName(val) {
            this.userName = val;
          },
        },
      };
    </script>

  ```
16. <font color=#f5222d>【强制】</font>不要通过$refs、$parent、$root等直接修改其他组件内部的值

  ``` vue
    <script>
      // bad
      export default {
        props: {
          userName: {
            type: String,
            default: '',
          },
        },
        data() {
          return {},
        },
        methods: {
          editAge(val) {
            this.$refs.userInfo.age = 18;
          },
        },
      };
    </script>

  ```
17. <font color=#1890ff>【推荐】</font>除非第三方或者公共组件库组件的API，否则不要通过$refs、$parent、$root等直接调用其他组件内部的方法

  ``` vue
    <script>
      // bad
      export default {
        props: {
          userName: {
            type: String,
            default: '',
          },
        },
        data() {
          return {},
        },
        methods: {
          setUserData(val) {
            return this.$refs.user.setUserData();
          },
        },
      };
    </script>

  ```