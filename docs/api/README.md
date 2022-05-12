## adapt ##
- 参数
    - <font face="黑体" color=#d63200>Object</font> target
- 返回值 undefined
- 用法

    接收一个对象作为参数，通过 assign(D.Adapter, target) 方式，重新适配或者扩展 D.Adapter 里面的方法。

## assign ##
- 参数
    - <font face="黑体" color=#d63200>Object</font> target
    - <font face="黑体" color=#d63200>Object</font> arg1
    - <font face="黑体" color=#d63200>Object</font> arg2
    - ...
- 返回值 target
- 用法

    接收若干个对象作为参数，依次合并对象的属性到目标对象 target，参数列表后面的对象会覆盖 target 对象的同名属性，返回最后的对象 target，和 Object.assign 相似。

## extend ##
- 参数
    - <font face="黑体" color=#d63200>Object</font> Child
    - <font face="黑体" color=#d63200>Object</font> Parent
    - <font face="黑体" color=#d63200>Object</font> obj
- 返回值 Child
- 用法

    接收3个对象作为参数，使 Child 继承 Parent 并将 obj 合并到 Child 的原型对象，返回 Child。
- 源码参考

````js

    extend = (theChild, theParent, obj) => {
        const child = theChild;
        assign(child, theParent);

        function Class () { this.constructor = theChild; }
        Class.prototype = theParent.prototype;
        child.prototype = new Class();
        assign(child.prototype, obj);
        child.__super__ = theParent.prototype;

        return child;
    }

````

## chain ##
- 参数
    - <font face="黑体" color=#d63200>Function | Array[Function]</font> task1
    - <font face="黑体" color=#d63200>Function | Array[Function]</font> task2
    - <font face="黑体" color=#d63200>Function | Array[Function]</font> task3
    - ...
- 返回值 Promise
- 用法

    接收若干任务参数作为任务列表，一次执行任务，如果任务的返回值中有then方法，对返回的对象中的then方法进行递归，知道执行完毕，返回值作为下一个参数任务的入参。

- 源码参考

````js

    chain (...args) {
        let prev = null;
        const doRing = (rings, ring, resolve, reject) => {
            const nextRing = (data) => {
                prev = data;
                rings.length === 0 ? resolve(prev) : doRing(rings, rings.shift(), resolve, reject);
            };

            if (D.isArray(ring)) {
                ring.length === 0 ? nextRing([]) :
                    this.parallel(ring, ...(prev != null ? [prev] : [])).then(nextRing, reject);
            } else {
                let value;
                try {
                    value = D.isFunction(ring) ? ring.apply(this.context, prev != null ? [prev] : []) : ring;
                } catch (e) {
                    D.Adapter.exportError(e);
                    reject(e);
                    return;
                }

                value && value.then ? value.then(nextRing, reject) : nextRing(value);
            }
        };

        if (args.length === 0) return this.resolve();

        return this.create((resolve, reject) => {
            doRing(args, args.shift(), resolve, reject);
        });
    }

````
> <font face="黑体" color=red>注意：如果中间任务抛出错误，程序会终止执行，导致整个模块崩溃。</font>

## uniqueId ##
- 参数
    - <font face="黑体" color=#d63200>String</font> prefix
- 返回值 string
- 用法

    接收一个字符串参数，生成唯一的id，返回的字符串id包含唯一编号和前缀 prefix。

> <font face="黑体" color=red>注意：编号唯一性仅适用于当前初始化工程，每次刷新都会重新编号，如果要生成需要持久存储的id，千万不要使用该方法。</font>

## show ##
- 参数
    - <font face="黑体" color=#d63200>String</font> regionKey
    - <font face="黑体" color=#d63200>String</font> moduleName
    - <font face="黑体" color=#d63200>Object</font> options
- 返回值 Promise
- 用法

    调用当前视口 Regions 中 key 为 regionKey 的 Region 的 show 方法，传入 moduleName 和 options，最后会以Region（regionKey）为挂载点，渲染module（moduleName）。

## dispatch ##
- 参数
    - <font face="黑体" color=#d63200>String</font> name
    - <font face="黑体" color=#d63200>any</font> params
- 返回值 Promise
- 用法

    手动触发 Store 中 callbacks 里面 key 为 name 的方法，是view 和 module、module 和 store 通信的主要方式。

## $$ ##
- 参数
    - <font face="黑体" color=#d63200>String</font> selector
- 返回值 DOM Object
- 用法

    以当前view为根节点，查找并返回与selector匹配的DOM节点，本质是执行 this._getElement().querySelectorAll(selector)

## isObject ##
- 参数
    - <font face="黑体" color=#d63200>any</font> target
- 返回值 Boolean
- 用法

    判断目标值 target 是否是对象，本质是执行 D.toString.call(target)，通过对象的class属性判断

## isFunction ##
- 参数
    - <font face="黑体" color=#d63200>any</font> target
- 返回值 Boolean
- 用法

    判断目标值 target 是否是函数，本质是执行 D.toString.call(target)，通过对象的class属性判断

## isArray ##
- 参数
    - <font face="黑体" color=#d63200>any</font> target
- 返回值 Boolean
- 用法

    判断目标值 target 是否是数组，本质是执行 D.toString.call(target)，通过对象的class属性判断

## isString ##
- 参数
    - <font face="黑体" color=#d63200>any</font> target
- 返回值 Boolean
- 用法

    判断目标值 target 是否是字符串，本质是执行 D.toString.call(target)，通过对象的class属性判断

## navigate ##
- 参数
    - <font face="黑体" color=#d63200>String</font> path
    - <font face="黑体" color=#d63200>Boolean</font> trigger
- 返回值 Boolean
- 用法

    手动触发路由跳转到目标path，按 trigger 是否为 true，设置路由是否存入历史记录
- 源码参考

````js

    navigate (path, trigger) {
        if (!this._started) return;
        if (PUSH_STATE_SUPPORTED) {
            root.history.pushState({}, root.document.title, this._prefix + path);
        } else {
            root.location.replace(this._prefix + path);
        }

        if (trigger !== false) this._dispath(path);
    }

````