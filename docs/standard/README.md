# 通用

### 1. 目录(文件夹)命名[强制]

 命名采用横线连接 (kebab-case)形式，全部使用小写字母          

```
// bad
Study-new  TRAIN  eXam

// good
study-new  train  exam
```

### 2. javascript文件命名[强制]

命名采用横线连接 (kebab-case)形式，全部使用小写字母

```
// bad
Full-Screen.js  Global.js  pushState.js

// good
full-screen.js  global.js  push-state.js
```

### 3. javascript变量和对象属性命名[强制]

命名采用camelCase(驼峰)形式，首字母小写

```
变量
// bad
var do-learn;
var DoLearn;

// good
var doLearn;

对象属性
// bad
var stutyModel = {
    Number: 1,
    lean-progrss: '60%',
    TITLE: ''
}

// good
var studyModel = {
    number: 1,
    leanProgress: '60%',
    title: ''
}
```

### 4. javascript函数命名[强制]

采用camelCase(驼峰)形式，首字母小写

```
// bad
function AddData()
function add-data()
function _add_data()

// good
function addData()
```

### 5. eslint-disable命令[建议]

代码中不能随意使用eslint-disable命令关闭代码检测

### 6. css样式文件命名[强制]

css样式文件命名和js文件一样采用kebab-case形式

```
// bad
Notice.css   searchBar.css  New-Cropper.css

// good
notice.css   search-bar.css new-cropper.css
```

### 7. css样式的class类命名[建议]

采用kebab-case形式

```
// bad
.TopicMain {
    & .reLi {
        color: red;
    }
    & .POS {
        color: blue;
    }
}

// good
.topic-main {
    & .re-li {
        color: red;
    }
    & .pos {
        color: blue;
    }
}
```

### 8. css命名空间[建议]

当开发一个新模块时，我们约定在模板的根元素上定义一个唯一的class，子元素的样式类都带有此class前缀，类似命名空间的作用，防止本模块的css样式影响其他模块(例如上面第七条的.topic-main)

### 9. 避免使用 !important 属性[建议]

css样式避免使用 !important 属性， 应采用传统的css样式权重规则



# Drizzlejs

### 1. 典型的drizzle模块结构[强制]

- index.js
- templates.sleet
- view-main.js
- view-search.js  

主文件必须为index.js, 视图文件命名要以view-开头

### 2. ES5语法[强制]

只能用ES5语法编写代码，不支持ES6语法

### 3. sleet模板绑定数据[建议]

sleet模板绑定数据时要简洁，不能耦合复杂的业务逻辑，如果业务比较复杂，要把相关的逻辑判断提取到view视图的dataForTemplate特性中

### 4. 视图view-xx.js代码行数[建议]

视图view-xx.js的代码尽量不要超过300行，如果超过300行，就要考虑拆分视图(view-xx1.js、view-xx2.js)

### 5. 资源释放[建议]

要善于使用模块和视图的生命周期方法exports.beforeClose，及时释放占用的资源

### 6. 链式调用this.chain()[建议]

当多个数据请求相互依赖时，建议使用框架的this.chain()链式调用方法

```
  使用方式
  findLecturerList: function() {
      var me = this;
      return this.chain(
          function() {
              return me.module.dispatch('findRencentRecord');
          },
          function() {
              return me.module.dispatch('findGenseeList');
          },
          function() {
              return me.module.dispatch('packRecentRecord');
          }
      );
   }
```

### 7. model.changed()[建议]

框架的this.models.xx.changed()函数会导致绑定此model的视图view重新渲染，不能随意调用

### 8. 框架的this.$$()[建议]

在视图view查找元素时，首先要用框架的this.$$()函数缩小查找范围，这个比全局查找速度更快

```
 // bad
 var sText = $('[name="beginTime"]').val();
 var eText = $('[name="endTime"]').val();
 
 // good
 var sText = $(this.$$('[name="beginTime"]')).val();
 var eText = $(this.$$('[name="endTime"]')).val();
```



