# 前端开发通用规范

## 环境要求

1. <font color=#f5222d>【强制】</font>[Node.js](https://nodejs.org/) 8.9 或更高版本，可以使用 [nvm](https://github.com/creationix/nvm) 或 [nvm-windows ](https://github.com/coreybutler/nvm-windows)管理多个Node版本

2. <font color=#f5222d>【强制】</font>使用 [Visual Studio Code (VS Code)](http://www.baidu.com/link?url=Sn0aBa011utoLAP3IC799QxEcwe1-mmChrkEchQsAaOJJwwbN8ZMTyf8XF8uDId9) 进行代码编写

3. <font color=#f5222d>【强制】</font>启用 pre-commit 钩子，代码提交前检查并修复格式（不要格式引入的外部文件）

4. <font color=#f5222d>【强制】</font>约定 Tab 大小为 2 个空格，保证在所有环境下获得一致展现

5. <font color=#f5222d>【强制】</font>约定 字符编码为 utf-8，保证在所有环境下获得一致展现

6. <font color=#f5222d>【强制】</font>约定 换行符为 lf，git设置 config --global core.autocrlf=false，保证在所有环境一致

7. <font color=#f5222d>【强制】</font>安装插件 [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)（ Vue开发扩展及 Vue 文件代码格式化）

8. <font color=#f5222d>【强制】</font>安装插件 [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)（ CSS / Less / JS 等其他文件代码格式化；Vetur 的格式化基于此插件实现，可以在所有文件实现统一的格式化）

9. <font color=#1890ff>【推荐】</font>使用 Chrome 浏览器并安装 [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 进行调试

## ESLint推荐

