# 样式规范

样式规范大部分不适合标准化，也不适合强制执行，所以下面的内容，多以推荐或参考的等级列出。甚至很多规则不能称之为规则，而只是一种主观的经验之谈，
也希望通过这些推荐和引导，能够提高团队样式风格的统一性。这里的内容会经常变动，希望团队成员集思广益，补充更多的内容。
## 基本规范

1. <font color=#f5222d>【强制】</font>所有声明语句都应当以分号结尾
    > 最后一条声明语句后面的分号是可选的，但是，如果省略这个分号，你的代码可能更易出错

    ```css
    
    /* not good */
    .selector {
        font-size: 15px;
        color: red
    }
    
    /* good */
    .selector {
        font-size: 15px;
        color: red;
    }

    ```

2. <font color=#f5222d>【强制】</font>每条样式声明应该独占一行

    ```css
      /* not good */
      .selector {
        font-size: 15px; color: red;
      }

      /* good */
      .selector {
        font-size: 15px;
        color: red;
      }

    ```

3. <font color=#1890ff>【推荐】</font>避免为 0 值指定单位，例如，用 `margin: 0;` 代替 `margin: 0px;`

4. <font color=#1890ff>【推荐】</font>为选择器中的属性添加双引号，例如，`input[type="text"]`
    > [某些情况下是可选的](http://mathiasbynens.be/notes/unquoted-attribute-values#css)，但是，为了代码的一致性，建议都加上双引号

    ```css

    /* not good */
    .selector[type=text] {
        /* ... */
    }

    /* good */
    .selector[type="text"] {
        /* ... */
    }

    ```

5. <font color=#1890ff>【推荐】</font>十六进制值全部小写，如，`#f3f6fa`，可以简时，使用简写形式，用 `#fff` 代替 `#ffffff`

6. <font color=#52c41a>【参考】</font>适当使用`:before`和`:after`来画页面的一些视觉上的辅助性元素，如三角形、短的分隔线、短竖线等，可以减少页面上没有用的标签

7. <font color=#52c41a>【参考】</font>用 `border: 0;` 代替 `border: none;`

8. <font color=#52c41a>【参考】</font>对于属性值或颜色参数，省略小于 1 的小数前面的 0 （例如，`.5` 代替 `0.5`；`-.5px` 代替 `-0.5px`）

9.  <font color=#52c41a>【参考】</font>为选择器分组时，将单独的选择器单独放在一行

    ```css
    /* not good */
    .selector, .selector-secondary, .selector[type=text] {
      /* ... */
    }
    
    /* good */
    .selector,
    .selector-secondary,
    .selector[type="text"] {
      /* ... */ 
    }
    ```

10. <font color=#1890ff>【推荐】</font>尽量避免使用`!important`，除非原样式使用内联样式或`!important`且无法直接修改

11. <font color=#1890ff>【参考】</font>相关的属性声明按以下顺序做分组处理，组之间需要有一个空行，提高代码可读性

  - **Positioning**（影响其他元素和自身位置相关声明）

  - **Box model**（自身盒模型相关声明）

  - **Typographic**（文本相关声明）

  - **Visual**（自身样式）

  - **Misc**（其他声明）

    ```css

    .declaration-order {
      /* Positioning */
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 100;
    
      /* Box-model */
      display: block;
      float: right;
      width: 100px;
      height: 100px;
    
      /* Typography */
      font: normal 13px "Helvetica Neue", sans-serif;
      line-height: 1.5;
      color: #333;
      text-align: center;
    
      /* Visual */
      background-color: #f5f5f5;
      border: 1px solid #e5e5e5;
      border-radius: 3px;
    
      /* Misc */
      opacity: 1;
    }

    ```
## 模块化

12. <font color=#1890ff>【推荐】</font>公共样式文件应按业务模块划分，每个模块通过index.scss/index.less等统一导入

13. <font color=#1890ff>【推荐】</font>每个模块应有自己独立的命名空间（id/class选择器等），避免模块之间混淆

14. <font color=#1890ff>【推荐】</font>当两个子模块样式高度相似时，应考虑抽象为这两个模块的公共样式，减少演示冗余，提高复用率

15. <font color=#1890ff>【推荐】</font>无法修改原样式声明时，应通过权重关系，编写权重更高的样式进行覆盖

16. <font color=#1890ff>【推荐】</font>公共样式需要修改时，应谨慎评估其影响范围，尽量找到原样式声明进行修改

17. <font color=#f5222d>【强制】</font>公共样式影响范围超过修改目标范围时，不能修改原样式，应通过权重关系，重新抽象样式子模块

## 继承复用

18. <font color=#1890ff>【推荐】</font>开发新模块时，应仔细分析已有公共样式及其他页面的样式风格，合理使用公共class等选择器继承公共样式

19. <font color=#1890ff>【推荐】</font>当新模块与某一已存在的模块高度相似，或者时直接copy其样式文件修改时，应考虑为该两个或多个页面抽象出公共模块

20. <font color=#1890ff>【推荐】</font>为每个模块声明一个独立的class，作为命名空间，可以有效实现模块的组合、继承和重写

21. <font color=#1890ff>【推荐】</font>合理利用组件的嵌套关系，尽量将样式写在父组件，特别个性的样式写在子组件，可以最大限度实现复用

22. <font color=#1890ff>【推荐】</font>在提高样式复用率的同时权衡组件之间的耦合度，可以有效减少UI改造时的工作量
## 私有样式

23. <font color=#f5222d>【强制】</font>非通用样式使用嵌套方式进行编写，避免影响其他自己不了解样式，造成样式覆盖

24. <font color=#1890ff>【推荐】</font>Vue 中样式谨慎使用 scoped，会影响样式选择器性能，使用专有class进行特有样式编写

25. <font color=#f5222d>【强制】</font>需要对继承的部分样式进行重写时，应通过权重关系，编写权重更高的样式进行覆盖
    > [详细了解](https://www.w3cplus.com/css/css-specificity-things-you-should-know.html)权重计算方法

26. <font color=#f5222d>【强制】</font>尽量避免使用`!important`，除非原样式使用内联样式或`!important`且无法直接修改

27. <font color=#1890ff>【推荐】</font>当你不确定自己写的属性会否影响到其他属性时，应避免使用简写

    ```css

    /* error */
    .element {
      margin: 0 0 10px;
      background: red;
      background: url("image.jpg");
      border-radius: 3px 3px 0 0;
    }
    
    /* good */
    .element {
      margin-bottom: 10px;
      background-color: red;
      background-image: url("image.jpg");
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }

    ```
28. <font color=#1890ff>【推荐】</font>当你确定自己的声明不会影响到其他属性时，请使用简写提升代码简洁性

    ```css

    /* not good */
    .element {
      padding-top: 10px;
      padding-right: 20px;
      padding-bottom: 15px;
      padding-left: 20px;
    }
    
    /* good */
    .element {
      padding: 10px 20px 15px;
    }

    ```
## CSS动画

29. <font color=#1890ff>【推荐】</font>使用 CSS 动画替代 JS 动画

30. <font color=#1890ff>【推荐】</font> 不要使用all属性做动画

使用transition做动画的时候不要使用all所有属性，在有一些浏览器上面可能会有一些问题，如下：

  ```css

  transition: all 2s linear;

  ```

在Safari上面可能会有一些奇怪的抖动，正确的做法是要用哪个属性做动画就写哪个，如果有多个就用隔开，如下代码所示：

  ```css

  transition: transform 2s linear, opacity 2s linear;

  ```

31. <font color=#1890ff>【推荐】</font>位移动画使用 transform 替代 position （提升动画性能）

