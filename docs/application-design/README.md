
## 通信设计 ##
### Module 之间的通信
严格来说，Drizzle并没有对模块之间的通信做认真设计，下面列举的几种方式，虽然都能实现模块之间的交互，但更像是业务层面的硬编码方式

**1. 通过renderOptions**

这种方式目前是最通用的，主要用于父传子，renderOptions 的主要来源有3种：
- 通过路由配置
    下面例子中，{ id: '0814' } 便是 'study/subject/link-pc'模块的 renderOptions
    ````js

    exports.showLinkDetail = function(id) {
        return this.app.show('content', 'study/subject/link-pc', { id: '0814' });
    };

    ````
    通过a标签、window.open()、location.href、app.navigate等会改变路由的方式打开页面时，属于这种通信方式
- 弹窗方式弹出子模块
    下面例子中，{ examId: 123 }  便是 'common/exam-records-btn' 模块的 renderOptions
    ````js

    this.app.viewport.modal(this.module.items['common/exam-records-btn'], { examId: 123 });

    ````
    通过modal、popup、ground 弹出子模块时，属于这种方式
- 自定义的声明式渲染
    下面例子中，getEntity 方法返回的 { examId: 123 } 传递给 dataForEntityModule 再传递给 'picker/' + key 模块，
    { examId: 123 } 便是'picker/' + key 模块的 renderOptions

    ````js
        exports.type = 'dynamic';

        exports.getEntityModuleName = function(key) {
            if (key) return 'picker/' + key;
            return '';
        };

        exports.getEntity = function() {
            return { examId: 123 };
        };

        exports.dataForEntityModule = function(entity) {
            return entity;  
        };

    ````
    这种方式是自定义的，上面并不是固定写法，最终还是调用 region.show 方法传递renderOptions，
    目前项目应用中dynamic-view、form-view、normal-grid等属于这种自定义方式

**2. 直接调用子模块方法** 

目前应用中，大部分父模块获取子模块数据的方式，都是通过在子模块定义一个类似 getData 方法，供父模块调用
下面例子，便是通过直接找到子模块的view，然后调用其 getData方法获取数据的例子:
````js

    getData: function(validator) {
        var view = this.items.main.getEntities()[0];
        var data = {};
        if (!validator && view.isValidator && !view.isValidator()) return false;

        if (view.getData) {
            D.assign(data, view.getData());
        }
        return data;
    }

````
这种方式跟顺藤摸瓜的找到其他模块，直接获取其他模块数据或者直接调用其方法没有本质区别，
这种方式会把代码设计变得很复杂，并不推荐使用，但目前并没有更好的方式

**3. 通过Event** 

框架内部实现了一个D.Event的对象，可以通过 D.Event.on 方法注册事件，通过trigger触发回调。这种方式可以用于跨模块的数据通信。
具体例子：

````js
    // 初始化，D.Event，应用入口（enter.js）;
    app.canvas = D.assign({}, D.Event);

    // 注册事件，canvas/index.js
    this.app.canvas.on(constant.Events.CONFIG_CREATE_PAGE_DATA, function(data) {
        me.store.models.pageData.data = data.pageData;
    });

    // 在需要触发事件，存储数据时，调用trigger。canvas/components/app/home/quick-nav/config/index.js
    this.app.canvas.trigger(constant.Events.CONFIG_CREATE_PAGE_DATA, params);

    // 关闭前取消事件，canvas/index.js
    exports.afterClose = function() {
        var me = this;
        this.app.canvas.off(constant.Events.CONFIG_CREATE_PAGE_DATA, function(data) {
            me.store.models.pageData.data = data.pageData;
        });
    };

````
这种方式需要经常关注事件的取消。该方式的缺点是比较复杂，当需要注册的监听较多时，对性能影响较大。

### Module 内部通信

**1. View和Region的通信**

View 和 Region 的通信通过Module里的items对象进行绑定。下面的例子表示将main（View）和 content（Region）绑定

````js
    // 初始化，D.Event，应用入口（enter.js）;
    exports.items = {
        main: 'content',
    };

````

**2. View和Model的通信** 

View和Model的通信通过View里的 bindings 对象进行绑定。下面是view-xxx.js中的bindings对象写法，例子表示将pickUps(Model)绑定到当前的View中。

bindings对象的每一个key可以有3个取值，分别表示：
- true：当绑定的Model发生变化时，重新渲染当前View
- false：当绑定的Model发生变化时，不需要重新渲染当前View
- fn：绑定一个方法，当绑定的Model发生变化时，调用当前View中的某一个方法

````js
    exports.bindings = {
        pickUps: true,
        search: 'searchChange',
        lang: false
    };

````
在View通过bindings绑定的Model，可以通过 this.bindings.xxx.data 的方式获取到Model里面的数据。
不推荐直接在 View中修改Model的数据，需要修改时，应当通过dispatch的方式通知 module 去修改，遵循单向数据流。

````js
    exports.handlers = {
        changeMenu: function(nextStep, e, external) {
            var nextStep = 'info';
            var view = this.module.items.main.getEntities()[0];
            return this.module.dispatch('toStep', {
                step: nextStep,
                data: D.assign({}, external, view.getData())
            });
        }
    }
````
**3. View和Module的通信** 

Module内部其他对象和Module的通信，都是通过 this.module.xxx 的方式，直接访问Module内部属性和方法，Module获取View的数据，
需要通过items，并调用 getEntities 方法，该方法返回一个数组：
````js

    var view = this.items.main.getEntities()[0];