### 9. 组件销毁[强制]

通过框架注册的第三方组件，要提供销毁方法，例如下面的dispose函数调用

```
D.ComponentManager.register('echart', function(view, el, options) {
    var myChart;
    if (!options.noRender && el) {
        myChart = echarts.init(el);
        myChart.setOption(options);
    }
    return myChart;
}, function(view, comp) {
    if (comp) {
        comp.dispose();
    }
});
```

### 10. lodash库的引用[强制]

引入lodash库要特别注意，不能直接require('lodash')整个库，否则打包时会引入无用的代码，导致js包变大

```
// bad
var _ = require('lodash');

// good
var _ = require('lodash/collection');
```

### 11. 服务器数据交互[建议]

与服务器数据交互都统一写在index.js的callbacks特性中

```
 callbacks: {
        init: function() {
            var addressList = this.models.addressList;
            addressList.clear();
            return this.get(addressList);
        },
        saveAddress: function(payload) {
            var addAddress = this.models.addAddress;
            addAddress.set(payload);
            return this.post(addAddress);
        },
        editSaveAddress: function(payload) {
            var editSaveAddress = this.models.editSaveAddress;
            editSaveAddress.set(payload);
            return this.put(editSaveAddress);
        }
  }
```

### 12. dataForTemplate[强制]

   这个特性是用来处理数据，然后给sleet模板使用的，避免sleet模板耦合复杂的逻辑。

   注意：不允许在dataForTemplate里调用index.js中的callbacks方法

### 13. selectize组件[建议]

 selectize组件的列表值建议都在strings/maps.js文件中声明，不要写死在各个业务模块中

### 14. URL(API)重复请求[建议]

开发功能时，要尽量避免同一个接口多次请求服务器。

当代码层面比较难避免时，可以给url加上cache(缓存)关键字

```
exports.store = {
    models: {
       studyRank: { 
          url: '../course-study/rank-study/cached',
          isCache: false,  
       }
    }
}
```



### 15. 弹窗数据请求先后顺序[建议]

当我们弹窗显示一个视图模块时，建议先调用弹窗接口渲染视图，然后再在视图模块里请求服务器端数据

```
 var mod = this.module.items['common/exam-records-btn'];
 this.app.viewport.modal(mod, { examId: genseeBusiness.businessId, otherModule: true });
```



### 16. 配置文件提交限制[强制]

scripts/config目录文件、gulpfile.js、eslintignore、index.sleet不能随意提交，必须告知前端负责人

### 17. 全局变量[强制]

全局变量统一写在this.app.global属性中

### 18. exports.events[建议]

exports.events = {};

exports.handlers = {};

这组特性配套使用，一般用来处理view内部的一些DOM事件逻辑

### 19. exports.actions[建议]

视图view-xx与服务器数据交互一般采用此种特性

```
view-xx.js:

// 绑定视图操作,触发与index.js定义的回调函数的关联
exports.actions = {
    // 绑定视图ID=toggle-*的元素,点击时触发index.js的store.callbacks.completeTodo方法
    // 但是如果dataForActions里定义了同名的方法，则先调用dataForActions里的方法处理数据
    'click toggle-*': 'completeTodo',
};
// 页面触发表单提交时，会将表单的数据放入到payload对象中，dataForAction可以在回调函数之前
// 先处理一下需要传递的数据，或者做一些数据校验
exports.dataForActions = { 
    completeTodo: function(data, e) {
        data.completed = e.target.checked;
        return data;
    },
};

index.js:
// 触发顺序actions > dataForActions > callbacks
exports.store = {
    callbacks: {
        completeTodo: function(payload) {
            var todos = this.models.todos;
            _.find(todos.data, { id: payload.id }).completed = payload.completed;
            this.get(todos);
        }
    }
};

```



# Vue

