# 命名规范

## 文件系统

目录命名中，混用大小写命名方式有的时候会导致大小写不敏感的文件系统的问题，故推荐统一使用 kebab-case 形式

1. <font color=#f5222d>【强制】</font>文件夹命名

 命名采用横线连接 (kebab-case)形式，全部使用小写字母       

```
// bad
components
├─ Public-Affairs
├─ publicAffairs
├─ public_affairs
├─ publicaffairs

// good
components
├─ public-affairs
├─ system-config

```

2. <font color=#f5222d>【强制】</font>JavaScript文件命名

与文件夹命名存在同样问题，推荐采用横线连接 (kebab-case)形式，全部使用小写字母。除非有特殊含义的缩写（如i18n），否则写全称

```
// bad
utils
├─ FullScreen.js
├─ fullScreen.js
├─ full_screen.js
├─ fullscreen.js
├─ fulScre.js
├─ ful-Scre.js

// good
utils
├─ full-screen.js
├─ i18n-local.js

```

3. <font color=#f5222d>【强制】</font> Vue组件文件命名

官方推荐，要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)。词大写开头对于代码编辑器的自动补全最为友好，
kebab-case对文件系统的兼容性更友好。值得商榷，个人更倾向于kebab-case。

```
// bad
components
├─ mycomponent.vue
├─ myComponent.vue
├─ my_component.vue

// good
components
├─ my-component.vue
// 或者始终
components
├─ MyComponent.vue

```
4. <font color=#f5222d>【强制】</font>其他类型文件

业务内容相关的其他类型文件（css、less、html、ts、图片等），如无特殊情况，建议始终使用横线连接 (kebab-case)方式。
与JavaScript文件一致。

## DOM相关属性

5. <font color=#f5222d>【强制】</font>id 命名

id全局唯一，等同于js全局变量，id定义太多有同名覆盖等安全隐患。非必要情况，不要定义id，必要时，
采用camelCase(驼峰)形式，首字母小写。

```html
<!-- bad -->
<div id="App">挂载点</div>
<div id="my-demo"></div>

<!-- good -->
<div id="app"></div>
<div id="myApp"></div>

```

6. <font color=#f5222d>【强制】</font>class 命名

无特殊情况，建议始终使用横线连接 (kebab-case)形式

```html
<!-- bad -->
<div id="Dialog"></div>
<div id="user_dialog"></div>
<div id="userDialog"></div>
<div id="user-Dialog"></div>

<!-- good -->
<div id="user-dialog"></div>

```

7. <font color=#f5222d>【强制】</font>name 命名

建议与id命名规则一致。

8. <font color=#f5222d>【强制】</font>自定义属性命名

使用简短的单词或特殊含义的字母，全部母小写。或 “data-”加简短的单词 ，不建议其他形式。

```html
<!-- bad -->
<div user-sort="desc"></div>
<div UserSort="desc"></div>
<div UserSort="desc"></div>
...

<!-- good -->
<div sort="desc"></div>
<div data-sort="desc"></div>

```
9. <font color=#f5222d>【强制】</font>自定义标签名

始终使用横线连接 (kebab-case)形式，其他形式不推荐

``` js
class MyTag extends HTMLElement {
  constructor() {
    super();
    // ...
  }
}

customElements.define('my-tag', MyTag);

```

```html

<my-tag>my text.</my-tag>

```

10. <font color=#f5222d>【强制】</font> html标签名书写规范

标签字母全部小写，永远闭合标签。

```html
<!-- bad -->
<Section></SECTION>
<Div><Div>
<DIV><DIV>

<!-- good -->
<section>
  <p>这是一个段落。</p>
</section>

```

## JS变量命名

这里的变量/常量包括 变量、常量、方法、函数、构造器、类、标签等JavaScript相关的标识符。

11. <font color=#f5222d>【强制】</font>常规变量命名

这里的常规变量包括var、let和临时const声明的标识符，以及标签、方法、函数、对象属性名等。均推荐采用camelCase(驼峰)形式，
首字母小写，其他形式不推荐

```js
// bad
let UserData = { ... };
const _data = [ ... ];

// good
function addData(){
  // ...
};
let userData = { ... };

```

12. <font color=#f5222d>【强制】</font>内部属性或方法

类、实例内部属性或方法，推荐使用_开头，以示区分。

```js
// good
const Person = function(name) {
    let _name = name;
    this.getName = function() {
        return _name;
    };
    this.setName = function(str) {
        _name = str;
    };
};

```

13. <font color=#f5222d>【强制】</font>类和构造器

在命名构造器或者类的时候才用帕斯卡拼命名法（PascalCase）,首字母大写。

```js
// bad
class user {
  constructor(name) {
    this.name = name;
  }
}

// good
class User {
  constructor(name) {
    this.name = name;
  }
}

function Person(name) {
  this.name = name;
}

const person = new Person('allen');

```

14. <font color=#f5222d>【强制】</font> 全局的常量

全局配置的常量（如：全局事件名称等），推荐使用全部大写，以下划线（_）链接的形式，其他形式不推荐。临时的 使用const声明的标识符，
则按常规变量规范，以camelCase(驼峰)方式命名。