为了个更好的理解，[ESLint](https://eslint.bootcss.com/docs/rules/) 对其进行了分门别类，所有的规则默认都是禁用的。通过在配置文件中使用 "extends": "eslint:recommended"，可以启用推荐的规则，截至当前，这些规则共55条，本规范默认启用这些推荐的规则。

## JS补充规范

10. <font color=#f5222d>【强制】</font>一个函数作用域中所有的变量声明尽量提到函数首部，可根据代码进行分组，多个变量时连续声明

  ```javascript

  // bad
  let registerForm = null,
      question = "",
      calculateResult = 0;

  // good
  let registerForm = null;
  let question = "";
  let calculateResult = 0;

   
   ```

11. <font color=#f5222d>【强制】</font>为了快速知晓变量类型，声明变量时要赋值

   ```javascript

   // not good
   let registerForm,
       question,
       calculateResult;
   
   // good
   let registerForm = null,
       question = "",
       calculateResult = 0;

   ```
  
12. <font color=#f5222d>【强制】</font>要求使用 === 和 !==,	[rules](https://eslint.bootcss.com/docs/rules/eqeqeq) eqeqeq

13. <font color=#1890ff>【推荐】</font>在必要的地方添加非空判断 ?. 以提高代码的稳健性

14. <font color=#1890ff>【推荐】</font>将复杂的函数分解成多个子函数，方便维护和复用

15. <font color=#f5222d>【强制】</font>使用单引号 `''` 定义静态字符串。 eslint: [`quotes`](https://eslint.org/docs/rules/quotes.html)统一使用单引号`''`，动态字符串使用反引号模板，单引号内使用双引号

16. <font color=#f5222d>【强制】</font>语句结束后需加分号";"

> 当 JavaScript 遇见一个没有分号的换行符时，它会使用一个叫做 [Automatic Semicolon Insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion) 的规则来确定是否应该以换行符视为语句的结束，并且如果认为如此，会在代码中断前插入一个分号到代码中。 但是，ASI 包含了一些奇怪的行为，如果 JavaScript 错误的解释了你的换行符，你的代码将会中断。 随着新特性成为 JavaScript 的一部分，这些规则将变得更加复杂。 明确地终止你的语句，并配置你的 linter 以捕获缺少的分号将有助于防止你遇到的问题。

```javascript

// bad - 可能异常
const luke = {}
const leia = {}
[luke, leia].forEach(jedi => jedi.father = 'vader')

// bad - 可能异常
const reaction = "No! That's impossible!"
(async function meanwhileOnTheFalcon() {
  // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
  // ...
}())

// bad - 返回 `undefined` 而不是下一行的值 - 当 `return` 单独一行的时候 ASI 总是会发生
function foo() {
  return
    'search your feelings, you know it to be foo'
}

// good
const luke = {};
const leia = {};
[luke, leia].forEach((jedi) => {
  jedi.father = 'vader';
});

// good
const reaction = "No! That's impossible!";
(async function meanwhileOnTheFalcon() {
  // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
  // ...
}());

// good
function foo() {
  return 'search your feelings, you know it to be foo';
}

```

17. <font color=#f5222d>【强制】</font>对象属性名不需要加引号

18. <font color=#f5222d>【强制】</font>不要用`for in`循环数组

19. <font color=#1890ff>【推荐】</font>数组、对象最后保留逗号

  ```javascript

  // bad
  let a = {
    b: 1,
    c: 2
  };

  // good
  let a = {
    'b': 1
  };
  
  let a = { b: 1 };
  
  let a = {
    b: 1,
    c: 2,
  };

  ```

20.  <font color=#1890ff>【推荐】</font>null 的适用场景
- 初始化一个将来可能被赋值为对象的变量
- 与已经初始化的变量做比较
- 作为一个参数为对象的函数的调用传参
- 作为一个返回对象的函数的返回值

21. <font color=#f5222d>【强制】</font>null 的禁用场景
- 不要用null来判断函数调用时有无传参
- 不要与未初始化的变量做比较

22. <font color=#f5222d>【强制】</font>undefined 的禁用场景
- 不要给变量赋值 undefined（undefined 本身就表示一个变量未定义）
- 不要直接使用 undefined 进行变量判断（如需比较，使用 typeof）

23. <font color=#1890ff>【推荐】</font>所有常量、函数、类的注释规范

```javascript

/**
 * @func
 * @desc 一个带参数的函数
 * @param {string} a - 参数a
 * @param {number} b=1 - 参数b默认值为1
 * @param {string} c=1 - 参数c有两种支持的取值</br>1—表示x</br>2—表示xx
 * @param {object} d - 参数d为一个对象
 * @param {string} d.e - 参数d的e属性
 * @param {string} d.f - 参数d的f属性
 * @param {object[]} g - 参数g为一个对象数组
 * @param {string} g.h - 参数g数组中一项的h属性
 * @param {string} g.i - 参数g数组中一项的i属性
 * @param {string} [j] - 参数j是一个可选参数
 */
function foo(a, b, c, d, g, j) {
  // ...
}

```

24. <font color=#f5222d>【强制】</font>在对象声明的时候将简写的属性进行分组。

> 为什么? 这样更容易的判断哪些属性使用的简写。

```javascript

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

25. <font color=#1890ff>【推荐】</font>将一个类数组对象转换成一个数组， 使用展开方法 `...` 代替 [`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from)。

  ```javascript

  const foo = document.querySelectorAll('.foo');

  // good
  const nodes = Array.from(foo);

  // best
  const nodes = [...foo];

  ```

26. <font color=#1890ff>【推荐】</font>对于对迭代器的映射，使用 [Array.from]替代展开方法 `...` ， 因为它避免了创建中间数组。

  ```javascript

  // bad
  const baz = [...foo].map(bar);

  // good
  const baz = Array.from(foo, bar);

  ```

27. <font color=#f5222d>【强制】</font>如果数组有多行，则在开始的时候换行，然后在结束的时候换行。

  ```javascript

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

  ```
28. <font color=#f5222d>【强制】</font> 使行超过100个字符的字符串不应使用字符串连接跨多行写入。

  > 为什么? 断开的字符串更加难以工作，并且使代码搜索更加困难。

  ```javascript
  // bad
  const errorMessage = 'This is a super long error that was thrown because \
  of Batman. When you stop to think about how Batman had anything to do \
  with this, you would get nowhere \
  fast.';

  // bad
  const errorMessage = 'This is a super long error that was thrown because ' +
    'of Batman. When you stop to think about how Batman had anything to do ' +
    'with this, you would get nowhere fast.';

  // good
  const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';

  ```