## 组件文件命名
###  1. 组件名为多个单词[建议]
这样做可以避免跟现有的以及未来的 HTML 元素相冲突，因为所有的 HTML 元素名称都是单个单词的。
```
Vue.component('todo-item', {
  // ...
})
```
### 2. 组件文件[建议]
只要有能够拼接文件的构建系统，就把每个组件单独分成文件，当你需要编辑一个组件或查阅一个组件的用法时，可以更快速的找到它。
```
// bad 
Vue.component('TodoList', {
  // ...
})

Vue.component('TodoItem', {
  // ...
})
//good 
components/
|- TodoList.vue
|- TodoItem.vue
```
### 3. 单文件组件文件的大小写[强制]
单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)。
单词大写开头对于代码编辑器的自动补全最为友好，因为这使得我们在 JS(X) 和模板中引用组件的方式尽可能的一致。然而，混用文件命名方式有的时候会导致大小写不敏感的文件系统的问题，这也是横线连接命名同样完全可取的原因。

```
// bad
components/
|- mycomponent.vue
components/
|- myComponent.vue
// good
components/
|- MyComponent.vue
components/
|- my-component.vue
```
### 4. 基础组件名[建议]
应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前缀开头，比如 Base、App 或 V
```
// bad
components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue
// good
//推荐使用
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue

components/
|- AppButton.vue
|- AppTable.vue
|- AppIcon.vue

components/
|- VButton.vue
|- VTable.vue
|- VIcon.vue
```
### 5. 单例组件名[建议]
只应该拥有单个活跃实例的组件应该以 The 前缀命名，以示其唯一性。
这不意味着组件只可用于一个单页面，而是每个页面只使用一次。这些组件永远不接受任何 prop，因为它们是为你的应用定制的，而不是它们在你的应用中的上下文。如果你发现有必要添加 prop，那就表明这实际上是一个可复用的组件，只是目前在每个页面里只使用一次。
```
// bad
components/
|- Heading.vue
|- MySidebar.vue
// good 
components/
|- TheHeading.vue
|- TheSidebar.vue
```
### 6. 紧密耦合的组件名[建议]
和父组件紧密耦合的子组件应该以父组件名作为前缀命名。
如果一个组件只在某个父组件的场景下有意义，这层关系应该体现在其名字上。因为编辑器通常会按字母顺序组织文件，所以这样做可以把相关联的文件排在一起。
```
//bad
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue

components/
|- SearchSidebar.vue
|- NavigationForSearchSidebar.vue

// good
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue

components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```
### 7. 组件名中的单词顺序[建议]
组件名应该以高级别的 (通常是一般化描述的) 单词开头，以描述性的修饰词结尾。
```
// bad
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue

// good
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue

```
## 模板中注意项
### 1. Prop 定义应该尽量详细[建议]
在你提交的代码中，prop 的定义应该尽量详细，至少需要指定其类型。
```
//bad 这样做只有开发原型系统时可以接受
props: ['status']
// good
props: {
  status: String
}
// 更好的做法
/ 更好的做法！
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}
```
### 2. prop 名大小写[建议]
在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 JSX 中应该始终使用 kebab-case。

我们单纯的遵循每个语言的约定。在 JavaScript 中更自然的是 camelCase。而在 HTML 中则是 kebab-case。
```
props: {
  greetingText: String
}
<WelcomeMessage greeting-text="hi"/>
```
### 3. 为v-for 设置键值[强制]
在组件上用 key 配合 v-for，以便维护内部组件及其子树的状态。
使用v-for更新已渲染的元素列表时,默认用就地复用策略;列表数据修改的时候,他会根据key值去判断某个值是否修改,如果修改,则重新渲染这一项,否则复用之前的元素
* 在更新 DOM 的时候，Vue 将会优化渲染把可能的 DOM 变动降到最低。
* 为每一个项目添加一个唯一的键值 (比如 :key="todo.id") 将会让 Vue 知道如何使行为更容易预测。
```
 <ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```