```js

// event.js
const IPC_EVENT_CONNECT = 'EVENT_CONNECT';

// network.js
onConnect(handler) {
  this.options.ipcMain.on(event.IPC_EVENT_CONNECT, handler);
}

```

15. <font color=#f5222d>【强制】</font> 特殊意义的变量

在目前的前端生态系统中，存在一些类似以 $ 开头的标识符，具有特殊意义，当我们需要声明一个表示特殊意义的变量时，可以使用$开头，其他情况不建议使用$符号命名。

```js

import * as $ from 'jquery'

Vue.prototype.$nextPage = function() {
  // ...
}

```

## 语义化命名

语义化命名涉及目录、组件、变量、方法、属性、路由等等，任何一种命名如果和逻辑差异过大，都会给人造成逻辑混乱和理解困扰。
文不对题的情况毕竟相对少见，而最常见的问题，其实是模糊的或者没有具体语义的命名方式，下面大致举一些例子。

16. <font color=#1890ff>【推荐】</font>变量名不应过短，要能准确完整地描述该变量所表述的事物

   | 不好的变量名       | 好的变量名                   |
   | ------------------ | ---------------------------- |
   | inp                | input, priceInput            |
   | day1, day2, param1 | today, tomorrow              |
   | id                 | userId, orderId              |
   | obj                | orderData, houseInfos        |
   | handler            | submitHandler, searchHandler |

17. <font color=#1890ff>【推荐】</font>变量名不要使用计算机术语，如 texareaData，应该取和业务相关的名字，如 leaveMessage

18. <font color=#1890ff>【推荐】</font>变量名的对仗要明确，如 up/down、begin/end、opened/closed、visible/invisible

19. <font color=#1890ff>【推荐】</font>变量名使用正确的语法

   *不要使用中文拼音，如 shijianchuo 应改成 timestamp ；*
   *如果是复数的话加 s，或者加上 List，如 orderList、menuItems；*
   *而过去式的加上 ed，如 updated/found 等；*
   *如果正在进行的加上 ing，如 calling；*

20. <font color=#1890ff>【推荐】</font>使用临时变量时请结合实际需要进行变量命名

   *有些喜欢取temp和obj之类的变量，如果这种临时变量在两行代码内就用完了，接下来的代码就不会再用了，还是可以接受的，如交换数组的两个元素。但是有些人取了个temp，接下来十几行代码都用到了这个temp，这个就让人很困惑了。所以应该尽量少用temp类的变量*

   ```javascript

   // not good
   let temp = 10;
   let leftPosition = currentPosition + temp，
       topPosition = currentPosition - temp;
   
   // good
   let adjustSpace = 10;
   let leftPosition = currentPosition + adjustSpace;
   let topPosition = currentPosition - adjustSpace;

   ```

21. <font color=#1890ff>【推荐】</font>波尔变量可以结合实际语境使用 done/found/successs/ok/available/complete 等修饰词

   ```javascript

   // good
   let ajaxDone = true;
   let fileFound = false;
   let resourceUpdated = true;

   ```

22. <font color=#1890ff>【推荐】</font>波尔变量名应使用肯定的布尔变量名，不要使用否定的名词，如 notOk、notReady，因为否定的词取反的时候就会比较奇怪，如 `if (!notOk)`

23. <font color=#1890ff>【推荐】</font>语义化API命名

  在模块或者组件内部，设计的一些提供给外部使用的API，命名过于模糊，如getDta等。

  ```js

  // bad
  api.getData = function (params = {}) {
    return BaseService.getRequest('api/pmf/v1/affair/getUserAffairLog', params);
  };

  // good
  api.getUserName = function (params = {}) {
    return BaseService.getRequest('api/pmf/v1/affair/getUserName', params);
  };

  ```

24. <font color=#1890ff>【推荐】</font>语义化组件命名

  ````
  // bad
  components
  ├─ MyComponent.vue
  ├─ MyMenu.vue
  ├─ TodoList.vue

  // good
  components
  ├─ PersonalWorkingTable.vue
  ├─ LeftSideBar.vue

  ````

25. <font color=#1890ff>【推荐】</font>语义化方法命名

````js
export default {
  methods: {
    // bad
    toGo() {
      // ...
    },
    // good
    getUserDetail() {

    },
  }
}

````

26. <font color=#1890ff>【推荐】</font>语义化属性命名

如果组件非常简单，影响不大，如果组件比较复杂，数据较多，则应该语义化命名。

````js

export default {
  data () {
    return {
      list: [], // bad
      userTableList: [], // good
    }
  }
}

````

## 样式变量

27. <font color=#f5222d>【强制】</font>样式文件的变量

less、scss等预编译样式文件的变量，css3中的keyframes命名等，命名统一采用 camelCase(驼峰)形式。有特殊语法的除外。

```css
@keyframes fadeIn {
  0% {
    width: 0;
    opacity: 0;
  }

  100% {
    width: 10%;
    opacity: 1;
  }
}
```

```less

@fontSize: 12px;
.layout {
  font-size: @fontSize;
}

```