29. <font color=#1890ff>【推荐】</font>不要使用 `arguments`, 选择使用 rest 语法 `...` 代替。 eslint: [`prefer-rest-params`](https://eslint.org/docs/rules/prefer-rest-params)

  > 为什么? `...` 明确了你想要拉取什么参数。 更甚, rest 参数是一个真正的数组，而不仅仅是类数组的 `arguments` 。

  ```javascript

  // bad
  function concatenateAll() {
    const args = Array.prototype.slice.call(arguments);
    return args.join('');
  }

  // good
  function concatenateAll(...args) {
    return args.join('');
  }

  ```

30. <font color=#f5222d>【强制】</font>使用默认的参数语法，而不是改变函数参数。

  ```javascript

  // really bad
  function handleThings(opts) {
    opts = opts || {};
    // ...
  }

  // still bad
  function handleThings(opts) {
    if (opts === void 0) {
      opts = {};
    }
  }

  // good
  function handleThings(opts = {}) {
    // ...
  }

  ```

31. <font color=#f5222d>【强制】</font>避免使用默认参数的副作用。

  > 为什么? 他们很容易混淆。

  ```javascript

  var b = 1;
  // bad
  function count(a = b++) {
    console.log(a);
  }
  count();  // 1
  count();  // 2
  count(3); // 3
  count();  // 3

  ```

32. <font color=#52c41a>【参考】</font>总是把默认参数放在最后。

  ```javascript

  function handleThings(opts = {}, name) {
    // ...
  }

  // good
  function handleThings(name, opts = {}) {
    // ...
  }

  ```
33. <font color=#52c41a>【参考】</font>在类的方法中返回了 `this` 来供其内部方法调用。

  ```javascript
  
  // common
  Jedi.prototype.jump = function () {
    this.jumping = true;
    return true;
  };

  Jedi.prototype.setHeight = function (height) {
    this.height = height;
  };

  const luke = new Jedi();
  luke.jump(); // => true
  luke.setHeight(20); // => undefined

  // good
  class Jedi {
    jump() {
      this.jumping = true;
      return this;
    }

    setHeight(height) {
      this.height = height;
      return this;
    }
  }

  const luke = new Jedi();

  luke.jump().setHeight(20);

  ```

34. <font color=#1890ff>【推荐】</font>不要直接从导入导出。

  > 为什么? 虽然写在一行很简洁，但是有一个明确的导入和一个明确的导出能够保证一致性。

  ```javascript

  // bad
  // filename es6.js
  export { es6 as default } from './AirbnbStyleGuide';

  // good
  // filename es6.js
  import { es6 } from './AirbnbStyleGuide';
  export default es6;

  ```

35. <font color=#1890ff>【推荐】</font>只从一个路径导入所有需要的东西。eslint: [`no-duplicate-imports`](https://eslint.org/docs/rules/no-duplicate-imports)
  > 为什么? 从同一个路径导入多个行，使代码更难以维护。

  ```javascript

  // bad
  import foo from 'foo';
  // … 其他导入 … //
  import { named1, named2 } from 'foo';

  // good
  import foo, { named1, named2 } from 'foo';

  // good
  import foo, {
    named1,
    named2,
  } from 'foo';

  ```