### 4. v-for 里面包v-for [强制]
* 相同ID有唯一ID的情况下用ID， 第二个for  key改成`a${index}`。
* 如果不确定id是否唯一也要确保第一个for key和第二个key不能重复，用唯一索引
```
 <div 
      v-for="(question,index) in questions"
      :key ="index">
      <div 
        v-for ="(item,inIndex) in question.list"
        :key ="`a${inIndex}`"
      />
    </div>
```

### 5. 避免 v-if 和 v-for 用在一起[强制]
一般我们在两种常见的情况下会倾向于这样做：

* 为了过滤一个列表中的项目 (比如 v-for="user in users" v-if="user.isActive")。在这种情形下，请将 users 替换为一个计算属性 (比如 activeUsers)，让其返回过滤后的列表。

* 为了避免渲染本应该被隐藏的列表 (比如 v-for="user in users" v-if="shouldShowUsers")。这种情形下，请将 v-if 移动至容器元素上 (比如 ul, ol)。
* 类似这种把v-if抽到上面，如果上面没有父标签可以用template包一层，避免没必要的dom，渲染了再隐藏消耗更多的性能。

```
// good
<ul v-if="shouldShowUsers">
  <li
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```
* 其他问题
  用在同元素上会出现下面的计算
```
list.map(function (item) {
  if (item.shareType !==4 || !isAsk) {
    return item
  }
})
```
​	因此哪怕我们只渲染出一小部分用户的元素，也得在每次重渲染的时候遍历整个列表，不论活跃用户是否发生了变化​	
```
改成
computed: {
  newList: function () {
    return list.filter(function (item) {
      return item.shareType !== 4 || !isAsk
    })
  }
}
```
过滤后的列表只会在 list数组发生相关变化时才被重新运算，过滤更高效。
•	使用 v-for="user in newList" 之后，我们在渲染的时候只遍历活跃用户，渲染更高效。
•	解藕渲染层的逻辑，可维护性 (对逻辑的更改和扩展) 更强。

### 5. 多个特性的元素应该分多行撰写，每个特性一行[建议]
```
// bad
<MyComponent foo="a" bar="b" baz="c"/>
// good
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```
### 6. 模板中简单的表达式[建议]
组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。
```
// bad
{{
  fullName.split(' ').map(function (word) {
    return word[0].toUpperCase() + word.slice(1)
  }).join(' ')
}}
// good
<!-- 在模板中 -->
{{ normalizedFullName }}
// 复杂表达式已经移入一个计算属性
computed: {
  normalizedFullName: function () {
    return this.fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
}
```
### 7. 非空 HTML 特性值应该始终带引号[建议]
```
// bad 
<input type=text>
<AppSidebar :style={width:sidebarWidth+'px'}>
// good
<input type="text">
<AppSidebar :style="{ width: sidebarWidth + 'px' }">
```
##  模板中样式
### 1. 组件样式设置作用域[建议]
对于应用来说，顶级 App 组件和布局组件中的样式可以是全局的，但是其它所有组件都应该是有作用域的。
设置作用域可以使用 scoped 特性，也可以通过 CSS Modules，那是一个基于 class 的类似 BEM 的策略
```
<template>
  <button class="button button-close">X</button>
</template>

<!-- 使用 `scoped` 特性 -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
<!-- 使用 CSS Modules -->
<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}
</style>
```
### 2. 元素选择器应该避免在 scoped 中出现[建议]
在 scoped 样式中，类选择器比元素选择器更好，因为大量使用元素选择器是很慢的。
``` 
// bad
<template>
  <button>X</button>
</template>

<style scoped>
button {
  background-color: red;
}
</style>
// good
<template>
  <button class="btn btn-close">X</button>
</template>

<style scoped>
.btn-close {
  background-color: red;
}
</style>
```
## 注释
* 用Document This 插件的注释规范。
* 公共组件使用说明 
* 各组件中重要函数或者类说明 
* 复杂的业务逻辑处理说明 
* 特殊情况的代码处理说明,对于代码中特殊用途的变量、存在临界值、函数中使用的 hack、使用 
* 多重 if 判断语句 
* 注释块必须以/（至少两个星号）开头/ 
* 单行注释使用//
# CSS

