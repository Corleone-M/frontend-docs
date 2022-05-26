
## Hello World ##
- 下载drizzlejs [githib链接](https://github.com/jacokoo/drizzlejs)
- 新建一个 html 文件，引入 dist/drizzle.js
- 调用 Drizzle.Application 实例化一个 drizzle
提供容器（挂载点）container 和 getResource方法
- 调用实例的 start 方法
- 浏览器打开html，一个hello world就完成了

```html
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>Hello DrizzleJs</title>
        </head>
        <body>
            <div id="content"></div>
            <script src="../dist/drizzle.js"></script>
            <script>
                var app = new Drizzle.Application({
                    // 挂载节点
                    container: document.getElementById('content'),
                    // 定义资源入口
                    getResource (path) {
                        return function () {
                            return 'hello world'
                        }
                    }
                })
                // 启动
                app.start()
            </script>
        </body>
    </html>
```

## 使用 handlebars ##
在刚才的html中引入handlebars.js，就可以使用 handlebars的模板语法，此处只做简单的样例
Handlebars的语法使用，参见 Handlebars 中文网
[Handlebars 中文网](https://www.handlebarsjs.cn/guide/)

````html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Hello DrizzleJs</title>
    </head>
    <body>
        <div id="content"></div>
        <script src="../dist/drizzle.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>
        <script>
            var D = window.Drizzle;
            var template = Handlebars.compile;
            const app = new D.Application({
                container: document.getElementById('content'),
                getResource (path) {
                    return template('<div>hello world</div>')
                }
            });
            window.app = app
            app.start()

        </script>
    </body>
</html>
````

## sleet 模版
#### sleet简介
- Sleetjs 是一种把代码编译成 HTML/XML 的模板语言。
- Sleet 是严格基于缩进的模板语言，缩进相等的相邻标记为兄弟标记，缩进大的的标记是缩进小的标记的子孙标记。
- 一个缩进可以是任意多个空格或者一个tab符, 唯一的规则是, 你的所有缩进都要跟你第一个缩进一致。
- Sleet文件后缀名为.sleet, 默认编译成html后缀的文件。
安装：
> npm install -g sleet
[具体详情参考](https://github.com/JacoKoo/sleetjs/blob/master/README.cn.md)

#### sleet 基本语法
- 换行+缩进表示子节点
- 同行 > 标记后面为直接子节点
- 兼容 Handlebars 的所有功能用法，部分语法有差异
- 变量的输出 使用 echo 标记，echo 前面一般需要有 > 标记
- 如果节点的直接子节点是文本节点，可以使用空格分隔后直接输出，也可以使用 > echo('xxx')
- 模版中的if判断只支持 Boolean 不支持表达式，需要在view中将表达式提前转换为 Boolean 值
- if 判断之后的节点，视为子节点， 需要换行缩进或者加 >
- else 可以配合同级的 if 或者 each 使用，和 each 中数据变量为0时，进入 else 分支
- 支持 unless 语法，判断和 if 相反
- 标签后面的 . 表示class，# 表示 id，带class或id的节点，省略标签名，默认为div
- 标签属性写在 () 内，支持字符串拼接，属性之间用空格隔开
- 条件属性使用 &if 或者 &unless 连接：(checked='true')&if(completed)
- each 子节点中的变量默认是当前迭代的 item 的属性， 如果需要读取 item 之外的变量，需要使用 ../，如：
  each(lists) > input(type=../type value=value)
- 支持 Handlebars 的 helper，如：compare(accuseMemberSize 'gt' 6)

#### sleet-handlebars
Sleet-Handlebars 是 Sleet 的一个扩展，用于把 Sleet 代码编译成 Handlebars 模板
安装：
> npm install –g  sleet-handlebars

- sleet 中需要声明：#!handlebars
- 如下有 b-temp.sleet
- 打开命令行执行sleet b-temp.sleet
- sleet文件最后被编译成 b-temp.hbs 并存放在同一个路径下
见如下示例：  

b-temp.sleet
````sh
#!handlebars

module
    div.todoapp
        div(data-region='header')
        div(data-region='main')
        div(data-region='footer')

view('header')
    h1 todos

view('main')
    ul.todo-list > each(todos)
        li(class='completed')&if(completed)
            input.toggle(type='checkbox' id='toggle-' + id data-name='id' data-value=id)(checked='true')&if(completed)
            label(id='edit-' + id) > echo(text)
            button.destroy(id='destroy-' + id)(data-name='id' data-value=id)

view('footer')
    button#remove.clear-completed(class='hidden')&unless(info.haveCompleted) Clear completed
````
b-temp.hbs
````html
{{#module}}
    <div class="todoapp">
        <div data-region="header"></div>
        <div data-region="main"></div>
        <div data-region="footer"></div>
    </div>
{{/module}}
{{#view "header"}}
    <h1>todos</h1>
{{/view}}
{{#view "main"}}
    <ul class="todo-list">{{#each todos}}
        <li {{#if completed}} class="completed"{{/if}}>
            <input class="toggle" {{#if completed}} checked{{/if}} type="checkbox" id="toggle-{{id}}" data-name="id" data-value="{{id}}"/>
            <label id="edit-{{id}}">{{text}}</label>
            <button class="destroy" id="destroy-{{id}}" data-name="id" data-value="{{id}}"></button>
        </li>
    {{/each}}</ul>
{{/view}}
{{#view "footer"}}
    <button id="remove" class="clear-completed" {{#unless info.haveCompleted}} class="hidden"{{/unless}}>Clear completed</button>
{{/view}}
````
## Demo应用 ##

一个使用gulp打包和启动完整的Demo，详见github，[githib链接](https://github.com/jacokoo/drizzlejs)