36. <font color=#f5222d>【强制】</font>如果语句 (`if`, `while` 等) 太长或者超过了一行最大长度的限制，则可以将每个条件（或组）放入一个新的行。 逻辑运算符应该在行的开始。

  > 为什么? 要求操作符在行的开始保持对齐并遵循类似方法衔接的模式。 这提高了可读性，并且使更复杂的逻辑更容易直观的被理解。

  ```javascript

  // bad
  if ((foo === 123 || bar === 'abc') && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
    thing1();
  }

  // bad
  if (foo === 123 &&
    bar === 'abc') {
    thing1();
  }

  // bad
  if (foo === 123
    && bar === 'abc') {
    thing1();
  }

  // bad
  if (
    foo === 123 &&
    bar === 'abc'
  ) {
    thing1();
  }

  // good
  if (
    foo === 123
    && bar === 'abc'
  ) {
    thing1();
  }

  // good
  if (
    (foo === 123 || bar === 'abc')
    && doesItLookGoodWhenItBecomesThatLong()
    && isThisReallyHappening()
  ) {
    thing1();
  }

  // good
  if (foo === 123 && bar === 'abc') {
    thing1();
  }

  ```

37. <font color=#1890ff>【推荐】</font>字符类型转换： eslint: [`no-new-wrappers`](https://eslint.org/docs/rules/no-new-wrappers)

  ```javascript
  
  // => this.reviewScore = 9;

  // bad
  const totalScore = new String(this.reviewScore); // typeof totalScore is "object" not "string"

  // bad
  const totalScore = this.reviewScore + ''; // invokes this.reviewScore.valueOf()

  // bad
  const totalScore = this.reviewScore.toString(); // isn’t guaranteed to return a string

  // good
  const totalScore = String(this.reviewScore);

  ```

38. <font color=#1890ff>【推荐】</font>数字类型转换：使用 `Number` 进行类型铸造和 `parseInt` 总是通过一个基数来解析一个字符串。 eslint: [`radix`](https://eslint.org/docs/rules/radix) [`no-new-wrappers`](https://eslint.org/docs/rules/no-new-wrappers)

  ```javascript

  const inputValue = '4';

  // bad
  const val = new Number(inputValue);

  // bad
  const val = +inputValue;

  // bad
  const val = inputValue >> 0;

  // bad
  const val = parseInt(inputValue);

  // good
  const val = Number(inputValue);

  // good
  const val = parseInt(inputValue, 10);

  ```
39. <font color=#1890ff>【推荐】</font>布尔类型转换 eslint: [`no-new-wrappers`](https://eslint.org/docs/rules/no-new-wrappers)

  ```javascript

  const age = 0;

  // bad
  const hasAge = new Boolean(age);

  // good
  const hasAge = Boolean(age);

  // best
  const hasAge = !!age;

  ```

## 语义API

当我们设计和使用一些API的时候，语义化常常是最容易忽略的地方。例如Array.filter，其设计职能具有非常强的针对性，就是一个过滤器，
但是我们无法限制部分人把它当成forEach使用，这会造成语义和逻辑的极大差异，影响阅读和增加缺陷风险。  


根据开发经验，滥用最严重的属map，经常被当做forEach使用。在map的回调中修改原数组，本来是一个糟糕的副作用，如果利用这种副作用
去开发功能，会给以后的优化和维护增加很大成本。但这种问题更多是靠自觉性和代码review。

40. <font color=#1890ff>【推荐】</font>按语义使用原生API

```js

const personList = [
  {
    name: 'allen', 
    age: 18
  },
  { 
    name: 'jason',
    age: 22
  }
];

// personList.filter(item => item.info = `${item.name}-${item.age}`)
const ageList =  personList.map(item => {
  item.info = `${item.name}-${item.age}`;
  return item.age;
});

```

## 代码质量

41. <font color=#1890ff>【推荐】</font>完成开发后，需要化适当时间进行代码 review 和优化

  像下面这类型的代码虽然不影响使用，但不够清晰简洁

  ```vue
    <script>
      // bad
      export default {
        data() {
          return {
            state: true,
          },
        },
        methods: {
          editState(val) {
            if (val) {
              this.state = false;
              this.getLog();
            } else {
              this.state = !this.state;
              this.getLog();
            }
          },
        },
      };
    </script>

  ```
42. <font color=#1890ff>【推荐】</font>冗余、废弃以及测试的代码，应及时删除

  当无用的这种代码占据一顶比重时，会极大影响人的思路。有种明修栈道，暗度陈仓的迷惑。另一方面，这种代码也使得我们的包变大，占据空间。