## 代码风格[建议]

###  缩进

> [强制] 使用 `4` 个空格做为一个缩进层级，不允许使用 `2` 个空格 或 `tab` 字符

### 空格

1. 选择器` 与 `{` 之间必须包含空格。

2. 属性名 与 后面的 ： 之间不允许包含空格，：与属性值之间必须包含空格

3. 列表型属性值书写在单行时， ，后必须跟一个空格

4. `>`、`+`、`~` 选择器的两边各保留一个空格。

5. ```
   .selector {
   }
   margin: 0;
   font-family: Arial, sans-serif;
   main > nav {
    padding: 10px;
   }

   label + input {
       margin-left: 5px;
   }

   input:checked ~ button {
       background-color: #69C;
   }
   ```


### 属性书写顺序

> 同一 rule set 下的属性在书写时，应按功能进行分组，并以 **Formatting Model（布局方式、位置） > Box Model（尺寸） > Typographic（文本相关） > Visual（视觉效果）** 的顺序书写，以提高代码的可读性。

解释：

* Formatting Model 相关属性包括：position / top / right / bottom / left /     float / display / overflow 等
  * Box Model 相关属性包括：border / margin / padding / width / height 等
  * Typographic 相关属性包括：font / line-height / text-align / word-wrap 等
  * Visual 相关属性包括：background / color / transition / list-style 等

另外，如果包含 content 属性，应放在最前面。

```
.sidebar {
    /* formatting model: positioning schemes / offsets / z-indexes / display / ...  */
    position: absolute;
    top: 50px;
    left: 0;
    overflow-x: hidden;

    /* box model: sizes / margins / paddings / borders / ...  */
    width: 200px;
    padding: 5px;
    border: 1px solid #ddd;

    /* typographic: font / aligns / text styles / ... */
    font-size: 14px;
    line-height: 20px;

    /* visual: colors / shadows / gradients / ... */
    background: #f5f5f5;
    color: #333;
    -webkit-transition: color 1s;
       -moz-transition: color 1s;
            transition: color 1s;
}
```

### 清除浮动[建议]

> 当元素需要撑起高度以包含内部的浮动元素时，通过对伪类设置 clear 或触发 BFC 的方式进行 clearfix。尽量不使用增加空标签的方式

触发 BFC 的方式很多，常见的有：

- float 非 none
- position 非 static
- overflow 非 visible

### !important

* 尽量不使用 `!important` 声明。

* 当需要强制指定样式且不允许任何场景覆盖时，通过标签内联和 `!important` 定义样式。



## 值与单位[建议]

### 文本

> 文本类型的内容必须用双引号包围

```
/* good */
html[lang|="zh"] q:before {
    font-family: "Microsoft YaHei", sans-serif;
    content: "“";
}
```

### 数值

> 当数值为 0 - 1 之间的小数时，省略整数部分的 0

```
/* good */
panel {
    opacity: .8
}
```

### `url()` 函数中的路径不加引号

```
body {
    background: url(bg.png);
}
```

### 长度为 `0` 时须省略单位。 (也只有长度单位可省)

```
/* good */
body {
    padding: 0 5px;
}
```

### 2D 位置

必须同时给出水平和垂直方向的位置。
> 2D 位置初始值为 0% 0%，但在只有一个方向的值时，另一个方向的值会被解析为 center。为避免理解上的困扰，应同时给出两个方向的值
```
  /* good */
  body {
      background-position: center top; /* 50% 0% */
  }

  /* bad */
  body {
      background-position: top; /* 50% 0% */
  }
```
# Javascript[强制]

## References

* 所有的赋值都用`const`, 对参数重新赋值，就用`let`

```
  // bad
  var a = 1;
  var b = 2;
  var c = 2;
  if (true) {
    c += 1;
  }

  // good
  const a = 1;
  const b = 2;

  // good, use the let.
  let c = 1;
  if (true) {
    c += 1;
  }
```


* `let`、`const`都是块级作用域
```
// const 和 let 都只存在于它定义的那个块级作用域
{
  let a = 1;
  const b = 1;
}
console.log(a); // ReferenceError
console.log(b); // ReferenceError
```

## Object

### 使用字面值创建对象

```javascript
  // bad
  const item = new Object();

  // good
  const item = {}
```

### 用对象方法简写

```
  // bad
  const atom = {
    value: 1,

    addValue: function (value) {
      return atom.value + value;
    },
  };

  // good
  const atom = {
    value: 1,

    // 对象的方法
    addValue(value) {
      return atom.value + value;
    },
  };
```

### 用属性值缩写

```
  const lukeSkywalker = 'Luke Skywalker';
  // bad
  const obj = {
    lukeSkywalker: lukeSkywalker,
  };

  // good
  const obj = {
    lukeSkywalker,
  };
```

###  将你的所有缩写放在对象声明的开始
  ```
  const anakinSkywalker = 'Anakin Skywalker';
  const lukeSkywalker = 'Luke Skywalker';

  // bad
  const obj = {
    episodeOne: 1,
    twoJediWalkIntoACantina: 2,
    lukeSkywalker,
    episodeThree: 3,
    mayTheFourth: 4,
    anakinSkywalker,
  };

  // good
  const obj = {
    lukeSkywalker,
    anakinSkywalker,
    episodeOne: 1,
    twoJediWalkIntoACantina: 2,
    episodeThree: 3,
    mayTheFourth: 4,
  };
  ```

### 只对那些无效的标示使用引号 `''`

  ```
// bad
const bad = {
  'foo': 3,
  'bar': 4,
  'data-blah': 5,
};

// good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
};
  ```

### 对象浅拷贝，使用扩展运算符[就是`...`运算符]

```
// very bad
const original = { a: 1, b: 2 };
const copy = Object.assign(original, { c: 3 }); // this mutates `original`
delete copy.a; // so does this