````

## 组件设计 ##

drizzle内部实现了 D.ComponentManager 对象，用于注册组件。
D.ComponentManager.register接收两个方法作为参数，第一个在组件注册时调用，第二个在组件销毁时触发。
组件通过view中的components数组引入，改数组是一个列表，可以引入多个组件，数组的每一项可以是静态的对象，也可以是一个函数，如果是函数，则必须返回一个对象。
组件引入时必须配置id、和name属性，其中name表示组件名称，id是当前view中一个dom的挂载点。

````js
// 组件注册
D.ComponentManager.register('tag-view', function(view, el, options) {
    var region = new D.Region(view.app, view.module, el, 'tag-view-region');
    var viewName = 'main/tag-view';
    if (options.new === true) viewName = 'main/tag-view-new';
    return region.show(viewName, options).then(function(mod) {
        if (options.tags) mod.addItems(options.tags);
        return mod;
    });
}, function(view, comp) {
    comp._region.close();
});

// 组件使用
exports.components = [function() {
    return {
        id: 'tags',
        name: 'tag-view',
        options: {
            multiple: true,
        }
    };
}];

````

## 路由设计 ##

drizzle的路由配置，在每个模块的根目录的router.js中。router.js定义routes对象列表，routes对象中的key对应路由，value对应回调方法。
- 路由可以通过/：的方式配置若干参数，和回调方法中参数列表的同名属性相对应
- 路由均为哈希模式
- 路由自动拼接当前目录url，下面例子中如果位于study文件夹下，则实际路由为 'study/todos/:id'
- 可以直接调用路由实例的 navigate 方法 app.navigate(url, true)
- navigate 实际会优先使用 history.pushState，如果不支持 pushState 方法，则降级为 location.replace

````js

    module.exports = {
        routes: {
            'todos/:id': 'showTodos',
        },

        showTodos (id) {
            return this.app.show('content', 'todos', { courseId: id })
        },
    }

````

## ajax设计 ##

drizzle内部实现了Request对象，定义了get、post、put、del、save等方法。
- 如果 url 配置中定义了 idKey，save会采用put方式请求，否则使用post请求
- 使用 put 方式时，如果使用set方式设置请求参数且参数中有id属性，则id属性会被作为url的一部分，而非参数
- 请求回来的数据，会被自动存Model的data属性中
- get、post、put、del、save方法均返回一个Promise，可以直接调用其then方法，处理后续逻辑

````js
// encode: true,
exports.store = {
    models: {
        pageList: { url: '../canvas/page/batch' },
    },
    callbacks: {
        init: function(payload) {
            var pageList = this.models.pageList;
            pageList.params = { type: payload.type };
            return this.get(pageList, { slient: true });
        }
};

exports.beforeRender = function() {
    this.dispatch('init', this.renderOptions);
};

````

## DOM事件绑定设计 ##

drizzle实现了一套针对DOM事件绑定的特殊约定，在View中的events对象定义事件，在handlers对象中定义对应事件回调
- event中的key值包含事件名称和匹配的id，中间使用空格分离，id支持使用*模糊匹配
- 回调函数的第一个参数，代表实践中*匹配的id部分，如果没有模糊匹配，第一个参数表示event事件源

````js

// 定义事件,
exports.events = {
    'click add-*': 'addLecturer',
};

// 定义回调
exports.handlers = {
    addLecturer: function(id) {
        var mod = this.module.items['picker/members/select-member'],
            me = this;
        return this.app.viewport.modal(mod, {
            id: id,
            singleCallback: function(members) {
                return me.module.dispatch('addLecturer', {
                    ids: _.map(members, function(m) {
                        return m.member.id;
                    }).join(',')
                });
            }
        });
    }
};

````
上面例子表示给以id以 add- 为开头的所有节点绑定事件，事件回调函数为addLecturer

## 表单提交设计 ##

drizzle表单提交自身的遵循DOM事件绑定规则，但内部实现了ActionCreator模块，针对表单提交做了一些特殊处理。表单事件通过actions绑定，和event相区别。
- actions 中定义的事件，自动绑定当前module.store中callbacks里的同名方法作为回调
- 如果 dataForActions 中定义了actions中回调的同名函数，调用module.store中callbacks里的同名方法前，会先调用dataForActions中的方法，对数据进行预处理
- dataForActions中的方法，第一个参数表示当前绑定节点元素所在的form表单中所有定义了name属性表单数据
- callbacks里的同名方法执行结束之后，会调用actionCallbacks中的同名方法

````js

// 定义action事件,
exports.actions = {
    'click remove*': 'remove'
};

// 预处理数据
exports.dataForActions = {
    remove: function(data) {
        var me = this;
        var lecturer = _.find(this.bindings.lecturers.data, ['id', data.id]),
            memberName,
            params = {};
        if (lecturer.lecturerType === 0) {
            memberName = lecturer.member.fullName;
        } else {
            memberName = lecturer.lecturerName;
        }
        params = {
            id: data.id,
            memberName: memberName
        };
        return this.Promise.create(function(resolve) {
            var message = '是否确定删除该讲师?';
            me.app.message.confirm(message, function() {
                resolve(params);
            }, function() {
                resolve(false);
            });
        });
    }
};

// action 的回调
exports.actionCallbacks = {
    remove: function() {
        this.app.message.success('删除成功');
    },
};

````