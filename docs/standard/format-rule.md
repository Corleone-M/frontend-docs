# 格式规范

## 缩进对齐

目录命名中，混用大小写命名方式有的时候会导致大小写不敏感的文件系统的问题，故推荐统一使用 kebab-case 形式

**1. 文件夹命名<font face="黑体" color=red>[强制]</font>**

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

**2. JavaScript文件命名<font face="黑体" color=red>[强制]</font>**

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

**3. Vue组件文件<font face="黑体" color=red>[强制]</font>**

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
**4. 其他类型文件<font face="黑体" color=red>[强制]</font>**

业务内容相关的其他类型文件（css、less、html、ts、图片等），如无特殊情况，建议始终使用横线连接 (kebab-case)方式。
与JavaScript文件一致。

## 超长换行

**1. id 命名<font face="黑体" color=red>[强制]</font>**

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

**2. class 命名<font face="黑体" color=red>[强制]</font>**

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

**3. name 命名<font face="黑体" color=red>[强制]</font>**

建议与id命名规则一致。

**4. 自定义属性命名<font face="黑体" color=red>[强制]</font>**

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
**5. 自定义标签名<font face="黑体" color=red>[强制]</font>**

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

**6. html标签名书写规范<font face="黑体" color=red>[强制]</font>**

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

## 编码设置

这里的变量/常量包括 变量、常量、方法、函数、构造器、类、标签等JavaScript相关的标识符。

**1. 常规变量<font face="黑体" color=red>[强制]</font>**

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

**2. 内部属性或方法<font face="黑体" color=red>[强制]</font>**

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

**3. 类和构造器<font face="黑体" color=red>[强制]</font>**

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

**4. 全局的常量<font face="黑体" color=red>[强制]</font>**

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

**5. 特殊意义的变量<font face="黑体" color=red>[强制]</font>**

在目前的前端生态系统中，存在一些类似以 $ 开头的标识符，具有特殊意义，当我们需要声明一个表示特殊意义的变量时，可以使用$开头，其他情况不建议使用$符号命名。

```js

import * as $ from 'jquery'

Vue.prototype.$nextPage = function() {
  // ...
}

```

## 组件粒度

**1. 样式文件的变量<font face="黑体" color=red>[强制]</font>**

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



## 静态分离