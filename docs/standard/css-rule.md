# CSS规范

## 继承复用

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

## 私有样式

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

## 模块化

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

## 基本规范

- 核心：组件模块化 + 面向对象。
- 优点：
	- 重用性强
	- 维护性强
	- 拓展性强
- 缺点：
	- 上手成本~
## 1 M（模块化）
Moo-CSS中的M(Module)，模块化。Moo-CSS的模块化主要体现在**样式属性**的模块化以及**样式层级**的模块化。

### 1.1 样式属性分类
根据样式属性的特征，Moo-CSS将样式属性分类样式划分为以下模块，并根据模块特征给定命名前缀（[命名规则-标志前缀](http://blog.michealwayne.cn/Moo-CSS/docs/nameRule/#基本规则)）：
- **grid**：**布局样式**。布局、位置相关样式。如margin, position, line-height等；
- **function**：**功能样式**。文字居中、溢出隐藏等功能性样式。如clear, text-align, overflow, font-style, font-weight, font-family, vertical-align, white-space, text-decoration, text-indent等；
- **unit**：**单元样式**。宽高、padding等影响块或元素的常用单元样式。如width, height, padding, display, border, flex等；
- **status**：**状态样式**。透明度、是否隐藏、层级等显示状态样式（是唯一可设置!important的部分）。如visibility, opacity, z-index, transform等；
- **skin**：**皮肤样式**。主题颜色背景色等。如color, background-color, box-shadow等；
- **animation**：**动画样式**。过渡和动画。如animtaion, transition。

### 1.2 样式分层
根据样式属性的特征，将项目样式分层为以下模块层级：
- **Base**：基础层。样式最底层，包含样式重置reset、提供样式变量及方法、供给极常出现的样式库。（通常所有页面共用且不做修改操作）。
- **Component**：组件层。包含样式组件和方法组件，简单组件样式。如按钮、蒙层；方法组件包括动画方法和mixins方法。可依赖于Base层和Skin层。
- **Skin**：皮肤层。设置颜色、背景色、屏幕媒体查询设置等皮肤，且提供项目独有颜色变量。常供应于Component层和Module层；
- **Module**：模块层。根据业务划分的模块，常作为Component的容器。依赖于上面几个模块以及Layout层；
- **Layout**: 结构层。提供Module层和其中的Component布局样式，构成最终页面。

其中，Base、Component、Skin、Layout中样式作用域为全局，Module层样式保持私有性。各层级保持独立性，满足SRP(单一功能原则)。

详细介绍可见[文档-样式分层](http://blog.michealwayne.cn/Moo-CSS/docs/moocss/#样式分层)




### 1.3 Base层样式权重计算
权重计算参考公式：
```
1 / （样式资源量 / 样式属性耦合度 * 0.4 + 0.3 / 样式使用率 ^ 2 + 选择器权重 * 0.3）
```

数值越大权重越高，高权重可归入Base层。

其中，样式资源量可由样式代码量和引入资源大小进行衡量；样式属性耦合度是指在多样式属性的样式中，属性直接的耦合度，如溢出显示'...'这样的耦合度就非常高；样式使用率主要考虑多页面（包括路由页面）的样式使用率；选择器权重计算值越小越好。**权重公式仅做参考，简单来说就是提取高频使用且不占用大量资源的原子样式/方法。**


## 2 OO（面向对象）
面向对象主要体现在Component和Module层，CSS对象由以下4部分内容组成：
- HTML，可以是DOM的一个或多个节点；
- CSS声明，关于这些DOM节点样式的CSS声明，其中部分CSS声明满足私立性；
- 资源组件，如背景图片，sprites等用于展示资源的；
- 事件，与对象关联的javascript行为、侦听器或方法。

### 2.1 两个原则
#### 2.1.1 分离结构和皮肤
分离结构和皮肤意味着要将重复的样式特征（如背景和边框等样式）定义为单独的“皮肤”，通过和其他各种CSS“对象”的混合及匹配，使得在没有太多代码的情况下实现大量的视觉变化。

比如说一个渐变按钮，那么 .btn 的 class 是不会包含渐变相关的属性的，而是需要单独抽取出一个渐变的 class，然后让 .btn 去扩展从而得到一个渐变的按钮。

#### 2.1.2 区分容器和内容
区分容器和内容意味着将很少使用位置相关的样式，一个CSS“对象”应该不管放到哪里看起来都一样。所以不要用`.myObject h2{ ... }`来设置特定的`<h2>`样式，而是应该创建并应用一个描述与`<h2>`相关的class，如`<h2 class="category">`。

总得来说，就是满足SRP（单一职责）、OCP（开放封闭）

### 2.2 OO特征

#### 2.2.1 封装
Moo-CSS的封装特性一方面体现在Module/Component中对象内容的封装，保持对象之间的独立性；
另一方面，各样式属性/方法的封装以及各样式层级的封装均体现了其封闭性。

#### 2.2.2 继承
页面Module层/Component层可由其他Component层进行样式继承和拓展，各模块符合开闭原则(The Open/Closed Principle)

#### 2.2.3 多态
Moo-CSS所说的多态一方面是指对应平台的多态样式/方法。比如[moo-css-base](https://www.npmjs.com/package/moo-css-base)移动端和PC端的Component层分别提供了rem换算方法`torem`，调用方式相同而移动端进行了1:75的单位换算，而PC端进行了1:54的单位换算。



## 3 命名
选择器命名由小写字母，`_`、`-`符号组成，并通过标志前缀来确定样式命名空间。

className或attribute的写法为：
```
prefix-className/attribute_字母值
``` 
或
``` 
prefix-className/attribute数字值
```

### 基本规则
- 类名或属性名由小写字母、数字、`_`、`-`符号组成，不包含大写字母；
- 连字符分隔单词(`-`)，以代替驼峰式命名。如：head-menu；
- 单下划线分隔属性和英文值(`_`)。如：color_red；
- 双下划线分隔模块和元素(`__`)。如：nav__item。



其中标志前缀prefix由样式模块确认：
- `g-`：grid
- `f-`: function
- `u-`: unit、Component unit
- `z-`: status
- `s-`: skin
- `a-`: animation
- `m-`: Module


特殊样式模块前缀：
- `j-`: JavaScript DOM
- `v*-`: VueJS专用，如VueJS专用动画`.va-fadein`
- `r*-`: ReactJS专用，如ReactJS专用宽度`.ru-w100`
- `a*-`: Angular专用，如Angular专用皮肤`.as-cr_red`


属性简写规则，通常由属性单词首字母组成，部分较长的样式属性单词或避免重复可取首字母和中间字母。如`margin-top` -> `mt`，`background-color` -> `bgc`；属性值单位值为px时，省略px；为rem/vw时，数值转为px并省略rem/vw；为`%`时，则`%`换为`per`，
如`padding-left: 30px` -> `pl30`，`width: 1rem` -> `w75`，`margin-top: 2vw` -> `mt15`，`left: 50%` -> `l50per`。更多属性简写可参考[样式属性命名>>](http://blog.michealwayne.cn/Moo-CSS/docs/nameDictionary/#样式属性命名)

属性值为非模块时，名字为标识，如`icon`、`ovhidden`。

结合标志，如下
```
.u-w30per
.g-mt30
.f-blod
.s-bgc_red
[s-cr_red]
```

类名为module时，按照如下命名规则


### 3.1 Module命名规则
Module结合Base层、Component层、Skin层、Layout层完成整个样式。其命名通常与项目业务耦合，部分命名可参考[Module命名词典>>](http://blog.michealwayne.cn/Moo-CSS/docs/nameDictionary/#module命名词典)

#### 方式1：BEM的BE
```
(标志前缀)-类块__类元素
```
其中标识前缀可省略

Module分为块（Block）及元素（Element），

Block，即OO中的容器，是用来标识一个具体块的关键字其实就是这个块的名字，如：头->head, 内容->content, 导航->nav, 尾->foot。一个块必须有一个唯一的名字（类），这样才能保证块的独立性。
块由gird来控制其布局。

Element，**依赖于块的元素**。是用来标识一个元素的关键字也是这个元素的名字。如导航栏链接或菜单的每一项->item
我们在长名称中使用连字符分隔单词（例如，block-name），使用两个下划线来分隔块名和元素名（block-name__element-name）。
块名称为其元素和专属修饰符定义命名空间。



如
``` html
<nav class="m-nav">
    <a class="m-nav__item">nav 1</a>
    <a class="m-nav__item">nav 2</a>
</nav>
```

#### 结合其它层完成整个样式

如
``` html
<section class="g-pr">
    <nav class="m-nav f-tc g-pa g-t50l100" u-size="big" s-bgc_yellow>
        <a class="m-nav__item">nav 1</a>
        <a class="m-nav__item nav_type_selected">nav 2</a>
    </nav>
</section>
```

``` css
/* layout */
.g-pr { position: relative; }
.g-pa { position: absolute; }

/* function */
.f-tc { text-align: center; }

/* unit */
[u-size="big"] { width: 500px; font-size: 30px }
[u-size="small"] { width: 50px; font-size: 10px }

/* skin */
[s-bgc_yellow] { background-color: yellow }

/* module */
.m-nav { /*...*/ }
.m-nav__item { /*...*/ }
```

#### 方式2：css modules/CSS in JS

> 如果使用了CSS in JS或者css modules来指定Module的话，则可避免模块元素及修饰符的依赖式写法。（避免BE写法）

VueJS(vue-cli)可直接在style标签中设置module属性完成css module的设置（可见[文档](https://vue-loader.vuejs.org/zh/guide/css-modules.html#%E7%94%A8%E6%B3%95)）
ReactJS需要设置webpack配置文件中cssOptions参数的modules为true。

如：
``` vue
<template>
    <section :class="$style.foot">
        <p>
            <img :class="$style.img" src="@/images/i-logo_b.png">
        </p>
        <p>@All right reserved | Design by <a href="https://github.com/MichealWayne/">Micheal Wayne</a></p>
    </section>
</template>

<style lang="less" module>
    .foot {
        line-height: 10vw;
        word-break: keep-all;
        white-space: nowrap;
		
		.img {
			width: 10px;
			height: 10px;
		}
    }
</style>

```

#### 结合其它层完成整个样式
``` vue
<template>
    <section :class="[$style.foot, 'f-tc']">
        <p class="u-pt80">
            <img :class="[$style.img, 'g-mb20']" src="@/images/i-logo_b.png">
        </p>
        <p class="g-fs22 u-pb100" s-cr_sub>@All right reserved | Design by <a class="f-unl" s-cr_blue href="https://github.com/MichealWayne/">Micheal Wayne</a></p>
    </section>
</template>

<style lang="less" module>
    .foot {
        line-height: 10vw;
        word-break: keep-all;
        white-space: nowrap;
		
		.img {
			width: 10px;
			height: 10px;
		}
    }
</style>

```

#### react 例子
``` jsx
import React, {Component} from 'react';
import style from './index.scss'
import classnames from 'classnames'

export default class Footer extends Component {
    render () {
        return (
            <footer className={classnames(style.foot, 'f-tc g-fs12 f-b_1px bt_1px g-mt60')} s-theme__foot="1">
				<p class="u-pt80">
					<img className={classnames(style.img, 'g-mb20')} src={require('@/images/i-logo_b.png')}>
				</p>
                MIT Licensed | Copyright © 2019-present MichealWayne
            </footer>
        )
    }
}
```

``` scss
// index.scss
.foot {
    padding: 40px;
	
	.img {
	    width: 10px;
		height: 10px;
	}
}
```