// bad
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

// good es6扩展运算符 ...
const original = { a: 1, b: 2 };
// 浅拷贝
const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

// rest 赋值运算符
const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
```

## Array

### 用字面量赋值

```
// bad
const items = new Array();

// good
const items = [];
```

### 用扩展运算符做数组浅拷贝

```
// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i += 1) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```

### 用 `...` 运算符而不是[`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from)来将一个可迭代的对象转换成数组

```
const foo = document.querySelectorAll('.foo');

// good
const nodes = Array.from(foo);

// best
const nodes = [...foo];
```

如果一个数组有很多行，在数组的 `[` 后和 `]` 前断行。 请看下面示例

```
// bad
const arr = [
  [0, 1], [2, 3], [4, 5],
];

const objectInArray = [{
  id: 1,
}, {
  id: 2,
}];

const numberInArray = [
  1, 2,
];

// good
const arr = [[0, 1], [2, 3], [4, 5]];

const objectInArray = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const numberInArray = [
  1,
  2,
];
```

## Functions

### 用默认参数语法而不是在函数里对参数重新赋值

```
// really bad
function handleThings(opts) {
  // 不， 我们不该改arguments
  // 第二： 如果 opts 的值为 false, 它会被赋值为 {}
  // 虽然你想这么写， 但是这个会带来一些细微的bug
  opts = opts || {};
  // ...
}

// still bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}
```

### 把默认参数赋值放在最后

```
// bad
function handleThings(opts = {}, name) {
  // ...
}

// good
function handleThings(name, opts = {}) {
  //
}
```

## Arrow Functions

### 箭头表达式

```
// bad
[1, 2, 3].map(function (x) {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```

## Classes & Constructors

### 常用`class`，避免直接操作`prototype`

```
// bad
function Queue(contents = []) {
  this.queue = [...contents];
}
Queue.prototype.pop = function () {
  const value = this.queue[0];
  this.queue.splice(0, 1);
  return value;
};


// good
class Queue {
  constructor(contents = []) {
    this.queue = [...contents];
  }
  pop() {
    const value = this.queue[0];
    this.queue.splice(0, 1);
    return value;
  }
}
```

###  用`extends`实现继承

```
// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function () {
  return this.queue[0];
}

// good
class PeekableQueue extends Queue {
  peek() {
    return this.queue[0];
  }
}
```

## Modules

### 不要用import通配符， 就是 `*` 这种方式

```
// bad
import * as AirbnbStyleGuide from './AirbnbStyleGuide';

// good
import AirbnbStyleGuide from './AirbnbStyleGuide';
```

### `import` 放在其他所有语句之前

```
// bad
import foo from 'foo';
foo.init();

import bar from 'bar';

// good
import foo from 'foo';
import bar from 'bar';

foo.init();
```

## Commas

### 额外结尾逗号

```
// bad
const hero = {
  firstName: 'Dana',
  lastName: 'Scully'
};

// good
const hero = {
  firstName: 'Dana',
  lastName: 'Scully',
};

```

# 打包构建

## PC端

### 1. 自动发版[强制]

前端自动构建发版依赖.gitlab-ci.yml、gulpfile.js、vue.config.js文件，这些文件开发者不能随意修改提交

### 2. js代码拆包[强制]

drizzlejs:

如果新开发一个独立大模块，比如考试模块，必须在scripts/app根目录下新建exam文件夹，相关代码都存放在          exam文件夹下。构建时会打包生成exam.js独立包

vue:

vue模块代码拆包的关键是在路由文件(router.js)中采用import异步加载特性

```
const homeRouter = () => {
    return [
        {
            path: 'home-v',
            name: 'home-v',
            component: () => import(/* webpackChunkName:"home"*/'modules/home/index.vue')
        }
    ];
};
```

## APP端


### 自动发版[强制] 


依赖文件 webpack.config.js、postcss.config.js、config.xml、.gitlab-ci.yml 这些文件开发者不能随意修改提交


### js代码拆分[强制]

通过路由文件(router.js)中采用require异步加载特性

```


{
    path: '/study/course/index',
    component: r => require.ensure([], () => r(require('./course/list.vue')), 'module-study'),
    name: 'course-list',
    meta: { title: '课程', keepAlive: true }
},

```




### 开发模式本地网页启动命令

```

$ mkdir www                                	# 在根目录创建cordova依赖目录（首次执行）
$ cordova platform add browser         		# 添加浏览器平台（首次执行）
$ cordova run browser -- --lr          		# 启动APP模式（首次启动比较久，大概需要半小时）
$ cordova run browser --wechat -- --lr 		# 启动微信模式（首次启动比较久，大概需要半小时）

```


### 微信打包

```

$ mkdir www                            		# 在根目录创建cordova依赖目录（首次执行）
$ cordova platform add browser         		# 添加浏览器平台（首次执行）
$ cordova build browser --wechat --release 	# 微信打生产包命令

```



### 原生APP打包

### Android

打包环境安装需要原生协助（何杰）


```

$ mkdir www                            # 在根目录创建cordova依赖目录（首次执行）
$ cordova platform add Android         # 添加Android平台（首次执行）
$ cordova build android -d         	   # Android打debug包命令
$ cordova build android -r        	   # Android打生产包命令

```


### IOS

打包环境安装需要原生协助（肖超）


```

$ mkdir www                         # 在根目录创建cordova依赖目录（首次执行）
$ cordova platform add ios          # 添加IOS平台（首次执行）
$ cordova run ios         	   		# IOS打debug包命令
$ cordova run ios --release       	# IOS打生产包命令

```


